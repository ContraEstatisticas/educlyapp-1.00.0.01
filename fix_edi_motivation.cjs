const fs = require('fs');
const dir = 'src/i18n/locales';

// Read English as fallback
const enData = JSON.parse(fs.readFileSync(dir + '/en.json'));
const fallbackEdi = enData.lesson.ediMotivation;

const frEdi = {
    almostDone: "Presque terminé ! 🎯 Vous y êtes presque !",
    halfway: "À mi-chemin ! 💪 Continuez comme ça !",
    greatJob: "Excellent travail ! ✨ Vous êtes incroyable !",
    keepGoing: "N'abandonnez pas maintenant ! 🔥 Vous pouvez le faire !",
    finalStretch: "Dernière ligne droite ! ⚡ Encore un petit effort !",
    encouragement: "Je crois en vous ! 💖 On y va ensemble !",
    yourAssistant: "votre assistant",
    almostDoneDay: "Le jour {{day}} est presque terminé ! 🎯 {{phrase}}",
    halfwayDay: "À mi-chemin du jour {{day}} ! 💪 {{phrase}}",
    finalStretchDay: "Dernière ligne droite du jour {{day}} ! ⚡ {{phrase}}",
    phrases: {
        almostDone: [
            "Vous vous en sortez très bien !",
            "Continuez, vous êtes incroyable !",
            "Presque là, vous pouvez le faire !",
            "N'abandonnez pas maintenant !",
            "Vous assurez !"
        ],
        halfway: [
            "Vous êtes génial !",
            "À mi-chemin, restez fort !",
            "Excellent progrès !",
            "Vous êtes incroyable !",
            "Continuez comme ça !"
        ],
        finalStretch: [
            "La fin est proche !",
            "Vous êtes allé si loin !",
            "Dernier effort, donnez tout !",
            "Terminez en beauté !",
            "Presque sur la ligne d'arrivée !"
        ]
    }
};

const langs = ['de', 'es', 'fr', 'it', 'ru', 'pt'];
for (const l of langs) {
    const file = dir + '/' + l + '.json';
    if (!fs.existsSync(file)) continue;
    const data = JSON.parse(fs.readFileSync(file));

    if (!data.lesson) data.lesson = {};

    // If ediMotivation is floating at the root (like it was in some versions), move it inside lesson
    if (data.ediMotivation) {
        data.lesson.ediMotivation = data.ediMotivation;
        delete data.ediMotivation;
        console.log('Moved floating ediMotivation into lesson for', l + '.json');
    }

    if (!data.lesson.ediMotivation) {
        if (l === 'fr') {
            data.lesson.ediMotivation = frEdi;
        } else {
            data.lesson.ediMotivation = fallbackEdi;
        }
        console.log('Added missing ediMotivation for', l + '.json');
    } else {
        // If it is there, check if it's missing phrases
        if (!data.lesson.ediMotivation.phrases) {
            data.lesson.ediMotivation.phrases = fallbackEdi.phrases;
            console.log('Fixed missing phrases block for', l + '.json');
        }
    }

    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
}
