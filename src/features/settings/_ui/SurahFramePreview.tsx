import PressableScale from "@/components/ui/PressableScale";
import useFrameSvg from "@/features/quran/_components/useFrameSvg";
import useMushafColors from "@/features/quran/_components/useMushafColors";
import useThemeColors from "@/hooks/useThemeColors";
import { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import Svg, { G } from "react-native-svg";

export default memo(function SurahFramePreview({
  id,
  selected,
  onPress,
}: {
  id: number;
  selected: boolean;
  onPress: (id: number) => void;
}) {
  const colors = useThemeColors();
  const mushaf = useMushafColors();
  const frame = useFrameSvg(id);

  return (
    <PressableScale
      scaleTo={0.97}
      onPress={() => onPress(id)}
      accessibilityState={{ selected }}
      className="rounded-2xl border-2 px-3 py-2"
      style={{
        borderColor: selected ? colors.main : "transparent",
        backgroundColor: mushaf.page,
      }}
    >
      <View
        style={{ aspectRatio: 6.4 }}
        className="items-center justify-center"
      >
        {frame ? (
          <Svg
            width="100%"
            height="100%"
            viewBox={`${frame.x} ${frame.y} ${frame.width} ${frame.height}`}
          >
            <G>{frame.content}</G>
          </Svg>
        ) : (
          <ActivityIndicator color={mushaf.gold} />
        )}
      </View>
    </PressableScale>
  );
});
