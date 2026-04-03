import type { SidneyJourneyLocale } from "@/components/lesson/sidneyDay1JourneyCopy";

type SidneySlidesPromptId = "A" | "B" | "C";
type SidneySlidesDeckLocale = Extract<SidneyJourneyLocale, "en" | "es" | "fr">;

export interface SidneySlidesDeckSlide {
  fileName: string;
  order: number;
  src: string;
  title: string;
}

const SIDNEY_SLIDE_ASSET_MODULES = import.meta.glob(
  "../../assets/lesson/sidney/slides/**/*.{png,jpg,jpeg,webp,avif}",
  {
    eager: true,
    import: "default",
  },
) as Record<string, string>;

const PROMPT_NUMBER_TO_OPTION_ID: Record<string, SidneySlidesPromptId> = {
  "1": "A",
  "2": "B",
  "3": "C",
};

const formatSlideTitle = (fileName: string) =>
  fileName
    .replace(/\.[^.]+$/, "")
    .replace(/^\d+_/, "")
    .replace(/-/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const buildSidneySlidesDecks = () => {
  const decks: Partial<
    Record<
      SidneySlidesDeckLocale,
      Partial<Record<SidneySlidesPromptId, SidneySlidesDeckSlide[]>>
    >
  > = {};

  Object.entries(SIDNEY_SLIDE_ASSET_MODULES).forEach(([path, src]) => {
    const match = path.match(/slides\/(en|es|fr)\/prompt([123])\/([^/]+)$/i);

    if (!match) {
      return;
    }

    const [, localeValue, promptNumber, fileName] = match;
    const locale = localeValue.toLowerCase() as SidneySlidesDeckLocale;
    const optionId = PROMPT_NUMBER_TO_OPTION_ID[promptNumber];
    const orderMatch = fileName.match(/^(\d+)_/);
    const order = orderMatch ? Number(orderMatch[1]) : Number.MAX_SAFE_INTEGER;

    decks[locale] ??= {};
    decks[locale]![optionId] ??= [];
    decks[locale]![optionId]!.push({
      fileName,
      order,
      src,
      title: formatSlideTitle(fileName),
    });
  });

  (Object.keys(decks) as SidneySlidesDeckLocale[]).forEach((locale) => {
    (Object.keys(decks[locale] || {}) as SidneySlidesPromptId[]).forEach(
      (optionId) => {
        decks[locale]![optionId]!.sort((a, b) => {
          if (a.order !== b.order) {
            return a.order - b.order;
          }

          return a.fileName.localeCompare(b.fileName);
        });
      },
    );
  });

  return decks;
};

const SIDNEY_SLIDES_DECKS = buildSidneySlidesDecks();

export const getSidneySlidesDeck = (
  optionId: string,
  locale: SidneyJourneyLocale,
) => {
  if (locale !== "en" && locale !== "es" && locale !== "fr") {
    return [] as SidneySlidesDeckSlide[];
  }

  return SIDNEY_SLIDES_DECKS[locale]?.[
    optionId as SidneySlidesPromptId
  ] ?? [];
};
