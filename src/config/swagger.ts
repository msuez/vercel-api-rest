import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi, { SwaggerOptions } from 'swagger-ui-express';

import { envs } from './envs';
import { RequestHandler } from 'express';

export class Swagger {

    static swaggerSpec = swaggerJSDoc({
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Vercer Deploy API',
                version: '1.0.0',
                description: 'Matias Suez Vercel Deploy',
                contact: {
                    name: 'Matias',
                    surname: 'Suez',
                    email: 'matisuez@gmail.com',
                },
            },
            servers: [
                {
                    url: envs.NODE_ENV === 'production'
                        ? 'https://vercel-api-rest.vercel.app'
                        : 'http://localhost:3000',
                },
            ],
        },
        apis: [
            envs.NODE_ENV === 'production' ?
                './dist/**/*.js' : './src/**/*.ts'
        ],
    });

    static setup(): RequestHandler {
        return swaggerUi.setup(Swagger.swaggerSpec, {
            customCss: '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
            customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.18.0/swagger-ui.css',
        });
    }

    static get serve() {
        return swaggerUi.serve;
    }
}
