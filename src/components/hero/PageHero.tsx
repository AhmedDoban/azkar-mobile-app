import AppText from "@/components/ui/AppText";
import { ImageSourcePropType, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Icon, { IconKey } from "@/components/ui/Icon";
import PressableScale from "@/components/ui/PressableScale";
import HeroCurve from "./HeroCurve";
import HeroScene from "./HeroScene";
import HeroSearchField from "./HeroSearchField";

const TEXT_SHADOW = {
  textShadowColor: "rgba(0, 0, 0, 0.55)",
  textShadowOffset: { width: 0, height: 1 },
  textShadowRadius: 12,
};

const GLASS = {
  backgroundColor: "rgba(255, 255, 255, 0.22)",
  borderColor: "rgba(255, 255, 255, 0.35)",
};

export const HERO_HEIGHT = 270;

export type HeroSearch = {
  value: string;
  onChangeText: (text: string) => void;
  onSubmitEditing?: () => void;
  placeholder: string;
};

export type HeroAction = {
  icon: IconKey;
  label: string;
  onPress: () => void;
};

export type PageHeroProps = {
  title: string;
  subtitle: string;
  source: ImageSourcePropType;
  height?: number;
  search?: HeroSearch;
  action?: HeroAction;
};

export default function PageHero({
  title,
  subtitle,
  source,
  height = HERO_HEIGHT,
  search,
  action,
}: PageHeroProps) {
  const insets = useSafeAreaInsets();

  return (
    <View className="overflow-hidden" style={{ height: insets.top + height }}>
      <HeroScene source={source} />

      <View
        className="flex-1 justify-between px-5 pb-[72px]"
        style={{ paddingTop: insets.top + 10 }}
      >
        <View className="h-14 flex-row items-center justify-end gap-3">
          {search ? (
            <HeroSearchField search={search} action={action} />
          ) : action ? (
            <PressableScale
              scaleTo={0.88}
              onPress={action.onPress}
              accessibilityRole="button"
              accessibilityLabel={action.label}
              className="size-14 items-center justify-center rounded-full border"
              style={GLASS}
            >
              <Icon name={action.icon} size={24} tintColor="#ffffff" />
            </PressableScale>
          ) : null}
        </View>

        <View className="items-start gap-1">
          <AppText
            weight="bold"
            className="text-5xl leading-[64px] text-white"
            style={TEXT_SHADOW}
          >
            {title}
          </AppText>
          <AppText className="text-sm text-white" style={TEXT_SHADOW}>
            {subtitle}
          </AppText>
        </View>
      </View>

      <HeroCurve />
    </View>
  );
}
