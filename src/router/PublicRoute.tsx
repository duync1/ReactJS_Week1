import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router'

import type { RootState } from '../redux/store'

const PublicRoute = () => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)
  return isAuthenticated ? <Navigate to={'/'} replace /> : <Outlet />
}

export default PublicRoute
