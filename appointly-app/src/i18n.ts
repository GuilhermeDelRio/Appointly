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
      fields: {
        firstName: "First Name",
        lastName: "Last Name",
        dateOfBirth: "Date of Birth",
        phoneNumber: "Phone Number",
        email: "E-mail",
        fee: "Fee",
        isSpecialPatient: "Special Patient?",
        hasAResponsible: "Has Responsible?",
        responsibleName: "Responsible Name",
        responsiblePhoneNumber: "Responsible Phone",
        relationshipDegree: "Relationship Degree"
      }
    },
    common: {
      settings: "Settings",
      signOut: "Sign out",
      account: "Account",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      cancel: "Cancel",
      loading: "Loading...",
      language: "Language",
      actions: "Actions",
      rowPerPage: "Rows per page",
      rowsSelected: "row(s) selected.",
      page: "Page",
      of: "of"
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
      fields: {
        firstName: "Nome",
        lastName: "Sobrenome",
        dateOfBirth: "Data de Nascimento",
        phoneNumber: "Telefone",
        email: "E-mail",
        fee: "Taxa",
        isSpecialPatient: "Paciente Especial?",
        hasAResponsible: "Tem Responsável?",
        responsibleName: "Nome do Responsável",
        responsiblePhoneNumber: "Telefone do Responsável",
        relationshipDegree: "Grau de Parentesco"
      }
    },
    common: {
      settings: "Configurações",
      signOut: "Sair",
      account: "Conta",
      save: "Salvar",
      edit: "Editar",
      delete: "Deletar",
      cancel: "Cancelar",
      loading: "Carregando...",
      language: "Idioma",
      actions: "Ações",
      rowPerPage: "Linhas por página",
      rowsSelected: "linhas(s) selecionadas.",
      page: "Página",
      of: "de"
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