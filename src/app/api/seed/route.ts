import Seed, { ISeedNew } from '@/models/Seed';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await Seed.find({ deletedAt: null });

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
    await Seed.create(seed);

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
