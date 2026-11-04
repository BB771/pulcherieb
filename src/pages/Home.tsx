import { Link } from 'react-router-dom'
import Gallery from './Gallery'
import Reviews from './Reviews'
import Contact from './Contact'

const highlights = [
  {
    title: 'Sur mesure',
    text: 'Chaque gâteau est dessiné avec vous, selon votre thème, vos couleurs et vos envies.',
  },
  {
    title: 'Fait main',
    text: 'Des créations réalisées à la main, avec des ingrédients soigneusement choisis.',
  },
  {
    title: 'Pour vos grands moments',
    text: 'Mariages, anniversaires, baptêmes et événements : un gâteau à la hauteur de la fête.',
  },
]

export default function Home() {
  return (
      <>
      {/* Accueil */}
      <div className="grid min-h-[86vh] place-items-center bg-linear-to-b from-sand to-cream px-6 py-20 text-center">
        <div>
          <span className="text-xs uppercase tracking-[0.35em] text-caramel">
            Pâtissière · Cake designer · Paris
          </span>
          <h1 className="my-5 font-serif text-5xl leading-tight sm:text-7xl">
            L’art de la <i className="text-caramel">pâtisserie</i>
            <br />
            sur mesure
          </h1>
          <p className="mx-auto mb-9 max-w-md text-espresso/70">
            Gâteaux de mariage, d’anniversaire et d’exception, dessinés et
            réalisés à la main pour vos moments précieux.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              to="/#devis"
              className="bg-espresso px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-cream"
            >
              Demander un devis
            </Link>
            <Link
              to="/#galerie"
              className="border border-caramel px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em]"
            >
              Voir les créations
            </Link>
          </div>
        </div>
      </div>
      {/* Trois points forts */}
            <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-3">
              {highlights.map((h) => (
                <div key={h.title} className="border border-sand p-8 text-center">
                  <h2 className="font-serif text-3xl italic text-caramel">{h.title}</h2>
                  <p className="mt-3 text-espresso/70">{h.text}</p>
                </div>
              ))}
            </section>
      {/* Galerie */}
      <div id="galerie" className="scroll-mt-20">
        <Gallery />
      </div>

      

      {/* Avis (fond différent, comme dans l'artefact) */}
      <div id="avis" className="scroll-mt-20 bg-sand/60">
        <Reviews />
      </div>

      {/* Devis */}
      <div id="devis" className="scroll-mt-20">
        <Contact />
      </div>

      {/* Trois points forts 
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="border border-sand p-8 text-center">
            <h2 className="font-serif text-3xl italic text-caramel">{h.title}</h2>
            <p className="mt-3 text-espresso/70">{h.text}</p>
          </div>
        ))}
      </section>*/}
      </>
  )
}