import { Component, ErrorInfo, ReactNode, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { PWARedirect } from "@/components/PWARedirect";
import { PWAInstallPrompt } from "@/components/PWAInstallPrompt";
import { GlobalLevelUpOverlay } from "@/components/level/GlobalLevelUpOverlay";
import { LevelRewardMilestonePopup } from "@/components/level/LevelRewardMilestonePopup";
import { SoundSettingsProvider } from "@/contexts/SoundSettingsContext";
import { PremiumGuard } from "@/components/PremiumGuard";
import { UpdateNotification } from "@/components/UpdateNotification";
import { PushNotificationPrompt } from "@/components/PushNotificationPrompt";
import { RemoteFeatureGate } from "@/components/RemoteFeatureGate";
import { ThemeProvider } from "@/components/theme-provider";
import { supabase } from "@/integrations/supabase/client";
import { useSessionTracking } from "@/hooks/useSessionTracking";
import {
  getStoredLanguageOverride,
  LANGUAGE_OVERRIDE_STORAGE_KEY,
  normalizeAppLanguage,
} from "@/lib/languagePreference";
import i18n from "i18next";

// Componente invisível que rastreia sessões de usuários autenticados
const SessionTracker = () => {
  useSessionTracking();
  return null;
};

const LanguagePreferenceSync = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    let isActive = true;

    const syncDocumentLanguage = (language: string) => {
      document.documentElement.lang = normalizeAppLanguage(language);
    };

    const syncStoredLanguage = async () => {
      const currentLanguage = normalizeAppLanguage(i18n.resolvedLanguage || i18n.language);
      const storedOverride = getStoredLanguageOverride();
      const storedDetectorLanguage = window.localStorage.getItem("i18nextLng");
      let targetLanguage =
        storedOverride || (storedDetectorLanguage ? normalizeAppLanguage(storedDetectorLanguage) : null);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("profiles")
          .select("preferred_language")
          .eq("id", user.id)
          .maybeSingle();

        if (error) {
          console.error("[LanguagePreferenceSync] Failed to load preferred language:", error);
        }

        if (profile?.preferred_language) {
          targetLanguage = normalizeAppLanguage(profile.preferred_language);
          window.localStorage.setItem("i18nextLng", targetLanguage);
          window.localStorage.removeItem(LANGUAGE_OVERRIDE_STORAGE_KEY);
        }
      }

      if (!isActive) {
        return;
      }

      syncDocumentLanguage(targetLanguage || currentLanguage);

      if (targetLanguage && currentLanguage !== targetLanguage) {
        await i18n.changeLanguage(targetLanguage);
      }
    };

    const handleLanguageChanged = (language: string) => {
      syncDocumentLanguage(language);
    };

    const handleStorage = (event: StorageEvent) => {
      if (
        event.key &&
        event.key !== "i18nextLng" &&
        event.key !== LANGUAGE_OVERRIDE_STORAGE_KEY
      ) {
        return;
      }

      void syncStoredLanguage();
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncStoredLanguage();
    });

    void syncStoredLanguage();
    i18n.on("languageChanged", handleLanguageChanged);
    window.addEventListener("storage", handleStorage);

    return () => {
      isActive = false;
      subscription.unsubscribe();
      i18n.off("languageChanged", handleLanguageChanged);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return null;
};

class GlobalErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const platform =
      typeof navigator !== "undefined"
        ? `${navigator.platform} - ${navigator.userAgent.split(" ")[0]}`
        : "unknown";

    Promise.resolve(supabase.from("user_bugs").insert({
      platform,
      error_message: `[UI CRASH] ${error.message}`,
      component_stack: errorInfo.componentStack || "Render Error",
    })).catch(() => {});
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0f172a",
          color: "#e2e8f0",
          fontFamily: "system-ui, sans-serif",
          padding: "20px",
          textAlign: "center",
        }}>
          <h2 style={{ marginBottom: "12px" }}>{i18n.t('errorBoundary.title')}</h2>
          <p style={{ marginBottom: "20px", opacity: 0.7 }}>
            {i18n.t('errorBoundary.message')}
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: "12px 24px",
              background: "#6366f1",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            {i18n.t('errorBoundary.button')}
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Importações das Páginas
import Index from "./pages/Index";
import Quiz from "./pages/Quiz";
import Dashboard from "./pages/Dashboard";
import Plan from "./pages/Plan";
import Challenge from "./pages/Challenge";
import DayLesson from "./pages/DayLesson";
import Chat from "./pages/Chat";
import Auth from "./pages/Auth";
import UpdatePassword from "./pages/UpdatePassword";
import ThankYou from "./pages/ThankYou";
import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import CookiesPolicy from "./pages/CookiesPolicy";
import RefundPolicy from "./pages/RefundPolicy";
import Certificate from "./pages/Certificate";
import SubscriptionTerms from "./pages/SubscriptionTerms";
import Assistentes from "./pages/Assistentes";
import AssistantChat from "./pages/AssistantChat";
import Freelancer from "./pages/Freelancer";
import FreelancerLesson from "./pages/FreelancerLesson";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminEmails from "./pages/AdminEmails";
import Medals from "./pages/Medals";
import Profile from "./pages/Profile";
import UpsellEsp from "./pages/UpsellEsp";
import UpsellEspDois from "./pages/UpsellEspDois";
import DownsellEsp from "./pages/DownsellEsp";
import ResetCache from "./pages/ResetCache";
import SignupFromEmail from "./pages/SignupFromEmail";
import Billing from "./pages/Billing";
import MagicLogin from "./pages/MagicLogin";
import PaddleLanding from "./pages/PaddleLanding";
import AIToolTrailsHub from "./pages/AIToolTrailsHub";
import AIToolTrailPage from "./pages/AIToolTrailPage";
import AIToolModuleLessonPage from "./pages/AIToolModuleLessonPage";

