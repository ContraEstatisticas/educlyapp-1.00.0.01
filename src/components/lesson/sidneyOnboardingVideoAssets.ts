import sidneyOnboardingEn from "@/assets/lesson/sidney/onboarding/sidney-trilha-en.mp4";
import sidneyOnboardingEs from "@/assets/lesson/sidney/onboarding/sidney-trilha-es.mp4";
import sidneyOnboardingFr from "@/assets/lesson/sidney/onboarding/sidney-trilha-fr.mp4";
import ediOnboardingEn from "@/assets/lesson/sidney/onboarding/edi/edi-welcome-en.mp4";
import ediOnboardingEs from "@/assets/lesson/sidney/onboarding/edi/edi-welcome-es.mp4";
import ediOnboardingFr from "@/assets/lesson/sidney/onboarding/edi/edi-welcome-fr.mp4";
import type { SidneyJourneyLocale } from "@/components/lesson/sidneyDay1JourneyCopy";

export type SidneyOnboardingVideoSet = "sidney" | "edi";

const SIDNEY_ONBOARDING_VIDEO_ASSET_SETS = {
  sidney: {
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
  },
  edi: {
    en: {
      src: ediOnboardingEn,
      locale: "en",
    },
    es: {
      src: ediOnboardingEs,
      locale: "es",
    },
    fr: {
      src: ediOnboardingFr,
      locale: "fr",
    },
  },
} as const;

type SidneyOnboardingAvailableLocale =
  keyof (typeof SIDNEY_ONBOARDING_VIDEO_ASSET_SETS)["sidney"];

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
  videoSet: SidneyOnboardingVideoSet = "sidney",
) => {
  const assetSet = SIDNEY_ONBOARDING_VIDEO_ASSET_SETS[videoSet];
  const directAsset = assetSet[
    locale as SidneyOnboardingAvailableLocale
  ];
  const fallbackLocale = SIDNEY_ONBOARDING_VIDEO_FALLBACKS[locale];
  const resolvedAsset = directAsset ?? assetSet[fallbackLocale];

  if (!resolvedAsset) {
    return null;
  }

  return {
    ...resolvedAsset,
    videoSet,
    requestedLocale: locale,
    isFallback: resolvedAsset.locale !== locale,
  };
};
