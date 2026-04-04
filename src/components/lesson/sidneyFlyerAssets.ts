import type { SidneyJourneyLocale } from "@/components/lesson/sidneyDay1JourneyCopy";

type SidneyFlyerPromptId = "A" | "B" | "C";
type SidneyFlyerLocale = Extract<SidneyJourneyLocale, "en" | "es" | "fr">;

export interface SidneyFlyerAsset {
  fileName: string;
  src: string;
}

const SIDNEY_FLYER_ASSET_MODULES = import.meta.glob(
  "../../assets/lesson/sidney/flyers/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const PROMPT_NUMBER_TO_OPTION_ID: Record<string, SidneyFlyerPromptId> = {
  "1": "A",
  "2": "B",
  "3": "C",
};

const buildSidneyFlyerAssets = () => {
  const flyers: Partial<
    Record<SidneyFlyerLocale, Partial<Record<SidneyFlyerPromptId, SidneyFlyerAsset>>>
  > = {};

  Object.entries(SIDNEY_FLYER_ASSET_MODULES).forEach(([path, src]) => {
    const match = path.match(/flyers\/(en|es|fr)\/prompt([123])\.[^/]+$/i);

    if (!match) {
      return;
    }

    const [, localeValue, promptNumber] = match;
    const locale = localeValue.toLowerCase() as SidneyFlyerLocale;
    const optionId = PROMPT_NUMBER_TO_OPTION_ID[promptNumber];
    const fileName = path.split("/").pop() ?? `prompt${promptNumber}.png`;

    flyers[locale] ??= {};
    flyers[locale]![optionId] = {
      fileName,
      src,
    };
  });

  return flyers;
};

const SIDNEY_FLYER_ASSETS = buildSidneyFlyerAssets();

export const getSidneyFlyerAsset = (
  optionId: string,
  locale: SidneyJourneyLocale,
) => {
  if (locale !== "en" && locale !== "es" && locale !== "fr") {
    return null as SidneyFlyerAsset | null;
  }

  return SIDNEY_FLYER_ASSETS[locale]?.[
    optionId as SidneyFlyerPromptId
  ] ?? null;
};
