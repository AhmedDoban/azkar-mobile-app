import type { ImageSourcePropType } from "react-native";
import { DEFAULT_PALETTE, PALETTE_IDS, PaletteId } from "./palettes";

export const APP_ICONS: Record<PaletteId, ImageSourcePropType> = {
  emerald: require("@/assets/images/app-icons/emerald.png"),
  teal: require("@/assets/images/app-icons/teal.png"),
  ocean: require("@/assets/images/app-icons/ocean.png"),
  indigo: require("@/assets/images/app-icons/indigo.png"),
  violet: require("@/assets/images/app-icons/violet.png"),
  rose: require("@/assets/images/app-icons/rose.png"),
  ruby: require("@/assets/images/app-icons/ruby.png"),
  amber: require("@/assets/images/app-icons/amber.png"),
  olive: require("@/assets/images/app-icons/olive.png"),
  slate: require("@/assets/images/app-icons/slate.png"),
};

export const iconAlias = (id: PaletteId) => id[0].toUpperCase() + id.slice(1);

export const ICON_ALIASES = [
  iconAlias(DEFAULT_PALETTE),
  ...PALETTE_IDS.filter((id) => id !== DEFAULT_PALETTE).map(iconAlias),
];

export const appIconName = (id: PaletteId) =>
  id === DEFAULT_PALETTE ? null : iconAlias(id);
