import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import lang from './constant/languages'

const resources = {
  en: {
    translation: lang.en
  },
  tr: {
    translation: lang.tr
  },
  es: {
    translation: lang.es
  },
  fr: {
    translation: lang.fr
  },
  de: {
    translation: lang.de
  },
  it: {
    translation: lang.it
  },
  pt: {
    translation: lang.pt
  },
  ru: {
    translation: lang.ru
  },
}


i18next
.use(initReactI18next)
.init({
  lng: 'en', 
  resources
})

