import { useRef, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import Animated, { Easing, Keyframe } from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { GlassView, isLiquidGlassAvailable } from "expo-glass-effect";
import useThemeColors from "@/hooks/useThemeColors";
import useDirection from "@/hooks/useDirection";
import { ThemeScope } from "@/components/theme/ThemeProvider";
import { cn } from "@/lib/utils";
import AppText from "../ui/AppText";
import Icon from "../ui/Icon";
import DropdownTrigger, { DropdownProps } from "./DropdownTrigger";

const hasGlass = isLiquidGlassAvailable();
const MENU_WIDTH = 220;
const GAP = 8;

// iOS-style menu motion: a quick eased fade + scale from the row's corner, no bounce
const menuIn = new Keyframe({
  0: { opacity: 0, transform: [{ scale: 0.9 }] },
  100: {
    opacity: 1,
    transform: [{ scale: 1 }],
    easing: Easing.out(Easing.cubic),
  },
}).duration(180);
const menuOut = new Keyframe({
  0: { opacity: 1, transform: [{ scale: 1 }] },
  100: {
    opacity: 0,
    transform: [{ scale: 0.95 }],
    easing: Easing.in(Easing.quad),
  },
}).duration(120);

/**
 * Android / web dropdown (iOS uses the native menu, GlassDropdown.ios.tsx):
 * a row showing the current choice that opens a frosted menu anchored under
 * it, on its end side. Tap outside to close.
 */
export default function GlassDropdown<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: DropdownProps<T>) {
  const colors = useThemeColors();
  const { isRTL, direction } = useDirection();
  const { width: screenW } = useWindowDimensions();
  const trigger = useRef<View>(null);
  const [anchor, setAnchor] = useState<{
    x: number;
    y: number;
    w: number;
    h: number;
  } | null>(null);

  const current = options.find((o) => o.value === value) ?? options[0];

  const open = () => {
    trigger.current?.measureInWindow((x, y, w, h) => {
      Haptics.selectionAsync();
      setAnchor({ x, y, w, h });
    });
  };
  const close = () => setAnchor(null);

  // Menu hangs under the trigger, aligned to its end (right in LTR, left in RTL)
  const menuLeft = anchor
    ? Math.min(
        Math.max(12, isRTL ? anchor.x : anchor.x + anchor.w - MENU_WIDTH),
        screenW - MENU_WIDTH - 12,
      )
    : 0;

  return (
    <>
      <Pressable
        ref={trigger}
        onPress={open}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityValue={{ text: current.label }}
        accessibilityState={{ expanded: anchor !== null }}
        // Plain Pressable (the ref measures it); `active:` classes don't fire here
        style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1 })}
      >
        <DropdownTrigger icon={current.icon} label={current.label} />
      </Pressable>

      <Modal
        visible={anchor !== null}
        transparent
        animationType="none"
        onRequestClose={close}
      >
        <ThemeScope>
          {/* Tap anywhere outside the menu to close it */}
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={close}
            accessibilityLabel="Close"
          />

          {anchor && (
            <Animated.View
              entering={menuIn}
              exiting={menuOut}
              style={[
                styles.menu,
                {
                  top: anchor.y + anchor.h + GAP,
                  left: menuLeft,
                  direction,
                  shadowOpacity: colors.isDark ? 0.5 : 0.18,
                  transformOrigin: isRTL ? "top left" : "top right",
                },
              ]}
            >
              <View style={[StyleSheet.absoluteFill, styles.clip]}>
                {hasGlass ? (
                  <GlassView
                    style={StyleSheet.absoluteFill}
                    glassEffectStyle="regular"
                    colorScheme={colors.isDark ? "dark" : "light"}
                  />
                ) : (
                  <View
                    style={[
                      StyleSheet.absoluteFill,
                      {
                        backgroundColor: colors.isDark
                          ? "rgba(38,38,38,0.94)"
                          : "rgba(255,255,255,0.96)",
                        borderWidth: StyleSheet.hairlineWidth,
                        borderColor: colors.isDark
                          ? "rgba(255,255,255,0.16)"
                          : "rgba(0,0,0,0.08)",
                      },
                    ]}
                  />
                )}
              </View>

              <View accessibilityRole="menu" style={{ padding: 6 }}>
                {options.map((option, i) => {
                  const selected = option.value === value;
                  return (
                    <Pressable
                      key={option.value}
                      accessibilityRole="menuitem"
                      accessibilityState={{ selected }}
                      onPress={() => {
                        close();
                        if (!selected) {
                          Haptics.selectionAsync();
                          onChange(option.value);
                        }
                      }}
                      className={cn(
                        "flex-row items-center gap-3 rounded-2xl px-3 py-3",
                        i > 0 && "mt-0.5",
                      )}
                      style={({ pressed }) =>
                        pressed ? { backgroundColor: colors.surfaceMuted } : null
                      }
                    >
                      <Icon
                        name={option.icon}
                        size={18}
                        tintColor={selected ? colors.main : colors.gray}
                      />
                      <AppText
                        weight={selected ? "bold" : "regular"}
                        className="flex-1"
                      >
                        {option.label}
                      </AppText>
                      {selected ? (
                        <Icon name="check" size={15} tintColor={colors.main} />
                      ) : null}
                    </Pressable>
                  );
                })}
              </View>
            </Animated.View>
          )}
        </ThemeScope>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    width: MENU_WIDTH,
    borderRadius: 22,
    shadowColor: "#000",
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  clip: { borderRadius: 22, overflow: "hidden" },
});
