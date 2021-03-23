const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    //constructor cuando se crea la instancia de la clase Server
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.authPath = '/api/auth';
        this.usuariosPath = '/api/usuarios';

        //Conectar a Base de Datos
        this.conectarDB();

        //Midlewares (.use):
        this.midlewares();
        //Rutas de mi app:
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    midlewares() {
        //CORS
        this.app.use(cors());
        //Parseo y lectura del Body
        this.app.use(express.json());
        //Directorio publico
        this.app.use(express.static('public'))

    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port);
        })
    }

}

module.exports = Server;