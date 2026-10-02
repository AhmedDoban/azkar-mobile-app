import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { startKhatma } from "@/store/Slices/SettingsSlice";
import { useAppDispatch } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useLocalDigits from "../_components/useLocalDigits";
import { pageCount } from "../_data/khatma";
import JuzPicker from "./JuzPicker";
import KhatmaCard from "./KhatmaCard";
import KhatmaChoice from "./KhatmaChoice";
import KhatmaJuzField from "./KhatmaJuzField";
import KhatmaStepper from "./KhatmaStepper";

export default function KhatmaSetup() {
  const { t } = useTranslation("azkar");
  const dispatch = useAppDispatch();
  const num = useLocalDigits();

  const [picking, setPicking] = useState<"from" | "to" | null>(null);
  const [scope, setScope] = useState<"all" | "juz">("all");
  const [fromJuz, setFromJuz] = useState(1);
  const [toJuz, setToJuz] = useState(30);
  const [mode, setMode] = useState<"days" | "pages">("days");
  const [days, setDays] = useState(30);
  const [perDay, setPerDay] = useState(20);

  const range =
    scope === "all" ? { from: 1, to: 30 } : { from: fromJuz, to: toJuz };
  const pages = pageCount(range.from, range.to);
  const totalDays =
    mode === "days" ? Math.min(days, pages) : Math.ceil(pages / perDay);
  const daily = Math.ceil(pages / totalDays);

  const start = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    dispatch(
      startKhatma({ fromJuz: range.from, toJuz: range.to, days: totalDays }),
    );
  };

  return (
    <View className="gap-4">
      <KhatmaCard>
        <AppText weight="bold" className="text-lg">
          {t("khatmaWhat")}
        </AppText>
        <KhatmaChoice
          value={scope}
          onChange={setScope}
          options={[
            { value: "all", label: t("khatmaWhole") },
            { value: "juz", label: t("khatmaJuzRange") },
          ]}
        />
        {scope === "juz" ? (
          <View className="flex-row gap-3">
            <KhatmaJuzField
              label={t("khatmaFromJuz")}
              value={num(fromJuz)}
              onPress={() => setPicking("from")}
            />
            <KhatmaJuzField
              label={t("khatmaToJuz")}
              value={num(toJuz)}
              onPress={() => setPicking("to")}
            />
          </View>
        ) : null}
        <JuzPicker
          visible={picking !== null}
          title={picking === "to" ? t("khatmaToJuz") : t("khatmaFromJuz")}
          value={picking === "to" ? toJuz : fromJuz}
          min={picking === "to" ? fromJuz : 1}
          max={picking === "to" ? 30 : toJuz}
          onSelect={(juz) =>
            picking === "to" ? setToJuz(juz) : setFromJuz(juz)
          }
          onClose={() => setPicking(null)}
        />
      </KhatmaCard>

      <KhatmaCard>
        <AppText weight="bold" className="text-lg">
          {t("khatmaHow")}
        </AppText>
        <KhatmaChoice
          value={mode}
          onChange={setMode}
          options={[
            { value: "days", label: t("khatmaByDays") },
            { value: "pages", label: t("khatmaByWird") },
          ]}
        />
        {mode === "days" ? (
          <KhatmaStepper
            label={t("khatmaDaysLabel")}
            value={Math.min(days, pages)}
            min={1}
            max={Math.min(365, pages)}
            onChange={setDays}
            format={num}
          />
        ) : (
          <KhatmaStepper
            label={t("khatmaPagesLabel")}
            value={Math.min(perDay, pages)}
            min={1}
            max={pages}
            onChange={setPerDay}
            format={num}
          />
        )}
        <View className="rounded-2xl bg-main-soft px-4 py-3">
          <AppText className="text-center text-main">
            {t("khatmaPreview", {
              pages: num(daily),
              days: num(totalDays),
              total: num(pages),
            })}
          </AppText>
        </View>
      </KhatmaCard>

      <PressableScale
        onPress={start}
        className="items-center rounded-full bg-main-fill py-4"
      >
        <AppText weight="bold" className="text-lg text-on-fill">
          {t("khatmaStart")}
        </AppText>
      </PressableScale>
    </View>
  );
}
