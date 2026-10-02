import AppText from "@/components/ui/AppText";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsIntro({ text }: { text: string }) {
  const palette = useSettingsColors();

  return (
    <AppText className="px-1 text-sm" style={{ color: palette.subtitle }}>
      {text}
    </AppText>
  );
}
