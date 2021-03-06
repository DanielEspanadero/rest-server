const express = require('express');
const cors = require('cors');

const { dbConection } = require('../db/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a la base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares()

        // Rutas de mi app
        this.routes();
    }

    async conectarDB() {
        await dbConection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json())

        // Direcctorio público
        this.app.use(express.static('public'));
    };

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    };

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto ${this.port}`);
        });
    };


};

module.exports = Server;