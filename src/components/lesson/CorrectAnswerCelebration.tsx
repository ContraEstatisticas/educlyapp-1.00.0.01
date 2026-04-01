import { DotLottieReact } from "@lottiefiles/dotlottie-react";

type SupportedCelebrationLanguage = "pt" | "en" | "es" | "fr";

const celebratingEdiAnimationSrc =
  "https://lottie.host/c2f7d4b4-8381-48a4-afb5-e360e22379ad/esNgH7G90P.lottie";

const CORRECT_CELEBRATION_UI = {
  pt: {
    title: "EDI esta comemorando com voce!",
    message: "Voce esta indo muito bem. Continue assim!",
    imageAlt: "Coruja EDI comemorando com confetes",
  },
  en: {
    title: "EDI is celebrating with you!",
    message: "You're doing really well. Keep it up!",
    imageAlt: "EDI owl celebrating with confetti",
  },
  es: {
    title: "EDI esta celebrando contigo!",
    message: "Lo estas haciendo muy bien. Sigue asi!",
    imageAlt: "Buho EDI celebrando con confeti",
  },
  fr: {
    title: "EDI fete cela avec vous !",
    message: "Vous vous en sortez tres bien. Continuez ainsi !",
    imageAlt: "Hibou EDI celebrant avec des confettis",
  },
} as const;

const getCorrectCelebrationUi = (language?: string) => {
  const base = language?.split("-")[0]?.toLowerCase() as SupportedCelebrationLanguage | undefined;
  return CORRECT_CELEBRATION_UI[base || "en"] || CORRECT_CELEBRATION_UI.en;
};

interface CorrectAnswerCelebrationProps {
  language?: string;
}

export const CorrectAnswerCelebration = ({
  language,
}: CorrectAnswerCelebrationProps) => {
  const correctCelebrationUi = getCorrectCelebrationUi(language);

  return (
    <div
      className="mb-6 overflow-hidden rounded-[28px] border border-success/30 bg-gradient-to-br from-success/20 via-background/95 to-primary/10 shadow-[0_20px_45px_rgba(34,197,94,0.16)] animate-in fade-in slide-in-from-bottom-4 duration-500"
      role="img"
      aria-label={correctCelebrationUi.imageAlt}
    >
      <div className="grid gap-5 p-5 md:grid-cols-[240px_minmax(0,1fr)] md:items-center">
        <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center rounded-[24px] border border-success/25 bg-card/80 p-3 shadow-inner md:h-[240px] md:w-[240px]">
          <div className="absolute inset-x-6 bottom-5 h-12 rounded-full bg-success/20 blur-2xl" />
          <DotLottieReact
            src={celebratingEdiAnimationSrc}
            loop
            autoplay
            className="relative z-10 h-full w-full"
          />
        </div>

        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="inline-flex items-center rounded-full border border-success/20 bg-success/10 px-3 py-1 text-[11px] font-black uppercase tracking-[0.28em] text-success">
            EDI
          </div>
          <h3 className="mt-3 text-2xl font-black leading-tight text-foreground md:text-[2rem]">
            {correctCelebrationUi.title}
          </h3>
          <p className="mt-3 max-w-xl text-base font-semibold leading-relaxed text-foreground/75 md:text-lg">
            {correctCelebrationUi.message}
          </p>
        </div>
      </div>
    </div>
  );
};
