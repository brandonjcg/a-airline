import { NextResponse } from 'next/server';
import Seed, { ISeedNew } from '@/models/Seed';
import { connectToMongoDB } from '../../../../lib/mongodb';

export async function GET() {
  await connectToMongoDB();
  try {
    const data = await Seed.find();

    return NextResponse.json({
      data,
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: (error as Error).message,
    });
  }
}

export async function POST() {
  const seed: ISeedNew[] = [
    {
      name: 'A tiempo',
      color: 'amarillo',
      fieldName: 'field1',
      collectionName: 'collection1',
    },
    {
      name: 'Abordando',
      color: 'verde',
      fieldName: 'field2',
      collectionName: 'collection2',
    },
  ];

  try {
    await connectToMongoDB();
    await Seed.insertMany(seed);

    return NextResponse.json({
      message: 'Seeds created successfully',
    });
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: (error as Error).message,
    });
  }
}
