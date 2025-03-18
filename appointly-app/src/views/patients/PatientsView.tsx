import { useEffect, useState } from 'react'
import requestServices from '@/api/requestServices'
import type { RequestParams } from '@/types/http'
import { usePatientColumns } from './columns'
import { Patient } from './patient'
import { DataTable } from '@/components/DataTable/DataTable'
import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function PatientsView() {
  const columns = usePatientColumns()
  const [data, setData] = useState<Patient[]>([])

  useEffect(() => {
    const fetchPatients = async() => {
      const config: RequestParams = {
        params: {
          page: 1,
          pageSize: 10,
        }
      }

      const response = await requestServices.get<Patient[]>('/patient', config)
      setData(response)
    }

    fetchPatients()
  }, [])
  
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