/**
 * Progressive level-up popup themes.
 *
 * Each tier defines:
 * - Visual styling (gradient, glow, particles)
 * - A pool of motivational phrases (one picked at random per popup)
 * - Decorative emojis
 *
 * Four tiers ensure the popup experience escalates as the user advances:
 *   Tier 1 – Beginner   (levels 1-4):  Clean & welcoming
 *   Tier 2 – Rising     (levels 5-8):  Vibrant & energetic
 *   Tier 3 – Advanced   (levels 9-14): Epic & dazzling
 *   Tier 4 – Master     (levels 15-20): Legendary & explosive
 */

type ThemeLocale = "pt" | "en" | "es" | "fr";

export interface LevelUpTheme {
  /** CSS gradient for the outer border ring */
  borderGradient: string;
  /** CSS gradient for the background glow overlay */
  glowGradient: string;
  /** CSS gradient for the level number text */
  numberGradient: string;
  /** Box-shadow for the card */
  boxShadow: string;
  /** Particle / sparkle colors (CSS color values) */
  particleColors: string[];
  /** Number of floating particles */
  particleCount: number;
  /** Duration (ms) before auto-close. Higher tiers stay longer. */
  autoCloseDuration: number;
  /** Whether to show confetti burst animation */
  showConfetti: boolean;
  /** Whether to show the radial pulse ring */
  showPulseRing: boolean;
  /** CSS class suffix for the tier */
  tierClass: string;
  /** Emoji pair around the "Level Up!" label */
  emojis: [string, string];
}

interface MotivationalCopy {
  phrases: string[];
}

// ─── Themes ────────────────────────────────────────────────────
const TIER_1_THEME: LevelUpTheme = {
  borderGradient: "linear-gradient(135deg, #f59e0b, #fbbf24, #f59e0b)",
  glowGradient: "radial-gradient(circle at 50% 0%, rgba(251, 191, 36, 0.12) 0%, transparent 70%)",
  numberGradient: "linear-gradient(135deg, #d97706, #f59e0b, #d97706)",
  boxShadow: "0 8px 32px -8px rgba(245, 158, 11, 0.25), 0 0 0 1px rgba(245, 158, 11, 0.08)",
  particleColors: ["#f59e0b", "#fbbf24", "#d97706"],
  particleCount: 6,
  autoCloseDuration: 5000,
  showConfetti: false,
  showPulseRing: false,
  tierClass: "tier-beginner",
  emojis: ["⭐", "⭐"],
};

const TIER_2_THEME: LevelUpTheme = {
  borderGradient: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6, #f97316)",
  glowGradient: "radial-gradient(circle at 50% 0%, rgba(236, 72, 153, 0.15) 0%, rgba(139, 92, 246, 0.08) 50%, transparent 80%)",
  numberGradient: "linear-gradient(135deg, #f97316, #ec4899, #8b5cf6)",
  boxShadow: "0 12px 40px -8px rgba(236, 72, 153, 0.3), 0 0 60px -20px rgba(139, 92, 246, 0.2), 0 0 0 1px rgba(236, 72, 153, 0.1)",
  particleColors: ["#f97316", "#ec4899", "#8b5cf6", "#fbbf24"],
  particleCount: 10,
  autoCloseDuration: 6000,
  showConfetti: false,
  showPulseRing: true,
  tierClass: "tier-rising",
  emojis: ["🔥", "🔥"],
};

const TIER_3_THEME: LevelUpTheme = {
  borderGradient: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #f59e0b, #06b6d4)",
  glowGradient: "radial-gradient(circle at 30% 0%, rgba(6, 182, 212, 0.18) 0%, transparent 50%), radial-gradient(circle at 70% 100%, rgba(236, 72, 153, 0.15) 0%, transparent 50%)",
  numberGradient: "linear-gradient(135deg, #06b6d4, #8b5cf6, #ec4899, #f59e0b)",
  boxShadow: "0 16px 48px -8px rgba(139, 92, 246, 0.35), 0 0 80px -20px rgba(6, 182, 212, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.12)",
  particleColors: ["#06b6d4", "#8b5cf6", "#ec4899", "#f59e0b", "#22d3ee", "#a78bfa"],
  particleCount: 16,
  autoCloseDuration: 7000,
  showConfetti: true,
  showPulseRing: true,
  tierClass: "tier-advanced",
  emojis: ["💎", "💎"],
};

