import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  Brain,
  Check,
  ChevronRight,
  FileText,
  Images,
  LayoutDashboard,
  Map,
  PencilRuler,
  Settings2,
  Sparkles,
  Star,
  Target,
  WandSparkles,
  X,
  Zap,
} from "lucide-react";

import chatgptLogo from "@/assets/ai-logos/chatgpt.png";
import claudeLogo from "@/assets/ai-logos/claude.png";
import geminiLogo from "@/assets/ai-logos/gemini.png";
import copilotLogo from "@/assets/ai-logos/copilot.png";
import deepseekLogo from "@/assets/ai-logos/deepseek.png";
import perplexityLogo from "@/assets/ai-logos/perplexity.png";
import lovableLogo from "@/assets/ai-logos/lovable.png";
import nanobananaLogo from "@/assets/ai-logos/nanobanana.png";
import veoLogo from "@/assets/ai-logos/veo.png";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type SectionKey = "intro" | "map" | "personalize" | "practice";

interface GuilhermeDay1JourneyProps {
  section: SectionKey;
  onComplete: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const outcomeCards = [
  {
    icon: PencilRuler,
    title: "Textos e comunicação",
    description:
      "E-mails, posts, artigos, legendas, roteiros e traduções. Tudo que envolve escrever, a IA faz mais rápido e muitas vezes melhor do que gastar horas na frente de uma tela em branco.",
    palette: "border-sky-200 bg-sky-50/90 text-sky-700",
  },
  {
    icon: Images,
    title: "Imagens e vídeos",
    description:
      "Artes para redes sociais, logos, thumbnails, ilustrações e vídeos infográficos. Mesmo que você nunca tenha aberto o Photoshop, a IA gera visuais profissionais.",
    palette: "border-rose-200 bg-rose-50/90 text-rose-700",
  },
  {
    icon: LayoutDashboard,
    title: "Planilhas e dados",
    description:
      "Controles financeiros, gráficos, dashboards e fórmulas automáticas. Você descreve o que precisa em português e a IA monta a planilha pronta.",
    palette: "border-emerald-200 bg-emerald-50/90 text-emerald-700",
  },
  {
    icon: FileText,
    title: "Documentos e apresentações",
    description:
      "Slides profissionais, PDFs formatados, propostas comerciais e ebooks. Tudo que você precisa apresentar ou entregar para alguém.",
    palette: "border-violet-200 bg-violet-50/90 text-violet-700",
  },
  {
    icon: Bot,
    title: "Automações do dia a dia",
    description:
      "Resumos automáticos, traduções rápidas, reorganização de informações e análise de textos longos. Tarefas que tomam tempo e que a IA resolve em segundos.",
    palette: "border-amber-200 bg-amber-50/90 text-amber-700",
  },
] as const;

const aiToolCards = [
  {
    name: "ChatGPT (OpenAI)",
    logo: chatgptLogo,
    palette: "border-emerald-200 bg-emerald-50/80",
    bulletPalette: "bg-emerald-500",
    bullets: [
      "O mais popular e versátil do mercado",
      "Ótimo para conversas longas e criação de textos",
      "Gera imagens com o DALL-E integrado",
      "Tem modo de voz para conversar falando",
      "Navega na internet em tempo real",
      "Milhares de GPTs personalizados prontos para usar",
    ],
  },
  {
    name: "Claude (Anthropic)",
    logo: claudeLogo,
    palette: "border-orange-200 bg-orange-50/80",
    bulletPalette: "bg-orange-500",
    bullets: [
      "Melhor para textos longos e análise de documentos",
      "Janela de contexto gigante entende documentos enormes",
      "Respostas mais naturais e menos robóticas",
      "Excelente para revisão, reescrita e copywriting",
      "Cria arquivos completos (PDFs, planilhas, apresentações)",
      "Permite criar Projetos com instruções fixas",
    ],
  },
  {
    name: "Gemini (Google)",
    logo: geminiLogo,
    palette: "border-blue-200 bg-blue-50/80",
    bulletPalette: "bg-blue-500",
    bullets: [
      "Integrado ao ecossistema Google (Gmail, Drive, Docs)",
      "Forte em pesquisa e informações atualizadas",
      "Entende imagens e vídeos muito bem",
      "Versão gratuita bastante completa",
      "Gera imagens e vídeos diretamente no chat",
      "Bom para resumir e-mails e organizar informações",
    ],
  },
  {
    name: "Copilot (Microsoft)",
    logo: copilotLogo,
    palette: "border-cyan-200 bg-cyan-50/80",
    bulletPalette: "bg-cyan-500",
    bullets: [
      "Integrado ao Word, Excel, PowerPoint e Outlook",
      "Ideal para quem já trabalha com ferramentas Microsoft",
      "Gera apresentações e planilhas dentro do Office",
      "Navega na internet com o Bing",
      "Bom para tarefas corporativas e produtividade no trabalho",
      "Versão gratuita disponível no Edge e no Bing",
    ],
  },
  {
    name: "DeepSeek",
    logo: deepseekLogo,
    palette: "border-slate-200 bg-slate-50/90",
    bulletPalette: "bg-slate-700",
    bullets: [
      "Modelo de código aberto com alta qualidade",
      "Gratuito e sem limites de uso",
      "Excelente para raciocínio lógico e matemática",
      "Forte em programação e código",
      "Respostas detalhadas e com raciocínio passo a passo",
      "Alternativa poderosa sem precisar pagar assinatura",
    ],
  },
  {
    name: "Perplexity",
    logo: perplexityLogo,
    palette: "border-zinc-200 bg-zinc-50/90",
    bulletPalette: "bg-zinc-700",
    bullets: [
      "Funciona como um buscador inteligente com IA",
      "Sempre mostra as fontes das informações",
      "Ideal para pesquisas e checagem de fatos",
      "Respostas atualizadas com dados da internet em tempo real",
      "Interface simples e direta sem enrolação",
      "Ótimo para substituir buscas confusas no Google",
    ],
  },
  {
    name: "Lovable",
    logo: lovableLogo,
    palette: "border-fuchsia-200 bg-fuchsia-50/90",
    bulletPalette: "bg-fuchsia-500",
    bullets: [
      "Cria sites e aplicativos completos sem saber programar",
      "Você descreve o que quer em português e a IA constrói tudo",
      "Inclui banco de dados, login de usuário e pagamentos",
      "Publica o app online com um clique sem configurar nada",
      "Ideal para criar MVPs, portfólios, landing pages e ferramentas internas",
      "Código exportável para o GitHub se quiser evoluir com um programador",
    ],
  },
  {
    name: "Nano Banana (Google)",
    logo: nanobananaLogo,
    palette: "border-yellow-200 bg-yellow-50/90",
    bulletPalette: "bg-yellow-500",
    bullets: [
      "Editor de imagens por texto: descreva a edição e a IA faz",
      "Mantém consistência de personagens entre várias edições",
      "Preserva o cenário original enquanto aplica mudanças pontuais",
      "Ótimo para criar figurinhas, memes e artes para redes sociais",
      "Baseado no Gemini com qualidade alta e geração rápida",
      "Disponível gratuitamente com créditos diários",
    ],
  },
  {
    name: "Veo (Google)",
    logo: veoLogo,
    palette: "border-rose-200 bg-rose-50/90",
    bulletPalette: "bg-rose-500",
    bullets: [
      "Gera vídeos a partir de texto: descreva a cena e a IA cria",
      "Produz vídeos de até 8 segundos em alta qualidade (1080p)",
      "Gera áudio nativo junto com o vídeo (efeitos sonoros e diálogos)",
      "Entende linguagem cinematográfica (plano aéreo, câmera lenta, close)",
      "Disponível no Gemini e no Google AI Studio",
      "Ideal para protótipos de vídeo, reels e conteúdo visual rápido",
    ],
  },
] as const;

const MAP_BULLET_REVEAL_INTERVAL_MS = 500;

const chatGptPanels = {
  estilo: {
    title: "Estilo e tom básicos",
    description:
      "Aqui a pessoa escolhe o estilo geral da conversa. Exemplo: mais direto, mais criativo, mais didático, mais profissional.",
  },
  caracteristicas: {
    title: "Características",
    description:
      "Aqui ela informa quem é, com o que trabalha, seu nível de experiência e para que usa o ChatGPT. Isso ajuda a IA a responder de forma mais alinhada à realidade dela.",
  },
  respostas: {
    title: "Como quer as respostas",
    description:
      "Defina o tom, o formato e as preferências. Exemplo: responda de forma direta, sem enrolação, use exemplos práticos e organize em tópicos curtos quando possível.",
  },
  memoria: {
    title: "Memória",
    description:
      "O ChatGPT também tem um recurso de memória que aprende sobre você ao longo das conversas. Você pode ver e editar o que ele lembra em Configurações > Personalização > Memória.",
  },
} as const;

const claudePanels = {
  perfil: {
    title: "Preferências de perfil",
    description:
      "Descreva quem é, sua área, idioma preferido e como quer que o Claude responda. Exemplo: Sou professor de história, trabalho com ensino médio. Prefiro respostas claras, com exemplos do cotidiano, em português.",
  },
  projetos: {
    title: "Projetos",
    description:
      "No Claude, você pode criar Projetos com instruções fixas. Tudo que você conversar dentro de um projeto já segue as regras que você definiu. Ideal para separar trabalho pessoal de profissional.",
  },
  estilos: {
    title: "Estilos de resposta",
    description:
      "O Claude permite escolher entre estilos de escrita diferentes (formal, conciso, explicativo). Você também pode criar o seu próprio estilo personalizado.",
  },
} as const;

const exerciseOneOptions = [
  {
    id: "a",
    text: "Não existe diferença. A IA sempre entende o que você quer.",
    isCorrect: false,
  },
  {
    id: "b",
    text: "O prompt vago faz a IA travar e não responder nada.",
    isCorrect: false,
  },
  {
    id: "c",
    text: "O prompt específico dá contexto e detalhes, o que permite à IA gerar uma resposta muito mais útil e alinhada com o que você precisa.",
    isCorrect: true,
  },
  {
    id: "d",
    text: "O prompt específico serve só para tarefas de programação, não para textos comuns.",
    isCorrect: false,
  },
] as const;

const exerciseThreeLegend = [
  "A. Textos longos e análise de documentos",
  "B. Geração de vídeos a partir de texto",
  "C. Pesquisa com fontes em tempo real",
  "D. Edição de imagens por comandos de texto",
  "E. Criação de sites e apps sem programar",
] as const;

const exerciseThreePairs = [
  { id: "perplexity", label: "1. Perplexity", correct: "C" },
  { id: "claude", label: "2. Claude", correct: "A" },
  { id: "lovable", label: "3. Lovable", correct: "E" },
  { id: "veo", label: "4. Veo", correct: "B" },
  { id: "nanobanana", label: "5. Nano Banana", correct: "D" },
] as const;

const templateLines = [
  "SOBRE MIM:",
  "- Meu nome é [seu nome]",
  "- Trabalho como [sua profissão ou área]",
  "- Meu público é [descreva seu público ou clientes]",
  "- Meu nível com tecnologia é [iniciante, intermediário ou avançado]",
  "- Uso a IA principalmente para [liste 2 ou 3 usos principais]",
  "",
  "COMO QUERO AS RESPOSTAS:",
  "- Tom: [direto, amigável, profissional, casual]",
  "- Formato preferido: [tópicos curtos, parágrafos, tabelas]",
  "- Idioma: [português do Brasil]",
  "- Evite: [jargão técnico, respostas longas demais, etc.]",
  "- Sempre: [dê exemplos práticos, pergunte antes de assumir, etc.]",
] as const;

const sectionShellClasses =
  "relative overflow-hidden rounded-[32px] border border-[#eadfce] bg-[linear-gradient(180deg,#fffcf7_0%,#fff8ef_100%)] p-5 shadow-[0_24px_60px_rgba(89,57,18,0.08)] sm:p-6 md:p-8";

const floatingTransition = {
  duration: 4.6,
  repeat: Infinity,
  repeatType: "mirror" as const,
  ease: "easeInOut" as const,
};

const SectionWrapper = ({ children }: { children: ReactNode }) => (
  <div className={sectionShellClasses}>
    <motion.div
      aria-hidden
      className="pointer-events-none absolute -left-12 top-10 h-28 w-28 rounded-full bg-[#ff7a1a]/14 blur-3xl"
      animate={{ x: [0, 16, -10], y: [0, -18, 10] }}
      transition={{ ...floatingTransition, duration: 6 }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-[#ffc64d]/20 blur-3xl"
      animate={{ x: [0, -14, 8], y: [0, 10, -14] }}
      transition={{ ...floatingTransition, duration: 5.2 }}
    />
    <motion.div
      aria-hidden
      className="pointer-events-none absolute bottom-6 right-14 h-20 w-20 rounded-full bg-[#16a34a]/12 blur-2xl"
      animate={{ x: [0, 12, -8], y: [0, -8, 14] }}
      transition={{ ...floatingTransition, duration: 4.8 }}
    />
    <div className="relative z-10">{children}</div>
  </div>
);

const SectionIntro = ({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={stagger}
    className="space-y-4"
  >
    <motion.div variants={fadeUp} className="inline-flex items-center gap-3">
      <span className="h-12 w-[3px] rounded-full bg-gradient-to-b from-[#ff3c7e] via-[#ff7a1a] to-[#ffbe3d]" />
      <span className="text-xs font-black uppercase tracking-[0.35em] text-[#d35f12]">{eyebrow}</span>
    </motion.div>
    <motion.h2
      variants={fadeUp}
      className="font-serif text-[2rem] leading-tight text-[#1f2434] sm:text-[2.35rem]"
    >
      {title}
    </motion.h2>
    <motion.p variants={fadeUp} className="max-w-2xl text-base leading-8 text-[#40475a] sm:text-[1.05rem]">
      {description}
    </motion.p>
  </motion.div>
);

const EditorialHeading = ({
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
}) => (
  <div className="mt-10 flex items-start gap-3">
    <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-2xl bg-white/80 text-[#ff6a00] shadow-sm ring-1 ring-[#ffd5ba]">
      {icon}
    </div>
    <h3 className="font-serif text-[1.9rem] leading-tight text-[#20263a] sm:text-[2.15rem]">{title}</h3>
  </div>
);

const ContinueFooter = ({
  label,
  helper,
  onComplete,
  disabled = false,
}: {
  label: string;
  helper?: string;
  onComplete: () => void;
  disabled?: boolean;
}) => (
  <div className="mt-8 rounded-[28px] border border-[#eadfce] bg-white/85 p-4 shadow-sm">
    {helper ? <p className="mb-3 text-sm text-[#6b7280]">{helper}</p> : null}
    <Button
      onClick={onComplete}
      disabled={disabled}
      className="h-12 w-full rounded-2xl bg-[#1f2434] text-base font-semibold text-white hover:bg-[#111726]"
    >
      {label}
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </div>
);

const GuilhermeDay1Journey = ({ section, onComplete }: GuilhermeDay1JourneyProps) => {
  const [chatGptPanel, setChatGptPanel] = useState<keyof typeof chatGptPanels>("estilo");
  const [claudePanel, setClaudePanel] = useState<keyof typeof claudePanels>("perfil");
  const [exerciseOneChoice, setExerciseOneChoice] = useState<string | null>(null);
  const [exerciseTwoInput, setExerciseTwoInput] = useState("");
  const [exerciseTwoChecked, setExerciseTwoChecked] = useState(false);
  const [exerciseThreeAnswers, setExerciseThreeAnswers] = useState<Record<string, string>>({});
  const [activeMapToolIndex, setActiveMapToolIndex] = useState(0);
  const [visibleMapBulletCount, setVisibleMapBulletCount] = useState(0);

  const exerciseOneSelected = exerciseOneOptions.find((option) => option.id === exerciseOneChoice);
  const isExerciseOneCorrect = exerciseOneSelected?.isCorrect ?? false;
  const isExerciseTwoCorrect =
    exerciseTwoChecked && exerciseTwoInput.trim().toLowerCase() === "prompt";
  const areAllExerciseThreeAnswered = exerciseThreePairs.every((pair) => exerciseThreeAnswers[pair.id]);
  const isExerciseThreeCorrect = exerciseThreePairs.every(
    (pair) => exerciseThreeAnswers[pair.id] === pair.correct
  );
  const unlockedFinalButton =
    isExerciseOneCorrect && isExerciseTwoCorrect && areAllExerciseThreeAnswered && isExerciseThreeCorrect;

  const progressSummary = {
    total: 3,
    completed:
      Number(isExerciseOneCorrect) + Number(isExerciseTwoCorrect) + Number(isExerciseThreeCorrect),
  };
  const currentMapTool = aiToolCards[activeMapToolIndex];
  const nextMapTool = aiToolCards[activeMapToolIndex + 1];
  const isLastMapTool = activeMapToolIndex === aiToolCards.length - 1;
  const areAllCurrentMapBulletsVisible =
    visibleMapBulletCount >= currentMapTool.bullets.length;

  useEffect(() => {
    if (section !== "map") return;

    setActiveMapToolIndex(0);
    setVisibleMapBulletCount(0);
  }, [section]);

  useEffect(() => {
    if (section !== "map") return;

    setVisibleMapBulletCount(0);
  }, [activeMapToolIndex, section]);

  useEffect(() => {
    if (section !== "map") return;
    if (visibleMapBulletCount >= currentMapTool.bullets.length) return;

    const timeout = window.setTimeout(() => {
      setVisibleMapBulletCount((current) =>
        Math.min(current + 1, currentMapTool.bullets.length)
      );
    }, MAP_BULLET_REVEAL_INTERVAL_MS);

    return () => window.clearTimeout(timeout);
  }, [currentMapTool, section, visibleMapBulletCount]);

  const handleContinueMapTool = () => {
    if (isLastMapTool) {
      onComplete();
      return;
    }

    setActiveMapToolIndex((current) => Math.min(current + 1, aiToolCards.length - 1));
  };

  if (section === "intro") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow="Módulo 01"
          title="Antes de tudo: esquece o que te falaram sobre IA"
          description="Você já deve ter ouvido falar do ChatGPT. Talvez até já tenha testado. Abriu a ferramenta, digitou qualquer coisa e achou que a IA é mais ou menos. Normal. Todo mundo começa assim."
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-5 text-[1.04rem] leading-8 text-[#303648]"
        >
          <motion.p variants={fadeUp}>
            <span className="font-semibold text-[#ff6a00]">Mas o problema nunca foi a IA.</span>{" "}
            O problema é que ninguém ensinou você a pedir do jeito certo e muito menos a configurar a IA pra
            funcionar do seu jeito.
          </motion.p>
          <motion.p variants={fadeUp}>
            Nesse desafio de 28 dias, você não vai aprender o ChatGPT nem decorar menus. Você vai aprender a fazer coisas reais com inteligência artificial: gerar imagens, escrever textos profissionais, montar planilhas e criar apresentações. A ferramenta é só o meio. O resultado é seu.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-8 grid gap-4 md:grid-cols-[1.15fr_0.85fr]"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] border border-[#ffd8c0] bg-[radial-gradient(circle_at_top_left,#fff5e8_0%,#fff1e1_38%,#fff8ef_100%)] p-5"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,122,26,0.16),transparent_28%),radial-gradient(circle_at_85%_18%,rgba(255,200,61,0.18),transparent_22%),radial-gradient(circle_at_80%_82%,rgba(45,212,191,0.14),transparent_26%)]" />
            <motion.div
              aria-hidden
              className="absolute left-8 top-6 h-16 w-16 rounded-full border border-white/60 bg-white/50 blur-[1px]"
              animate={{ x: [0, 12, -6, 0], y: [0, -10, 8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              aria-hidden
              className="absolute bottom-8 right-8 h-24 w-24 rounded-full bg-[#ffd89e]/30 blur-2xl"
              animate={{ scale: [1, 1.15, 0.95, 1], opacity: [0.45, 0.75, 0.5, 0.45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="relative grid gap-6 md:grid-cols-[0.95fr_1.05fr] md:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd0b2] bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17] shadow-sm">
                  <Sparkles className="h-4 w-4" />
                  Virada de chave
                </div>
                <h4 className="mt-4 font-serif text-[1.95rem] leading-tight text-[#1f2434]">
                  Quanto melhor o seu contexto, melhor a resposta que a IA devolve.
                </h4>
                <p className="mt-4 max-w-lg text-sm leading-7 text-[#6b5b4f]">
                  A IA não é um truque. Ela é um assistente extremamente capaz que fica muito mais útil quando você entrega intenção, direção e formato logo no pedido.
                </p>
              </div>

              <div className="relative min-h-[250px]">
                <motion.div
                  className="absolute left-0 top-5 rounded-[24px] border border-[#ffd9bf] bg-white/90 px-4 py-3 shadow-[0_18px_40px_rgba(255,122,26,0.10)]"
                  animate={{ y: [0, -8, 0], rotate: [0, -2, 0] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17]">Você entrega</p>
                  <p className="mt-2 text-sm font-semibold text-[#2f3445]">Contexto + objetivo + tom + formato</p>
                </motion.div>

                <motion.div
                  className="absolute right-3 top-0 flex h-16 w-16 items-center justify-center rounded-[22px] border border-white/80 bg-white/85 text-[#ff6a00] shadow-lg"
                  animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
                  transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Brain className="h-7 w-7" />
                </motion.div>

                <motion.div
                  className="absolute left-[18%] top-[34%] flex h-24 w-24 items-center justify-center rounded-full bg-[radial-gradient(circle,#ffb15a_0%,#ff7a1a_68%,#ff6a00_100%)] text-white shadow-[0_22px_48px_rgba(255,122,26,0.28)]"
                  animate={{ scale: [1, 1.08, 1], boxShadow: ["0 22px 48px rgba(255,122,26,0.22)", "0 28px 62px rgba(255,122,26,0.34)", "0 22px 48px rgba(255,122,26,0.22)"] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Bot className="h-10 w-10" />
                </motion.div>

                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    aria-hidden
                    className="absolute left-[46%] top-[43%] h-3 w-3 rounded-full bg-[#ff8c38]"
                    animate={{ x: [0, 36 + index * 18, 74 + index * 24], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, delay: index * 0.35, ease: "easeInOut" }}
                  />
                ))}

                <motion.div
                  className="absolute bottom-3 right-0 max-w-[260px] rounded-[24px] border border-[#d7f0de] bg-white/92 px-4 py-4 shadow-[0_18px_40px_rgba(22,163,74,0.10)]"
                  animate={{ y: [0, 10, 0], rotate: [0, 1.5, 0] }}
                  transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8fff1] text-[#16a34a]">
                      <Check className="h-4 w-4" />
                    </span>
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-[#16803c]">A resposta vem</p>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-7 text-[#2f3445]">
                    Mais útil, mais clara e muito mais próxima do que você realmente queria.
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="rounded-[28px] border border-[#eadfce] bg-white/90 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3 text-[#1f2434]">
              <Zap className="h-5 w-5 text-[#ff6a00]" />
              <p className="font-black uppercase tracking-[0.25em] text-[#d35f12]">Resultado real</p>
            </div>
            <p className="mt-4 font-serif text-[1.5rem] leading-tight text-[#1f2434]">
              O que a IA generativa realmente faz
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              A inteligência artificial generativa cria conteúdo novo a partir das suas instruções. Você descreve o que quer, e ela entrega texto, imagem, planilha, código, áudio ou vídeo.
            </p>
            <p className="mt-4 text-sm leading-7 text-[#4b5563]">
              O nome técnico da instrução que você dá é <span className="font-semibold text-[#ff6a00]">prompt</span>. Pense no prompt como um pedido feito a um assistente extremamente capaz, mas que precisa de clareza.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="mt-8 overflow-hidden rounded-[30px] border border-[#eadfce] bg-white/90 shadow-sm"
        >
          <motion.div
            className="space-y-4 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="grid overflow-hidden rounded-2xl border border-[#f2c9c3] md:grid-cols-[170px_1fr]">
              <div className="flex items-center justify-center gap-2 bg-[#ef5350] px-4 py-4 text-sm font-black uppercase tracking-[0.2em] text-white">
                <X className="h-4 w-4" />
                Vago
              </div>
              <div className="bg-[#fff1ee] px-5 py-4 text-[1.02rem] text-[#2f3445]">“Me fala sobre vendas”</div>
            </div>

            <div className="grid overflow-hidden rounded-2xl border border-[#c7e7cf] md:grid-cols-[170px_1fr]">
              <div className="flex items-center justify-center gap-2 bg-[#24a148] px-4 py-4 text-sm font-black uppercase tracking-[0.2em] text-white">
                <Check className="h-4 w-4" />
                Específico
              </div>
              <div className="bg-[#eefbf1] px-5 py-4 text-[1.02rem] leading-7 text-[#2f3445]">
                “Crie um e-mail de follow-up para um cliente que pediu orçamento de consultoria em marketing digital há 3 dias e não respondeu. Tom profissional e empático, máximo 150 palavras.”
              </div>
            </div>

            <div className="rounded-2xl border border-[#ffe1cb] bg-[#fff6ef] p-4 text-[1rem] leading-7 text-[#41485c]">
              💡 Essa diferença entre os dois prompts é o que separa quem acha a IA mediana de quem a usa pra trabalhar de verdade. Nos próximos 27 dias você vai dominar essa habilidade.
            </div>
          </motion.div>
        </motion.div>

        <EditorialHeading icon={<Target className="h-5 w-5" />} title="Os 5 grandes resultados que a IA entrega" />
        <p className="mt-4 text-[1.04rem] leading-8 text-[#41485c]">
          Tudo o que a IA faz de útil se encaixa em uma dessas cinco categorias. Cada semana do desafio foca em uma delas:
        </p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-4"
        >
          {outcomeCards.map((card) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={card.title}
                variants={fadeUp}
                className={cn(
                  "grid gap-4 rounded-[26px] border p-4 shadow-sm md:grid-cols-[64px_1fr] md:items-start",
                  card.palette
                )}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/85 shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="text-[1.15rem] font-black leading-tight">{card.title}</h4>
                  <p className="mt-2 text-sm leading-7 text-[#475569]">{card.description}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <ContinueFooter
          label="Continuar para o mapa das IAs"
          helper="Primeiro você entendeu a lógica. Agora vamos para a parte prática de qual ferramenta usar em cada situação."
          onComplete={onComplete}
        />
      </SectionWrapper>
    );
  }

  if (section === "map") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow="Mapa das IAs"
          title="Pontos fortes de cada uma"
          description="Existe mais de uma IA disponível hoje e cada uma tem seus pontos fortes. O segredo não é escolher a melhor, mas saber qual usar para cada situação."
        />

        <div className="mt-6 rounded-[28px] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
          <p className="text-sm leading-7 text-[#4b5563]">
            Aqui está o mapa completo com as IAs mais usadas e quando cada uma brilha. Os pontos fortes entram um por vez e, quando terminar, você avança manualmente para a próxima IA.
          </p>
        </div>

        <div className="mt-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMapTool.name}
              initial={{ opacity: 0, y: 28, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.985 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                "overflow-hidden rounded-[30px] border p-5 shadow-sm",
                currentMapTool.palette
              )}
            >
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[22px] border border-white/70 bg-white/75 px-4 py-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-[#d35f12]">
                    IA {activeMapToolIndex + 1} de {aiToolCards.length}
                  </p>
                  <p className="mt-2 text-sm text-[#4b5563]">
                    Veja esta ferramenta e, quando terminar, avance para a próxima.
                  </p>
                </div>
                <div className="min-w-[160px] rounded-full bg-white/90 px-4 py-3 text-center text-sm font-semibold text-[#1f2434] shadow-sm">
                  {visibleMapBulletCount}/{currentMapTool.bullets.length} pontos visíveis
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-[160px_1fr]">
                <motion.div
                  className="flex flex-col items-center justify-center rounded-[24px] border border-white/80 bg-white/90 p-4 text-center shadow-sm"
                  initial={{ opacity: 0, scale: 0.88, rotate: -5 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <img
                    src={currentMapTool.logo}
                    alt={currentMapTool.name}
                    className="h-14 w-14 object-contain"
                  />
                  <p className="mt-3 font-black leading-snug text-[#1f2434]">
                    {currentMapTool.name}
                  </p>
                </motion.div>

                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {currentMapTool.bullets.slice(0, visibleMapBulletCount).map((bullet) => (
                      <motion.div
                        key={`${currentMapTool.name}-${bullet}`}
                        initial={{ opacity: 0, x: 22, filter: "blur(4px)" }}
                        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, x: -14 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-start gap-3 rounded-2xl border border-white/80 bg-white/80 p-3"
                      >
                        <span
                          className={cn("mt-2 h-2.5 w-2.5 rounded-full", currentMapTool.bulletPalette)}
                        />
                        <p className="text-sm leading-7 text-[#394150]">{bullet}</p>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {areAllCurrentMapBulletsVisible ? (
                    <motion.div
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35 }}
                      className="pt-3"
                    >
                      <Button
                        type="button"
                        onClick={handleContinueMapTool}
                        className="h-12 rounded-2xl bg-[#1f2434] px-6 text-base font-semibold text-white hover:bg-[#111726]"
                      >
                        {isLastMapTool && !nextMapTool
                          ? "Continuar para a personalização"
                          : `Continuar para ${nextMapTool?.name ?? "a próxima IA"}`}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  ) : (
                    <div className="rounded-2xl border border-white/80 bg-white/70 px-4 py-3 text-sm text-[#4b5563]">
                      Os pontos desta IA estão entrando na tela. Assim que todos aparecerem, o botão para a próxima ferramenta é liberado.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          className="mt-8 rounded-[30px] border border-[#ffe0a6] bg-[linear-gradient(135deg,#fff7d8_0%,#fff2bd_100%)] p-5 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <Star className="h-5 w-5 text-[#a76b00]" />
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#b57a05]">Dica de ouro</p>
          </div>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#55411f]">
            Você não precisa pagar todas. Comece com uma gratuita, como ChatGPT, Gemini ou DeepSeek, aprenda a usar bem e depois explore as outras conforme precisar. Durante o desafio, vamos indicar a melhor ferramenta para cada tipo de tarefa.
          </p>
        </motion.div>
      </SectionWrapper>
    );
  }

  if (section === "personalize") {
    return (
      <SectionWrapper>
        <SectionIntro
          eyebrow="Personalização"
          title="Deixe a IA com a sua cara: personalização na prática"
          description="Essa é a parte que quase ninguém faz e que muda completamente a experiência. As principais IAs permitem que você configure instruções permanentes sobre quem você é, como trabalha e o que espera das respostas."
        />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="mt-6 space-y-5 text-[1.02rem] leading-8 text-[#374151]"
        >
          <motion.p variants={fadeUp}>
            É como contratar um assistente e, no primeiro dia, sentar com ele e explicar: eu trabalho com tal coisa, gosto que me respondam assim, e preciso desses tipos de resultado. Depois disso, toda resposta já vem calibrada pra você.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[30px] border border-[#eadfce] bg-[linear-gradient(135deg,#fffaf5_0%,#fff5ea_52%,#fffdf9_100%)] p-5 shadow-sm"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,122,26,0.16),transparent_26%),radial-gradient(circle_at_88%_22%,rgba(251,191,36,0.16),transparent_24%),radial-gradient(circle_at_78%_86%,rgba(45,212,191,0.12),transparent_26%)]" />
            <div className="relative grid gap-6 md:grid-cols-[1.05fr_0.95fr] md:items-center">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 rounded-full border border-[#ffd9bf] bg-white/80 px-4 py-2 text-[11px] font-black uppercase tracking-[0.28em] text-[#c45f17] shadow-sm">
                  <WandSparkles className="h-4 w-4" />
                  Resposta calibrada
                </div>
                <h4 className="font-serif text-[1.8rem] leading-tight text-[#1f2434]">
                  Quando você personaliza, a IA já começa entendendo quem você é.
                </h4>
                <p className="max-w-lg text-sm leading-7 text-[#4b5563]">
                  Em vez de responder do zero toda vez, ela passa a considerar o seu contexto, o seu jeito de trabalhar e o formato que você prefere receber.
                </p>
              </div>

              <div className="relative min-h-[240px]">
                {[
                  { label: "Quem sou eu", top: "top-0", delay: 0 },
                  { label: "Como trabalho", top: "top-[72px]", delay: 0.15 },
                  { label: "Como responder", top: "top-[144px]", delay: 0.3 },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    className={cn(
                      "absolute left-0 w-[210px] rounded-[22px] border border-[#ffd9bf] bg-white/92 px-4 py-3 shadow-sm",
                      item.top
                    )}
                    animate={{ x: [0, 10, 0], y: [0, index % 2 === 0 ? -6 : 8, 0] }}
                    transition={{ duration: 4 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: item.delay }}
                  >
                    <p className="text-sm font-semibold text-[#2f3445]">{item.label}</p>
                  </motion.div>
                ))}

                {[0, 1, 2].map((index) => (
                  <motion.div
                    key={index}
                    aria-hidden
                    className="absolute left-[230px] top-[44px] h-2.5 w-2.5 rounded-full bg-[#ff8c38]"
                    animate={{
                      y: [index * 72, index * 72, 72],
                      x: [0, 44, 92],
                      opacity: [0, 1, 0],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: index * 0.4, ease: "easeInOut" }}
                  />
                ))}

                <motion.div
                  className="absolute right-0 top-[56px] w-[250px] rounded-[26px] border border-[#d7f0de] bg-white/94 p-4 shadow-[0_20px_44px_rgba(22,163,74,0.10)]"
                  animate={{ y: [0, -8, 0], rotate: [0, 1.2, 0] }}
                  transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#eafff2] text-[#16a34a]">
                      <Sparkles className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-[0.26em] text-[#16803c]">Saída final</p>
                      <p className="text-sm font-semibold text-[#1f2434]">Resposta mais útil</p>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {["Direta", "Com exemplos", "Sem enrolação"].map((item) => (
                      <div key={item} className="rounded-2xl border border-[#e6f5ea] bg-[#f7fff9] px-3 py-2 text-sm font-medium text-[#33523c]">
                        {item}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
            <p className="relative mt-6 max-w-xl text-sm leading-7 text-[#4b5563]">
              Personalizar a IA leva 3 minutos e economiza horas. Toda resposta que ela der a partir de agora vai ser mais útil, mais rápida e mais alinhada com o que você realmente precisa.
            </p>
          </motion.div>
        </motion.div>

        <div className="mt-10">
          <h3 className="text-[1.7rem] font-black leading-tight text-[#ff6a00]">Como personalizar no ChatGPT</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            Acesse Configurações e depois Personalização. Você vai preencher caixas para definir estilo, contexto e o formato ideal das respostas.
          </p>

          <div className="mt-5 overflow-hidden rounded-[30px] border border-[#d7dde6] bg-[#f7f9fc] shadow-sm">
            <div className="grid md:grid-cols-[220px_1fr]">
              <div className="border-b border-[#d7dde6] bg-[#111827] p-4 text-white md:border-b-0 md:border-r">
                <div className="flex items-center gap-3 rounded-2xl bg-white/10 px-3 py-3">
                  <img src={chatgptLogo} alt="ChatGPT" className="h-8 w-8 rounded-full bg-white object-contain p-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-emerald-200">ChatGPT</p>
                    <p className="text-sm text-slate-200">Tela inicial simulada</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { id: "estilo", label: "Personalização" },
                    { id: "memoria", label: "Memória" },
                    { id: "caracteristicas", label: "Características" },
                    { id: "respostas", label: "Como quer as respostas" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setChatGptPanel(item.id as keyof typeof chatGptPanels)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition-all",
                        chatGptPanel === item.id
                          ? "bg-emerald-500 text-white shadow-sm"
                          : "bg-white/5 text-slate-200 hover:bg-white/10"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#0f766e]">Configurações</p>
                    <h4 className="mt-2 font-serif text-[1.6rem] text-[#1f2937]">
                      {chatGptPanels[chatGptPanel].title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setChatGptPanel((current) => (current === "memoria" ? "estilo" : "memoria"))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-[#d7dde6] bg-white px-4 py-2 text-sm font-medium text-[#334155]"
                  >
                    <Settings2 className="h-4 w-4" />
                    Clicar em Configurações
                  </button>
                </div>

                <div className="rounded-[24px] border border-[#d7dde6] bg-white p-5 shadow-sm">
                  <p className="text-sm leading-7 text-[#475569]">{chatGptPanels[chatGptPanel].description}</p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {["Estilo e tom", "Características", "Formato ideal"].map((label, index) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() =>
                          setChatGptPanel(
                            (["estilo", "caracteristicas", "respostas"][index] ??
                              "estilo") as keyof typeof chatGptPanels
                          )
                        }
                        className="rounded-[20px] border border-[#d7dde6] bg-[#f8fafc] p-4 text-left transition-all hover:border-emerald-300 hover:bg-emerald-50"
                      >
                        <p className="text-sm font-bold text-[#1f2937]">{label}</p>
                        <p className="mt-2 text-xs leading-6 text-[#64748b]">
                          Clique para simular uma navegação dentro da personalização do ChatGPT.
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <p className="rounded-[22px] border border-[#d6f3ec] bg-[#effcf8] p-4 text-sm leading-7 text-[#116149]">
                  Memória: o ChatGPT também pode lembrar preferências ao longo das conversas. Você pode revisar esse histórico e limpar o que quiser.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-[1.7rem] font-black leading-tight text-[#d97706]">Como personalizar no Claude</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            Acesse o ícone do seu perfil, depois Configurações e depois Perfil. Preencha o campo de preferências com informações sobre você e como quer as respostas.
          </p>

          <div className="mt-5 overflow-hidden rounded-[30px] border border-[#e6d8c3] bg-[#fbf7f0] shadow-sm">
            <div className="grid md:grid-cols-[220px_1fr]">
              <div className="border-b border-[#e6d8c3] bg-[#f3ece1] p-4 md:border-b-0 md:border-r">
                <div className="flex items-center gap-3 rounded-2xl bg-white px-3 py-3 shadow-sm">
                  <img src={claudeLogo} alt="Claude" className="h-8 w-8 rounded-full bg-white object-contain p-1" />
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-[#b45309]">Claude</p>
                    <p className="text-sm text-[#6b4d1f]">Tela inicial simulada</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {[
                    { id: "perfil", label: "Preferências de perfil" },
                    { id: "projetos", label: "Projetos" },
                    { id: "estilos", label: "Estilos de resposta" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setClaudePanel(item.id as keyof typeof claudePanels)}
                      className={cn(
                        "flex w-full items-center justify-between rounded-2xl px-3 py-3 text-left text-sm transition-all",
                        claudePanel === item.id
                          ? "bg-[#dd7a00] text-white shadow-sm"
                          : "bg-white/70 text-[#6b4d1f] hover:bg-white"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.3em] text-[#b45309]">Perfil</p>
                    <h4 className="mt-2 font-serif text-[1.6rem] text-[#2c2518]">
                      {claudePanels[claudePanel].title}
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setClaudePanel((current) => (current === "perfil" ? "projetos" : "perfil"))
                    }
                    className="inline-flex items-center gap-2 rounded-full border border-[#e6d8c3] bg-white px-4 py-2 text-sm font-medium text-[#5b4632]"
                  >
                    <WandSparkles className="h-4 w-4" />
                    Clicar no perfil
                  </button>
                </div>

                <div className="rounded-[24px] border border-[#e6d8c3] bg-white p-5 shadow-sm">
                  <p className="text-sm leading-7 text-[#5b4632]">{claudePanels[claudePanel].description}</p>

                  <div className="mt-5 grid gap-3 md:grid-cols-3">
                    {[
                      { label: "Perfil", id: "perfil" },
                      { label: "Projetos", id: "projetos" },
                      { label: "Estilos", id: "estilos" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setClaudePanel(tab.id as keyof typeof claudePanels)}
                        className={cn(
                          "rounded-[20px] border p-4 text-left transition-all",
                          claudePanel === tab.id
                            ? "border-[#dd7a00] bg-[#fff4e8]"
                            : "border-[#ece2d3] bg-[#faf7f2] hover:border-[#f1c38a]"
                        )}
                      >
                        <p className="text-sm font-bold text-[#2c2518]">{tab.label}</p>
                        <p className="mt-2 text-xs leading-6 text-[#7c6752]">
                          Clique para alternar entre as áreas principais do Claude.
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-[30px] border border-[#ffd8c0] bg-white/90 p-5 shadow-sm">
          <h3 className="font-serif text-[2rem] leading-tight text-[#26438f]">Modelo pronto para copiar e colar</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            Use este template como ponto de partida. Copie, adapte com suas informações e cole nas configurações da sua IA favorita:
          </p>

          <div className="mt-5 overflow-x-auto rounded-[24px] border border-[#ffd9b5] bg-[#fff8f0] p-5">
            <pre className="font-mono text-sm leading-7 text-[#6c370d]">
              {templateLines.join("\n")}
            </pre>
          </div>
        </div>

        <ContinueFooter
          label="Ir para os exercícios e missão final"
          helper="Você já viu a lógica, o mapa e a personalização. Agora é hora de praticar e liberar o botão de teste."
          onComplete={onComplete}
        />
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper>
      <SectionIntro
        eyebrow="Exercícios práticos"
        title="Agora é hora de colocar em prática"
        description="Faça os três exercícios abaixo. Depois disso, personalize a sua IA principal e use o botão provisório para concluir e testar esta trilha do Dia 1."
      />

      <div className="mt-8 space-y-6">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#dbe7ff] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#2563eb]">Exercício 1</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">Múltipla escolha</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            Qual é a principal diferença entre dar um prompt vago e um prompt específico para a IA?
          </p>

          <div className="mt-5 space-y-3">
            {exerciseOneOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setExerciseOneChoice(option.id)}
                className={cn(
                  "w-full rounded-[22px] border p-4 text-left text-sm leading-7 transition-all",
                  exerciseOneChoice === option.id
                    ? option.isCorrect
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-rose-300 bg-rose-50"
                    : "border-[#e6ebf2] bg-[#fbfcfe] hover:border-[#cbd5e1]"
                )}
              >
                <span className="mr-3 inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#1f2434] text-xs font-black uppercase text-white">
                  {option.id}
                </span>
                {option.text}
              </button>
            ))}
          </div>

          {exerciseOneChoice ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseOneCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-rose-300 bg-rose-50 text-rose-800"
              )}
            >
              {isExerciseOneCorrect
                ? "Resposta correta: c. O prompt específico dá contexto e detalhes, então a IA consegue entregar uma resposta muito mais útil."
                : "Quase lá. A resposta correta é c, porque contexto e detalhes fazem a IA responder com mais qualidade e precisão."}
            </div>
          ) : null}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#dcefdc] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#15803d]">Exercício 2</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">Complete a frase</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            A instrução que você digita para a IA gerar uma resposta se chama ________, e quanto mais contexto ela tiver, melhor será o resultado.
          </p>

          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Input
              value={exerciseTwoInput}
              onChange={(event) => {
                setExerciseTwoInput(event.target.value);
                setExerciseTwoChecked(false);
              }}
              placeholder="Digite a palavra"
              className="h-12 rounded-2xl border-[#d9e4d9]"
            />
            <Button
              type="button"
              onClick={() => setExerciseTwoChecked(true)}
              className="h-12 rounded-2xl bg-[#1f2434] px-6 hover:bg-[#111726]"
            >
              Verificar
            </Button>
          </div>

          {exerciseTwoChecked ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseTwoCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              )}
            >
              {isExerciseTwoCorrect
                ? "Perfeito. A palavra correta é prompt."
                : "Ainda não. A resposta correta é prompt."}
            </div>
          ) : null}
        </motion.div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="rounded-[28px] border border-[#f0dec4] bg-white/90 p-5 shadow-sm">
          <p className="text-xs font-black uppercase tracking-[0.28em] text-[#b45309]">Exercício 3</p>
          <h3 className="mt-2 font-serif text-[1.75rem] text-[#1f2434]">Ligue os termos</h3>
          <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
            Ligue cada IA ao seu ponto forte principal usando as letras abaixo.
          </p>

          <div className="mt-5 rounded-[22px] border border-[#f5e5d2] bg-[#fff8f1] p-4">
            <div className="grid gap-2 md:grid-cols-2">
              {exerciseThreeLegend.map((item) => (
                <p key={item} className="text-sm leading-7 text-[#6b4d1f]">
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {exerciseThreePairs.map((pair) => (
              <div
                key={pair.id}
                className="grid gap-3 rounded-[22px] border border-[#ece5dc] bg-[#fcfaf7] p-4 md:grid-cols-[1fr_120px]"
              >
                <div className="text-sm font-semibold leading-7 text-[#2f3445]">{pair.label}</div>
                <select
                  value={exerciseThreeAnswers[pair.id] || ""}
                  onChange={(event) =>
                    setExerciseThreeAnswers((current) => ({
                      ...current,
                      [pair.id]: event.target.value,
                    }))
                  }
                  className="h-11 rounded-2xl border border-[#dad5cd] bg-white px-4 text-sm text-[#2f3445] outline-none focus:border-[#dd7a00]"
                >
                  <option value="">Escolha</option>
                  {["A", "B", "C", "D", "E"].map((letter) => (
                    <option key={letter} value={letter}>
                      {letter}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          {areAllExerciseThreeAnswered ? (
            <div
              className={cn(
                "mt-4 rounded-[22px] border p-4 text-sm leading-7",
                isExerciseThreeCorrect
                  ? "border-emerald-300 bg-emerald-50 text-emerald-800"
                  : "border-amber-300 bg-amber-50 text-amber-900"
              )}
            >
              {isExerciseThreeCorrect
                ? "Gabarito correto: 1-C, 2-A, 3-E, 4-B, 5-D."
                : "Confira o gabarito: 1-C, 2-A, 3-E, 4-B, 5-D."}
            </div>
          ) : null}
        </motion.div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#eadfce] bg-white/90 p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <Map className="h-5 w-5 text-[#ff6a00]" />
          <p className="text-xs font-black uppercase tracking-[0.32em] text-[#d35f12]">Missão</p>
        </div>
        <h3 className="mt-3 font-serif text-[1.85rem] leading-tight text-[#1f2434]">Personalize a sua IA</h3>
        <p className="mt-3 text-[1.02rem] leading-8 text-[#374151]">
          Esse é o exercício mais importante de hoje. Não pule.
        </p>

        <div className="mt-5 space-y-3">
          {[
            "Escolha sua IA principal (ChatGPT, Claude, Gemini ou outra).",
            "Abra as configurações de personalização.",
            "Preencha com suas informações usando o template acima.",
            "Faça um pedido teste e veja a diferença.",
            "Se quiser, repita o processo em uma segunda IA.",
          ].map((item, index) => (
            <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[#ece5dc] bg-[#fcfaf7] p-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1f2434] text-sm font-black text-white">
                {index + 1}
              </div>
              <p className="text-sm leading-7 text-[#374151]">{item}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 rounded-[30px] border border-[#d7ead8] bg-[linear-gradient(135deg,#edfdf1_0%,#f7fff9_100%)] p-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.32em] text-[#15803d]">Status</p>
            <h3 className="mt-2 font-serif text-[1.85rem] leading-tight text-[#164e2c]">
              Parabéns! Dia 1 concluído.
            </h3>
            <p className="mt-3 text-[1.02rem] leading-8 text-[#2d5b3d]">
              Amanhã no Dia 2: escrever prompts que funcionam.
            </p>
          </div>

          <div className="rounded-[20px] border border-[#cce7cf] bg-white/80 px-4 py-3 text-sm font-semibold text-[#2d5b3d]">
            {progressSummary.completed}/{progressSummary.total} exercícios liberados
          </div>
        </div>

        <ContinueFooter
          label="Botão provisório: concluir e testar este Dia 1"
          helper={
            unlockedFinalButton
              ? "Tudo certo. Este botão provisório finaliza a versão do Guilherme e abre o fluxo normal de conclusão."
              : "Resolva corretamente os 3 exercícios para liberar o botão provisório de teste."
          }
          onComplete={onComplete}
          disabled={!unlockedFinalButton}
        />
      </div>
    </SectionWrapper>
  );
};

export default GuilhermeDay1Journey;
