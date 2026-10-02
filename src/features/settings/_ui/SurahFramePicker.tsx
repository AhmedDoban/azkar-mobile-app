import PressableScale from "@/components/ui/PressableScale";
import useFrameSvg from "@/features/quran/_components/useFrameSvg";
import useMushafColors from "@/features/quran/_components/useMushafColors";
import { FRAME_COUNT } from "@/features/quran/_data/frameSvgs";
import useThemeColors from "@/hooks/useThemeColors";
import { setSurahFrame } from "@/store/Slices/SettingsSlice";
import { useAppDispatch, useAppSelector } from "@/store/Store";
import * as Haptics from "expo-haptics";
import { memo } from "react";
import { ActivityIndicator, View } from "react-native";
import Svg, { G } from "react-native-svg";

const FramePreview = memo(function FramePreview({
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

export default function SurahFramePicker() {
  const dispatch = useAppDispatch();
  const current = useAppSelector((s) => s.settings.surahFrame);

  const choose = (id: number) => {
    Haptics.selectionAsync();
    dispatch(setSurahFrame(id));
  };

  return (
    <View className="gap-3">
      {Array.from({ length: FRAME_COUNT }, (_, i) => i + 1).map((id) => (
        <FramePreview
          key={id}
          id={id}
          selected={id === current}
          onPress={choose}
        />
      ))}
    </View>
  );
}
