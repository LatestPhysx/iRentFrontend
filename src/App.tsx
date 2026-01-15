import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage'
import HomePage from './HomePage'
import OwnerDashboard from './OwnerDashboard'
import MyCars from './MyCars'
import AddCarBasic from './AddCarBasic'
import AddCarMedia from './AddCarMedia'
import AddCarPricing from './AddCarPricing'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/owner-dashboard" element={<OwnerDashboard />} />
        <Route path="/owner/cars" element={<MyCars />} />
        <Route path="/owner/cars/new" element={<AddCarBasic />} />
        <Route path="/owner/cars/new/media" element={<AddCarMedia />} />
        <Route path="/owner/cars/new/pricing" element={<AddCarPricing />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
