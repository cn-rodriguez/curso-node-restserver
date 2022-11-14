import { response } from 'express';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';

const login = async(  req, res = response ) => {
    const { email, password } = req.body;

    try {

        // Verificar si el email existe
        const user = await  User.findOne({ email: email });
        if ( !user ) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - email'
            })
        }

        // Verificar si el usuario esta activo
        if ( !user.status ) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - status'
            })
        }

        // Verificar password

        const validPassword = bcryptjs.compareSync( password, user.password );

        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Usuario / Password incorrectos - password'
            })
        }

        //  Generar JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token,
            msg: 'Login OK'
        })


    } catch ( err ) {
        console.log(err)
        res.status(500).json({
            msg: "Hable con el administrador"
        })
    }

    // res.json({
    //     msg: "login OK"
    // });
}

export {
    login
}