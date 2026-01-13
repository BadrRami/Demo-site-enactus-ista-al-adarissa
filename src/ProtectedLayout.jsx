import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './AuthContext'

const ProtectedLayout = () => {
  const { session, loading } = useAuth()

  if (loading) return null
  if (!session) return <Navigate to="/login" />

  return <Outlet />
}

export default ProtectedLayout
