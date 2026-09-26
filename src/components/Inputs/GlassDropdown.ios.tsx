import { useState } from "react";
import { View } from "react-native";
import { Button, Host, Menu, RNHostView } from "@expo/ui/swift-ui";
import type { SFSymbol } from "sf-symbols-typescript";
import * as Haptics from "expo-haptics";
import useThemeColors from "@/hooks/useThemeColors";
import useDirection from "@/hooks/useDirection";
import { Icons } from "../ui/Icon";
import DropdownTrigger, { DropdownProps } from "./DropdownTrigger";

const ROW_HEIGHT = 40;

/**
 * iOS: the native SwiftUI menu. On iOS 26 it morphs out of the row with the
 * system Liquid Glass animation; the row itself is our React Native view.
 */
export default function GlassDropdown<T extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: DropdownProps<T>) {
  const colors = useThemeColors();
  const { isRTL } = useDirection();
  const [width, setWidth] = useState(0);
  const current = options.find((o) => o.value === value) ?? options[0];

  return (
    <View
      onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      style={{ height: ROW_HEIGHT }}
      accessibilityLabel={accessibilityLabel}
    >
      {width > 0 && (
        <Host
          style={{ width, height: ROW_HEIGHT }}
          colorScheme={colors.isDark ? "dark" : "light"}
          layoutDirection={isRTL ? "rightToLeft" : "leftToRight"}
          seedColor={colors.main}
        >
          <Menu
            label={
              <RNHostView>
                <View
                  style={{
                    width,
                    height: ROW_HEIGHT,
                    justifyContent: "center",
                  }}
                >
                  <DropdownTrigger icon={current.icon} label={current.label} />
                </View>
              </RNHostView>
            }
          >
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <Button
                  key={option.value}
                  label={option.label}
                  // The current choice shows the system checkmark, the others their icon
                  systemImage={
                    (selected
                      ? "checkmark"
                      : Icons[option.icon].ios) as SFSymbol
                  }
                  onPress={() => {
                    if (selected) return;
                    Haptics.selectionAsync();
                    onChange(option.value);
                  }}
                />
              );
            })}
          </Menu>
        </Host>
      )}
    </View>
  );
}
