import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

import type { RootState } from '../redux/store'

const ProtectedRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
