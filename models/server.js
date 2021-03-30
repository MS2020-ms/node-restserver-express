const express = require('express')
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    //constructor cuando se crea la instancia de la clase Server
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Rutas
        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads'

        }

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

        //Fileupload o Carga de Archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true,
        }));

    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor en puerto', this.port);
        })
    }

}

module.exports = Server;