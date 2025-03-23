import { useTranslation } from 'react-i18next'
import { Patient } from "./patient"
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"

import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"

import { 
  MoreHorizontal,
  Pencil,
  Trash
} from 'lucide-react'

import { DataTableColumnHeader } from '@/components/DataTable/DataTableColumnHeader'

type UsePatientColumnsProps = {
  onEdit: (patient: Patient) => void
  onDelete: (patient: Patient) => void
}

export function usePatientColumns({ onEdit, onDelete }: UsePatientColumnsProps) {
  const { t } = useTranslation()

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "firstName",
      size: 90,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:firstName')} />
      ),
    },
    {
      accessorKey: "lastName",
      size: 120,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:lastName')} />
      ),
    },
    {
      accessorKey: "dateOfBirth",
      size: 160,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:dateOfBirth')} />
      ),
      cell: ({ getValue }) => {
        const dateString = getValue<string>()
        const date = new Date(dateString)
        return date.toLocaleDateString('pt-BR', { timeZone: 'UTC' })
      },
    },
    {
      accessorKey: "phoneNumber",
      size: 140,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:phoneNumber')} />
      ),
    },
    {
      accessorKey: "email",
      size: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:email')} />
      ),
    },
    {
      accessorKey: "fee",
      size: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:fee')} />
      ),
      cell: ({ getValue }) => {
        const fee = getValue<number>()
        return `R$${fee.toFixed(2)}`
      },
    },
    {
      accessorKey: "isSpecialPatient",
      size: 150,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:isSpecialPatient')} />
      ),
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
    {
      accessorKey: "hasAResponsible",
      size: 150,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:hasAResponsible')} />
      ),
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
    {
      accessorKey: "responsibleName",
      size: 180,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:responsibleName')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "responsiblePhoneNumber",
      size: 200,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:responsiblePhoneNumber')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "relationshipDegree",
      size: 100,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:relationshipDegree')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const dataRow = row.original
   
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('common:actions')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer" onClick={() => onEdit(dataRow)}>
                <Pencil />
                {t('common:edit')}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => onDelete(dataRow)}>
                <Trash />
                {t('common:delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return columns
}