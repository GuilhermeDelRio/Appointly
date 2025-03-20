import { useEffect, useState } from 'react'
import { patientService } from '@/services/patientService'
import type { RequestParams } from '@/types/http'
import { usePatientColumns } from './columns'
import { Patient } from './patient'
import { DataTable } from '@/components/DataTable/DataTable'
import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"
import { Skeleton } from '@/components/ui/skeleton'

export function PatientsView() {
  const columns = usePatientColumns()
  const [data, setData] = useState<Patient[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    setIsLoading(true)

    const fetchPatients = async() => {
      const config: RequestParams = {
        params: {
          page: 1,
          pageSize: 10,
        }
      }

      const response = await patientService.getAll(config)
      setData(response.data)
      setIsLoading(false)
    }

    fetchPatients()
  }, [])
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="patients:name"
        titleIcon={ Users }
        buttonLabel="patients:btnAdd"
        dialogType="patientsDialog"
      />

      <div className="flex-grow">
        {isLoading 
          ? <Skeleton className=" h-[500px] " /> 
          : <DataTable columns={columns} data={data} />
        }
      </div>
    </div>
  )
}