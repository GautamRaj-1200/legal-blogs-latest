import dotenvFlow from 'dotenv-flow';
dotenvFlow.config();
import process from 'process';

export default {
  ENV: process.env.ENV,
  PORT: process.env.PORT,
  CORS_ORIGIN: process.env.CORS_ORIGIN,
  MONGODB_URI: process.env.MONGODB_URI,
  DB_NAME: process.env.DB_NAME,
};
