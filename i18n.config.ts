import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './src/assets/translation/en.json'
import vn from './src/assets/translation/vn.json'

//empty for now
const resources = {
  en: {
    translation: en,
  },
  vn: {
    translation: vn,
  },
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'vn',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
