import { normalizeRewardLocale } from "@/lib/levelRewards";

type RewardLocale =
  | "pt"
  | "en"
  | "es"
  | "fr"
  | "de"
  | "it"
  | "ru"
  | "zh"
  | "ja"
  | "ko"
  | "ar"
  | "hi"
  | "tr"
  | "pl"
  | "nl";

interface NewsletterGateCopy {
  description: string;
  ctaLabel: string;
}

const NEWSLETTER_GATE_COPY: Record<RewardLocale, NewsletterGateCopy> = {
  pt: {
    description:
      "Voce liberou o jornal semanal de vagas freelance. Para receber essas oportunidades no seu email, ative o modulo Freelancer e transforme aprendizado em renda.",
    ctaLabel: "Ativar modulo Freelancer",
  },
  en: {
    description:
      "You unlocked the weekly freelance jobs journal. To receive those opportunities in your inbox, activate the Freelancer module and turn learning into income.",
    ctaLabel: "Activate Freelancer module",
  },
  es: {
    description:
      "Desbloqueaste el boletin semanal de vacantes freelance. Para recibir esas oportunidades en tu email, activa el modulo Freelancer y convierte aprendizaje en ingresos.",
    ctaLabel: "Activar modulo Freelancer",
  },
  fr: {
    description:
      "Vous avez debloque le journal hebdomadaire des missions freelance. Pour recevoir ces opportunites par email, activez le module Freelancer et transformez votre apprentissage en revenus.",
    ctaLabel: "Activer le module Freelancer",
  },
  de: {
    description:
      "Du hast das wochentliche Freelance-Journal freigeschaltet. Um diese Chancen per E-Mail zu erhalten, aktiviere das Freelancer-Modul und verwandle Lernen in Einkommen.",
    ctaLabel: "Freelancer-Modul aktivieren",
  },
  it: {
    description:
      "Hai sbloccato il giornale settimanale di opportunita freelance. Per ricevere queste opportunita nella tua email, attiva il modulo Freelancer e trasforma l'apprendimento in guadagno.",
    ctaLabel: "Attiva il modulo Freelancer",
  },
  ru: {
    description:
      "Вы открыли еженедельный журнал с фриланс-вакансиями. Чтобы получать эти возможности на почту, активируйте модуль Freelancer и превратите обучение в доход.",
    ctaLabel: "Активировать модуль Freelancer",
  },
  zh: {
    description:
      "你已解锁每周自由职业岗位周报。要把这些机会发送到你的邮箱，请开通 Freelancer 模块，把学习转化为收入。",
    ctaLabel: "开通 Freelancer 模块",
  },
  ja: {
    description:
      "週間フリーランス求人ジャーナルを解放しました。これらの案件をメールで受け取るには、Freelancerモジュールを有効にして、学びを収入につなげましょう。",
    ctaLabel: "Freelancerモジュールを有効化",
  },
  ko: {
    description:
      "주간 프리랜서 채용 저널이 해제되었습니다. 이 기회를 이메일로 받으려면 Freelancer 모듈을 활성화하고 학습을 수익으로 연결하세요.",
    ctaLabel: "Freelancer 모듈 활성화",
  },
  ar: {
    description:
      "لقد فتحت النشرة الاسبوعية لفرص العمل الحر. للحصول على هذه الفرص عبر البريد، فعّل وحدة Freelancer وحوّل تعلمك إلى دخل.",
    ctaLabel: "تفعيل وحدة Freelancer",
  },
  hi: {
    description:
      "आपने साप्ताहिक फ्रीलांस जॉब्स जर्नल अनलॉक कर लिया है। इन अवसरों को अपने ईमेल में पाने के लिए Freelancer मॉड्यूल सक्रिय करें और सीखने को कमाई में बदलें।",
    ctaLabel: "Freelancer मॉड्यूल सक्रिय करें",
  },
  tr: {
    description:
      "Haftalik freelance is bulteninin kilidi acildi. Bu firsatlari e-postanda almak icin Freelancer modulunu etkinlestir ve ogrendiklerini gelire donustur.",
    ctaLabel: "Freelancer modulunu etkinlestir",
  },
  pl: {
    description:
      "Odblokowales cotygodniowy biuletyn z ofertami freelance. Aby otrzymywac te okazje na email, aktywuj modul Freelancer i zamien nauke w dochod.",
    ctaLabel: "Aktywuj modul Freelancer",
  },
  nl: {
    description:
      "Je hebt het wekelijkse freelance vacaturejournaal ontgrendeld. Activeer de Freelancer-module om deze kansen per e-mail te ontvangen en leren om te zetten in inkomen.",
    ctaLabel: "Freelancer-module activeren",
  },
};

export const getNewsletterRequiresFreelancerDescription = (language?: string) => {
  const locale = normalizeRewardLocale(language) as RewardLocale;
  return NEWSLETTER_GATE_COPY[locale].description;
};

export const getNewsletterRequiresFreelancerCta = (language?: string) => {
  const locale = normalizeRewardLocale(language) as RewardLocale;
  return NEWSLETTER_GATE_COPY[locale].ctaLabel;
};
