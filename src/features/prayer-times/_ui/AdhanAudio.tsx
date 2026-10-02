import { useEffect } from "react";
import useAdhanPlayer from "../_components/useAdhanPlayer";
import { AdhanSoundId } from "../_data/adhanSounds";

export default function AdhanAudio({ sound }: { sound: AdhanSoundId }) {
  const { play, stop } = useAdhanPlayer();

  useEffect(() => {
    play(sound);
    return stop;
  }, []);

  return null;
}
