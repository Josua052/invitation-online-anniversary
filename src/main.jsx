import { StrictMode } from 'react'
import { createRoot }  from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'

// import.meta.env.BASE_URL is automatically set by Vite to match the `base` config.
// This ensures React Router's basename always in sync with the deployment path.
const basename = import.meta.env.BASE_URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>
)
