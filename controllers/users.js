import { response, request } from 'express';
import { User } from '../models/user.js';
import bcryptjs from 'bcryptjs';


const usersGet = (req, res) => {
    const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API controller',
        q,
        nombre,
        apikey,
        page,
        limit
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

const usersPut = (req, res) => {
    const { id } = req.params;
    res.json({
        msg: 'put API controller',
        id
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API controller'
    });
};

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API controller'
    });
};



export {
    usersGet,
    usersPost,
    usersPut,
    usersPatch,
    usersDelete,
}