import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// en
import enAppointments from '@/locales/en/enAppointments.json'
import enCommon from '@/locales/en/enCommon.json'
import enDashboard from '@/locales/en/enDashboard.json'
import enLanguage from '@/locales/en/enLanguage.json'
import enPatients from '@/locales/en/enPatients.json'
import enMessages from '@/locales/en/enMessages.json'

// pt
import ptAppointments from '@/locales/pt/ptAppointments.json'
import ptCommon from '@/locales/pt/ptCommon.json'
import ptDashboard from '@/locales/pt/ptDashboard.json'
import ptLanguage from '@/locales/pt/ptLanguage.json'
import ptPatients from '@/locales/pt/ptPatients.json'
import ptMessages from '@/locales/pt/ptMessages.json'


const resources = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    appointments: enAppointments,
    patients: enPatients,
    language: enLanguage,
    messages: enMessages
  },
  pt: {
    common: ptCommon,
    dashboard: ptDashboard,
    appointments: ptAppointments,
    patients: ptPatients,
    language: ptLanguage,
    messages: ptMessages
  },
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  })

export default i18n