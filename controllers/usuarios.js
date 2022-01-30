const { response } = require('express');

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API - controlador'
    })
};

const usuariosPut = (req, res) => {
    res.status(500).json({
        msg: 'put API - controlador'
    })
};

const usuariosPost = (req, res) => {
    res.status(201).json({
        msg: 'post API - controlador'
    })
};

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API - controlador'
    })
};



module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
};