import { createBrowserRouter } from 'react-router'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import LayoutPage from '../pages/LayoutPage'
import ProductsPage from '../pages/ProductsPage'
import UsersPage from '../pages/UsersPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'

export const router = createBrowserRouter([
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <LayoutPage />,
        children: [
          {
            path: 'admin/products',
            element: <ProductsPage />,
          },
          {
            path: 'admin/users',
            element: <UsersPage />,
          },
        ],
      },
      // Catch-all route cho protected routes - trang 404 không có layout
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])
