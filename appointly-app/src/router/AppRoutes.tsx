import { Routes, Route } from 'react-router-dom'

// Views
import { AppointmentsView } from '@/views/appointments/AppointmentsView'
import { DashboardView } from '@/views/dashboard/DashboardView'
import { PatientsView } from '@/views/patients/PatientsView'
import { NotFoundView } from '@/views/notFound/NotFoundView'

export function AppRoutes() {
  return (
    <Routes>
      <Route>
        <Route path="/" element={<DashboardView />} />
        <Route path="/dashboard" element={<DashboardView />} />
        <Route path="/appointments" element={<AppointmentsView />} />
        <Route path="/patients" element={<PatientsView />} />
        <Route path="*" element={<NotFoundView />} />
      </Route>
    </Routes>
  )
}