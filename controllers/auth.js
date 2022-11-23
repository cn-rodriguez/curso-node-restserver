import { json, response } from 'express';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';
import { generarJWT } from '../helpers/generar-jwt.js';
import { googleVerify } from '../helpers/google-verify.js';

const login = async(  req, res = response ) => {
    const { email, password } = req.body;

    try {

        // Verificar si el email existe/* Waiting for the result of the query to the database. */
        
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

const googleSignIn = async( req, res ) => {
    const { id_token } = req.body;
    try {

        const { email, name, picture } = await googleVerify( id_token );
        // email exist
        let usuario = await User.findOne({ email });
        console.log('here')
        
        if ( !usuario ) {
            const data = {
                name,
                email,
                password: ':p',
                picture,
                google: true,
                role: 'USER_ROLE'
            }

            usuario = new User( data )
            await usuario.save();
        }

        // Si el usuario en db google false 
        if ( !usuario.status ) {
            return res.status(401).json({
                msg: 'talk with supervisor, user blocked'  
            });
        }

        //  Generar JWT
        const token = await generarJWT( usuario.id )
        console.log(token)


        res.json({
            usuario,
            token,
    })
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg: 'Token cannot be verify'
        })
    }
};

export {
    login,
    googleSignIn,
}