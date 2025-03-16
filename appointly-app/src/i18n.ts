import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    dashboard: {
      name: "Dashboard"
    },
    appointments: {
      name: "Appointments",
      btnAdd: "New appointment",
    },
    patients: {
      name: "Patients",
      btnAdd: "New patient",
    },
    common: {
      settings: "Settings",
      logout: "Sign out",
      account: "Account",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
    }
  },
  pt: {
    dashboard: {
      name: "Dashboard"
    },
    appointments: {
      name: "Consultas",
      btnAdd: "Nova consulta",
    },
    patients: {
      name: "Pacientes",
      btnAdd: "Novo paciente",
    },
    common: {
      settings: "Configurações",
      logout: "Sair",
      account: "Conta",
      save: "Salvar",
      cancel: "Cancelar",
      loading: "Carregando...",
    }
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