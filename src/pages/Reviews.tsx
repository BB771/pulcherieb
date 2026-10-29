const reviews = [
  {
    name: 'Camille & Thomas',
    event: 'Mariage',
    text: 'Un gâteau de mariage à couper le souffle, aussi beau que délicieux. Nos invités en parlent encore.',
  },
  {
    name: 'Sophie L.',
    event: 'Anniversaire',
    text: 'À l’écoute, créative et d’une grande précision. Le gâteau d’anniversaire de ma fille était un rêve.',
  },
  {
    name: 'Julien M.',
    event: 'Événement d’entreprise',
    text: 'Un travail d’orfèvre pour notre événement. Professionnalisme irréprochable.',
  },
]

export default function Reviews() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mb-12 text-center font-serif text-5xl">Ils nous ont fait confiance</h1>

      <div className="grid gap-6 md:grid-cols-3">
        {reviews.map((r) => (
          <figure key={r.name} className="border border-sand bg-white p-8">
            <div className="tracking-widest text-caramel">★★★★★</div>
            <blockquote className="my-4 font-serif text-xl italic leading-snug">
              {r.text}
            </blockquote>
            <figcaption className="text-xs uppercase tracking-[0.15em] text-espresso/70">
              {r.name} · {r.event}
            </figcaption>
          </figure>
        ))}
      </div>

      <p className="mt-8 text-center text-sm text-espresso/60">
        Exemples d’avis, à remplacer par ceux de vos vraies clientes.
      </p>
    </main>
  )
}