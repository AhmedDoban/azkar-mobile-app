import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";

const FALLBACK_MS = 450;

type TransitionNavigation = {
  addListener: (event: "transitionEnd", callback: () => void) => () => void;
};

export default function useTransitionReady() {
  const navigation = useNavigation() as unknown as TransitionNavigation;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const done = () => setReady(true);
    const timer = setTimeout(done, FALLBACK_MS);
    const unsubscribe = navigation.addListener("transitionEnd", done);
    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, [navigation]);

  return ready;
}
