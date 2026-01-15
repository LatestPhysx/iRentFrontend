import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AuthPage from './AuthPage'
import HomePage from './HomePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