const TIER_4_THEME: LevelUpTheme = {
  borderGradient: "linear-gradient(135deg, #ffd700, #ff6b35, #ff1493, #9400d3, #00bfff, #ffd700)",
  glowGradient: "radial-gradient(circle at 20% 0%, rgba(255, 215, 0, 0.2) 0%, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255, 20, 147, 0.18) 0%, transparent 40%), radial-gradient(circle at 50% 100%, rgba(0, 191, 255, 0.15) 0%, transparent 50%)",
  numberGradient: "linear-gradient(135deg, #ffd700, #ff6b35, #ff1493, #9400d3, #00bfff)",
  boxShadow: "0 20px 60px -8px rgba(255, 215, 0, 0.4), 0 0 100px -20px rgba(255, 20, 147, 0.3), 0 0 120px -30px rgba(0, 191, 255, 0.2), 0 0 0 1px rgba(255, 215, 0, 0.15)",
  particleColors: ["#ffd700", "#ff6b35", "#ff1493", "#9400d3", "#00bfff", "#ff4500", "#7cfc00", "#ff69b4"],
  particleCount: 24,
  autoCloseDuration: 8000,
  showConfetti: true,
  showPulseRing: true,
  tierClass: "tier-master",
  emojis: ["👑", "👑"],
};

export const getLevelUpTheme = (level: number): LevelUpTheme => {
  if (level >= 15) return TIER_4_THEME;
  if (level >= 9) return TIER_3_THEME;
  if (level >= 5) return TIER_2_THEME;
  return TIER_1_THEME;
};

export const getTierIndex = (level: number): number => {
  if (level >= 15) return 4;
  if (level >= 9) return 3;
  if (level >= 5) return 2;
  return 1;
};

// ─── Motivational Phrases ──────────────────────────────────────
// Each tier has progressively more enthusiastic / epic phrasing.
// A random phrase is selected each time the popup appears.

