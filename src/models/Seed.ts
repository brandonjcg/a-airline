import mongoose, { Schema, model } from 'mongoose';

export interface ISeed {
  _id: string;
  name: string;
  fieldName: string;
  collectionName: string;
  color?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type ISeedNew = Omit<ISeed, '_id' | 'createdAt' | 'updatedAt'>;

const SeedSchema = new Schema<ISeed>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
    },
    fieldName: {
      type: String,
      required: [true, 'Field name is required'],
    },
    collectionName: {
      type: String,
      required: [true, 'Collection name is required'],
    },
    color: {
      type: String,
      default: null,
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

export default mongoose.models?.Seed || model<ISeed>('Seed', SeedSchema);
