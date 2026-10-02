import { AzkarCategory, Zikr } from "@/features/azkar/_data";
import { LocalHadith } from "@/features/hadith/_data";
import { DorarHadith } from "@/features/hadith/_components/parseDorar";

export type FavoriteRowData = { key: string; first: boolean } & (
  | { kind: "title"; title: string }
  | { kind: "zikr"; categoryId: string; zikr: Zikr }
  | { kind: "dorar"; hadith: DorarHadith }
  | { kind: "local"; hadith: LocalHadith }
  | { kind: "categories"; categories: AzkarCategory[] }
);
