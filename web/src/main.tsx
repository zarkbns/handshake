import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { App } from './App'
import { HandshakePrivyProvider } from './privy'
import './styles/globals.css'

const root = document.getElementById('root')
if (!root) throw new Error('Root element #root not found in index.html')

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <HandshakePrivyProvider>
        <App />
      </HandshakePrivyProvider>
    </BrowserRouter>
  </StrictMode>,
)
