import { useFonts } from "expo-font";

export default function useAppFonts() {
  const [loaded, error] = useFonts({
    SpaceGrotesk: require("@/assets/fonts/SpaceGrotesk-Regular.ttf"),
    "SpaceGrotesk-Bold": require("@/assets/fonts/SpaceGrotesk-Bold.ttf"),
    LamaSans: require("@/assets/fonts/LamaSans-Regular.ttf"),
    "LamaSans-ExtraBold": require("@/assets/fonts/LamaSans-ExtraBold.ttf"),
    Hafs: require("@/assets/fonts/Hafs.ttf"),
  });

  return loaded || !!error;
}
