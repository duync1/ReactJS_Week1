import { createBrowserRouter } from 'react-router'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import LayoutPage from '../pages/LayoutPage'
import ProductsPage from '../pages/ProductsPage'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegisterPage />,
  },
  {
    path: '/',
    element: <LayoutPage />,
    children: [
      {
        index: true,
        element: <ProductsPage />,
      },
      {
        path: 'admin/products',
        element: <ProductsPage />,
      },
    ],
  },
])
