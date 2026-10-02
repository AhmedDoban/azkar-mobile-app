import AppText from "@/components/ui/AppText";
import PressableScale from "@/components/ui/PressableScale";
import { cn } from "@/lib/utils";
import { Href, Link } from "expo-router";
import { ReactNode } from "react";
import { View } from "react-native";

export default function TileCard({
  href,
  title,
  subtitle,
  highlighted = false,
  trailing,
}: {
  href: Href;
  title: string;
  subtitle: string;
  highlighted?: boolean;
  trailing?: ReactNode;
}) {
  return (
    <Link href={href} asChild>
      <PressableScale className="flex-1 justify-center rounded-3xl bg-main-soft p-4">
        <View className="flex-row items-center gap-3">
          <View className="flex-1 gap-1">
            <AppText
              weight="bold"
              className="text-base leading-6"
              numberOfLines={2}
            >
              {title}
            </AppText>
            <AppText
              weight={highlighted ? "bold" : "regular"}
              className={cn(
                "text-xs",
                highlighted ? "text-main" : "text-main-gray",
              )}
            >
              {subtitle}
            </AppText>
          </View>
          {trailing}
        </View>
      </PressableScale>
    </Link>
  );
}
