import { StrictMode } from 'react'
// eslint-disable-next-line import/order
import { createRoot } from 'react-dom/client'

import './index.css'
import { RouterProvider } from 'react-router'
import { Provider } from 'react-redux'

import { router } from './router/index.tsx'
import { store } from './store.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
)
