export const APP_CONTENT_LANGUAGES = [
  "pt",
  "en",
  "es",
  "fr",
  "de",
  "it",
  "ru",
  "zh",
  "ja",
  "ko",
  "ar",
  "hi",
  "tr",
  "pl",
  "nl",
] as const;

export type AppContentLanguage = (typeof APP_CONTENT_LANGUAGES)[number];

type LessonContentLanguage = "pt" | "en" | "es" | "ru" | "fr" | "de" | "it";
type FreelancerContentLanguage = "pt" | "en" | "es" | "fr";

const LESSON_CONTENT_LANGUAGE_MAP: Record<AppContentLanguage, LessonContentLanguage> = {
  pt: "pt",
  en: "en",
  es: "es",
  fr: "fr",
  de: "de",
  it: "it",
  ru: "ru",
  zh: "en",
  ja: "en",
  ko: "en",
  ar: "en",
  hi: "en",
  tr: "en",
  pl: "en",
  nl: "en",
};

const FREELANCER_CONTENT_LANGUAGE_MAP: Record<AppContentLanguage, FreelancerContentLanguage> = {
  pt: "pt",
  en: "en",
  es: "es",
  fr: "fr",
  de: "en",
  it: "en",
  ru: "en",
  zh: "en",
  ja: "en",
  ko: "en",
  ar: "en",
  hi: "en",
  tr: "en",
  pl: "en",
  nl: "en",
};

export const normalizeContentLanguage = (language?: string): AppContentLanguage => {
  const baseLanguage = language?.split("-")[0]?.toLowerCase();
  return APP_CONTENT_LANGUAGES.includes(baseLanguage as AppContentLanguage)
    ? (baseLanguage as AppContentLanguage)
    : "en";
};

export const resolveLessonContentLanguage = (language?: string): LessonContentLanguage => {
  return LESSON_CONTENT_LANGUAGE_MAP[normalizeContentLanguage(language)];
};

export const resolveFreelancerContentLanguage = (language?: string): FreelancerContentLanguage => {
  return FREELANCER_CONTENT_LANGUAGE_MAP[normalizeContentLanguage(language)];
};
