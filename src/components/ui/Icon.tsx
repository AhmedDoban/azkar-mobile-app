import { SymbolView, SymbolViewProps } from "expo-symbols";

type IconName = Extract<SymbolViewProps["name"], object> & {
  ios: NonNullable<Extract<SymbolViewProps["name"], object>["ios"]>;
  android: NonNullable<Extract<SymbolViewProps["name"], object>["android"]>;
};

// SF Symbols on iOS, Material Symbols on Android/web
export const Icons = {
  sunrise: { ios: "sunrise.fill", android: "wb_sunny" },
  moon: { ios: "moon.stars.fill", android: "bedtime" },
  prayer: { ios: "hands.sparkles.fill", android: "self_improvement" },
  heart: { ios: "heart", android: "favorite_border" },
  heartFill: { ios: "heart.fill", android: "favorite" },
  share: { ios: "square.and.arrow.up", android: "share" },
  copy: { ios: "doc.on.doc", android: "content_copy" },
  check: { ios: "checkmark", android: "check" },
  checkCircle: { ios: "checkmark.circle.fill", android: "check_circle" },
  reset: { ios: "arrow.counterclockwise", android: "restart_alt" },
  chevronUpDown: { ios: "chevron.up.chevron.down", android: "unfold_more" },
  book: { ios: "book.closed.fill", android: "menu_book" },
  quote: { ios: "quote.opening", android: "format_quote" },
  wifiOff: { ios: "wifi.slash", android: "wifi_off" },
  search: { ios: "magnifyingglass", android: "search" },
  close: { ios: "xmark.circle.fill", android: "cancel" },
  location: { ios: "location.fill", android: "location_on" },
  bell: { ios: "bell.fill", android: "notifications_active" },
  // Theme picker
  themeSystem: { ios: "circle.lefthalf.filled", android: "contrast" },
  themeLight: { ios: "sun.max.fill", android: "light_mode" },
  themeDark: { ios: "moon.fill", android: "dark_mode" },
  bellSlash: { ios: "bell.slash", android: "notifications_off" },
  ring: { ios: "circle", android: "radio_button_unchecked" },
  dot: { ios: "circle.inset.filled", android: "radio_button_checked" },
  // One per prayer, for the "next prayer" header and the adhan screen
  fajr: { ios: "sun.haze.fill", android: "wb_twilight" },
  dhuhr: { ios: "sun.max.fill", android: "light_mode" },
  asr: { ios: "sun.min.fill", android: "wb_sunny" },
  maghrib: { ios: "sunset.fill", android: "wb_twilight" },
  isha: { ios: "moon.stars.fill", android: "bedtime" },
  clock: { ios: "clock.fill", android: "schedule" },
} satisfies Record<string, IconName>;

export type IconKey = keyof typeof Icons;

type Props = Omit<SymbolViewProps, "name"> & { name: IconKey };

export default function Icon({ name, size = 20, ...props }: Props) {
  const { ios, android } = Icons[name];
  // Web renders the same Material Symbols font as Android
  return (
    <SymbolView name={{ ios, android, web: android }} size={size} {...props} />
  );
}
