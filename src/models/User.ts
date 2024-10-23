export interface IUser {
  _id: string;
  name: string;
  email: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export type IUserNew = Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>;
