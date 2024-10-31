import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import { EnumStatus } from '@/lib/seed';
import Flight, { IFlightNew, seedSchema } from '@/models/Flight';
import {
  buildPaginationResponse,
  buildPaginationToMongoose,
  operationTimestamp,
  validationOfModelWithZod,
} from '@/app';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    // TODO: implement paranoid mode
    // TODO: implement sorting
    // TODO: implement filtering
    // TODO: implement searching
    // TODO: filter by requirement of 24 hrs
    const params = request.nextUrl.searchParams;
    const isMainTable = JSON.parse(params.get('isMainTable') || 'true');
    if (isMainTable) {
      const { page, pageSize } = buildPaginationToMongoose({
        page: params.get('page'),
        pageSize: params.get('limit'),
      });
      const currentDate = new Date();
      const date0 = operationTimestamp({
        date: currentDate,
        isAddition: false,
      });
      const date1 = operationTimestamp({ date: currentDate, isAddition: true });

      const data = await Flight.find()
        .populate('status', 'name color')
        .populate('pilots', 'name')
        .skip(page)
        .limit(pageSize)
        .sort({ departureTime: -1 })
        .where({
          departureTime: { $gte: date0, $lte: date1 },
        })
        .lean();
      const rows = await Flight.countDocuments().where({
        departureTime: { $gte: date0, $lte: date1 },
      });

      return NextResponse.json(
        buildPaginationResponse({
          page,
          pageSize,
          totalRows: rows,
          data,
        }),
      );
    }

    const { page, pageSize } = buildPaginationToMongoose({
      page: params.get('page'),
      pageSize: params.get('limit'),
    });

    const data = await Flight.find()
      .populate('status', 'name color')
      .populate('pilots', 'name')
      .skip(page)
      .limit(pageSize)
      .sort({ departureTime: -1 })
      .lean();
    const rows = await Flight.countDocuments();

    const currentDate = new Date();
    const dataWithFlags = data.map((item) => {
      const isDeleteable = String(item.status._id) === EnumStatus.Cancelled;
      const isOlderThanOneMonth =
        new Date(item.departureTime).getTime() <
        currentDate.getTime() - 2592000000;

      return {
        ...item,
        isDeleteable: isDeleteable && isOlderThanOneMonth,
      };
    });

    return NextResponse.json(
      buildPaginationResponse({
        page,
        pageSize,
        totalRows: rows,
        data: dataWithFlags,
      }),
    );
  } catch (error) {
    return NextResponse.json({
      error: true,
      message: (error as Error).message,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = (await request.json()) as IFlightNew;
    const errors = validationOfModelWithZod({ schema: seedSchema, body });
    if (errors) {
      return NextResponse.json(
        buildPaginationResponse({
          data: errors,
        }),
        { status: 400 },
      );
    }

    if (body.originCode === body.destinationCode) {
      return NextResponse.json(
        buildPaginationResponse({
          message: 'Origin code and destination code cannot be the same',
        }),
        { status: 400 },
      );
    }

    const data = await Flight.create({
      ...body,
      status: EnumStatus.OnTime,
    });

    return NextResponse.json(
      buildPaginationResponse({
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
