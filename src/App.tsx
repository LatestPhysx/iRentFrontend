import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import OwnerDashboard from './OwnerDashboard'
import MyCars from './MyCars'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/cars" element={<MyCars />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
