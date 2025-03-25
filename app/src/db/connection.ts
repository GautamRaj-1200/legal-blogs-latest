import mongoose from 'mongoose';
import config from '../config/config.js';

const connectDB = async () => {
  try {
    const mongoURI = `${config.MONGODB_URI}/${config.DB_NAME}`;
    const dbConnectionInstance = await mongoose.connect(mongoURI);
    console.log(`Database Connected: ${dbConnectionInstance.connection.host}`);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log('Some error occurred while connecting to the Database', errorMessage, error);
  }
};

export default connectDB;
