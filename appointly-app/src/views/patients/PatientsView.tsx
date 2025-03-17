import { DataTable } from '@/components/DataTable/DataTable'
import { columns } from './columns'
import { Patient } from './patient'

import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"

function getData(): Patient[] {
  return [
    {
      "id": "0195975c-4a67-7a6a-b196-5ad1efcfacd0",
      "firstName": "Lady",
      "lastName": "GAGA",
      "dateOfBirth": "2000-10-12T00:00:00Z",
      "phoneNumber": "+1234567890",
      "email": "john.doe@example.com",
      "fee": 100.00,
      "isSpecialPatient": true,
      "hasAResponsible": false,
      "responsibleName": "Jane Doe",
      "responsibleEmail": null,
      "responsiblePhoneNumber": "+0987654321",
      "relationshipDegree": "CHILD"
    },
    {
      "id": "0195975c-4a67-7a6a-b196-5ad1efcfacd1",
      "firstName": "hahahah",
      "lastName": "GAGA",
      "dateOfBirth": "2000-10-12T00:00:00Z",
      "phoneNumber": "+1234567890",
      "email": "john.doe@example.com",
      "fee": 100.00,
      "isSpecialPatient": true,
      "hasAResponsible": false,
      "responsibleName": "Jane Doe",
      "responsibleEmail": null,
      "responsiblePhoneNumber": "+0987654321",
      "relationshipDegree": "CHILD"
    }
  ]
}

export function PatientsView() {
  const data = getData()
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="patients:name"
        titleIcon={ Users }
        buttonLabel="patients:btnAdd"
      />

      <div className="flex-grow">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}