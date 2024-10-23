import { NextResponse } from 'next/server';
import { ISeed, ISeedNew } from '@/models/Seed';
import { getDatabase } from '../../../../lib/mongodb';

export async function GET() {
  try {
    const database = await getDatabase();
    const data = await database.collection<ISeed>('seeds').find().toArray();

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
    const database = await getDatabase();
    await database.collection<ISeedNew>('seeds').insertMany(seed);

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
