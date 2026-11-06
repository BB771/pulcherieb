import { Link } from 'react-router-dom'
import { useSession } from '../hooks/useSession'

export default function AdminButton() {
  const { session, loading } = useSession()
  if (loading) return null

  return (
    <Link
      to={session ? '/admin' : '/connexion'}
      className="uppercase tracking-[0.15em] text-caramel hover:underline"
    >
      {session ? 'Mon espace' : 'Espace pâtissière'}
    </Link>
  )
}