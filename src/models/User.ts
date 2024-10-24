import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
  _id: string;
  email: string;
  password?: string;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type IUserNew = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    image: {
      type: String,
      required: [true, 'Image is required'],
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

export default mongoose.models?.User || model<IUser>('User', UserSchema);
