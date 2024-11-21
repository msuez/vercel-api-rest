import serverlessExpress from '@vendia/serverless-express';

import { app, } from './app';

const expressApp = app.startServerless();
export default serverlessExpress({ app: expressApp });
