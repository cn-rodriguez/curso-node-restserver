import { response, request } from 'express';
import jsonwebtoken from 'jsonwebtoken';
import { User } from '../models/user.js'

const validarJWT = async ( req, res, next ) => {

    const token = req.header( 'x-token' );
    
    if ( !token ) {
        return res.status(401).json({
            msg: 'No token provided'
        })
    }
    
    try {

        const { uid } = jsonwebtoken.verify( token, process.env.SECRETORPRIVATEKEY);

        // read users of uid
        const user = await User.findById(uid);

        // 
        if ( !user ) {
            return res.status(401).json({
                msg: 'Invalid token - User not found'
            })
        }

        // Verify if uid status equals true
        if ( !user.status ) {
            return res.status(401).json({ 
                msg: 'Invalid token - user status false'
            })
        }

        req.user = user;

        next();

    } catch ( error ) {
        console.log(error);
        return res.status(401).json({
            msg: 'Invalid token'
        })
    }

    // next();

}

export {
    validarJWT,
}