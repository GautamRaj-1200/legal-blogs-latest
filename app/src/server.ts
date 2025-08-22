import config from './config/config.js';
import app from './app.js';
import connectDB from './db/connection.js';

connectDB()
  .then(() => {
    app.on('error', (error: unknown) => {
      console.log('ERR: ', error);
      throw error;
    });
    app.listen(Number(config.PORT), '0.0.0.0', () => {
      console.log(`Server is running on port ${config.PORT}`);
    });
  })
  .catch((err) => {
    console.log('Mongo DB connection failed!!!!!', err);
  });
