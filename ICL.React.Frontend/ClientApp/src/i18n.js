import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enMessages from './locales/en.json';
import frMessages from './locales/fr.json';
import swMessages from './locales/sw.json';
import esMessages from './locales/es.json';

i18n
    .use(initReactI18next)
    .init({
        resources: {
            en: {
                translation: {
                    ...enMessages,
                    languageName: "English",
                    languageFlag: "us",
                },
            },
            fr: {
                translation: {
                    ...frMessages,
                    languageName: "French",
                    languageFlag: "fr",
                },
            },
            sw: {
                translation: {
                    ...swMessages,
                    languageName: "Kiswahili",
                    languageFlag: "ke",
                },
            },
            es: {
                translation: {
                    ...esMessages,
                    languageName: "Spanish",
                    languageFlag: "es",
                },
            },
        },
        lng: navigator.language.split(/[-_]/)[0] || "en",
        fallbackLng: "en",
        interpolation: { escapeValue: false },
    });


export default i18n;
