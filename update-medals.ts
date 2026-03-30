import fs from 'fs';
import path from 'path';

const localesPath = path.join(process.cwd(), 'src', 'i18n', 'locales');
const files = ['en.json', 'pt.json', 'es.json', 'fr.json'];

const updates = {
  en: {
    title: "Medals",
    earnedCount: "{{earned}} out of {{total}} earned",
    freelancerSection: "Freelancer Trail",
    freelancerDesc: "Medals earned in the freelancer trail",
    trailSection: "28-Day Challenge",
    trailDesc: "Medals earned in the 28-day challenge",
    earnedOn: "Earned on",
    locked: "Locked"
  },
  pt: {
    title: "Minhas Medalhas",
    earnedCount: "{{earned}} de {{total}} conquistadas",
    freelancerSection: "Trilha Freelancer",
    freelancerDesc: "Medalhas conquistadas na trilha freelancer",
    trailSection: "Desafio 28 Dias",
    trailDesc: "Medalhas conquistadas no desafio de 28 dias",
    earnedOn: "Conquistada em",
    locked: "Bloqueada"
  },
  es: {
    title: "Mis Medallas",
    earnedCount: "{{earned}} de {{total}} conseguidas",
    freelancerSection: "Ruta Freelancer",
    freelancerDesc: "Medallas conseguidas en la ruta freelancer",
    trailSection: "Desafío 28 Días",
    trailDesc: "Medallas conseguidas en el desafío de 28 días",
    earnedOn: "Conseguida el",
    locked: "Bloqueada"
  },
  fr: {
    title: "Mes Médailles",
    earnedCount: "{{earned}} sur {{total}} obtenues",
    freelancerSection: "Parcours Freelancer",
    freelancerDesc: "Médailles obtenues dans le parcours freelancer",
    trailSection: "Défi 28 Jours",
    trailDesc: "Médailles obtenues dans le défi de 28 jours",
    earnedOn: "Obtenue le",
    locked: "Verrouillée"
  }
};

files.forEach(file => {
  const lang = path.basename(file, '.json');
  const filePath = path.join(localesPath, file);
  if (!fs.existsSync(filePath)) return;

  const content = fs.readFileSync(filePath, 'utf8');
  const indentMatch = content.match(/^[ \t]+/m);
  const indent = indentMatch ? indentMatch[0] : 2;

  try {
    const data = JSON.parse(content);
    
    if (!data.medals) {
      data.medals = {};
    }

    // Merge updates into data.medals
    data.medals = {
      ...data.medals,
      ...updates[lang]
    };

    fs.writeFileSync(filePath, JSON.stringify(data, null, indent), 'utf8');
    console.log(`Updated ${file}`);
  } catch (e) {
    console.error(`Error parsing ${file}:`, e);
  }
});

// Also fix Medals.tsx
const medalsFile = path.join(process.cwd(), 'src', 'pages', 'Medals.tsx');
if (fs.existsSync(medalsFile)) {
    let medalsContent = fs.readFileSync(medalsFile, 'utf8');
    medalsContent = medalsContent.replace(
        '✓ Conquistada em{" "}',
        '{t("medals.earnedOn", "Conquistada em")} '
    );
    medalsContent = medalsContent.replace(
        'Bloqueada',
        '{t("medals.locked", "Bloqueada")}'
    );
    
    // Add translation keys for medal name and description
    medalsContent = medalsContent.replace(
        '<p className="font-semibold text-foreground">{medal.name}</p>',
        '<p className="font-semibold text-foreground">{t(`medal_names.${medal.slug || medal.id}`, medal.name)}</p>'
    );
    medalsContent = medalsContent.replace(
        '<p className="text-sm text-muted-foreground">{medal.description}</p>',
        '<p className="text-sm text-muted-foreground">{t(`medal_defs.${medal.slug || medal.id}`, medal.description)}</p>'
    );
    
    fs.writeFileSync(medalsFile, medalsContent, 'utf8');
    console.log("Updated Medals.tsx");
}

