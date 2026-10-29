import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-sand px-6 py-12 text-center text-sm text-espresso/70">
      <p className="font-serif text-2xl text-espresso">
        Maison <span className="italic text-caramel">Aurélie</span>
      </p>
      <p className="mt-2">Pâtissière · Cake designer · Paris</p>
      <p className="mt-1">contact@maison-aurelie.fr</p>

      <p className="mt-8 text-xs">
        © {new Date().getFullYear()} Maison Aurélie ·{' '}
        <Link to="/connexion" className="hover:text-caramel">
          Espace pâtissière
        </Link>
      </p>
    </footer>
  )
}