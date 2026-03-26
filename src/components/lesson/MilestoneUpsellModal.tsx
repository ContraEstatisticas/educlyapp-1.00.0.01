import { useState, useEffect } from "react";
import { X, Rocket, Sparkles, Zap, Crown, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useTranslation } from "react-i18next";
import confetti from "canvas-confetti";

// ── Days that trigger the upsell CTA ───
export const MILESTONE_DAYS = [5, 10, 15, 20, 25, 28] as const;

// ── Checkout URL for HUB de IA (from UpgradeUpsell config) ───
const AI_HUB_CHECKOUT_URL =
  "https://pay.hotmart.com/P104360708Q?off=nnp1mth1&bid=1773855842344&sck=app&utm_source=5Dtrilhas";

// ── Multilingual copy per milestone ───
interface MilestoneCopy {
  emoji: string;
  title: string;
  subtitle: string;
  body: string;
  cta: string;
  dismiss: string;
}

type LangKey = "pt" | "en" | "es" | "fr" | "de" | "it" | "ru" | "zh" | "ja" | "ko" | "ar" | "hi" | "tr" | "pl" | "nl";

// ── Feature pill labels per language ───
const featurePills: Record<LangKey, { icon: string; label: string }[]> = {
  pt: [{ icon: "🎨", label: "IA de Imagens" }, { icon: "💬", label: "Assistentes" }, { icon: "⚡", label: "Prompts Pro" }],
  en: [{ icon: "🎨", label: "AI Images" }, { icon: "💬", label: "Assistants" }, { icon: "⚡", label: "Pro Prompts" }],
  es: [{ icon: "🎨", label: "IA de Imágenes" }, { icon: "💬", label: "Asistentes" }, { icon: "⚡", label: "Prompts Pro" }],
  fr: [{ icon: "🎨", label: "IA d'Images" }, { icon: "💬", label: "Assistants" }, { icon: "⚡", label: "Prompts Pro" }],
  de: [{ icon: "🎨", label: "KI-Bilder" }, { icon: "💬", label: "Assistenten" }, { icon: "⚡", label: "Pro-Prompts" }],
  it: [{ icon: "🎨", label: "IA Immagini" }, { icon: "💬", label: "Assistenti" }, { icon: "⚡", label: "Prompt Pro" }],
  ru: [{ icon: "🎨", label: "ИИ-Изображения" }, { icon: "💬", label: "Ассистенты" }, { icon: "⚡", label: "Про-промпты" }],
  zh: [{ icon: "🎨", label: "AI 图像" }, { icon: "💬", label: "智能助手" }, { icon: "⚡", label: "专业提示词" }],
  ja: [{ icon: "🎨", label: "AI画像" }, { icon: "💬", label: "アシスタント" }, { icon: "⚡", label: "プロプロンプト" }],
  ko: [{ icon: "🎨", label: "AI 이미지" }, { icon: "💬", label: "어시스턴트" }, { icon: "⚡", label: "프로 프롬프트" }],
  ar: [{ icon: "🎨", label: "صور بالذكاء" }, { icon: "💬", label: "مساعدون" }, { icon: "⚡", label: "بروم احترافية" }],
  hi: [{ icon: "🎨", label: "AI इमेज" }, { icon: "💬", label: "असिस्टेंट" }, { icon: "⚡", label: "प्रो प्रॉम्प्ट" }],
  tr: [{ icon: "🎨", label: "AI Görseller" }, { icon: "💬", label: "Asistanlar" }, { icon: "⚡", label: "Pro Promptlar" }],
  pl: [{ icon: "🎨", label: "Obrazy AI" }, { icon: "💬", label: "Asystenci" }, { icon: "⚡", label: "Pro Prompty" }],
  nl: [{ icon: "🎨", label: "AI-Afbeeldingen" }, { icon: "💬", label: "Assistenten" }, { icon: "⚡", label: "Pro Prompts" }],
};

function getFeaturePills(lang: string) {
  const baseLang = lang.split("-")[0] as LangKey;
  return featurePills[baseLang] || featurePills.en;
}

