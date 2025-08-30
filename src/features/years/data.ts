export const getYears = () =>
  Array.from(
    { length: new Date().getFullYear() - 1969 },
    (_, i) => new Date().getFullYear() - i
  );
