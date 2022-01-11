import { config } from 'dotenv';

config();

export const PRIV_KEY_1 = String(process.env.PRIV_KEY_1);
export const RSK_NODE = String(process.env.RSK_NODE);
