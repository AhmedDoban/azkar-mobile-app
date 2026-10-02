import { useState } from "react";
import {
  useAnimatedScrollHandler,
  useSharedValue,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

const COMPACT_AT = 90;

export default function useCompactHero(heroHeight: number) {
  const threshold = heroHeight - COMPACT_AT;
  const [compact, setCompact] = useState(false);
  const compactValue = useSharedValue(false);

  const onScroll = useAnimatedScrollHandler(
    {
      onScroll: (e) => {
        const next = e.contentOffset.y > threshold;
        if (next !== compactValue.get()) {
          compactValue.set(next);
          scheduleOnRN(setCompact, next);
        }
      },
    },
    [threshold],
  );

  return { compact, onScroll };
}
