import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { flightSeed, seedCatalog } from '@/lib/seed';
import Flight from '@/models/Flight';
import Seed from '@/models/Seed';
import { buildPaginationResponse, buildPaginationToMongoose } from '@/app';

export async function GET() {
  try {
    await connectDB();
    const { page, pageSize } = buildPaginationToMongoose();
    const data = await Seed.find().skip(page).limit(pageSize);
    const rows = await Seed.countDocuments();

    return NextResponse.json(
      buildPaginationResponse({
        page,
        pageSize,
        totalRows: rows,
        data,
      }),
    );
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: (error as Error).message,
    });
  }
}

export async function POST() {
  try {
    await connectDB();

    await Flight.deleteMany({});
    await Flight.insertMany(flightSeed);
    await Seed.deleteMany({});
    await Seed.insertMany(seedCatalog);

    return NextResponse.json(
      buildPaginationResponse({
        message: 'Dummy data seeded successfully',
      }),
    );
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: (error as Error).message,
    });
  }
}
