import { Users } from 'lucide-react'
import { Header } from "@/components/header/Header"

export function PatientsView() {
  return (
    <div>
      <Header 
        titleLabel="patients:name"
        titleIcon={ Users }
        buttonLabel="patients:btnAdd"
      />
    </div>
  )
}