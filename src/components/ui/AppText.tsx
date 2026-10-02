import useDirection from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import { memo, useMemo } from "react";
import { Text, TextProps } from "react-native";
import withPunctuation from "./withPunctuation";

type Props = TextProps & {
  className?: string;
  weight?: "regular" | "bold";
  variant?: "ui" | "quran";
  arabic?: boolean;
};

const FONTS = {
  ui: {
    rtl: { regular: "font-lama", bold: "font-lama-bold" },
    ltr: { regular: "font-space", bold: "font-space-bold" },
  },
  quran: {
    rtl: { regular: "font-hafs", bold: "font-hafs" },
    ltr: { regular: "font-hafs", bold: "font-hafs" },
  },
} as const;

export default memo(function AppText({
  className,
  weight = "regular",
  variant = "ui",
  arabic,
  style,
  children,
  ...props
}: Props) {
  const { isRTL } = useDirection();
  const rtl = variant === "quran" || arabic || isRTL;
  const content = useMemo(
    () => (variant === "quran" ? withPunctuation(children) : children),
    [variant, children],
  );

  return (
    <Text
      className={cn(
        "text-ink",
        FONTS[variant][rtl ? "rtl" : "ltr"][weight],
        className,
      )}
      style={[{ writingDirection: rtl ? "rtl" : "ltr" }, style]}
      {...props}
    >
      {content}
    </Text>
  );
});
