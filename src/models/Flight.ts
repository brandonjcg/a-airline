import mongoose, { Schema, model, Document } from 'mongoose';
import { ISeed } from './Seed';

export interface IFlight extends Document {
  _id: string;
  originCode: string;
  departureTime: Date;
  destinationCode: string;
  arrivalTime: Date;
  codeFlight: string;
  gate: string;
  status: mongoose.Types.ObjectId | ISeed;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type IFlightNew = Omit<IFlight, '_id' | 'createdAt' | 'updatedAt'>;

const FlightSchema = new Schema<IFlight>(
  {
    originCode: {
      type: String,
      required: [true, 'Origin code is required'],
    },
    departureTime: {
      type: Date,
      required: [true, 'Departure time is required'],
    },
    destinationCode: {
      type: String,
      required: [true, 'Destination code is required'],
    },
    arrivalTime: {
      type: Date,
      required: [true, 'Arrival time is required'],
    },
    codeFlight: {
      type: String,
      required: [true, 'Code flight is required'],
    },
    gate: {
      type: String,
      required: [true, 'Gate is required'],
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: 'Status',
      required: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models?.Flight ||
  model<IFlight>('Flight', FlightSchema);
