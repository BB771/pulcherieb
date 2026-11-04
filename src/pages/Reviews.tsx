import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Review = {
  id: string
  author: string
  event_type: string | null
  rating: number
  content: string
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data }) => {
        setReviews(data ?? [])
        setLoading(false)
      })
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mb-12 text-center font-serif text-5xl">
        Ils nous ont fait confiance
      </h1>

      {loading && <p className="text-center">Chargement…</p>}

      {!loading && reviews.length === 0 && (
        <p className="text-center text-espresso/60">
          Les premiers avis arriveront bientôt.
        </p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <blockquote key={r.id} className="border border-sand bg-white p-8">
            <div className="tracking-widest text-caramel" aria-label={`${r.rating} sur 5`}>
              {'★'.repeat(r.rating)}
              {'☆'.repeat(5 - r.rating)}
            </div>
            <p className="my-4 font-serif text-xl italic leading-relaxed">
              {r.content}
            </p>
            <footer className="text-xs uppercase tracking-widest text-espresso/60">
              {r.author}
              {r.event_type && ` — ${r.event_type}`}
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  )
}