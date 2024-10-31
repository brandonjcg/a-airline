import { IPaginationResponse } from '../common';

interface Props {
  url: string;
  page: number;
  size: number;
  query?: Record<string, string | boolean>;
}

export const getPageData = async <T>({ url, page, size, query }: Props) => {
  let fullUrl = `${url}?page=${page}&limit=${size}`;
  if (query)
    Object.keys(query).forEach((key) => {
      fullUrl += `&${key}=${query[key]}`;
    });

  const response = await fetch(fullUrl);

  if (!response.ok) throw new Error('Failed to fetch data');

  const responseJson = (await response.json()) as IPaginationResponse<T>;

  return responseJson;
};
