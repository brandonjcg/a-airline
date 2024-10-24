import Seed from '@/models/Seed';

export const getSeeds = async () => {
  try {
    const data = await Seed.find({ deletedAt: null });

    return data;
  } catch (error) {
    return {
      message: error,
    };
  }
};
