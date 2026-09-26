import AndroidTabBar from "@/components/AndroidTabBar";
import AdhanReminder from "@/features/prayer-times/AdhanReminder";
import useDirection from "@/hooks/useDirection";
import useSettingsSync from "@/hooks/useSettingsSync";
import useDailyReset from "@/hooks/useDailyReset";
import useTabBarColors from "@/hooks/useTabBarColors";
import useThemeColors from "@/hooks/useThemeColors";
import { useLocales } from "expo-localization";
import { LocaleProvider } from "expo-router";
import { Tabs, type BottomTabNavigationOptions } from "expo-router/js-tabs";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { StatusBar } from "expo-status-bar";
import { useTranslation } from "react-i18next";
import { Easing, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TABS = [
  {
    name: "(azkar)",
    label: "tabs.azkar",
    sf: { default: "book.closed", selected: "book.closed.fill" },
    md: "menu_book",
  },
  {
    name: "(hadith)",
    label: "tabs.hadith",
    sf: { default: "text.book.closed", selected: "text.book.closed.fill" },
    md: "auto_stories",
  },
  {
    name: "(qibla)",
    label: "tabs.qibla",
    sf: { default: "location.north.circle", selected: "location.north.circle.fill" },
    md: "explore",
  },
  {
    name: "(favorites)",
    label: "tabs.favorites",
    sf: { default: "heart", selected: "heart.fill" },
    md: "favorite",
  },
  {
    name: "(settings)",
    label: "tabs.settings",
    sf: { default: "gearshape", selected: "gearshape.fill" },
    md: "settings",
  },
] as const;

/**
 * Android tab switch: the old screen is gone within the first 40% of the
 * transition, then the new one fades in while rising a few pixels, so the two
 * never show half-transparent on top of each other
 */
const tabTransition: Pick<
  BottomTabNavigationOptions,
  "transitionSpec" | "sceneStyleInterpolator"
> = {
  transitionSpec: {
    animation: "timing",
    config: { duration: 180, easing: Easing.out(Easing.cubic) },
  },
  sceneStyleInterpolator: ({ current }) => ({
    sceneStyle: {
      opacity: current.progress.interpolate({
        inputRange: [-1, -0.4, 0, 0.4, 1],
        outputRange: [0, 0, 1, 0, 0],
      }),
      transform: [
        {
          translateY: current.progress.interpolate({
            inputRange: [-1, 0, 1],
            outputRange: [10, 0, 10],
          }),
        },
      ],
    },
  }),
};

/**
 * Native tab bar (Liquid Glass on iOS 26+) on iOS and web; on Android a JS tab
 * navigator with our own bar, since Material's bar can't take that shape
 */
export default function AppTabs() {
  useSettingsSync();
  useDailyReset();
  const { t } = useTranslation();
  const colors = useThemeColors();
  const { direction, isRTL } = useDirection();
  // Native tabs don't follow `direction`; Android's own bar is a row that does
  const tabs = isRTL ? [...TABS].reverse() : TABS;
  const tab = useTabBarColors();
  const systemDirection = useLocales()[0]?.textDirection ?? "ltr";
  const insets = useSafeAreaInsets();

  return (
    <LocaleProvider direction={systemDirection}>
      <View className="flex-1 bg-main-bg" style={{ direction }}>
        <StatusBar style={colors.isDark ? "light" : "dark"} hidden={false} />
        {Platform.OS === "android" ? (
          <Tabs
            screenOptions={{
              headerShown: false,
              ...tabTransition,
              // Hidden tabs stop re-rendering, so switching stays smooth
              freezeOnBlur: true,
              sceneStyle: { backgroundColor: colors.bg },
            }}
            tabBar={(props) => <AndroidTabBar {...props} tabs={TABS} />}
          >
            {TABS.map((tab) => (
              <Tabs.Screen key={tab.name} name={tab.name} />
            ))}
          </Tabs>
        ) : (
          <NativeTabs
            tintColor={tab.active}
            minimizeBehavior="onScrollDown"
            labelStyle={{
              default: { fontFamily: tab.font, color: tab.inactive },
              selected: {
                fontFamily: tab.font,
                // The web pill wraps the label, so it needs dark text on white
                color:
                  colors.isDark && Platform.OS === "web" ? "#000000" : tab.active,
              },
            }}
            iconColor={{
              default: tab.inactive,
              selected: tab.active,
            }}
          >
            {tabs.map((tab) => (
              <NativeTabs.Trigger key={tab.name} name={tab.name}>
                <NativeTabs.Trigger.Icon sf={tab.sf} md={tab.md} />
                <NativeTabs.Trigger.Label>
                  {t(tab.label)}
                </NativeTabs.Trigger.Label>
              </NativeTabs.Trigger>
            ))}
          </NativeTabs>
        )}
        {Platform.OS === "android" ? (
          // Edge-to-edge makes the status bar transparent: without a backing,
          // scrolled content runs under the clock and icons and hides them
          <View
            className="absolute inset-x-0 top-0 bg-main-bg"
            style={{ height: insets.top, pointerEvents: "none" }}
          />
        ) : null}
        <AdhanReminder />
      </View>
    </LocaleProvider>
  );
}
