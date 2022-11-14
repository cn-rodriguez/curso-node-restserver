import { Router } from "express";
import { check }  from "express-validator";

// const { check, isEmail } = require("express-validator"); No funcionan en js 6+
// const { body } = require("express-validator");

// import { validarCampos } from "../middlewares/validar-campos.js"
// import { validarJWT } from "../middlewares/validar-jwt.js";
// import { isAdminRole, haveRole } from "../middlewares/validar-roles.js";

import {
  validarCampos,
  validarJWT,
  isAdminRole,
  haveRole,
} from '../middlewares/index.js'

import { esRoleValido, emailExiste, existeUsuarioPorId } from "../helpers/db-validators.js";

import {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} from "../controllers/users.js";

export const routerUsers = Router();

routerUsers.get("/", usersGet);

routerUsers.post("/", [
  check( 'name', 'El nombre es obligatorio').not().isEmpty(),
  check( 'email', 'El correo no es valido').isEmail(),
  check( 'password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
  check( 'role' ).custom( esRoleValido ),
  check( 'email').custom( emailExiste),
  validarCampos
] ,usersPost);

routerUsers.put("/:id", [
  check( 'id', 'No es un ID valido').isMongoId(),
  check( 'id' ).custom( existeUsuarioPorId ),
  check( 'role' ).custom( esRoleValido ),
  validarCampos
], usersPut);

routerUsers.delete("/:id", [
  validarJWT,
  // isAdminRole,
  haveRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check( 'id', 'No es un ID valido').isMongoId(),
  check( 'id' ).custom( existeUsuarioPorId ),
  validarCampos
],usersDelete);

routerUsers.patch("/", usersPatch);
