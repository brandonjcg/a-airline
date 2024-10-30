export interface IResponseServer<T> {
  message: string;
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
  data: T[] | T;
}
