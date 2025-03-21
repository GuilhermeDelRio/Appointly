import { useEffect, useState } from 'react'
import { patientService } from '@/services/patientService'
import { usePatientStore } from '@/stores/patientStore'
import { usePatientColumns } from './columns'
import { DataTable } from '@/components/DataTable/DataTable'
import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"
import { Skeleton } from '@/components/ui/skeleton'
import { RequestParams } from '@/types/http'

export function PatientsView() {
  const columns = usePatientColumns()
  const [isLoading, setIsLoading] = useState(false)

  const data = usePatientStore((state) => state.data)
  const setDataInStore = usePatientStore((state) => state.setData)

  useEffect(() => {
    const fetchPatients = async () => {
      setIsLoading(true)
      
      const config: RequestParams = { params: { page: 1, pageSize: 10 } }
      const response = await patientService.getAll(config)

      setDataInStore(response.data)
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