import useThemeColors from "@/hooks/useThemeColors";
import { Stack } from "expo-router";
import { Platform, View } from "react-native";
import HeaderTitle from "./ui/HeaderTitle";

const TAB_ROOTS = ["index", "hadith", "quran", "qibla", "settings"];

const renderHeaderTitle = ({ children }: { children: string }) => (
  <HeaderTitle>{children}</HeaderTitle>
);

export default function StackLayout() {
  const colors = useThemeColors();

  const stack = (
    <Stack
      screenOptions={({ route }) => ({
        headerShown: !TAB_ROOTS.includes(route.name),
        headerShadowVisible: false,
        headerTintColor: colors.isDark ? "#ffffff" : colors.main,
        headerTitle: renderHeaderTitle,
        headerStyle: { backgroundColor: colors.bg },
        headerBackButtonDisplayMode: "minimal",
        contentStyle: { backgroundColor: colors.bg },
      })}
    />
  );

  if (Platform.OS === "web") {
    return (
      <View style={{ flex: 1, paddingTop: 80, backgroundColor: colors.bg }}>
        {stack}
      </View>
    );
  }

  return stack;
}
