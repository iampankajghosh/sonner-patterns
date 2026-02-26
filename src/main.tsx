import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'sonner'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      theme="dark"
      position="bottom-right"
      visibleToasts={6}
      toastOptions={{
        style: {
          background: '#131314',
          border: '1px solid rgba(255,255,255,0.08)',
          color: '#f0ece4',
          fontFamily: "'DM Sans', sans-serif",
        },
      }}
    />
  </StrictMode>,
)
