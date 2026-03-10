const fs = require('fs');
const path = require('path');

const dir = 'src/i18n/locales';

const translations = {
    es: {
        almostDone: "¡Falta poco! 🎯 ¡Estás casi ahí!",
        halfway: "¡Mitad completada! 💪 ¡Sigue así!",
        greatJob: "¡Excelente trabajo! ✨ ¡Lo estás haciendo increíble!",
        keepGoing: "¡No te rindas ahora! 🔥 ¡Tú puedes!",
        finalStretch: "¡Recta final! ⚡ ¡Solo un poco más!",
        encouragement: "¡Creo en ti! 💖 ¡Vamos juntos!",
        yourAssistant: "tu asistente",
        almostDoneDay: "¡El día {{day}} casi termina! 🎯 {{phrase}}",
        halfwayDay: "¡Mitad del día {{day}} completada! 💪 {{phrase}}",
        finalStretchDay: "¡Recta final del día {{day}}! ⚡ {{phrase}}",
        phrases: {
            almostDone: [
                "¡Lo estás haciendo genial!",
                "¡Sigue así, eres increíble!",
                "¡Casi ahí, tú puedes!",
                "¡No te rindas ahora!",
                "¡Estás arrasando!"
            ],
            halfway: [
                "¡Lo estás haciendo increíble!",
                "¡A mitad de camino, mantente fuerte!",
                "¡Excelente progreso!",
                "¡Eres increíble!",
                "¡Sigue así!"
            ],
            finalStretch: [
                "¡El final está cerca!",
                "¡Has llegado muy lejos!",
                "¡Último empujón, dalo todo!",
                "¡Termina con estilo!",
                "¡Casi en la línea de meta!"
            ]
        }
    },
    de: {
        almostDone: "Fast geschafft! 🎯 Du bist fast da!",
        halfway: "Hälfte geschafft! 💪 Weiter so!",
        greatJob: "Gute Arbeit! ✨ Du machst das toll!",
        keepGoing: "Gib jetzt nicht auf! 🔥 Du schaffst das!",
        finalStretch: "Endspurt! ⚡ Nur noch ein bisschen!",
        encouragement: "Ich glaube an dich! 💖 Lass uns das zusammen machen!",
        yourAssistant: "dein Assistent",
        almostDoneDay: "Tag {{day}} ist fast vorbei! 🎯 {{phrase}}",
        halfwayDay: "Die Hälfte von Tag {{day}} ist geschafft! 💪 {{phrase}}",
        finalStretchDay: "Endspurt von Tag {{day}}! ⚡ {{phrase}}",
        phrases: {
            almostDone: [
                "Du machst das großartig!",
                "Weiter so, du bist unglaublich!",
                "Fast da, du schaffst das!",
                "Gib jetzt nicht auf!",
                "Du bist fantastisch!"
            ],
            halfway: [
                "Du machst das toll!",
                "Halbzeit, bleib stark!",
                "Hervorragender Fortschritt!",
                "Du bist unglaublich!",
                "Weiter so!"
            ],
            finalStretch: [
                "Das Ende ist nah!",
                "Du bist schon so weit gekommen!",
                "Letzter Schub, gib alles!",
                "Beende es mit Stil!",
                "Fast am Ziel!"
            ]
        }
    },
    it: {
        almostDone: "Quasi finito! 🎯 Ci sei quasi!",
        halfway: "A metà dell'opera! 💪 Continua così!",
        greatJob: "Ottimo lavoro! ✨ Stai andando alla grande!",
        keepGoing: "Non mollare adesso! 🔥 Ce la puoi fare!",
        finalStretch: "Ultimo sforzo! ⚡ Ancora un po'!",
        encouragement: "Credo in te! 💖 Andiamo avanti insieme!",
        yourAssistant: "il tuo assistente",
        almostDoneDay: "Il giorno {{day}} sta per finire! 🎯 {{phrase}}",
        halfwayDay: "Siamo a metà del giorno {{day}}! 💪 {{phrase}}",
        finalStretchDay: "Ultimo sforzo del giorno {{day}}! ⚡ {{phrase}}",
        phrases: {
            almostDone: [
                "Stai andando alla grande!",
                "Continua così, sei incredibile!",
                "Ci sei quasi, ce l'hai fatta!",
                "Non mollare adesso!",
                "Stai spaccando!"
            ],
            halfway: [
                "Stai facendo un lavoro fantastico!",
                "A metà strada, tieni duro!",
                "Progresso eccellente!",
                "Sei incredibile!",
                "Continua così!"
            ],
            finalStretch: [
                "La fine è vicina!",
                "Sei arrivato così lontano!",
                "Ultimo sforzo, dai il massimo!",
                "Finisci in grande stile!",
                "Quasi al traguardo!"
            ]
        }
    },
    ru: {
        almostDone: "Почти готово! 🎯 Ты почти у цели!",
        halfway: "На полпути! 💪 Так держать!",
        greatJob: "Отличная работа! ✨ Ты молодец!",
        keepGoing: "Не сдавайся сейчас! 🔥 У тебя получится!",
        finalStretch: "Финишная прямая! ⚡ Еще совсем немного!",
        encouragement: "Я верю в тебя! 💖 Поехали вместе!",
        yourAssistant: "твой ассистент",
        almostDoneDay: "День {{day}} почти завершен! 🎯 {{phrase}}",
        halfwayDay: "Половина дня {{day}} пройдена! 💪 {{phrase}}",
        finalStretchDay: "Финишная прямая дня {{day}}! ⚡ {{phrase}}",
        phrases: {
            almostDone: [
                "У тебя отлично получается!",
                "Продолжай в том же духе, ты супер!",
                "Почти у цели, у тебя получится!",
                "Не сдавайся сейчас!",
                "Ты просто класс!"
            ],
            halfway: [
                "Ты отлично справляешься!",
                "Экватор пройден, держись!",
                "Отличный прогресс!",
                "Ты невероятен!",
                "Так держать!"
            ],
            finalStretch: [
                "Конец близок!",
                "Ты прошел такой большой путь!",
                "Последний рывок, выложись на все сто!",
                "Закончи красиво!",
                "Почти у финиша!"
            ]
        }
    }
};

for (const lang of Object.keys(translations)) {
    const filePath = path.join(dir, lang + '.json');
    if (!fs.existsSync(filePath)) continue;

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    if (!data.lesson) data.lesson = {};
    data.lesson.ediMotivation = translations[lang];

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Injected native translations for ${lang}.json`);
}
