import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import AdminPhotos from '../components/AdminPhotos'
import AdminReviews from '../components/AdminReviews'

export default function Admin() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/connexion')
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-12 flex items-center justify-between">
        <h1 className="font-serif text-5xl">Espace pâtissière</h1>
        <button
          onClick={handleLogout}
          className="border border-caramel px-4 py-2 text-xs uppercase tracking-widest"
        >
          Déconnexion
        </button>
      </div>

      <div className="grid gap-16">
        <AdminPhotos />
        <AdminReviews />
      </div>
    </section>
  )
}