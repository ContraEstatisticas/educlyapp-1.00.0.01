import { useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/use-toast";
import { useSoundSettings } from "@/contexts/SoundSettingsContext";
import medalSound from "@/assets/sounds/medal-earned.mp3";

export const useMedalNotification = () => {
  const { toast } = useToast();
  const { soundEnabled, volume } = useSoundSettings();
  const { t } = useTranslation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(medalSound);
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playMedalSound = useCallback(() => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }, [soundEnabled, volume]);

  const showMedalNotification = useCallback(
    (medalSlug: string | undefined, medalName: string, medalDescription: string) => {
      const localizedMedalName = medalSlug
        ? t(`medal_names.${medalSlug}`, medalName)
        : medalName;
      const localizedMedalDescription = medalSlug
        ? t(`medal_defs.${medalSlug}`, medalDescription)
        : medalDescription;

      playMedalSound();
      toast({
        title: `🏅 ${t("medals.notificationTitle", "New medal earned!")}`,
        description: `${localizedMedalName}: ${localizedMedalDescription}`,
        duration: 5000,
      });
    },
    [playMedalSound, t, toast]
  );

  return { showMedalNotification, playMedalSound };
};
