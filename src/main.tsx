import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Initialize theme from localStorage or default to light
const storedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.classList.remove('light', 'dark');
document.documentElement.classList.add(storedTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
