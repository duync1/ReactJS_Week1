import { StrictMode } from 'react'
// eslint-disable-next-line import/order
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router'

import { router } from './router/index.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
