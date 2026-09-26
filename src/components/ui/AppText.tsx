import useDirection from "@/hooks/useDirection";
import { cn } from "@/lib/utils";
import { Text, TextProps } from "react-native";

type Props = TextProps & {
  className?: string;
  weight?: "regular" | "bold";
  variant?: "ui" | "quran";
  arabic?: boolean;
};

// Same rule as the portfolio layout: LamaSans for Arabic, Space Grotesk otherwise
const FONTS = {
  ui: {
    rtl: { regular: "font-lama", bold: "font-lama-bold" },
    ltr: { regular: "font-space", bold: "font-space-bold" },
  },
  quran: {
    rtl: { regular: "font-amiri", bold: "font-amiri-bold" },
    ltr: { regular: "font-amiri", bold: "font-amiri-bold" },
  },
} as const;

export default function AppText({
  className,
  weight = "regular",
  variant = "ui",
  arabic,
  style,
  ...props
}: Props) {
  const { isRTL } = useDirection();
  const rtl = variant === "quran" || arabic || isRTL;

  return (
    <Text
      className={cn(
        "text-ink",
        FONTS[variant][rtl ? "rtl" : "ltr"][weight],
        className,
      )}
      style={[{ writingDirection: rtl ? "rtl" : "ltr" }, style]}
      {...props}
    />
  );
}
