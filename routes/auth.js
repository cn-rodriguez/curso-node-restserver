import { Router } from 'express';
import { check } from 'express-validator';
import { login, googleSignIn } from '../controllers/auth.js';
import { validarCampos } from '../middlewares/validar-campos.js';


export const routerAuth = Router();

routerAuth.post('/login', [
    check( 'email', 'email es obligatorio').isEmail(),
    check( 'password', 'password es obligatorio').not().isEmpty(),
    validarCampos
] ,login);

routerAuth.post('/google', [
    check( 'id_token', 'id_token es necesario').not().isEmpty(),
    validarCampos
] , googleSignIn);
