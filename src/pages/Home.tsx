import { Link } from 'react-router-dom'

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
    <main>
      {/* Section d'accueil */}
      <section className="grid min-h-[80vh] place-items-center bg-[radial-gradient(ellipse_at_50%_30%,var(--color-sand),var(--color-cream)_70%)] px-6 py-20 text-center">
        <div>
          <p className="text-xs uppercase tracking-[0.35em] text-caramel">
            Pâtissière · Cake designer · Paris
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight sm:text-7xl">
            L’art de la <span className="italic text-caramel">pâtisserie</span>
            <br />
            sur mesure
          </h1>
          <p className="mx-auto mt-6 max-w-lg text-espresso/70">
            Gâteaux de mariage, d’anniversaire et d’exception, dessinés et réalisés
            à la main pour vos moments précieux.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link
              to="/contact"
              className="bg-espresso px-8 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-caramel"
            >
              Demander un devis
            </Link>
            <Link
              to="/galerie"
              className="border border-caramel px-8 py-3 text-xs uppercase tracking-[0.2em] transition hover:bg-caramel hover:text-cream"
            >
              Voir les créations
            </Link>
          </div>
        </div>
      </section>

      {/* Trois points forts */}
      <section className="mx-auto grid max-w-6xl gap-10 px-6 py-24 md:grid-cols-3">
        {highlights.map((h) => (
          <div key={h.title} className="border border-sand p-8 text-center">
            <h2 className="font-serif text-3xl italic text-caramel">{h.title}</h2>
            <p className="mt-3 text-espresso/70">{h.text}</p>
          </div>
        ))}
      </section>
    </main>
  )
}