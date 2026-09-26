import { View } from "react-native";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";

/** Quiet opening line under the search bar: the verse and a short greeting */
export default function GreetingCard() {
  const { t } = useTranslation("azkar");

  return (
    <View className="items-center">
      <AppText
        variant="quran"
        weight="bold"
        className="text-2xl leading-[44px] text-main"
        style={{ textAlign: "center" }}
      >
        ﴿فَاذْكُرُونِي أَذْكُرْكُمْ﴾
      </AppText>
      <AppText
        className="text-xs text-main-gray"
        style={{ textAlign: "center" }}
      >
        {t("greeting")}
      </AppText>
    </View>
  );
}