const milestoneCopy: Record<LangKey, Record<number, MilestoneCopy>> = {
  pt: {
    5: {
      emoji: "🔥",
      title: "5 dias concluídos!",
      subtitle: "Você está no caminho certo!",
      body: "Poucos chegam até aqui. Imagine o que você conseguirá com o Hub de IA — assistentes inteligentes que aceleram sua evolução e te colocam na frente.",
      cta: "Quero o Hub de IA",
      dismiss: "Agora não",
    },
    10: {
      emoji: "⚡",
      title: "10 dias de dedicação!",
      subtitle: "Seu comprometimento é inspirador!",
      body: "Você já domina os conceitos básicos. Com o Hub de IA, você vai aplicar tudo isso com assistentes que criam imagens, prompts e tiram dúvidas em tempo real.",
      cta: "Desbloquear Hub de IA",
      dismiss: "Talvez depois",
    },
    15: {
      emoji: "🚀",
      title: "Metade do caminho conquistada!",
      subtitle: "15 dias de pura evolução!",
      body: "Você está na metade e seu progresso é impressionante. O Hub de IA vai potencializar tudo que você aprendeu — chegou a hora de dar o próximo passo.",
      cta: "Potencializar com Hub de IA",
      dismiss: "Continuar sem",
    },
    20: {
      emoji: "💎",
      title: "20 dias incríveis!",
      subtitle: "Você é um(a) profissional em formação!",
      body: "Faltam apenas 8 dias para a conclusão. Quem tem o Hub de IA aprende até 3x mais rápido com assistentes exclusivos. Não fique de fora!",
      cta: "Garantir meu Hub de IA",
      dismiss: "Depois vejo",
    },
    25: {
      emoji: "🏆",
      title: "25 dias conquistados!",
      subtitle: "Você está quase lá, campeão(a)!",
      body: "Faltam apenas 3 dias! Os melhores alunos da plataforma já usam o Hub de IA para ir além. Junte-se a eles e domine todas as ferramentas.",
      cta: "Ir além com Hub de IA",
      dismiss: "Finalizar sem",
    },
    28: {
      emoji: "👑",
      title: "Desafio completo! 28 dias!",
      subtitle: "Você é uma lenda da IA!",
      body: "Você completou toda a jornada — parabéns! Agora é hora de dominar o próximo nível. O Hub de IA tem tudo para te levar ainda mais longe.",
      cta: "Começar o próximo nível",
      dismiss: "Celebrar e fechar",
    },
  },
  en: {
    5: {
      emoji: "🔥",
      title: "5 days completed!",
      subtitle: "You're on the right track!",
      body: "Few people get this far. Imagine what you could achieve with the AI Hub — smart assistants that accelerate your growth and put you ahead.",
      cta: "Get the AI Hub",
      dismiss: "Not now",
    },
    10: {
      emoji: "⚡",
      title: "10 days of dedication!",
      subtitle: "Your commitment is inspiring!",
      body: "You've already mastered the basics. With the AI Hub, you'll apply everything with assistants that create images, prompts, and answer questions in real time.",
      cta: "Unlock AI Hub",
      dismiss: "Maybe later",
    },
    15: {
      emoji: "🚀",
      title: "Halfway there!",
      subtitle: "15 days of pure evolution!",
      body: "You're halfway through and your progress is impressive. The AI Hub will supercharge everything you've learned — it's time for the next step.",
      cta: "Supercharge with AI Hub",
      dismiss: "Continue without",
    },
    20: {
      emoji: "💎",
      title: "20 incredible days!",
      subtitle: "You're becoming a pro!",
      body: "Only 8 days left. Those with the AI Hub learn up to 3x faster with exclusive assistants. Don't miss out!",
      cta: "Get my AI Hub",
      dismiss: "I'll check later",
    },
    25: {
      emoji: "🏆",
      title: "25 days conquered!",
      subtitle: "Almost there, champion!",
      body: "Only 3 days left! The top students already use the AI Hub to go beyond. Join them and master all the tools.",
      cta: "Go beyond with AI Hub",
      dismiss: "Finish without",
    },
    28: {
      emoji: "👑",
      title: "Challenge complete! 28 days!",
      subtitle: "You're an AI legend!",
      body: "You've completed the entire journey — congratulations! Now it's time to master the next level. The AI Hub has everything to take you even further.",
      cta: "Start the next level",
      dismiss: "Celebrate and close",
    },
  },
  es: {
    5: {
      emoji: "🔥",
      title: "¡5 días completados!",
      subtitle: "¡Vas por buen camino!",
      body: "Pocos llegan hasta aquí. Imagina lo que lograrás con el Hub de IA — asistentes inteligentes que aceleran tu evolución.",
      cta: "Quiero el Hub de IA",
      dismiss: "Ahora no",
    },
    10: {
      emoji: "⚡",
      title: "¡10 días de dedicación!",
      subtitle: "¡Tu compromiso es inspirador!",
      body: "Ya dominas los conceptos básicos. Con el Hub de IA, aplicarás todo con asistentes que crean imágenes, prompts y resuelven dudas en tiempo real.",
      cta: "Desbloquear Hub de IA",
      dismiss: "Quizás después",
    },
    15: {
      emoji: "🚀",
      title: "¡Mitad del camino conquistada!",
      subtitle: "¡15 días de pura evolución!",
      body: "Estás en la mitad y tu progreso es impresionante. El Hub de IA potenciará todo lo que has aprendido — es hora del siguiente paso.",
      cta: "Potenciar con Hub de IA",
      dismiss: "Continuar sin",
    },
    20: {
      emoji: "💎",
      title: "¡20 días increíbles!",
      subtitle: "¡Te estás convirtiendo en un profesional!",
      body: "Solo faltan 8 días. Los que tienen el Hub de IA aprenden hasta 3 veces más rápido. ¡No te quedes fuera!",
      cta: "Garantizar mi Hub de IA",
      dismiss: "Después veo",
    },
    25: {
      emoji: "🏆",
      title: "¡25 días conquistados!",
      subtitle: "¡Ya casi llegas, campeón(a)!",
      body: "¡Solo faltan 3 días! Los mejores alumnos ya usan el Hub de IA para ir más allá. Únete a ellos.",
      cta: "Ir más allá con Hub de IA",
      dismiss: "Finalizar sin",
    },
    28: {
      emoji: "👑",
      title: "¡Desafio completo! ¡28 días!",
      subtitle: "¡Eres una leyenda de la IA!",
      body: "Completaste toda la jornada — ¡felicidades! Ahora es hora de dominar el siguiente nivel con el Hub de IA.",
      cta: "Comenzar el siguiente nivel",
      dismiss: "Celebrar y cerrar",
    },
  },
  fr: {
    5: {
      emoji: "🔥",
      title: "5 jours terminés !",
      subtitle: "Vous êtes sur la bonne voie !",
      body: "Peu de personnes arrivent jusque-là. Imaginez ce que vous pourriez accomplir avec le Hub IA — des assistants intelligents qui accélèrent votre progression.",
      cta: "Je veux le Hub IA",
      dismiss: "Pas maintenant",
    },
    10: {
      emoji: "⚡",
      title: "10 jours de dévouement !",
      subtitle: "Votre engagement est inspirant !",
      body: "Vous maîtrisez déjà les bases. Avec le Hub IA, vous appliquerez tout avec des assistants qui créent des images, des prompts et répondent en temps réel.",
      cta: "Débloquer le Hub IA",
      dismiss: "Peut-être plus tard",
    },
    15: {
      emoji: "🚀",
      title: "La moitié du chemin conquise !",
      subtitle: "15 jours de pure évolution !",
      body: "Vous êtes à mi-chemin et votre progression est impressionnante. Le Hub IA va décupler tout ce que vous avez appris.",
      cta: "Booster avec le Hub IA",
      dismiss: "Continuer sans",
    },
    20: {
      emoji: "💎",
      title: "20 jours incroyables !",
      subtitle: "Vous devenez un(e) pro !",
      body: "Plus que 8 jours. Ceux qui ont le Hub IA apprennent jusqu'à 3 fois plus vite avec des assistants exclusifs.",
      cta: "Obtenir mon Hub IA",
      dismiss: "Je verrai plus tard",
    },
    25: {
      emoji: "🏆",
      title: "25 jours conquis !",
      subtitle: "Presque là, champion(ne) !",
      body: "Plus que 3 jours ! Les meilleurs élèves utilisent déjà le Hub IA pour aller plus loin. Rejoignez-les.",
      cta: "Aller plus loin avec le Hub IA",
      dismiss: "Finir sans",
    },
    28: {
      emoji: "👑",
      title: "Défi terminé ! 28 jours !",
      subtitle: "Vous êtes une légende de l'IA !",
      body: "Vous avez terminé tout le parcours — félicitations ! Il est temps de maîtriser le niveau suivant avec le Hub IA.",
      cta: "Commencer le niveau suivant",
      dismiss: "Célébrer et fermer",
    },
  },
  de: {
    5: { emoji: "🔥", title: "5 Tage geschafft!", subtitle: "Du bist auf dem richtigen Weg!", body: "Wenige kommen so weit. Stell dir vor, was du mit dem KI-Hub erreichen kannst — smarte Assistenten, die dein Wachstum beschleunigen.", cta: "KI-Hub freischalten", dismiss: "Nicht jetzt" },
    10: { emoji: "⚡", title: "10 Tage Hingabe!", subtitle: "Dein Engagement ist inspirierend!", body: "Du beherrschst bereits die Grundlagen. Mit dem KI-Hub wendest du alles mit Assistenten an, die Bilder, Prompts erstellen und Fragen in Echtzeit beantworten.", cta: "KI-Hub freischalten", dismiss: "Vielleicht später" },
    15: { emoji: "🚀", title: "Halbzeit geschafft!", subtitle: "15 Tage pure Entwicklung!", body: "Du bist auf halbem Weg und dein Fortschritt ist beeindruckend. Der KI-Hub wird alles, was du gelernt hast, verstärken.", cta: "Mit KI-Hub durchstarten", dismiss: "Ohne weitermachen" },
    20: { emoji: "💎", title: "20 unglaubliche Tage!", subtitle: "Du wirst zum Profi!", body: "Nur noch 8 Tage. Mit dem KI-Hub lernst du bis zu 3x schneller mit exklusiven Assistenten. Verpasse es nicht!", cta: "Meinen KI-Hub sichern", dismiss: "Später ansehen" },
    25: { emoji: "🏆", title: "25 Tage geschafft!", subtitle: "Fast am Ziel, Champion!", body: "Nur noch 3 Tage! Die besten Schüler nutzen bereits den KI-Hub. Schließe dich ihnen an.", cta: "Mit KI-Hub weiterkommen", dismiss: "Ohne abschließen" },
    28: { emoji: "👑", title: "Challenge komplett! 28 Tage!", subtitle: "Du bist eine KI-Legende!", body: "Du hast die gesamte Reise abgeschlossen — Glückwunsch! Jetzt ist es Zeit, das nächste Level mit dem KI-Hub zu meistern.", cta: "Nächstes Level starten", dismiss: "Feiern und schließen" },
  },
  it: {
    5: { emoji: "🔥", title: "5 giorni completati!", subtitle: "Sei sulla strada giusta!", body: "Pochi arrivano fin qui. Immagina cosa potresti ottenere con l'Hub IA — assistenti intelligenti che accelerano la tua crescita.", cta: "Voglio l'Hub IA", dismiss: "Non ora" },
    10: { emoji: "⚡", title: "10 giorni di dedizione!", subtitle: "Il tuo impegno è ispirante!", body: "Hai già padroneggiato le basi. Con l'Hub IA, applicherai tutto con assistenti che creano immagini, prompt e rispondono in tempo reale.", cta: "Sblocca Hub IA", dismiss: "Forse dopo" },
    15: { emoji: "🚀", title: "Metà percorso conquistata!", subtitle: "15 giorni di pura evoluzione!", body: "Sei a metà strada e i tuoi progressi sono impressionanti. L'Hub IA potenzierà tutto ciò che hai imparato.", cta: "Potenzia con Hub IA", dismiss: "Continua senza" },
    20: { emoji: "💎", title: "20 giorni incredibili!", subtitle: "Stai diventando un professionista!", body: "Mancano solo 8 giorni. Chi ha l'Hub IA impara fino a 3 volte più velocemente. Non restare fuori!", cta: "Ottieni il mio Hub IA", dismiss: "Vedrò dopo" },
    25: { emoji: "🏆", title: "25 giorni conquistati!", subtitle: "Quasi arrivato, campione!", body: "Mancano solo 3 giorni! I migliori studenti usano già l'Hub IA per andare oltre. Unisciti a loro.", cta: "Vai oltre con Hub IA", dismiss: "Termina senza" },
    28: { emoji: "👑", title: "Sfida completata! 28 giorni!", subtitle: "Sei una leggenda dell'IA!", body: "Hai completato l'intero percorso — complimenti! Ora è il momento di padroneggiare il livello successivo con l'Hub IA.", cta: "Inizia il prossimo livello", dismiss: "Festeggia e chiudi" },
  },
  ru: {
    5: { emoji: "🔥", title: "5 дней пройдено!", subtitle: "Вы на верном пути!", body: "Мало кто доходит так далеко. Представьте, чего вы достигнете с ИИ-Хабом — умные ассистенты ускорят ваш рост.", cta: "Получить ИИ-Хаб", dismiss: "Не сейчас" },
    10: { emoji: "⚡", title: "10 дней упорства!", subtitle: "Ваша преданность вдохновляет!", body: "Вы уже освоили основы. С ИИ-Хабом вы примените всё с ассистентами, которые создают изображения, промпты и отвечают в реальном времени.", cta: "Разблокировать ИИ-Хаб", dismiss: "Может позже" },
    15: { emoji: "🚀", title: "Полпути пройдено!", subtitle: "15 дней чистого прогресса!", body: "Вы на полпути, и ваш прогресс впечатляет. ИИ-Хаб усилит всё, чему вы научились.", cta: "Усилить с ИИ-Хабом", dismiss: "Продолжить без" },
    20: { emoji: "💎", title: "20 невероятных дней!", subtitle: "Вы становитесь профессионалом!", body: "Осталось всего 8 дней. С ИИ-Хабом учатся до 3 раз быстрее. Не упустите!", cta: "Получить мой ИИ-Хаб", dismiss: "Посмотрю позже" },
    25: { emoji: "🏆", title: "25 дней пройдено!", subtitle: "Почти у цели, чемпион!", body: "Осталось всего 3 дня! Лучшие ученики уже используют ИИ-Хаб. Присоединяйтесь.", cta: "Пойти дальше с ИИ-Хабом", dismiss: "Завершить без" },
    28: { emoji: "👑", title: "Челлендж завершён! 28 дней!", subtitle: "Вы легенда ИИ!", body: "Вы прошли весь путь — поздравляем! Пора освоить следующий уровень с ИИ-Хабом.", cta: "Начать следующий уровень", dismiss: "Отпраздновать и закрыть" },
  },
  zh: {
    5: { emoji: "🔥", title: "完成5天！", subtitle: "你走在正确的道路上！", body: "很少有人走到这一步。想象一下使用AI Hub你能取得什么成就——智能助手加速你的成长。", cta: "获取AI Hub", dismiss: "暂时不要" },
    10: { emoji: "⚡", title: "10天的坚持！", subtitle: "你的投入令人鼓舞！", body: "你已经掌握了基础。有了AI Hub，你将使用能创建图像、提示词和实时回答问题的助手。", cta: "解锁AI Hub", dismiss: "以后再说" },
    15: { emoji: "🚀", title: "征服了一半的路程！", subtitle: "15天的纯粹进化！", body: "你已经走了一半，进步令人印象深刻。AI Hub将增强你所学的一切。", cta: "用AI Hub提升", dismiss: "继续不用" },
    20: { emoji: "💎", title: "20天的不可思议！", subtitle: "你正在成为专业人士！", body: "只剩8天。拥有AI Hub的用户学习速度快3倍。不要错过！", cta: "获取我的AI Hub", dismiss: "稍后再看" },
    25: { emoji: "🏆", title: "征服25天！", subtitle: "冠军，你快到了！", body: "只剩3天！顶尖学生已经在使用AI Hub。加入他们吧。", cta: "用AI Hub更进一步", dismiss: "不用完成" },
    28: { emoji: "👑", title: "挑战完成！28天！", subtitle: "你是AI传奇！", body: "你完成了整个旅程——恭喜！现在是时候用AI Hub掌握下一个级别了。", cta: "开始下一级别", dismiss: "庆祝并关闭" },
  },
  ja: {
    5: { emoji: "🔥", title: "5日完了！", subtitle: "正しい道を歩んでいます！", body: "ここまで来る人は少ないです。AIハブで何を達成できるか想像してみてください。", cta: "AIハブを入手", dismiss: "今はいい" },
    10: { emoji: "⚡", title: "10日間の献身！", subtitle: "あなたの取り組みは素晴らしい！", body: "基礎はすでにマスターしました。AIハブで画像やプロンプトを作成し、リアルタイムで質問に答えるアシスタントを活用しましょう。", cta: "AIハブを解放", dismiss: "後で" },
    15: { emoji: "🚀", title: "半分達成！", subtitle: "15日間の純粋な進化！", body: "折り返し地点に到達しました。AIハブは学んだすべてを強化します。", cta: "AIハブでパワーアップ", dismiss: "なしで続ける" },
    20: { emoji: "💎", title: "素晴らしい20日間！", subtitle: "プロになりつつあります！", body: "残り8日。AIハブを持つ人は最大3倍速く学びます。お見逃しなく！", cta: "AIハブを確保", dismiss: "後で確認" },
    25: { emoji: "🏆", title: "25日達成！", subtitle: "もうすぐです、チャンピオン！", body: "残り3日！トップの学生はすでにAIハブを使っています。仲間に加わりましょう。", cta: "AIハブでさらに先へ", dismiss: "なしで完了" },
    28: { emoji: "👑", title: "チャレンジ完了！28日！", subtitle: "あなたはAIの伝説です！", body: "全行程を完了しました——おめでとうございます！AIハブで次のレベルをマスターしましょう。", cta: "次のレベルを開始", dismiss: "祝って閉じる" },
  },
  ko: {
    5: { emoji: "🔥", title: "5일 완료!", subtitle: "올바른 길을 가고 있어요!", body: "여기까지 오는 사람은 많지 않습니다. AI 허브로 무엇을 달성할 수 있을지 상상해 보세요.", cta: "AI 허브 받기", dismiss: "지금은 괜찮아요" },
    10: { emoji: "⚡", title: "10일간의 헌신!", subtitle: "당신의 노력은 영감을 줍니다!", body: "기초를 이미 마스터했습니다. AI 허브로 이미지, 프롬프트를 만들고 실시간으로 질문에 답하는 어시스턴트를 활용하세요.", cta: "AI 허브 잠금 해제", dismiss: "나중에" },
    15: { emoji: "🚀", title: "절반 달성!", subtitle: "15일간의 순수한 발전!", body: "절반을 왔고 진전이 인상적입니다. AI 허브가 배운 모든 것을 강화할 것입니다.", cta: "AI 허브로 강화하기", dismiss: "없이 계속" },
    20: { emoji: "💎", title: "놀라운 20일!", subtitle: "프로가 되어가고 있어요!", body: "8일만 남았습니다. AI 허브가 있는 사람들은 3배 빠르게 배웁니다. 놓치지 마세요!", cta: "내 AI 허브 확보", dismiss: "나중에 확인" },
    25: { emoji: "🏆", title: "25일 정복!", subtitle: "거의 다 왔어요, 챔피언!", body: "3일만 남았습니다! 최고의 학생들은 이미 AI 허브를 사용합니다. 합류하세요.", cta: "AI 허브로 더 나아가기", dismiss: "없이 완료" },
    28: { emoji: "👑", title: "챌린지 완료! 28일!", subtitle: "당신은 AI 전설입니다!", body: "전체 여정을 완료했습니다 — 축하합니다! AI 허브로 다음 레벨을 마스터할 시간입니다.", cta: "다음 레벨 시작", dismiss: "축하하고 닫기" },
  },
  ar: {
    5: { emoji: "🔥", title: "٥ أيام مكتملة!", subtitle: "أنت على الطريق الصحيح!", body: "قليلون يصلون إلى هنا. تخيل ما يمكنك تحقيقه مع مركز الذكاء الاصطناعي — مساعدون أذكياء يسرعون نموك.", cta: "احصل على مركز AI", dismiss: "ليس الآن" },
    10: { emoji: "⚡", title: "١٠ أيام من التفاني!", subtitle: "التزامك ملهم!", body: "لقد أتقنت الأساسيات. مع مركز AI ستطبق كل شيء مع مساعدين ينشئون صوراً ويجيبون في الوقت الفعلي.", cta: "افتح مركز AI", dismiss: "ربما لاحقاً" },
    15: { emoji: "🚀", title: "نصف الطريق تم!", subtitle: "١٥ يوماً من التطور!", body: "أنت في المنتصف وتقدمك مذهل. مركز AI سيعزز كل ما تعلمته.", cta: "عزز مع مركز AI", dismiss: "استمر بدونه" },
    20: { emoji: "💎", title: "٢٠ يوماً مذهلاً!", subtitle: "أنت تصبح محترفاً!", body: "بقي ٨ أيام فقط. مع مركز AI تتعلم أسرع ٣ مرات. لا تفوت الفرصة!", cta: "احصل على مركز AI", dismiss: "سأراجع لاحقاً" },
    25: { emoji: "🏆", title: "٢٥ يوماً مكتملة!", subtitle: "أنت قريب جداً يا بطل!", body: "بقي ٣ أيام فقط! أفضل الطلاب يستخدمون مركز AI بالفعل. انضم إليهم.", cta: "تقدم مع مركز AI", dismiss: "أنهِ بدونه" },
    28: { emoji: "👑", title: "التحدي مكتمل! ٢٨ يوماً!", subtitle: "أنت أسطورة في AI!", body: "أكملت الرحلة كاملة — تهانينا! حان وقت إتقان المستوى التالي مع مركز AI.", cta: "ابدأ المستوى التالي", dismiss: "احتفل وأغلق" },
  },
  hi: {
    5: { emoji: "🔥", title: "5 दिन पूरे!", subtitle: "आप सही राह पर हैं!", body: "बहुत कम लोग यहाँ तक पहुँचते हैं। AI Hub के साथ आप क्या हासिल कर सकते हैं, कल्पना करें — स्मार्ट असिस्टेंट जो आपकी प्रगति को तेज़ करते हैं।", cta: "AI Hub पाएं", dismiss: "अभी नहीं" },
    10: { emoji: "⚡", title: "10 दिन की लगन!", subtitle: "आपकी प्रतिबद्धता प्रेरणादायक है!", body: "आपने पहले ही बुनियादी बातें सीख ली हैं। AI Hub के साथ इमेज, प्रॉम्प्ट बनाने वाले और रियल-टाइम सवालों के जवाब देने वाले असिस्टेंट का उपयोग करें।", cta: "AI Hub अनलॉक करें", dismiss: "बाद में" },
    15: { emoji: "🚀", title: "आधा रास्ता तय!", subtitle: "15 दिन की शुद्ध प्रगति!", body: "आप आधे रास्ते पर हैं और आपकी प्रगति प्रभावशाली है। AI Hub आपने जो सीखा है उसे और मज़बूत करेगा।", cta: "AI Hub से बूस्ट करें", dismiss: "बिना जारी रखें" },
    20: { emoji: "💎", title: "20 अविश्वसनीय दिन!", subtitle: "आप प्रो बन रहे हैं!", body: "सिर्फ 8 दिन बाकी। AI Hub वाले 3 गुना तेज़ी से सीखते हैं। मौका मत छोड़ें!", cta: "मेरा AI Hub पाएं", dismiss: "बाद में देखूंगा" },
    25: { emoji: "🏆", title: "25 दिन पूरे!", subtitle: "चैंपियन, लगभग पहुँच गए!", body: "सिर्फ 3 दिन बाकी! सर्वश्रेष्ठ छात्र पहले से AI Hub उपयोग कर रहे हैं। उनसे जुड़ें।", cta: "AI Hub से आगे बढ़ें", dismiss: "बिना पूरा करें" },
    28: { emoji: "👑", title: "चैलेंज पूरा! 28 दिन!", subtitle: "आप AI लीजेंड हैं!", body: "आपने पूरी यात्रा पूरी की — बधाई! अब AI Hub के साथ अगला स्तर मास्टर करने का समय है।", cta: "अगला स्तर शुरू करें", dismiss: "जश्न मनाएं और बंद करें" },
  },
  tr: {
    5: { emoji: "🔥", title: "5 gün tamamlandı!", subtitle: "Doğru yoldasın!", body: "Buraya kadar gelen az kişi var. AI Hub ile neler başarabileceğini hayal et — büyümeni hızlandıran akıllı asistanlar.", cta: "AI Hub'ı Al", dismiss: "Şimdi değil" },
    10: { emoji: "⚡", title: "10 gün adanmışlık!", subtitle: "Bağlılığın ilham verici!", body: "Temelleri zaten öğrendin. AI Hub ile görüntü, prompt oluşturan ve gerçek zamanlı yanıt veren asistanlarla her şeyi uygula.", cta: "AI Hub'ı Aç", dismiss: "Belki sonra" },
    15: { emoji: "🚀", title: "Yarı yol tamam!", subtitle: "15 gün saf gelişim!", body: "Yarı yoldasın ve ilerlemeniz etkileyici. AI Hub öğrendiğin her şeyi güçlendirecek.", cta: "AI Hub ile güçlen", dismiss: "Onsuz devam et" },
    20: { emoji: "💎", title: "20 inanılmaz gün!", subtitle: "Profesyonel oluyorsun!", body: "Sadece 8 gün kaldı. AI Hub ile 3 kat daha hızlı öğrenirsin. Kaçırma!", cta: "AI Hub'ımı Al", dismiss: "Sonra bakarım" },
    25: { emoji: "🏆", title: "25 gün tamamlandı!", subtitle: "Neredeyse oradasın, şampiyon!", body: "Sadece 3 gün kaldı! En iyi öğrenciler zaten AI Hub kullanıyor. Onlara katıl.", cta: "AI Hub ile ileri git", dismiss: "Onsuz bitir" },
    28: { emoji: "👑", title: "Meydan okuma tamamlandı! 28 gün!", subtitle: "Sen bir AI efsanesisin!", body: "Tüm yolculuğu tamamladın — tebrikler! AI Hub ile bir sonraki seviyeyi fethetme zamanı.", cta: "Sonraki seviyeyi başlat", dismiss: "Kutla ve kapat" },
  },
  pl: {
    5: { emoji: "🔥", title: "5 dni ukończone!", subtitle: "Jesteś na dobrej drodze!", body: "Niewielu dochodzi tak daleko. Wyobraź sobie, co osiągniesz z Hubem AI — inteligentni asystenci przyspieszą Twój rozwój.", cta: "Chcę Hub AI", dismiss: "Nie teraz" },
    10: { emoji: "⚡", title: "10 dni poświęcenia!", subtitle: "Twoje zaangażowanie jest inspirujące!", body: "Opanowałeś już podstawy. Z Hubem AI zastosujesz wszystko z asystentami tworzącymi obrazy, prompty i odpowiadającymi w czasie rzeczywistym.", cta: "Odblokuj Hub AI", dismiss: "Może później" },
    15: { emoji: "🚀", title: "Połowa drogi za Tobą!", subtitle: "15 dni czystego rozwoju!", body: "Jesteś w połowie drogi, a Twój postęp jest imponujący. Hub AI wzmocni wszystko, czego się nauczyłeś.", cta: "Wzmocnij z Hub AI", dismiss: "Kontynuuj bez" },
    20: { emoji: "💎", title: "20 niesamowitych dni!", subtitle: "Stajesz się profesjonalistą!", body: "Zostało tylko 8 dni. Z Hubem AI uczysz się do 3 razy szybciej. Nie przegap!", cta: "Zdobądź mój Hub AI", dismiss: "Sprawdzę później" },
    25: { emoji: "🏆", title: "25 dni ukończone!", subtitle: "Prawie u celu, mistrzu!", body: "Zostały tylko 3 dni! Najlepsi uczniowie już korzystają z Huba AI. Dołącz do nich.", cta: "Idź dalej z Hub AI", dismiss: "Zakończ bez" },
    28: { emoji: "👑", title: "Wyzwanie ukończone! 28 dni!", subtitle: "Jesteś legendą AI!", body: "Ukończyłeś całą podróż — gratulacje! Czas opanować następny poziom z Hubem AI.", cta: "Rozpocznij następny poziom", dismiss: "Świętuj i zamknij" },
  },
  nl: {
    5: { emoji: "🔥", title: "5 dagen voltooid!", subtitle: "Je bent op de goede weg!", body: "Weinigen komen zo ver. Stel je voor wat je kunt bereiken met de AI Hub — slimme assistenten die je groei versnellen.", cta: "AI Hub krijgen", dismiss: "Nu niet" },
    10: { emoji: "⚡", title: "10 dagen toewijding!", subtitle: "Je inzet is inspirerend!", body: "Je beheerst al de basis. Met de AI Hub pas je alles toe met assistenten die afbeeldingen, prompts maken en realtime vragen beantwoorden.", cta: "AI Hub ontgrendelen", dismiss: "Misschien later" },
    15: { emoji: "🚀", title: "Halverwege!", subtitle: "15 dagen pure ontwikkeling!", body: "Je bent halverwege en je voortgang is indrukwekkend. De AI Hub versterkt alles wat je hebt geleerd.", cta: "Versterken met AI Hub", dismiss: "Doorgaan zonder" },
    20: { emoji: "💎", title: "20 ongelooflijke dagen!", subtitle: "Je wordt een pro!", body: "Nog maar 8 dagen. Met de AI Hub leer je tot 3x sneller. Mis het niet!", cta: "Mijn AI Hub veiligstellen", dismiss: "Later bekijken" },
    25: { emoji: "🏆", title: "25 dagen voltooid!", subtitle: "Bijna daar, kampioen!", body: "Nog maar 3 dagen! De beste studenten gebruiken al de AI Hub. Sluit je aan.", cta: "Verder met AI Hub", dismiss: "Afronden zonder" },
    28: { emoji: "👑", title: "Uitdaging voltooid! 28 dagen!", subtitle: "Je bent een AI-legende!", body: "Je hebt de hele reis voltooid — gefeliciteerd! Tijd om het volgende niveau te beheersen met de AI Hub.", cta: "Volgend niveau starten", dismiss: "Vieren en sluiten" },
  },
};

