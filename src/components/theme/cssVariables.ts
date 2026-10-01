import { ThemeColors } from "@/constants/Colors";

const toCssVariables = (c: ThemeColors) => ({
  "--main-color": c.main,
  "--main-fill-color": c.mainFill,
  "--on-fill-color": c.onFill,
  "--hero-color": c.hero,
  "--on-hero-color": c.onHero,
  "--on-hero-muted-color": c.onHeroMuted,
  "--hero-blob-color": c.heroBlob,
  "--hero-border-color": c.heroBorder,
  "--main-bg-color": c.bg,
  "--main-gray-color": c.gray,
  "--main-orange-color": c.orange,
  "--main-yellow-color": c.yellow,
  "--main-surface-color": c.surface,
  "--main-surface-muted-color": c.surfaceMuted,
  "--main-line-color": c.line,
  "--main-p-color": c.ink,
  "--main-error-color": c.error,
  "--main-soft-color": c.mainSoft,
  "--accent-color": c.accent,
  "--accent-soft-color": c.accentSoft,
  "--main-border-color": c.mainBorder,
  "--main-orange-soft-color": c.orangeSoft,
});

export default toCssVariables;
