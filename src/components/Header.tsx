import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

const links = [
  { to: '/galerie', label: 'Galerie' },
  { to: '/avis', label: 'Avis' },
  { to: '/contact', label: 'Devis' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-sand bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="font-serif text-2xl tracking-wide"
        >
          Maison <span className="italic text-caramel">Aurélie</span>
        </Link>

        {/* Menu ordinateur : caché sur mobile */}
        <nav className="hidden gap-8 text-xs uppercase tracking-[0.2em] md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                isActive ? 'text-caramel' : 'transition hover:text-caramel'
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        {/* Bouton burger : visible seulement sur mobile */}
        <button
          className="text-2xl md:hidden"
          aria-label="Ouvrir le menu"
          onClick={() => setOpen(!open)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu mobile : affiché seulement si "open" est vrai */}
      {open && (
        <nav className="grid gap-5 border-t border-sand px-6 py-6 text-xs uppercase tracking-[0.2em] md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}