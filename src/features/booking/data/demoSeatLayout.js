// Local hall geometry: the API does not provide individual seat availability.
export const demoSeatLayout = Array.from({ length: 10 }, (_, row) =>
  Array.from({ length: row === 0 ? 14 : 12 }, () => 1)
);
