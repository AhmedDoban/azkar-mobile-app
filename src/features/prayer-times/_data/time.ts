export const DAY_MINUTES = 24 * 60;

export const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export const minutesOfDay = (date: Date) =>
  date.getHours() * 60 + date.getMinutes();

export const shortTime = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return `${h % 12 || 12}:${String(m).padStart(2, "0")}`;
};
