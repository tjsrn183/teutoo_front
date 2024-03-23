export const locationChunk = (location: string) => {
  const newLocation = location.split(" ");
  return newLocation[0];
};
