import { Types } from 'mongoose';
import { ISeed } from '@/models';
import { IFlightNew } from '@/models/Flight';

const { ObjectId } = Types;

export const EnumStatus = {
  OnTime: '671bf1ce4a83fc4cdfa8d092',
  OnBoarding: '671bf1ce4a83fc4cdfa8d093',
  GateClosed: '671bf1ce4a83fc4cdfa8d094',
  Cancelled: '671bf1ce4a83fc4cdfa8d095',
  Delayed: '671bf1ce4a83fc4cdfa8d096',
};

const date = new Date();
const createdAt = date;
const updatedAt = date;

export const seedCatalog: ISeed[] = [
  {
    _id: EnumStatus.OnTime,
    name: 'On time',
    fieldName: 'idEstatus',
    collectionName: 'status',
    color: '#FFC107',
    createdAt,
    updatedAt,
  },
  {
    _id: EnumStatus.OnBoarding,
    name: 'On boarding',
    fieldName: 'idEstatus',
    collectionName: 'status',
    color: '#4CAF50',
    createdAt,
    updatedAt,
  },
  {
    _id: EnumStatus.GateClosed,
    name: 'Gate closed',
    fieldName: 'idEstatus',
    collectionName: 'status',
    color: '#F44336',
    createdAt,
    updatedAt,
  },
  {
    _id: EnumStatus.Cancelled,
    name: 'Cancelled',
    fieldName: 'idEstatus',
    collectionName: 'status',
    color: '#F44336',
    createdAt,
    updatedAt,
  },
  {
    _id: EnumStatus.Delayed,
    name: 'Delayed',
    fieldName: 'idEstatus',
    collectionName: 'status',
    color: '#F44336',
    createdAt,
    updatedAt,
  },
];

const currentDate = new Date();

export const arrayOf100Positions: IFlightNew[] = Array.from(
  { length: 87 },
  (_, index) => {
    const originCode = index % 2 === 0 ? 'LAX' : 'GDL';
    const destinationCode = originCode === 'GDL' ? 'LAX' : 'GDL';
    const status =
      seedCatalog[Math.floor(Math.random() * seedCatalog.length)]._id;

    return {
      originCode: originCode,
      departureTime: currentDate,
      destinationCode,
      arrivalTime: currentDate,
      codeFlight: `M${index}-F1`,
      gate: `S${index}`,
      status: new ObjectId(status),
    } as IFlightNew;
  },
);
