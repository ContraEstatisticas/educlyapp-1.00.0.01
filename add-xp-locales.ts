import fs from "fs";

const LOCALES = ["pt", "en", "es", "fr"];
const TRANSLATIONS: Record<string, any> = {
  pt: {
    dailyLogin: "Login diário! 🌟",
    quizCorrect: "Quiz correto!",
    challengeComplete: "Desafio completo! 🏆 Dia {{day}}/{{total}}",
    lessonComplete: "Lição completada! 📚 Dia {{day}}/{{total}}"
  },
  en: {
    dailyLogin: "Daily login! 🌟",
    quizCorrect: "Correct quiz!",
    challengeComplete: "Challenge complete! 🏆 Day {{day}}/{{total}}",
    lessonComplete: "Lesson completed! 📚 Day {{day}}/{{total}}"
  },
  es: {
    dailyLogin: "¡Inicio de sesión diario! 🌟",
    quizCorrect: "¡Quiz correcto!",
    challengeComplete: "¡Reto completo! 🏆 Día {{day}}/{{total}}",
    lessonComplete: "¡Lección completada! 📚 Día {{day}}/{{total}}"
  },
  fr: {
    dailyLogin: "Connexion quotidienne ! 🌟",
    quizCorrect: "Quiz correct !",
    challengeComplete: "Défi complet ! 🏆 Jour {{day}}/{{total}}",
    lessonComplete: "Leçon terminée ! 📚 Jour {{day}}/{{total}}"
  }
};

for (const lang of LOCALES) {
  const filePath = `./src/i18n/locales/${lang}.json`;
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    if (!data.xp) {
      data.xp = {};
    }
    data.xp = { ...data.xp, ...TRANSLATIONS[lang] };
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
    console.log(`Updated ${lang}.json`);
  }
}
