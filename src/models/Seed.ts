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