// Inicialização do Query Client para cache de requisições
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") {
      return;
    }

    const normalizeTheme = (theme: string | null) => theme === "dark" ? "dark" : "light";

    const handleThemeChange = (theme: "dark" | "light") => {
      const html = document.documentElement;
      const themeColorMeta = document.querySelector('meta[name="theme-color"]');

      html.classList.remove("light", "dark");
      html.classList.add(theme);
      html.style.colorScheme = theme;

      if (theme === "dark") {
        html.style.backgroundColor = "#0f172a";
        document.body.style.backgroundColor = "#0f172a";
        themeColorMeta?.setAttribute("content", "#0f172a");
      } else {
        html.style.backgroundColor = "#ffffff";
        document.body.style.backgroundColor = "#ffffff";
        themeColorMeta?.setAttribute("content", "#ffffff");
      }
    };

    const themeStore = normalizeTheme(localStorage.getItem("educly-theme"));
    handleThemeChange(themeStore);

    const handleStorage = (e: StorageEvent) => {
      if (e.key === "educly-theme") {
        handleThemeChange(normalizeTheme(e.newValue));
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider
            defaultTheme="light"
            storageKey="educly-theme">
          <TooltipProvider>
            <SoundSettingsProvider>
              <Toaster />
              <Sonner />
          
              <BrowserRouter>
                <LanguagePreferenceSync />
                <SessionTracker />
                <UpdateNotification autoReloadSeconds={15} />
                <PWARedirect />
{/* <PWAInstallPrompt /> */}
                <PushNotificationPrompt />
                <GlobalLevelUpOverlay />
                <LevelRewardMilestonePopup />
                <Routes>
                  {/* --- ROTAS PÚBLICAS --- */}
                  <Route path="/" element={<Index />} />
                  <Route path="/paddle" element={<PaddleLanding />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/update-password" element={<UpdatePassword />} />
                  <Route path="/obrigado" element={<ThankYou />} />
                  <Route path="/termos" element={<TermsOfUse />} />
                  <Route path="/privacidade" element={<PrivacyPolicy />} />
                  <Route path="/cookies" element={<CookiesPolicy />} />
                  <Route path="/cancelamento" element={<RefundPolicy />} />
                  <Route path="/refund" element={<RefundPolicy />} />
              <Route path="/contato" element={<Contact />} />
              <Route path="/termos-assinatura" element={<SubscriptionTerms />} />
              <Route path="/reset-cache" element={<ResetCache />} />
              <Route path="/reset-cache.html" element={<ResetCache />} />
              <Route path="/cache" element={<ResetCache />} />
              <Route path="/cadastro" element={<SignupFromEmail />} />
              <Route path="/magic-login" element={<MagicLogin />} />

                  {/* Rotas de Upsell e Downsell Específicas */}
                  <Route path="/upsell-1-esp" element={<UpsellEsp />} />
                  <Route path="/upsell-2-esp" element={<UpsellEspDois />} />
                  <Route path="/downsell-esp" element={<DownsellEsp />} />

                  {/* Quiz - Acesso Geral */}
                  <Route path="/quiz" element={<Quiz />} />

                  {/* --- ROTAS PROTEGIDAS (PREMIUM) --- */}
                  <Route path="/dashboard" element={<PremiumGuard><Dashboard /></PremiumGuard>} />
                  <Route path="/plan" element={<PremiumGuard><Plan /></PremiumGuard>} />
                  <Route path="/desafio/:slug" element={<PremiumGuard><Challenge /></PremiumGuard>} />
                  <Route path="/trilhas-ia" element={<PremiumGuard><AIToolTrailsHub /></PremiumGuard>} />
                  <Route path="/trilhas-ia/:toolSlug" element={<PremiumGuard><AIToolTrailPage /></PremiumGuard>} />
                  <Route path="/trilhas-ia/:toolSlug/modulo/:moduleNumber" element={<PremiumGuard><AIToolModuleLessonPage /></PremiumGuard>} />
                  <Route path="/aula/:dayId" element={<PremiumGuard><DayLesson /></PremiumGuard>} />
                  <Route
                    path="/chat"
                    element={
                      <PremiumGuard>
                        <RemoteFeatureGate>
                          <Chat />
                        </RemoteFeatureGate>
                      </PremiumGuard>
                    }
                  />
                  <Route path="/certificado/:id" element={<PremiumGuard><Certificate /></PremiumGuard>} />
                  <Route
                    path="/assistentes"
                    element={
                      <PremiumGuard>
                        <RemoteFeatureGate>
                          <Assistentes />
                        </RemoteFeatureGate>
                      </PremiumGuard>
                    }
                  />
                  <Route
                    path="/assistentes/:aiType"
                    element={
                      <PremiumGuard>
                        <RemoteFeatureGate>
                          <AssistantChat />
                        </RemoteFeatureGate>
                      </PremiumGuard>
                    }
                  />
                  <Route path="/freelancer" element={<PremiumGuard><Freelancer /></PremiumGuard>} />
                  <Route path="/freelancer/:moduleId" element={<PremiumGuard><FreelancerLesson /></PremiumGuard>} />
                  <Route path="/medalhas" element={<PremiumGuard><Medals /></PremiumGuard>} />
                  <Route path="/profile" element={<PremiumGuard><Profile /></PremiumGuard>} />
                  <Route path="/settings/billing" element={<PremiumGuard><Billing /></PremiumGuard>} />

                  {/* --- ADMINISTRAÇÃO --- */}
                  <Route path="/admin/analytics" element={<AdminAnalytics />} />
                  <Route path="/admin/emails" element={<AdminEmails />} />

                  {/* --- REDIRECIONAMENTO DE ERRO --- */}
                  <Route path="/404" element={<NotFound />} />
                  <Route path="*" element={<Navigate to="/404" replace />} />
                </Routes>
              </BrowserRouter>
            </SoundSettingsProvider>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  );
};

export default App;

