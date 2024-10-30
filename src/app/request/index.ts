import { IPaginationResponse } from '../common';

interface Props {
  url: string;
  page: number;
  size: number;
}

export const getPageData = async <T>({ url, page, size }: Props) => {
  const fullUrl = `${url}?page=${page}&limit=${size}`;

  const response = await fetch(fullUrl);

  if (!response.ok) throw new Error('Failed to fetch data');

  const responseJson = (await response.json()) as IPaginationResponse<T>;

  return responseJson;
};
