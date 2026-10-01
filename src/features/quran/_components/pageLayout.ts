export const PAGE = {
  paddingX: 20,
  paddingTop: 10,
  paddingBottom: 12,
  gap: 12,
  topRow: 24,
  banner: 64,
  basmala: 44,
  footer: 48,
};

export const lineHeightFor = (fontSize: number) => Math.round(fontSize * 2.05);

const NO_BASMALA = new Set([1, 9]);

export const hasBasmala = (surahId: number) => !NO_BASMALA.has(surahId);

export const contentHeight = (height: number) =>
  height -
  PAGE.paddingTop -
  PAGE.paddingBottom -
  PAGE.topRow -
  PAGE.footer -
  PAGE.gap * 2;

export const headerHeight = (surahId: number, first: boolean) =>
  (first ? 0 : PAGE.gap) +
  PAGE.banner +
  PAGE.gap +
  (hasBasmala(surahId) ? PAGE.basmala + PAGE.gap : 0);
