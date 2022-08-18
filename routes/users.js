import { Router } from "express";
import { check }  from "express-validator";

// const { check, isEmail } = require("express-validator"); No funcionan en js 6+
// const { body } = require("express-validator");

import { validarCampos } from "../middlewares/validar-campos.js"
import { esRoleValido, emailExiste, existeUsuarioPorId } from "../helpers/db-validators.js";

import {
  usersGet,
  usersPost,
  usersPut,
  usersPatch,
  usersDelete,
} from "../controllers/users.js";

export const router = Router();

router.get("/", usersGet);

router.post("/", [
  check( 'name', 'El nombre es obligatorio').not().isEmpty(),
  check( 'email', 'El correo no es valido').isEmail(),
  check( 'password', 'El password debe ser de al menos 6 caracteres').isLength({ min: 6 }),
  check( 'role' ).custom( esRoleValido ),
  check( 'email').custom( emailExiste),
  validarCampos
] ,usersPost);

router.put("/:id", [
  check( 'id', 'No es un ID valido').isMongoId(),
  check( 'id' ).custom( existeUsuarioPorId ),
  check( 'role' ).custom( esRoleValido ),
  validarCampos
], usersPut);

router.delete("/:id", [
  check( 'id', 'No es un ID valido').isMongoId(),
  check( 'id' ).custom( existeUsuarioPorId ),
  validarCampos
],usersDelete);

router.patch("/", usersPatch);
