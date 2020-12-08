import i18n from 'i18next';
import Backend from 'i18next-xhr-backend';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const detectionOptions = {
    order: ['querystring', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'path'],
    lookupFromPathIndex: 0,
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: 'i18nextLng',
    lookupSessionStorage: 'i18nextLng',
    caches: ['localStorage', 'cookie'],
    excludeCacheFor: ['cimode'],
};

export default i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        backend: {
            /* translation file path */
            loadPath: '/assets/i18n/{{ns}}/{{lng}}.json'
        },
        detection: detectionOptions,
        fallbackLng: 'en',
        debug: true,
        ns: ['translations'],
        defaultNS: 'lng',
        keySeparator: false,
        supportedLngs: ['en', 'ru'],
        interpolation: {
            escapeValue: false,
            formatSeparator: ','
        },
        react: {
            wait: true,
            useSuspense: false
        }
    });