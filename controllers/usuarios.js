const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');

const usuariosGet = (req = request, res = response) => {
    const { q, nombre = 'No name', id, page, limit } = req.query;

    res.json({
        msg: 'get API - controlador',
        q,
        nombre,
        id,
        page,
        limit
    })
};

const usuariosPut = (req, res) => {
    const { id } = req.params;

    res.json({
        msg: 'put API - controlador',
        id
    })
};

const usuariosPost = async (req, res) => {

    
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Verificar si el correo existe.
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        return res.status(400).json({
            msg: 'Ese correo ya está registrado'
        })
    }

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
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