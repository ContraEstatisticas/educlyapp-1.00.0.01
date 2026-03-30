import { normalizeContentLanguage, type AppContentLanguage } from "@/lib/contentLanguage";

export const LANGUAGE_OVERRIDE_STORAGE_KEY = "educly-language-override";

export const normalizeAppLanguage = (language?: string | null): AppContentLanguage =>
  normalizeContentLanguage(language || undefined);

export const getStoredLanguageOverride = (): AppContentLanguage | null => {
  if (typeof window === "undefined") return null;

  const storedLanguage = window.localStorage.getItem(LANGUAGE_OVERRIDE_STORAGE_KEY);
  if (!storedLanguage) return null;

  return normalizeAppLanguage(storedLanguage);
};

export const setStoredLanguageOverride = (language: string) => {
  if (typeof window === "undefined") return;

  const normalizedLanguage = normalizeAppLanguage(language);
  window.localStorage.setItem(LANGUAGE_OVERRIDE_STORAGE_KEY, normalizedLanguage);
  window.localStorage.setItem("i18nextLng", normalizedLanguage);
};

export const clearStoredLanguageOverride = () => {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(LANGUAGE_OVERRIDE_STORAGE_KEY);
};
