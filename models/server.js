import express from 'express';
import cors from 'cors';
import { routerUsers } from '../routes/users.js';
import { routerAuth } from '../routes/auth.js';
import { dbConnection } from '../database/config.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Conectar db
        this.conectarDB();

        // Middleware
        this.middlewares();

        // Rutas de app
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        // directorio publico
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use( this.authPath, routerAuth )
        this.app.use( this.usersPath, routerUsers );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

}

export {Server};