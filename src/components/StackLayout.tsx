import { Platform, View } from "react-native";
import { Stack } from "expo-router";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import useThemeColors from "@/hooks/useThemeColors";
import HeaderTitle from "./ui/HeaderTitle";

const isIOS = Platform.OS === "ios";
const hasGlass = isLiquidGlassAvailable();

/**
 * Per-tab stack. Tab screens hide the native header and draw their own title
 * (PageHeader); pushed screens keep it for the back button. Its title is
 * rendered by React Native (HeaderTitle): the native bar breaks Arabic shaping.
 */
export default function StackLayout() {
  const colors = useThemeColors();

  const stack = (
    <Stack
      screenOptions={{
        headerTransparent: isIOS,
        // Before iOS 26 there is no glass; blur so content doesn't show through
        headerBlurEffect:
          isIOS && !hasGlass
            ? colors.isDark
              ? "systemChromeMaterialDark"
              : "systemChromeMaterialLight"
            : undefined,
        headerShadowVisible: false,
        headerTintColor: colors.main,
        headerTitle: ({ children }) => <HeaderTitle>{children}</HeaderTitle>,
        headerStyle: isIOS ? undefined : { backgroundColor: colors.bg },
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: colors.bg },
      }}
    />
  );

  // On web the tab bar floats over the top of the page; keep content below it
  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, paddingTop: 80, backgroundColor: colors.bg }}>
        {stack}
      </View>
    );
  }

  return stack;
}
