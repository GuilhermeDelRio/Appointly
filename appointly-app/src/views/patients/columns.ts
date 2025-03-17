import { Patient } from "./patient"
import { ColumnDef } from "@tanstack/react-table"

export const columns: ColumnDef<Patient>[] = [
  {
    accessorKey: "firstName",
    header: "First Name",
  },
  {
    accessorKey: "lastName",
    header: "Last Name",
  },
  {
    accessorKey: "dateOfBirth",
    header: "Date of Birth",
    cell: ({ getValue }) => {
      const date = new Date(getValue<string>())
      return date.toLocaleDateString()
    },
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone Number",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "fee",
    header: "Fee",
    cell: ({ getValue }) => {
      const fee = getValue<number>()
      return `$${fee.toFixed(2)}`
    },
  },
  {
    accessorKey: "isSpecialPatient",
    header: "Special Patient?",
    cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
  },
  {
    accessorKey: "hasAResponsible",
    header: "Has Responsible?",
    cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
  },
  {
    accessorKey: "responsibleName",
    header: "Responsible Name",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "responsiblePhoneNumber",
    header: "Responsible Phone",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
  {
    accessorKey: "relationshipDegree",
    header: "Relationship Degree",
    cell: ({ getValue }) => getValue<string>() ?? "-",
  },
]
