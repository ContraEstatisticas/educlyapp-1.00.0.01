import fs from 'fs';
import path from 'path';

const TRANSLATIONS = {
  pt: { active: 'Ativo', locked: 'Bloqueado' },
  en: { active: 'Active', locked: 'Locked' },
  es: { active: 'Activo', locked: 'Bloqueado' },
  fr: { active: 'Actif', locked: 'Bloqué' }
};

const workingDir = process.cwd();

for (const lang of ['pt', 'en', 'es', 'fr']) {
  const filePath = path.join(workingDir, 'src', 'i18n', 'locales', lang + '.json');
  if (fs.existsSync(filePath)) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      const data = JSON.parse(content);
      if (data.dashboard) {
        if (!data.dashboard.card_status) {
          data.dashboard.card_status = {};
        }
        data.dashboard.card_status.active = (TRANSLATIONS as any)[lang].active;
        data.dashboard.card_status.locked = (TRANSLATIONS as any)[lang].locked;
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        console.log(`Updated ${lang}.json`);
      } else {
        console.log(`No dashboard object in ${lang}.json`);
      }
    } catch (err) {
      console.error(`Error processing ${lang}.json:`, err);
    }
  } else {
    console.log(`File ${filePath} not found`);
  }
}
