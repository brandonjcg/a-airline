import { Db, MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI)
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');

const uri = process.env.MONGODB_URI;

let cachedClient: MongoClient | null = null;

export async function connectDB(): Promise<MongoClient> {
  if (cachedClient) return cachedClient;

  try {
    cachedClient = await MongoClient.connect(uri);

    return cachedClient as MongoClient;
  } catch (error) {
    throw error;
  }
}

export async function getDatabase(): Promise<Db> {
  const client: MongoClient = await connectDB();
  return client.db();
}
