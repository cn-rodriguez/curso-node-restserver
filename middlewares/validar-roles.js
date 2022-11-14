import { response } from 'express';

const isAdminRole = ( req, res, next ) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'Want to verify role without validating token first'
        })
    }

    const { name, role } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} is not Administrator - Cannot do this`
        });
    }

    next();
}

const haveRole = ( ...roles ) => {
    return ( req, res, next ) => {

        if ( !req.user ) {
            return res.status(500).json({
                msg: 'Want to verify role without validating token first'
            })
        }

        if ( !roles.includes( req.user.role ) ) {
            return res.status(401).json({
                msg: `This service require some of this roles ${ roles }`
            })
        }

        next();
    }
}

export {
    isAdminRole,
    haveRole,
}