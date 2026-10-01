import GlassSlider from "@/components/Inputs/GlassSlider";
import AppText from "@/components/ui/AppText";
import { toArabicDigits } from "@/features/azkar/_data/quran";
import { lineHeightFor } from "@/features/quran/_components/pageLayout";
import useDirection from "@/hooks/useDirection";
import { QURAN_SIZE, setQuranSize } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import useSettingsColors from "../_components/useSettingsColors";

export default function QuranSizeSetting() {
  const { t } = useTranslation("settings");
  const dispatch = useAppDispatch();
  const palette = useSettingsColors();
  const { isRTL } = useDirection();
  const saved = useAppSelector((s) => s.settings.quranSize);
  const [size, setSize] = useState(saved);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => setSize(saved), [saved]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const change = (value: number) => {
    setSize(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => dispatch(setQuranSize(value)), 300);
  };

  return (
    <>
      <View className="flex-row items-center gap-3">
        <AppText
          variant="quran"
          className="text-sm"
          style={{ color: palette.subtitle }}
        >
          ق
        </AppText>
        <View className="flex-1">
          <GlassSlider
            value={size}
            min={QURAN_SIZE.min}
            max={QURAN_SIZE.max}
            step={QURAN_SIZE.step}
            rtl={isRTL}
            onChange={change}
            accessibilityLabel={t("quranSize")}
          />
        </View>
        <AppText
          variant="quran"
          className="text-2xl"
          style={{ color: palette.subtitle }}
        >
          ق
        </AppText>
      </View>
      <View className="flex-row items-center justify-between gap-3">
        <AppText
          variant="quran"
          className="flex-1"
          style={{
            fontSize: size,
            lineHeight: lineHeightFor(size),
          }}
          numberOfLines={2}
        >
          {`ٱلْحَمْدُ لِلَّهِ رَبِّ ٱلْعَٰلَمِينَ ۝${toArabicDigits(2)}`}
        </AppText>
        <View className="rounded-full bg-accent-soft px-3 py-1">
          <AppText weight="bold" className="text-sm text-accent">
            {size}
          </AppText>
        </View>
      </View>
    </>
  );
}
