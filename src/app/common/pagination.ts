export interface IPaginationDTO {
  page?: number | string | null;
  pageSize?: number | string | null;
}

export const buildPaginationToMongoose = ({
  page,
  pageSize,
}: IPaginationDTO = {}) => {
  const pageNumber = Number(page) || 1;
  const pageSizeNumber = Number(pageSize) || 10;

  const offset = (pageNumber - 1) * pageSizeNumber;

  return {
    page: offset,
    pageSize: pageSizeNumber,
  };
};

export interface IPaginationResponse<T> {
  message: string;
  page: number;
  pageSize: number;
  totalRows: number;
  totalPages: number;
  data: T | T[];
}

export const buildPaginationResponse = <T>({
  message,
  page,
  pageSize,
  totalRows,
  data,
}: {
  message?: string;
  page?: number;
  pageSize?: number;
  totalRows?: number;
  data?: T | T[];
}): IPaginationResponse<T> => {
  return {
    message: message ?? '',
    page: page ?? 0,
    pageSize: pageSize ?? 0,
    totalRows: totalRows ?? 0,
    totalPages: pageSize && totalRows ? Math.ceil(totalRows / pageSize) : 0,
    data: data ? data : [],
  };
};
