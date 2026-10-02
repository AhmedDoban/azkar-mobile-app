import AppText from "@/components/ui/AppText";
import useSettingsColors from "../_components/useSettingsColors";

export default function SettingsGroupTitle({ title }: { title: string }) {
  const palette = useSettingsColors();

  return (
    <AppText
      weight="bold"
      className="px-1 text-sm uppercase"
      style={{ color: palette.title }}
    >
      {title}
    </AppText>
  );
}
