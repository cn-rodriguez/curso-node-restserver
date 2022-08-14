import { Router } from "express";
import { check }  from "express-validator";

// const { check, isEmail } = require("express-validator"); No funcionan en js 6+
// const { body } = require("express-validator");

import { validarCampos } from "../middlewares/validar-campos.js"
import { esRoleValido, emailExiste } from "../helpers/db-validators.js";

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
  // check( 'role', 'No es un role permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
  check( 'role' ).custom( esRoleValido ),
  check( 'email').custom( emailExiste),
  validarCampos
] ,usersPost);

router.put("/:id", usersPut);

router.patch("/", usersPatch);

router.delete("/", usersDelete);
