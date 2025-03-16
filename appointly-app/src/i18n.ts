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
      signOut: "Sign out",
      account: "Account",
      save: "Save",
      cancel: "Cancel",
      loading: "Loading...",
      language: "Language"
    },
    language: {
      selectLang: "Select a language",
      changeLangMsg: "Language changed to",
      english: "English",
      portuguese: "Portuguese",
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
      signOut: "Sair",
      account: "Conta",
      save: "Salvar",
      cancel: "Cancelar",
      loading: "Carregando...",
      language: "Idioma"
    },
    language: {
      selectLang: "Selecione um idioma",
      changeLangMsg: "Idioma alterado para",
      english: "Inglês",
      portuguese: "Português",
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