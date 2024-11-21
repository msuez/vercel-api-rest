
import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
    PORT: get('PORT').asPortNumber(),
    NODE_ENV: get('NODE_ENV').asString(),
};