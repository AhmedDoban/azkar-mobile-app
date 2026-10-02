import { ReactNode, useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { scheduleOnRN } from "react-native-worklets";
import usePopupColors from "../_components/usePopupColors";

const ROOT = { flex: 1, justifyContent: "flex-end" } as const;

export default function BottomSheet({
  visible,
  onClose,
  header,
  children,
  closeLabel,
}: {
  visible: boolean;
  onClose: () => void;
  header: ReactNode;
  children: ReactNode;
  closeLabel?: string;
}) {
  const c = usePopupColors();
  const insets = useSafeAreaInsets();
  const [mounted, setMounted] = useState(visible);
  const screenHeight = useWindowDimensions().height;
  const progress = useSharedValue(0);
  const drag = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      drag.set(0);
      progress.set(withTiming(1, { duration: 280 }));
    } else {
      progress.set(
        withTiming(0, { duration: 200 }, (finished) => {
          if (finished) scheduleOnRN(setMounted, false);
        }),
      );
    }
  }, [visible, progress, drag]);

  const backdropStyle = useAnimatedStyle(() => ({ opacity: progress.get() }));
  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: (1 - progress.get()) * screenHeight + drag.get() },
    ],
  }));

  const dragDown = Gesture.Pan()
    .activeOffsetY(8)
    .onUpdate((e) => {
      drag.set(Math.max(0, e.translationY));
    })
    .onEnd((e) => {
      if (e.translationY > 120 || e.velocityY > 900) {
        scheduleOnRN(onClose);
      } else {
        drag.set(withTiming(0, { duration: 180 }));
      }
    });

  return (
    <Modal
      visible={mounted}
      transparent
      animationType="none"
      statusBarTranslucent
      navigationBarTranslucent
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={ROOT}>
        <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
          <Pressable
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: "rgba(0,0,0,0.35)" },
            ]}
            onPress={onClose}
            accessibilityLabel={closeLabel}
          />
        </Animated.View>
        <Animated.View
          className="max-h-[85%] gap-3 rounded-t-3xl px-4 pt-4"
          style={[
            {
              backgroundColor: c.frameFill,
              paddingBottom: insets.bottom + 12,
            },
            sheetStyle,
          ]}
        >
          <GestureDetector gesture={dragDown}>
            <View>
              <View className="items-center pb-3">
                <View
                  className="h-1.5 w-11 rounded-full"
                  style={{ backgroundColor: c.frame }}
                />
              </View>
              {header}
            </View>
          </GestureDetector>
          {children}
        </Animated.View>
      </GestureHandlerRootView>
    </Modal>
  );
}
