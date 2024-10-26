import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Flight from '@/models/Flight';
import {
  buildPaginationResponse,
  buildPaginationToMongoose,
} from '@/app/common';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // TODO: implement paranoid mode
    // TODO: implement sorting
    // TODO: implement filtering
    // TODO: implement searching
    // TODO: filter by requirement
    const params = request.nextUrl.searchParams;
    const { page, pageSize } = buildPaginationToMongoose({
      page: params.get('page'),
      pageSize: params.get('limit'),
    });
    const data = await Flight.find().skip(page).limit(pageSize);
    const rows = await Flight.countDocuments();

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
