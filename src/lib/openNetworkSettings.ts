import { Linking, Platform } from "react-native";

export default function openNetworkSettings() {
  if (Platform.OS === "android") {
    Linking.sendIntent("android.settings.WIFI_SETTINGS").catch(() =>
      Linking.openSettings(),
    );
    return;
  }
  Linking.openSettings();
}