const MOTIVATIONAL_COPY: Record<ThemeLocale, Record<number, MotivationalCopy>> = {
  pt: {
    1: {
      phrases: [
        "Cada passo conta. Continue assim!",
        "Voce esta no caminho certo!",
        "O aprendizado ja comecou a fazer efeito.",
        "Bom ritmo! A evolucao e constante.",
        "Pequenas vitorias criam grandes resultados.",
      ],
    },
    2: {
      phrases: [
        "Voce esta acelerando forte! Impressionante.",
        "Seu progresso e inspiracao para os outros.",
        "A dedicacao esta dando frutos visiveis!",
        "Nivel a nivel, voce esta se transformando.",
        "Esse ritmo e de quem vai longe!",
      ],
    },
    3: {
      phrases: [
        "Voce esta entre os mais dedicados da plataforma!",
        "Essa evolucao e rara. Poucos chegam aqui.",
        "Seu dominio das ferramentas de IA esta impressionante!",
        "A excelencia nao e um acidente — e dedicacao.",
        "Cada nivel que voce conquista abre novas possibilidades.",
      ],
    },
    4: {
      phrases: [
        "Lendario! Voce e referencia em IA na Educly.",
        "Pouquissimos chegam a esse nivel. Voce e elite!",
        "Mestre absoluto! Sua jornada e inspiradora.",
        "Voce transcendeu os limites. Parabens, lenda!",
        "O topo da montanha tem uma vista incrivel, nao e?",
      ],
    },
  },
  en: {
    1: {
      phrases: [
        "Every step counts. Keep it up!",
        "You're on the right track!",
        "The learning is already kicking in.",
        "Good pace! Growth is constant.",
        "Small wins build big results.",
      ],
    },
    2: {
      phrases: [
        "You're accelerating fast! Impressive.",
        "Your progress is inspiring to others.",
        "Dedication is paying off visibly!",
        "Level by level, you're transforming.",
        "This pace is the sign of someone going far!",
      ],
    },
    3: {
      phrases: [
        "You're among the most dedicated on the platform!",
        "This evolution is rare. Few make it here.",
        "Your mastery of AI tools is jaw-dropping!",
        "Excellence is no accident — it's dedication.",
        "Each level you conquer opens new possibilities.",
      ],
    },
    4: {
      phrases: [
        "Legendary! You're a reference in AI at Educly.",
        "Very few reach this level. You're elite!",
        "Absolute master! Your journey is inspiring.",
        "You've transcended limits. Congrats, legend!",
        "The top of the mountain has an amazing view, right?",
      ],
    },
  },
  es: {
    1: {
      phrases: [
        "Cada paso cuenta. Sigue asi!",
        "Vas por el camino correcto!",
        "El aprendizaje ya esta haciendo efecto.",
        "Buen ritmo! La evolucion es constante.",
        "Pequenas victorias crean grandes resultados.",
      ],
    },
    2: {
      phrases: [
        "Estas acelerando fuerte! Impresionante.",
        "Tu progreso es inspiracion para los demas.",
        "La dedicacion esta dando frutos visibles!",
        "Nivel a nivel, te estas transformando.",
        "Ese ritmo es de alguien que llega lejos!",
      ],
    },
    3: {
      phrases: [
        "Estas entre los mas dedicados de la plataforma!",
        "Esta evolucion es rara. Pocos llegan aqui.",
        "Tu dominio de las herramientas de IA es impresionante!",
        "La excelencia no es un accidente — es dedicacion.",
        "Cada nivel que conquistas abre nuevas posibilidades.",
      ],
    },
    4: {
      phrases: [
        "Legendario! Eres referencia en IA en Educly.",
        "Poquísimos llegan a este nivel. Eres elite!",
        "Maestro absoluto! Tu viaje es inspirador.",
        "Has trascendido los limites. Felicidades, leyenda!",
        "La cima de la montana tiene una vista increible, verdad?",
      ],
    },
  },
  fr: {
    1: {
      phrases: [
        "Chaque pas compte. Continuez comme ca!",
        "Vous etes sur la bonne voie!",
        "L'apprentissage commence deja a porter ses fruits.",
        "Bon rythme! La progression est constante.",
        "De petites victoires menent a de grands resultats.",
      ],
    },
    2: {
      phrases: [
        "Vous accelerez a fond! Impressionnant.",
        "Votre progression inspire les autres.",
        "La dedication porte ses fruits de maniere visible!",
        "Niveau apres niveau, vous vous transformez.",
        "Ce rythme est celui de quelqu'un qui va loin!",
      ],
    },
    3: {
      phrases: [
        "Vous etes parmi les plus dedies de la plateforme!",
        "Cette evolution est rare. Peu arrivent ici.",
        "Votre maitrise des outils IA est epoustouflante!",
        "L'excellence n'est pas un hasard — c'est la dedication.",
        "Chaque niveau conquis ouvre de nouvelles possibilites.",
      ],
    },
    4: {
      phrases: [
        "Legendaire! Vous etes une reference en IA chez Educly.",
        "Tres peu atteignent ce niveau. Vous etes l'elite!",
        "Maitre absolu! Votre parcours est inspirant.",
        "Vous avez transcende les limites. Felicitations, legende!",
        "Le sommet de la montagne offre une vue incroyable, n'est-ce pas?",
      ],
    },
  },
};

const normalizeMotivationalLocale = (language?: string): ThemeLocale => {
  const base = (language || "en").split("-")[0];
  if (base === "pt" || base === "en" || base === "es" || base === "fr") return base;
  return "en";
};

export const getMotivationalPhrase = (level: number, language?: string): string => {
  const locale = normalizeMotivationalLocale(language);
  const tier = getTierIndex(level);
  const copy = MOTIVATIONAL_COPY[locale][tier];
  if (!copy || copy.phrases.length === 0) {
    return MOTIVATIONAL_COPY.en[tier]?.phrases[0] || "";
  }
  const randomIndex = Math.floor(Math.random() * copy.phrases.length);
  return copy.phrases[randomIndex];
};
