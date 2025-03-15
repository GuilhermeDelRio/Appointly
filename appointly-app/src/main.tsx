import './index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AppRoutes } from './router/AppRoutes'
import { BrowserRouter as Router } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
      <AppRoutes />
    </Router>
  </StrictMode>
)
