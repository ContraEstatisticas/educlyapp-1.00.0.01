import type { SupportedStorage } from "@supabase/auth-js";

const AUTH_STORAGE_MODE_KEY = "educly-auth-storage-mode";
const CLEAR_SESSION_ON_LOGOUT_KEY = "clearSessionOnLogout";

type AuthStorageMode = "local" | "session";

const isBrowser = typeof window !== "undefined";

const getLocalStorage = () => (isBrowser ? window.localStorage : undefined);
const getSessionStorage = () => (isBrowser ? window.sessionStorage : undefined);

const readStorageItem = (storage: Storage | undefined, key: string) => {
  if (!storage) return null;

  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
};

const writeStorageItem = (storage: Storage | undefined, key: string, value: string) => {
  if (!storage) return;

  try {
    storage.setItem(key, value);
  } catch {
    // Ignore storage write failures and fall back gracefully.
  }
};

const removeStorageItem = (storage: Storage | undefined, key: string) => {
  if (!storage) return;

  try {
    storage.removeItem(key);
  } catch {
    // Ignore storage removal failures and fall back gracefully.
  }
};

const getAuthStorageMode = (): AuthStorageMode => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();

  if (readStorageItem(sessionStorage, AUTH_STORAGE_MODE_KEY) === "session") {
    return "session";
  }

  if (readStorageItem(localStorage, AUTH_STORAGE_MODE_KEY) === "local") {
    return "local";
  }

  return localStorage ? "local" : "session";
};

const getPrimaryStorage = (): Storage | undefined => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();
  const mode = getAuthStorageMode();

  if (mode === "session") {
    return sessionStorage ?? localStorage;
  }

  return localStorage ?? sessionStorage;
};

const getSecondaryStorage = (): Storage | undefined => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();
  const primaryStorage = getPrimaryStorage();

  if (primaryStorage === localStorage) {
    return sessionStorage;
  }

  return localStorage;
};

const isSupabaseAuthStorageKey = (key: string) => key.startsWith("sb-") || key.includes("supabase");

const clearMatchingKeys = (storage: Storage | undefined, matcher: (key: string) => boolean) => {
  if (!storage) return;

  const keysToRemove: string[] = [];

  try {
    for (let index = 0; index < storage.length; index += 1) {
      const key = storage.key(index);
      if (key && matcher(key)) {
        keysToRemove.push(key);
      }
    }

    keysToRemove.forEach((key) => storage.removeItem(key));
  } catch {
    // Ignore storage cleanup failures and fall back gracefully.
  }
};

export const authStorage: SupportedStorage = {
  getItem(key) {
    const primaryStorage = getPrimaryStorage();
    const secondaryStorage = getSecondaryStorage();

    return readStorageItem(primaryStorage, key) ?? readStorageItem(secondaryStorage, key);
  },
  setItem(key, value) {
    const primaryStorage = getPrimaryStorage();
    const secondaryStorage = getSecondaryStorage();

    writeStorageItem(primaryStorage, key, value);
    removeStorageItem(secondaryStorage, key);
  },
  removeItem(key) {
    removeStorageItem(getLocalStorage(), key);
    removeStorageItem(getSessionStorage(), key);
  },
};

export const setAuthStorageMode = (rememberMe: boolean) => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();

  if (rememberMe) {
    writeStorageItem(localStorage, AUTH_STORAGE_MODE_KEY, "local");
    removeStorageItem(sessionStorage, AUTH_STORAGE_MODE_KEY);
    return;
  }

  writeStorageItem(sessionStorage, AUTH_STORAGE_MODE_KEY, "session");
  removeStorageItem(localStorage, AUTH_STORAGE_MODE_KEY);
};

export const getRememberMeDefaultValue = () =>
  readStorageItem(getLocalStorage(), AUTH_STORAGE_MODE_KEY) === "local";

export const setClearSessionOnLogoutPreference = (shouldClearSession: boolean) => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();

  if (shouldClearSession) {
    if (sessionStorage) {
      writeStorageItem(sessionStorage, CLEAR_SESSION_ON_LOGOUT_KEY, "true");
      removeStorageItem(localStorage, CLEAR_SESSION_ON_LOGOUT_KEY);
    } else {
      writeStorageItem(localStorage, CLEAR_SESSION_ON_LOGOUT_KEY, "true");
    }

    return;
  }

  removeStorageItem(localStorage, CLEAR_SESSION_ON_LOGOUT_KEY);
  removeStorageItem(sessionStorage, CLEAR_SESSION_ON_LOGOUT_KEY);
};

export const shouldClearSessionOnLogout = () => {
  const localStorage = getLocalStorage();
  const sessionStorage = getSessionStorage();

  return (
    readStorageItem(sessionStorage, CLEAR_SESSION_ON_LOGOUT_KEY) === "true" ||
    readStorageItem(localStorage, CLEAR_SESSION_ON_LOGOUT_KEY) === "true"
  );
};

export const clearAuthStorage = () => {
  clearMatchingKeys(getLocalStorage(), isSupabaseAuthStorageKey);
  clearMatchingKeys(getSessionStorage(), isSupabaseAuthStorageKey);
  removeStorageItem(getLocalStorage(), AUTH_STORAGE_MODE_KEY);
  removeStorageItem(getSessionStorage(), AUTH_STORAGE_MODE_KEY);
  removeStorageItem(getLocalStorage(), CLEAR_SESSION_ON_LOGOUT_KEY);
  removeStorageItem(getSessionStorage(), CLEAR_SESSION_ON_LOGOUT_KEY);
};
