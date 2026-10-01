import SettingsSection from "@/features/settings/SettingsSection";
import { useLocalSearchParams } from "expo-router";

export default function SettingsSectionPage() {
  const { section } = useLocalSearchParams<{ section: string }>();
  return <SettingsSection id={section} />;
}
