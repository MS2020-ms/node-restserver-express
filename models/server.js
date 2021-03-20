const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosRoutePath = '/api/usuarios';

        //Midlewares (.use):
        this.midlewares();
        //Rutas de mi app:
        this.routes();
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
        this.app.use(this.usuariosRoutePath, require('../routes/usuarios'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port);
        })
    }

}

module.exports = Server;