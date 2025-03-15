import { Routes, Route } from 'react-router-dom'

// Views
import { App } from '@/App'
import { PatientsView } from '@/views/patients/PatientsView'
import { NotFoundView } from '@/views/notFound/NotFoundView'

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/patients" element={<PatientsView />} />
      <Route path="*" element={<NotFoundView />} />
    </Routes>
  )
}