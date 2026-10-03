import EmptyState from "@/components/ui/EmptyState";
import Screen from "@/components/ui/Screen";
import Skeleton from "@/components/ui/Skeleton";
import useTransitionReady from "@/hooks/useTransitionReady";
import { Stack } from "expo-router";
import type { ComponentType } from "react";
import { useTranslation } from "react-i18next";
import {
  isSettingsSection,
  SETTINGS_SECTIONS,
  SettingsSectionId,
} from "./_data/sections";
import AdhanSection from "./_sections/AdhanSection";
import AppearanceSection from "./_sections/AppearanceSection";
import DataSection from "./_sections/DataSection";
import LanguageSection from "./_sections/LanguageSection";
import PrayerSection from "./_sections/PrayerSection";
import ReadingSection from "./_sections/ReadingSection";
import RemindersSection from "./_sections/RemindersSection";
import SourcesSection from "./_sections/SourcesSection";
import SurahFrameSection from "./_sections/SurahFrameSection";

const CONTENT: Record<SettingsSectionId, ComponentType> = {
  language: LanguageSection,
  appearance: AppearanceSection,
  prayer: PrayerSection,
  adhan: AdhanSection,
  reminders: RemindersSection,
  reading: ReadingSection,
  surahFrame: SurahFrameSection,
  data: DataSection,
  sources: SourcesSection,
};

export default function SettingsSection({ id }: { id: string }) {
  const { t } = useTranslation(["settings", "common"]);
  const ready = useTransitionReady();
  if (!isSettingsSection(id)) {
    return <EmptyState icon="tabSettings" title={t("common:somethingWrong")} />;
  }

  const section = SETTINGS_SECTIONS.find((s) => s.id === id)!;
  const Content = CONTENT[id];

  return (
    <Screen>
      <Stack.Screen options={{ title: t(section.title) }} />
      {ready ? <Content /> : <Skeleton className="h-40 rounded-3xl" />}
    </Screen>
  );
}
