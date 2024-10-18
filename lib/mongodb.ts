import mongoose, { Connection } from 'mongoose';

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('🔴 Hey Mr. Developer, please add .env file');

let cachedConnection: Connection | null = null;

export const connectToMongoDB = async (): Promise<Connection> => {
  if (cachedConnection) return cachedConnection;

  try {
    const { connection } = await mongoose.connect(MONGODB_URI);

    if (connection.readyState !== 1)
      throw new Error('🔴 Database connection failed');

    cachedConnection = connection;

    return connection;
  } catch (error) {
    console.error('🔴 Database connection error:', error);
    throw error;
  }
};
