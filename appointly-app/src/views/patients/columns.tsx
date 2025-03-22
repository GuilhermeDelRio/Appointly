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

export function usePatientColumns() {
  const { t } = useTranslation()

  const columns: ColumnDef<Patient>[] = [
    {
      accessorKey: "firstName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:firstName')} />
      ),
    },
    {
      accessorKey: "lastName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:lastName')} />
      ),
    },
    {
      accessorKey: "dateOfBirth",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:dateOfBirth')} />
      ),
      cell: ({ getValue }) => {
        const date = new Date(getValue<string>())
        return date.toLocaleDateString()
      },
    },
    {
      accessorKey: "phoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:phoneNumber')} />
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:email')} />
      ),
    },
    {
      accessorKey: "fee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:fee')} />
      ),
      cell: ({ getValue }) => {
        const fee = getValue<number>()
        return `$${fee.toFixed(2)}`
      },
    },
    {
      accessorKey: "isSpecialPatient",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:isSpecialPatient')} />
      ),
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
    {
      accessorKey: "hasAResponsible",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:hasAResponsible')} />
      ),
      cell: ({ getValue }) => (getValue<boolean>() ? "Yes" : "No"),
    },
    {
      accessorKey: "responsibleName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:responsibleName')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "responsiblePhoneNumber",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:responsiblePhoneNumber')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      accessorKey: "relationshipDegree",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title={t('patients:fields:relationshipDegree')} />
      ),
      cell: ({ getValue }) => getValue<string>() ?? "-",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const payment = row.original
   
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
              <DropdownMenuItem className="cursor-pointer">
                <Pencil />
                {t('common:edit')}
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
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