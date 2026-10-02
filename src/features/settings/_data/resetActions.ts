import type { IconKey } from "@/components/ui/Icon";

export type ResetKind =
  "cache" | "recitations" | "settings" | "progress" | "quran" | "all";

export const RESET_ACTIONS: {
  kind: ResetKind;
  icon: IconKey;
  label:
    | "clearCache"
    | "clearRecitations"
    | "resetSettings"
    | "resetProgress"
    | "resetQuran"
    | "resetAll";
  danger: boolean;
}[] = [
  { kind: "cache", icon: "clearCache", label: "clearCache", danger: false },
  {
    kind: "recitations",
    icon: "volume",
    label: "clearRecitations",
    danger: false,
  },
  {
    kind: "settings",
    icon: "resetSettings",
    label: "resetSettings",
    danger: false,
  },
  { kind: "progress", icon: "reset", label: "resetProgress", danger: true },
  { kind: "quran", icon: "bookmark", label: "resetQuran", danger: true },
  { kind: "all", icon: "resetAll", label: "resetAll", danger: true },
];

export const formatSize = (bytes: number, ar: boolean) => {
  const mb = bytes / (1024 * 1024);
  const text = mb >= 1 ? mb.toFixed(1) : (bytes / 1024).toFixed(0);
  const unit = mb >= 1 ? (ar ? "م.ب" : "MB") : ar ? "ك.ب" : "KB";
  return `${ar ? text.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]).replace(".", "٫") : text} ${unit}`;
};
