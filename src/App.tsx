
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
// Layout Wraps the App
import Layout from './components/Layout'
// Page Components
import Home from './pages/Home'
import AllCars from './pages/AllCars'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cars" element={<AllCars />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
