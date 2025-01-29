import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GlobalProvider } from './contexts/GlobalContext.jsx'
import {BrowserRouter as Router} from 'react-router-dom'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalProvider>
      <Router>
        <App />
      </Router>
    </GlobalProvider>
  </StrictMode>,
)
