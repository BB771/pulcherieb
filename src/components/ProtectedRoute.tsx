import { Navigate } from 'react-router-dom'
import { useSession } from '../hooks/useSession'

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession()
  if (loading) return null
  return session ? <>{children}</> : <Navigate to="/connexion" replace />
}