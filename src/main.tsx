import './index.css'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify'

import { router } from './router/index.tsx'
import { persistor, store } from './redux/store/index.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <>
          <RouterProvider router={router} />
          <ToastContainer position="top-right" autoClose={3000} />
        </>
      </PersistGate>
    </Provider>
  </StrictMode>
)
