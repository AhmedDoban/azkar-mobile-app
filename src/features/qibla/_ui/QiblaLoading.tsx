import AppText from "@/components/ui/AppText";
import useThemeColors from "@/hooks/useThemeColors";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, View } from "react-native";

export default function QiblaLoading() {
  const { t } = useTranslation("qibla");
  const colors = useThemeColors();

  return (
    <View className="items-center gap-3 py-24">
      <ActivityIndicator color={colors.main} />
      <AppText className="text-main-gray">{t("locating")}</AppText>
    </View>
  );
}
