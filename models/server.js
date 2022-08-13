import express from 'express';
import cors from 'cors';
import { router } from '../routes/users.js';

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        // Middleware
        this.middlewares();

        // Rutas de app
        this.routes();
    }

    middlewares() {
        // directorio publico
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        this.app.use( express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, router );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port', this.port);
        });
    }

}

export {Server};