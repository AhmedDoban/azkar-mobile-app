import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { endKhatma } from "@/store/Slices/SettingsSlice";
import { useAppDispatch } from "@/store/Store";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import KhatmaCard from "./KhatmaCard";

export default function KhatmaDone({ scopeLabel }: { scopeLabel: string }) {
  const { t } = useTranslation("azkar");
  const dispatch = useAppDispatch();

  return (
    <KhatmaCard>
      <View className="items-center gap-3 py-4">
        <Icon name="checkCircle" size={48} />
        <AppText weight="bold" className="text-center text-xl">
          {t("khatmaDone")}
        </AppText>
        <AppText className="text-center text-main-gray">{scopeLabel}</AppText>
      </View>
      <PressableScale
        onPress={() => dispatch(endKhatma())}
        className="items-center rounded-full bg-main-fill py-4"
      >
        <AppText weight="bold" className="text-on-fill">
          {t("khatmaNew")}
        </AppText>
      </PressableScale>
    </KhatmaCard>
  );
}
