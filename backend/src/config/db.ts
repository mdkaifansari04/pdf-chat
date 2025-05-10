import { connect } from 'mongoose';
import { MONGO_URI } from './env';

export const connectToDB = async () => {
  try {
    await connect(MONGO_URI!);
    console.log('Connected to DB');
  } catch (error) {
    console.error('Failed to connect to DB :', error);
  }
};
