import { NextResponse } from 'next/server';
import { Types } from 'mongoose';
import { connectDB } from '@/lib/mongodb';
import { buildPaginationResponse, buildPaginationToMongoose } from '@/app';
import { arrayOf100Positions, seedCatalog } from '@/lib/seed';
import Flight from '@/models/Flight';
import Seed from '@/models/Seed';

const { ObjectId } = Types;

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

    const currentDate = new Date();
    await Flight.deleteMany({});
    await Flight.insertMany(
      arrayOf100Positions.map((flight, index) => {
        const departureTime = new Date(
          new Date(currentDate).setMinutes(currentDate.getMinutes() + index),
        );
        const arrivalTime = new Date(
          new Date(departureTime).setHours(departureTime.getHours() + 1),
        );

        return new Flight({
          _id: new ObjectId(),
          ...flight,
          departureTime,
          arrivalTime,
        });
      }),
    );
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
