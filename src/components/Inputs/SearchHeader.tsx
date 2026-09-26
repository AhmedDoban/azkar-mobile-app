import { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import { useTranslation } from "react-i18next";
import useThemeColors from "@/hooks/useThemeColors";
import useDirection from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import AppText from "../ui/AppText";
import Icon from "../ui/Icon";
import PressableScale from "@/components/ui/PressableScale";

const hasGlass = isLiquidGlassAvailable();
const CIRCLE = 48;
// Critically damped springs: smooth macOS-style glide, no bounce or squash
const OPEN = { duration: 520, dampingRatio: 1 };
const CLOSE = { duration: 440, dampingRatio: 1 };
const clamp = Extrapolation.CLAMP;

type Props = Omit<TextInputProps, "onChangeText"> & {
  title: string;
  value: string;
  onChangeText: (text: string) => void;
};

/**
 * Tab page title with a glass search circle at the end of the row. Tapping the
 * circle grows it into a full-width glass input; closing clears and collapses.
 *
 * One progress value drives everything. The input keeps its full width and is
 * only revealed (clipped) as the glass grows, so nothing gets squeezed.
 */
export default function SearchHeader({
  title,
  value,
  onChangeText,
  onBlur,
  ...props
}: Props) {
  const { t } = useTranslation("common");
  const colors = useThemeColors();
  const { isRTL } = useDirection();
  const inputRef = useRef<TextInput>(null);
  const [open, setOpen] = useState(value.length > 0);
  const [fullWidth, setFullWidth] = useState(0);
  const progress = useSharedValue(open ? 1 : 0);

  useEffect(() => {
    progress.set(withSpring(open ? 1 : 0, open ? OPEN : CLOSE));
  }, [open, progress]);

  const openSearch = () => {
    setOpen(true);
    inputRef.current?.focus();
  };

  const close = () => {
    onChangeText("");
    inputRef.current?.blur();
    Keyboard.dismiss();
    setOpen(false);
  };

  const width = Math.max(fullWidth, CIRCLE);

  const glassStyle = useAnimatedStyle(() => ({
    width: interpolate(progress.get(), [0, 1], [CIRCLE, width], clamp),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0, 0.45], [1, 0], clamp),
    transform: [
      { scale: interpolate(progress.get(), [0, 1], [1, 0.94], clamp) },
    ],
  }));
  const circleIconStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0, 0.3], [1, 0], clamp),
    transform: [
      { scale: interpolate(progress.get(), [0, 0.3], [1, 0.7], clamp) },
    ],
  }));
  const inputStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.get(), [0.4, 1], [0, 1], clamp),
    transform: [
      { scale: interpolate(progress.get(), [0.4, 1], [0.97, 1], clamp) },
    ],
  }));

  return (
    <View
      className="h-12 flex-row items-center justify-end px-1"
      onLayout={(e) => setFullWidth(e.nativeEvent.layout.width - 8)}
    >
      <Animated.View
        pointerEvents="none"
        className="absolute bottom-0 end-16 start-1 top-0 justify-center"
        style={titleStyle}
      >
        <AppText
          weight="bold"
          className="text-3xl leading-[48px]"
          numberOfLines={1}
        >
          {title}
        </AppText>
      </Animated.View>

      <Animated.View
        className="h-12 overflow-hidden rounded-full"
        style={glassStyle}
      >
        {hasGlass ? (
          <GlassView
            style={StyleSheet.absoluteFill}
            glassEffectStyle="regular"
            isInteractive
            colorScheme={colors.isDark ? "dark" : "light"}
          />
        ) : (
          // Border on an overlay: on the container it would shrink the content
          // box and push the circle's icon off center
          <View
            style={StyleSheet.absoluteFill}
            className="rounded-full border border-line bg-surface"
          />
        )}

        {/* Fixed full width, pinned to the end: the growing glass reveals it */}
        <Animated.View
          pointerEvents={open ? "auto" : "none"}
          className="absolute bottom-0 end-0 top-0 flex-row items-center gap-2 px-4"
          style={[{ width }, inputStyle]}
        >
          <Icon name="search" size={20} tintColor={colors.gray} />
          <TextInput
            ref={inputRef}
            value={value}
            onChangeText={onChangeText}
            placeholderTextColor={colors.gray}
            selectionColor={colors.main}
            cursorColor={colors.main}
            keyboardAppearance={colors.isDark ? "dark" : "light"}
            returnKeyType="search"
            autoCorrect={false}
            onBlur={(e) => {
              // Nothing typed: fold back into the circle
              if (!value.trim()) setOpen(false);
              onBlur?.(e);
            }}
            className={cn(
              "h-full flex-1 text-base text-ink",
              isRTL ? "font-lama" : "font-space",
            )}
            style={{ writingDirection: isRTL ? "rtl" : "ltr" }}
            {...props}
          />
          <PressableScale
            hitSlop={10}
            onPress={close}
            accessibilityRole="button"
            accessibilityLabel={t("clear")}
          >
            <Icon name="close" size={20} tintColor={colors.gray} />
          </PressableScale>
        </Animated.View>

        <Animated.View
          pointerEvents={open ? "none" : "auto"}
          className="absolute end-0 top-0"
          style={[{ width: CIRCLE, height: CIRCLE }, circleIconStyle]}
        >
          <PressableScale
            onPress={openSearch}
            accessibilityRole="button"
            accessibilityLabel={t("search")}
            className="flex-1 items-center justify-center"
          >
            <Icon
              name="search"
              size={22}
              tintColor={colors.main}
              style={{ width: 22, height: 22 }}
            />
          </PressableScale>
        </Animated.View>
      </Animated.View>
    </View>
  );
}
