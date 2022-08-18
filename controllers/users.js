import { response, request } from 'express';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';


const usersGet =  async(req, res) => {
    const { limit = 5, start = 0 } =  req.query;
    const query = { status: true }

    // const usuarios = await User.find( query )
    //     .skip(start)
    //     .limit(limit);

    // const total = await User.countDocuments( query );

    const [ total, usuarios ] = await Promise.all( [
        User.countDocuments( query ),
        User.find( query )
            .skip( start )
            .limit( limit )
    ] );

    res.json({
        total,
        usuarios
    });
}

const usersPost = async(req, res) => {

    

    const { name, email, password, role } = req.body;
    const usuario = new User({ name, email, password, role });
    
    //  Encriptar la password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en dv 
    await usuario.save();


    res.json({
        msg: 'post API controller',
        usuario,
    });
}

const usersPut = async(req, res) => {
    const { id } = req.params;
    const { _id, password, google, email, ...resto } = req.body;

    // To do validar contra la base de datos
    if ( password ) {
        //  Encriptar la password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await User.findByIdAndUpdate( id, resto );


    res.json({
        usuario
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API controller'
    });
};

const usersDelete = async(req, res) => {
    const { id } = req.params;

    // Borrando fisicamente desde la db 
    const user = await User.findByIdAndUpdate( id, { status: false }, { new: true });

    res.json({
        user
    });
};



export {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}