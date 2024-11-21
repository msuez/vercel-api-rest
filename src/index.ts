import serverlessExpress from '@vendia/serverless-express';

import { app, } from './app';

const expressApp = app.startServerless();
export const handler = serverlessExpress({ app: expressApp });
