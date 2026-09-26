import AppTabs from "@/components/AppTabs";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "@/css/global.css";
import useAppFonts from "@/hooks/useAppFonts";
import "@/i18n";
import StoreProvider from "@/store/StoreProvider";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useCallback } from "react";

SplashScreen.preventAutoHideAsync();

// Tabs are listed in reverse for Arabic; Azkar must stay the tab that opens first
export const unstable_settings = { initialRouteName: "(azkar)" };

export default function RootLayout() {
  const fontsReady = useAppFonts();
  const onStoreReady = useCallback(() => SplashScreen.hideAsync(), []);

  if (!fontsReady) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StoreProvider onReady={onStoreReady}>
        <ThemeProvider>
          <AppTabs />
        </ThemeProvider>
      </StoreProvider>
    </GestureHandlerRootView>
  );
}
