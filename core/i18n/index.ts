import * as Localization from "expo-localization"
import * as i18n from "i18next"
import { initReactI18next } from "react-i18next"

import en from "./locales/en/translation.json"
import fr from "./locales/fr/translation.json"

const resources = {
  en: {
    translation: en,
  },
  fr: {
    translation: fr,
  },
}

const initI18n = () => {
  i18n.use(initReactI18next).init({
    lng: Localization.getLocales()[0].languageCode || "en",
    fallbackLng: "en",
    resources,
    interpolation: {
      escapeValue: false,
    },
  })
}

initI18n()

export default i18n
