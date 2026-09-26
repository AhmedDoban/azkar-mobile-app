import { Modal, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTranslation } from "react-i18next";
import AppText from "@/components/ui/AppText";
import Icon from "@/components/ui/Icon";
import useDirection from "@/hooks/useDirection";
import useThemeColors from "@/hooks/useThemeColors";
import { ThemeScope } from "@/components/theme/ThemeProvider";
import { PrayerName } from "./_data/types";
import usePrayerLabels from "./_components/usePrayerLabels";
import AdhanBackdrop from "./_ui/adhan/AdhanBackdrop";
import Lantern from "./_ui/adhan/Lantern";
import CrescentDivider from "./_ui/adhan/CrescentDivider";
import { ADHAN_PALETTE } from "./_ui/adhan/palette";
import PressableScale from "@/components/ui/PressableScale";

/**
 * Full-screen "time for adhan" screen, shown when a reminded prayer begins:
 * hanging lanterns, an arch framing a glowing mosque, then the prayer name.
 */
export default function AdhanSplash({
  prayer,
  time,
  onClose,
}: {
  prayer: PrayerName | null;
  time?: string;
  onClose: () => void;
}) {
  const { t } = useTranslation("prayer");
  const { isDark } = useThemeColors();
  const { direction } = useDirection();
  const insets = useSafeAreaInsets();
  const { label, formatTime } = usePrayerLabels();
  const p = ADHAN_PALETTE[isDark ? "dark" : "light"];

  return (
    <Modal
      visible={prayer !== null}
      animationType="fade"
      statusBarTranslucent
      onRequestClose={onClose}
    >
      <ThemeScope>
        {prayer && (
          <View
            className="flex-1"
            style={{ direction, backgroundColor: p.bgBottom }}
          >
            <AdhanBackdrop palette={p} />

            {/* Lanterns hang from the top edge, the pairs mirrored left and right */}
            <Lantern palette={p} left={20} length={insets.top + 24} />
            <Lantern
              palette={p}
              left={64}
              length={insets.top + 78}
              size={0.8}
              delay={500}
            />
            <Lantern
              palette={p}
              right={20}
              length={insets.top + 56}
              delay={250}
            />
            <Lantern
              palette={p}
              right={66}
              length={insets.top + 12}
              size={0.75}
              delay={750}
            />

            {/* Heading inside the arch, where the reference puts its title */}
            <Animated.View
              entering={FadeInDown.duration(600)}
              style={{ marginTop: insets.top + 150 }}
            >
              <AppText
                weight="bold"
                className="font-amiri-bold text-3xl leading-[48px]"
                style={{ textAlign: "center", color: p.text }}
              >
                {t("adhanTime")}
              </AppText>
            </Animated.View>

            <View className="flex-1" />

            <Animated.View
              entering={FadeInDown.delay(250).duration(700)}
              className="items-center gap-4 px-6"
              style={{ paddingBottom: insets.bottom + 28 }}
            >
              <CrescentDivider color={p.text} />
              <AppText
                weight="bold"
                className="font-amiri-bold text-5xl leading-[72px]"
                style={{ textAlign: "center", color: p.text }}
              >
                {label(prayer)}
              </AppText>
              <AppText
                className="text-base leading-6"
                style={{ textAlign: "center", color: p.textMuted }}
              >
                {time ? `${formatTime(time)} · ` : ""}
                {t("adhanCall")}
              </AppText>

              <PressableScale
                onPress={onClose}
                className="mt-3 w-full flex-row items-center justify-center gap-2 rounded-full py-4"
                style={{ backgroundColor: p.button }}
              >
                <Icon name="bell" size={16} tintColor={p.buttonText} />
                <AppText
                  weight="bold"
                  className="text-lg"
                  style={{ color: p.buttonText }}
                >
                  {t("dismiss")}
                </AppText>
              </PressableScale>
            </Animated.View>
          </View>
        )}
      </ThemeScope>
    </Modal>
  );
}
