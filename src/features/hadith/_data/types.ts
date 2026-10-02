import { Locale } from "@/i18n/config";

export interface HadithContent {
  source: string;
  chapter: string;
  text: string;
}

export interface LocalHadith extends Record<Locale, HadithContent> {
  id: string;
  number: number;
}
