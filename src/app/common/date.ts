export const formatDate = (date: string | Date | unknown) =>
  new Date(date as string).toLocaleString();
