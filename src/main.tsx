import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App'

// import {authManager} from '@/services/Auth/Netlify-Auth'; // Ensure this is the correct path to your authManager module

// async function initializeApp() {
//   await authManager.getAccessToken();}
  
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// initializeApp();
