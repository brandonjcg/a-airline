export const formatDate = (date: string | Date | unknown) =>
  new Date(date as string).toLocaleString();

export const operationTimestamp = ({
  date = new Date(),
  isAddition = true,
  quantity = 12,
}): Date => {
  const timestamp = date.getTime();
  const dayInMilliseconds = 60 * 60 * 1000;

  const newTimestamp = isAddition
    ? timestamp + quantity * dayInMilliseconds
    : timestamp - quantity * dayInMilliseconds;

  return new Date(newTimestamp);
};
