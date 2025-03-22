import { useEffect, useState } from 'react'
import { patientService } from '@/services/patientService'
import { usePatientStore } from '@/stores/patientStore'
import { usePatientColumns } from './columns'
import { DataTable } from '@/components/DataTable/DataTable'
import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"
import { RequestParams } from '@/types/http'

export function PatientsView() {
  const columns = usePatientColumns()

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(10)

  const data = usePatientStore((state) => state.data)
  const totalCount = usePatientStore((state) => state.totalCount)
  const setDataInStore = usePatientStore((state) => state.setData)

  useEffect(() => {
    const fetchPatients = async () => {
      const config: RequestParams = { params: { page: pageIndex + 1, pageSize } }
      const response = await patientService.getAll(config)

      const { items, totalCount } = response.data

      setDataInStore(items, totalCount)
    }
  
    fetchPatients()
  }, [pageIndex, pageSize])
  
  return (
    <div className="flex flex-col p-2">
      <Header 
        titleLabel="patients:name"
        titleIcon={ Users }
        buttonLabel="patients:btnAdd"
        dialogType="patientsDialog"
      />

      <div className="flex-grow">
        <DataTable 
          columns={columns} 
          data={data}
          pageIndex={pageIndex}
          pageSize={pageSize}
          totalCount={totalCount}
          setPageIndex={setPageIndex}
          setPageSize={setPageSize}
        />
      </div>
    </div>
  )
}