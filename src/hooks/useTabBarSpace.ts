import { Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useTabBarSpace() {
  const insets = useSafeAreaInsets();
  return Platform.OS === "ios" ? insets.bottom + 52 : 0;
}
