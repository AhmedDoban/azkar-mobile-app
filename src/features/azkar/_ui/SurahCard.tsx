import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import useThemeColors from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { View } from "react-native";

export default function SurahCard({
  surahId,
  title,
  subtitle,
}: {
  surahId: number;
  title: string;
  subtitle: string;
}) {
  const colors = useThemeColors();

  return (
    <Link href={`/surah/${surahId}`} asChild>
      <PressableScale className="flex-1 justify-center rounded-3xl bg-main-soft p-4">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 gap-1">
            <AppText
              weight="bold"
              className="text-base leading-6"
              numberOfLines={2}
            >
              {title}
            </AppText>
            <AppText className="text-xs text-main-gray">{subtitle}</AppText>
          </View>
          <View
            className="size-10 items-center justify-center rounded-full"
            style={{ backgroundColor: colors.surface }}
          >
            <Icon name="quran" size={20} tintColor={colors.main} />
          </View>
        </View>
      </PressableScale>
    </Link>
  );
}
