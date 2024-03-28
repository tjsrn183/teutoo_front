export const formatDate = (date: string) => {
  const match = date.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2})/);

  return match ? match[1].split("T") : date;
};
