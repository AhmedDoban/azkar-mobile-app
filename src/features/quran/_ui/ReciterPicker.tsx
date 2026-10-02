import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import { setReciter } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import BottomSheet from "./BottomSheet";
import usePopupColors from "../_components/usePopupColors";
import { RECITERS } from "../_data/reciters";

export default function ReciterPicker({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { t, i18n } = useTranslation("azkar");
  const c = usePopupColors();
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.settings.reciter);
  const ar = i18n.language === "ar";
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = q
    ? RECITERS.filter((r) => r.ar.includes(q) || r.en.toLowerCase().includes(q))
    : RECITERS;

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      closeLabel={t("close")}
      header={
        <View className="flex-row items-center px-1 pb-1">
          <View className="flex-1" />
          <AppText weight="bold" className="text-lg" style={{ color: c.ink }}>
            {t("chooseReciter")}
          </AppText>
          <View className="flex-1 items-end">
            <PressableScale
              onPress={onClose}
              accessibilityLabel={t("close")}
              className="size-9 items-center justify-center rounded-full"
              style={{ backgroundColor: c.frame }}
            >
              <Icon name="close" size={16} tintColor={c.ink} />
            </PressableScale>
          </View>
        </View>
      }
    >
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder={t("searchReciter")}
        placeholderTextColor={c.gold}
        className="rounded-2xl border px-4 py-3"
        style={{
          borderColor: c.frame,
          backgroundColor: c.page,
          color: c.ink,
          fontFamily: "LamaSans",
          textAlign: ar ? "right" : "left",
        }}
      />
      <ScrollView
        contentContainerClassName="gap-2 pb-3"
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {list.map((reciter) => {
          const selected = reciter.id === current;
          return (
            <PressableScale
              key={reciter.id}
              scaleTo={0.98}
              onPress={() => {
                Haptics.selectionAsync();
                dispatch(setReciter(reciter.id));
                onClose();
              }}
              className="flex-row items-center justify-between rounded-2xl border px-4 py-3"
              style={{
                borderColor: selected ? c.accent : c.frame,
                backgroundColor: selected ? c.highlight : c.page,
              }}
            >
              <AppText weight={selected ? "bold" : "regular"}>
                {ar ? reciter.ar : reciter.en}
              </AppText>
              {selected ? (
                <Icon name="check" size={18} tintColor={c.accent} />
              ) : null}
            </PressableScale>
          );
        })}
      </ScrollView>
    </BottomSheet>
  );
}
