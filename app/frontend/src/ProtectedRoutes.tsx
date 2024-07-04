import { useAuth } from './hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoutes = () => {


  const { isAuthenticated } = useAuth()
  if (!isAuthenticated) return <Navigate to='/login' replace />
  return <Outlet />
}
