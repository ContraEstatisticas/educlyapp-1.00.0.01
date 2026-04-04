import sidneyOnboardingEn from "@/assets/lesson/sidney/onboarding/sidney-trilha-en.mp4";
import sidneyOnboardingEs from "@/assets/lesson/sidney/onboarding/sidney-trilha-es.mp4";
import sidneyOnboardingFr from "@/assets/lesson/sidney/onboarding/sidney-trilha-fr.mp4";
import type { SidneyJourneyLocale } from "@/components/lesson/sidneyDay1JourneyCopy";

const SIDNEY_ONBOARDING_VIDEO_ASSETS = {
  en: {
    src: sidneyOnboardingEn,
    locale: "en",
  },
  es: {
    src: sidneyOnboardingEs,
    locale: "es",
  },
  fr: {
    src: sidneyOnboardingFr,
    locale: "fr",
  },
} as const;

type SidneyOnboardingAvailableLocale =
  keyof typeof SIDNEY_ONBOARDING_VIDEO_ASSETS;

const SIDNEY_ONBOARDING_VIDEO_FALLBACKS: Record<
  SidneyJourneyLocale,
  SidneyOnboardingAvailableLocale
> = {
  pt: "es",
  en: "en",
  es: "es",
  fr: "fr",
};

export const getSidneyOnboardingVideoAsset = (
  locale: SidneyJourneyLocale,
) => {
  const directAsset = SIDNEY_ONBOARDING_VIDEO_ASSETS[
    locale as SidneyOnboardingAvailableLocale
  ];
  const fallbackLocale = SIDNEY_ONBOARDING_VIDEO_FALLBACKS[locale];
  const resolvedAsset = directAsset ?? SIDNEY_ONBOARDING_VIDEO_ASSETS[fallbackLocale];

  if (!resolvedAsset) {
    return null;
  }

  return {
    ...resolvedAsset,
    requestedLocale: locale,
    isFallback: resolvedAsset.locale !== locale,
  };
};
