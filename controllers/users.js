import { response } from 'express';

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

const usersPost = (req, res) => {
    const { nombre, edad } = req.body;

    res.json({
        msg: 'post API controller',
        nombre,
        edad
    });
}

const usersPut = (req, res) => {
    const { id } = req.params.id;
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