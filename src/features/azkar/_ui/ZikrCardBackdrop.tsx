import { memo, useMemo, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from "react-native-svg";
import rosette from "../_data/rosette";

const BORDER = 1;

const ROSETTE = rosette([40, 22]);

const FILL = [StyleSheet.absoluteFill, { pointerEvents: "none" as const }];

export default memo(function ZikrCardBackdrop({
  top,
  bottom,
  wave,
  ornament,
  rtl,
}: {
  top: string;
  bottom: string;
  wave: string;
  ornament: string;
  rtl: boolean;
}) {
  const [size, setSize] = useState({ width: 0, height: 0 });

  const onLayout = (e: LayoutChangeEvent) => {
    const width = e.nativeEvent.layout.width + BORDER * 2;
    const height = e.nativeEvent.layout.height + BORDER * 2;
    setSize((old) =>
      old.width === width && old.height === height ? old : { width, height },
    );
  };

  const { width, height } = size;
  const waves = useMemo(() => {
    const start = Math.max(height * 0.6, height - 84);
    return {
      back: `M 0 ${start + 14} C ${width * 0.3} ${start - 10}, ${width * 0.62} ${start + 26}, ${width} ${start - 4} L ${width} ${height} L 0 ${height} Z`,
      front: `M 0 ${start + 30} C ${width * 0.35} ${start + 8}, ${width * 0.7} ${start + 40}, ${width} ${start + 16} L ${width} ${height} L 0 ${height} Z`,
    };
  }, [width, height]);

  return (
    <View style={FILL} onLayout={onLayout}>
      {width > 0 ? (
        <Svg width={width} height={height} style={FILL}>
          <Defs>
            <LinearGradient id="zikrFade" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0" stopColor={top} />
              <Stop offset="1" stopColor={bottom} />
            </LinearGradient>
          </Defs>
          <Rect width={width} height={height} fill="url(#zikrFade)" />
          <Path d={waves.back} fill={wave} opacity={0.35} />
          <Path d={waves.front} fill={wave} opacity={0.6} />
          <Path
            d={ROSETTE}
            x={rtl ? 0 : width}
            fill="none"
            stroke={ornament}
            strokeWidth={1}
            opacity={0.08}
          />
        </Svg>
      ) : null}
    </View>
  );
});
