import cors from 'cors';
import morgan from 'morgan';
import express, { Router, } from 'express';
import { Server as HttpServer } from 'http';

import { Swagger } from '../config/swagger';
import { errorHandler } from '../middlewares/errorHandler';

interface Options {
    env?:string;
    port: number;
    routes: Router;
    publicFolder?:string;
}

export class Server {

    private readonly env:string;
    private readonly port: number;
    private readonly routes: Router;
    private serverListener?: HttpServer;
    
    public readonly app = express();

    constructor(options:Options) {
        const {
            env = 'local',
            port,
            routes,
        } = options;
        this.env = env;
        this.port = port;
        this.routes = routes;
    }

    private create() {
        this.app.use(cors({
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
            allowedHeaders: ['Content-Type', 'Authorization'],
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({
            extended: true,
        }));

        this.app.use(morgan('dev'));

        //* Swagger documentation
        this.app.get('/docs/swagger.json', (req, res) => {
            res.setHeader('Content-Type', 'application/json');
            res.send(Swagger.swaggerSpec);
        });
        this.app.use('/docs', Swagger.serve, Swagger.setup());

        //* Routes
        this.app.use('/', this.routes);

        //* Catch all
        this.app.use('*', (req, res) => {
            res.status(405).send(`Method Not Allowed`);
        });

        //* Error handler
        this.app.use(errorHandler);
    }

    public startServerless() {
        this.create();
        return this.app;
    }

    public async start() {
        this.create();
        this.serverListener = this.app.listen(this.port, () => {
            console.log(`Server running on port: ${this.port}`);
        });
    }

    public close() {
        this.serverListener?.close();
    }

}
