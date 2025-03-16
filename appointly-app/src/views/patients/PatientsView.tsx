import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function PatientsView() {
  return (
    <div>
      <Header 
        titleLabel="Patients" 
        titleIcon={ Users }
        buttonLabel="New patient" 
      />
    </div>
  )
}