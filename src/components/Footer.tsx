import { Link } from 'react-router-dom'
import AdminButton from './AdminButton'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-sand bg-espresso text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        {/* Marque */}
        <div>
          <p className="font-serif text-2xl tracking-wide">
            Pulcherie <span className="text-caramel">.B</span>
          </p>
          <p className="mt-3 text-sm text-cream/70">
            Pâtissière · Cake designer
            <br />
            Paris
          </p>
        </div>

        {/* Navigation */}
        <nav aria-label="Pied de page">
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-caramel">
            Navigation
          </p>
          <ul className="grid gap-2 text-sm">
            <li><a href="/#galerie" className="hover:text-caramel">Galerie</a></li>
            <li><a href="/#avis" className="hover:text-caramel">Avis</a></li>
            <li><a href="/#devis" className="hover:text-caramel">Demander un devis</a></li>
          </ul>
        </nav>

        {/* Contact */}
        <div>
          <p className="mb-3 text-xs uppercase tracking-[0.25em] text-caramel">
            Contact
          </p>
          <ul className="grid gap-2 text-sm">
            <li>
              <a href="mailto:contact@pulcherieb.com" className="hover:text-caramel">
                contact@pulcherieb.com
              </a>
            </li>
            <li>
              <a href="tel:+33665751250" className="hover:text-caramel">
                06 65 75 12 50
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/pulcherie.b/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-caramel"
              >
                Instagram - @pulcherie.b
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Ligne du bas */}
      <div className="border-t border-cream/15 px-6 py-5">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-cream/60">
          <p>© {year} Pulcherie .B. Tous droits réservés.</p>
          <div className="flex items-center gap-5">
            <Link to="/mentions-legales" className="hover:text-caramel">
              Mentions légales
            </Link>
            <AdminButton />
          </div>
        </div>
      </div>
    </footer>
  )
}

/* import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-sand px-6 py-12 text-center text-sm text-espresso/70">
      <p className="font-serif text-2xl text-espresso">
        Pulcherie<span className="italic text-caramel">.B</span>
      </p>
      <p className="mt-2">Pâtissière · Cake designer · Paris</p>
      <p className="mt-1">contact@pulcherieb.com</p>

      <p className="mt-8 text-xs">
        © {new Date().getFullYear()} Pulcherie.B ·{' '}
        <Link to="/connexion" className="hover:text-caramel">
          Espace pâtissière
        </Link>
      </p>
    </footer>
  )
} */