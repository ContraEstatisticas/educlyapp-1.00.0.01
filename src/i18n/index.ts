import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import pt from './locales/pt.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import en from './locales/en.json';
import de from './locales/de.json';
import it from './locales/it.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';
import ja from './locales/ja.json';
import ko from './locales/ko.json';
import ar from './locales/ar.json';
import hi from './locales/hi.json';
import tr from './locales/tr.json';
import pl from './locales/pl.json';
import nl from './locales/nl.json';

// Lesson content is loaded lazily in useTranslatedLessonContent hook
// to avoid blocking initial app load

const resources = {
  en: { translation: en },
  pt: { translation: pt },
  es: { translation: es },
  fr: { translation: fr },
  de: { translation: de },
  it: { translation: it },
  ru: { translation: ru },
  zh: { translation: zh },
  ja: { translation: ja },
  ko: { translation: ko },
  ar: { translation: ar },
  hi: { translation: hi },
  tr: { translation: tr },
  pl: { translation: pl },
  nl: { translation: nl },
};

// Custom language detector that uses timezone to detect Brazilian users
const timezoneDetector = {
  name: 'timezoneDetector',
  lookup() {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const brazil = [
        'America/Sao_Paulo','America/Rio_Branco','America/Manaus','America/Cuiaba','America/Fortaleza','America/Recife','America/Belem','America/Bahia','America/Maceio','America/Campo_Grande','America/Porto_Velho','America/Boa_Vista','America/Noronha','America/Araguaina','America/Santarem','America/Eirunepe',
      ];
      const spanish = [
        'Europe/Madrid','Atlantic/Canary','Africa/Ceuta',
        'America/Mexico_City','America/Bogota','America/Lima','America/Santiago','America/Caracas','America/Montevideo','America/Guayaquil','America/La_Paz','America/Havana','America/Tegucigalpa','America/Managua','America/Santo_Domingo','America/Asuncion','America/San_Juan',
      ];
      const french = [
        'Europe/Paris','America/Toronto','America/Montreal','Europe/Brussels','Europe/Luxembourg',
        'Africa/Abidjan','Africa/Dakar','Africa/Casablanca','Africa/Tunis','Africa/Algiers','Indian/Reunion',
      ];
      const german = [
        'Europe/Berlin','Europe/Vienna','Europe/Zurich',
      ];
      if (brazil.includes(timezone)) return 'pt';
      if (spanish.includes(timezone)) return 'es';
      if (french.includes(timezone)) return 'fr';
      if (german.includes(timezone)) return 'de';
      const nav = navigator.language || '';
      if (nav.startsWith('pt')) return 'pt';
      if (nav.startsWith('es')) return 'es';
      if (nav.startsWith('fr')) return 'fr';
      if (nav.startsWith('de')) return 'de';
    } catch {
      return undefined;
    }
    return undefined;
  },
  cacheUserLanguage() {},
};

// Add custom detector to LanguageDetector
const languageDetector = new LanguageDetector();
languageDetector.addDetector(timezoneDetector);

if (!i18n.isInitialized) {
  i18n
    .use(languageDetector)
    .use(initReactI18next)
    .init({
      resources,
      supportedLngs: ['en', 'pt', 'pt-BR', 'es', 'fr', 'de', 'it', 'ru', 'zh', 'ja', 'ko', 'ar', 'hi', 'tr', 'pl', 'nl'],
      fallbackLng: 'en',
      load: 'languageOnly', // This ensures pt-BR loads pt translations
      detection: {
        order: ['querystring', 'localStorage', 'timezoneDetector', 'navigator'],
        lookupQuerystring: 'lang',
        lookupLocalStorage: 'i18nextLng',
        caches: ['localStorage'],
      },
      interpolation: {
        escapeValue: false,
      },
      initImmediate: false,
    });
}

export default i18n;