// ── Pick the icon per milestone ───
const milestoneIcons: Record<number, React.ElementType> = {
  5: Zap,
  10: Star,
  15: Rocket,
  20: Sparkles,
  25: Crown,
  28: Crown,
};

function getCopy(lang: string, day: number): MilestoneCopy {
  const baseLang = lang.split("-")[0] as LangKey;
  const langCopy = milestoneCopy[baseLang] || milestoneCopy.pt;
  return langCopy[day] || langCopy[5];
}

// ── Props ───
interface MilestoneUpsellModalProps {
  dayNumber: number;
  isOpen: boolean;
  onClose: () => void;
}

export const MilestoneUpsellModal = ({
  dayNumber,
  isOpen,
  onClose,
}: MilestoneUpsellModalProps) => {
  const { i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Tiny delay for CSS animation
      requestAnimationFrame(() => setIsVisible(true));

      // Celebratory confetti burst
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.35 },
        colors: ["#6366f1", "#8b5cf6", "#a78bfa", "#fbbf24", "#22c55e"],
      });
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const copy = getCopy(i18n.resolvedLanguage || i18n.language, dayNumber);
  const Icon = milestoneIcons[dayNumber] || Rocket;
  const progress = Math.round((dayNumber / 28) * 100);

  const handleCTA = () => {
    window.open(AI_HUB_CHECKOUT_URL, "_blank");
    onClose();
  };

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center p-4 transition-all duration-500",
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={cn(
          "relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card shadow-2xl transition-all duration-500",
          isVisible ? "scale-100 translate-y-0" : "scale-90 translate-y-8"
        )}
      >
        {/* Gradient header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 px-6 pt-8 pb-10 text-white text-center">
          {/* Decorative circles */}
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/10 blur-xl" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/15 hover:bg-white/25 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Icon badge */}
          <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm mb-4 shadow-lg ring-4 ring-white/10">
            <span className="text-4xl">{copy.emoji}</span>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold tracking-tight mb-1 drop-shadow-sm">
            {copy.title}
          </h2>
          <p className="text-white/85 text-sm font-medium">
            {copy.subtitle}
          </p>

          {/* Mini progress bar */}
          <div className="mt-5 mx-auto max-w-[200px]">
            <div className="h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full rounded-full bg-white/90 transition-all duration-1000 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1.5 text-[11px] text-white/70 font-semibold tracking-wide">
              {dayNumber}/28 ({progress}%)
            </p>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 space-y-5">
          <p className="text-sm text-muted-foreground leading-relaxed text-center">
            {copy.body}
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {getFeaturePills(i18n.resolvedLanguage || i18n.language).map((f, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 rounded-full bg-violet-50 dark:bg-violet-950/40 px-3 py-1.5 text-xs font-semibold text-violet-700 dark:text-violet-300 border border-violet-100 dark:border-violet-800/50"
              >
                <span>{f.icon}</span>
                {f.label}
              </span>
            ))}
          </div>

          {/* CTA button */}
          <Button
            onClick={handleCTA}
            className="w-full h-14 rounded-2xl text-base font-bold bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white shadow-lg shadow-violet-500/25 transition-all hover:shadow-xl hover:shadow-violet-500/30 hover:-translate-y-0.5 group"
          >
            <Icon className="w-5 h-5 mr-2 transition-transform group-hover:scale-110" />
            {copy.cta}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          {/* Dismiss */}
          <button
            onClick={onClose}
            className="w-full text-center text-xs text-muted-foreground hover:text-foreground transition-colors py-1"
          >
            {copy.dismiss}
          </button>
        </div>
      </div>
    </div>
  );
};
