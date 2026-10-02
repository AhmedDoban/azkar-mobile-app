export const PAGE = {
  paddingX: 8,
  paddingTop: 6,
  paddingBottom: 8,
  gap: 8,
  topRow: 22,
};

const NO_BASMALA = new Set([1, 9]);

export const hasBasmala = (surahId: number) => !NO_BASMALA.has(surahId);
