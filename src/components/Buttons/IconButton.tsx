import { ComponentProps } from "react";
import useThemeColors from "@/hooks/useThemeColors";
import { cn } from "@/lib/utils";
import Icon, { IconKey } from "../ui/Icon";
import PressableScale from "@/components/ui/PressableScale";

type Props = ComponentProps<typeof PressableScale> & {
  icon: IconKey;
  color?: string;
  size?: number;
  className?: string;
};

export default function IconButton({
  icon,
  color,
  size = 18,
  className,
  ...props
}: Props) {
  const colors = useThemeColors();

  return (
    <PressableScale
      scaleTo={0.85}
      hitSlop={8}
      accessibilityRole="button"
      className={cn(
        "size-10 items-center justify-center rounded-full bg-surface-muted",
        className,
      )}
      {...props}
    >
      <Icon name={icon} size={size} tintColor={color ?? colors.main} />
    </PressableScale>
  );
}
