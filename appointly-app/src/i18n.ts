import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// en
import enAppointments from '@/locales/en/enAppointments.json'
import enCommon from '@/locales/en/enCommon.json'
import enDashboard from '@/locales/en/enDashboard.json'
import enLanguage from '@/locales/en/enLanguage.json'
import enPatients from '@/locales/en/enPatients.json'

// pt
import ptAppointments from '@/locales/pt/ptAppointments.json'
import ptCommon from '@/locales/pt/ptCommon.json'
import ptDashboard from '@/locales/pt/ptDashboard.json'
import ptLanguage from '@/locales/pt/ptLanguage.json'
import ptPatients from '@/locales/pt/ptPatients.json'


const resources = {
  en: {
    common: enCommon,
    dashboard: enDashboard,
    appointments: enAppointments,
    patients: enPatients,
    language: enLanguage
  },
  pt: {
    common: ptCommon,
    dashboard: ptDashboard,
    appointments: ptAppointments,
    patients: ptPatients,
    language: ptLanguage
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