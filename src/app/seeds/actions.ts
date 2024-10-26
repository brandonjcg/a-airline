import { connectDB } from '@/lib/mongodb';
import Seed from '@/models/Seed';

export const getSeeds = async () => {
  try {
    await connectDB();
    const data = await Seed.find({ deletedAt: null });

    return data;
  } catch (error) {
    return {
      message: error,
    };
  }
};
