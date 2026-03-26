import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { tUi } from "@/lib/supplementalUiTranslations";

export type RemoteFeatureRestriction = "pwa" | "pwa_offline" | "offline" | null;

export interface RemoteFeatureNotice {
  badge: string;
  title: string;
  description: string;
  backLabel: string;
  closeLabel: string;
}

export const isStandalonePWA = () => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return false;
  }

  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as { standalone?: boolean }).standalone === true ||
    document.referrer.includes("android-app://")
  );
};

export const useRemoteFeatureAccess = () => {
  const { t, i18n } = useTranslation();
  const [isOnline, setIsOnline] = useState(() =>
    typeof navigator === "undefined" ? true : navigator.onLine,
  );
  const [isStandalone, setIsStandalone] = useState(() => isStandalonePWA());

  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(display-mode: standalone)");

    const syncState = () => {
      setIsOnline(navigator.onLine);
      setIsStandalone(isStandalonePWA());
    };

    syncState();

    window.addEventListener("online", syncState);
    window.addEventListener("offline", syncState);
    document.addEventListener("visibilitychange", syncState);

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", syncState);
    } else {
      mediaQuery.addListener(syncState);
    }

    return () => {
      window.removeEventListener("online", syncState);
      window.removeEventListener("offline", syncState);
      document.removeEventListener("visibilitychange", syncState);

      if (typeof mediaQuery.removeEventListener === "function") {
        mediaQuery.removeEventListener("change", syncState);
      } else {
        mediaQuery.removeListener(syncState);
      }
    };
  }, []);

  const restriction = useMemo<RemoteFeatureRestriction>(() => {
    if (isStandalone) {
      return isOnline ? "pwa" : "pwa_offline";
    }

    if (!isOnline) {
      return "offline";
    }

    return null;
  }, [isOnline, isStandalone]);

  const notice = useMemo<RemoteFeatureNotice | null>(() => {
    if (!restriction) {
      return null;
    }

    const title =
      restriction === "offline"
        ? tUi(t, i18n.language, "remoteFeature.titleOffline")
        : tUi(t, i18n.language, "remoteFeature.titlePwa");

    const description =
      restriction === "offline"
        ? tUi(t, i18n.language, "remoteFeature.descriptionOffline")
        : restriction === "pwa_offline"
          ? tUi(t, i18n.language, "remoteFeature.descriptionPwaOffline")
          : tUi(t, i18n.language, "remoteFeature.descriptionPwa");

    return {
      badge: tUi(t, i18n.language, "remoteFeature.badge"),
      title,
      description,
      backLabel: tUi(t, i18n.language, "remoteFeature.backToDashboard"),
      closeLabel: tUi(t, i18n.language, "remoteFeature.close"),
    };
  }, [i18n.language, restriction, t]);

  return {
    isOnline,
    isStandalonePWA: isStandalone,
    isRestricted: restriction !== null,
    restriction,
    notice,
  };
};
