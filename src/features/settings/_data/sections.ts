import type { IconKey } from "@/components/ui/Icon";

export const SETTINGS_SECTIONS = [
  { id: "language", icon: "translate", title: "language", group: "general" },
  { id: "appearance", icon: "paint", title: "appearance", group: "general" },
  { id: "reading", icon: "textFont", title: "reading", group: "general" },
  {
    id: "prayer",
    icon: "personPraying",
    title: "prayerTimes",
    group: "worship",
  },
  { id: "adhan", icon: "volume", title: "adhanSound", group: "worship" },
  { id: "data", icon: "data", title: "data", group: "data" },
] as const satisfies readonly {
  id: string;
  icon: IconKey;
  title: string;
  group: string;
}[];

export type SettingsSectionId = (typeof SETTINGS_SECTIONS)[number]["id"];
export type SettingsGroupId = (typeof SETTINGS_SECTIONS)[number]["group"];

export const SETTINGS_GROUPS: SettingsGroupId[] = [
  "general",
  "worship",
  "data",
];

export const isSettingsSection = (value: unknown): value is SettingsSectionId =>
  SETTINGS_SECTIONS.some((section) => section.id === value);
