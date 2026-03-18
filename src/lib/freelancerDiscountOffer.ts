import type { NavigateFunction } from "react-router-dom";

type OfferLocale = "pt" | "en" | "es";

interface FreelancerDiscountOfferCopy {
  note: string;
  ctaLabel: string;
}

const FREELANCER_DISCOUNT_LINK =
  "https://pay.hotmart.com/F103975080O?off=raiiicv7&sck=app&utm_source=terceironivel";
const FREELANCER_FULL_PRICE_FALLBACK = "/freelancer";

const COPY_BY_LOCALE: Record<OfferLocale, FreelancerDiscountOfferCopy> = {
  pt: {
    note: "Como voce acabou de liberar esse beneficio no nivel 3, pode ativar o modulo Freelancer com desconto especial agora. Essa oferta aparece so neste popup. Se fechar, depois o acesso volta ao valor normal.",
    ctaLabel: "Garantir desconto agora",
  },
  en: {
    note: "Because you just unlocked this perk at level 3, you can activate the Freelancer module with a special discount right now. This offer only appears in this popup. If you close it, the access goes back to full price.",
    ctaLabel: "Claim discount now",
  },
  es: {
    note: "Como acabas de desbloquear este beneficio en el nivel 3, ahora puedes activar el modulo Freelancer con un descuento especial. Esta oferta solo aparece en este popup. Si lo cierras, despues el acceso vuelve al precio completo.",
    ctaLabel: "Aprovechar descuento ahora",
  },
};

const normalizeLocale = (language?: string): OfferLocale => {
  const baseLanguage = language?.split("-")[0];

  if (baseLanguage === "pt" || baseLanguage === "en" || baseLanguage === "es") {
    return baseLanguage;
  }

  return "en";
};

export const hasFreelancerDiscountOffer = () => FREELANCER_DISCOUNT_LINK.trim().length > 0;

export const getFreelancerDiscountOfferCopy = (language?: string) => {
  return COPY_BY_LOCALE[normalizeLocale(language)];
};

export const openFreelancerOffer = (navigate: NavigateFunction) => {
  const target = FREELANCER_DISCOUNT_LINK.trim();

  if (!target) {
    navigate(FREELANCER_FULL_PRICE_FALLBACK);
    return;
  }

  if (/^https?:\/\//i.test(target)) {
    window.location.assign(target);
    return;
  }

  navigate(target);
};
