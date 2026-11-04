import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Review = {
  id: string
  author: string
  event_type: string | null
  rating: number
  content: string
}

const EVENT_TYPES = ['Mariage', 'Anniversaire', 'Baptême', 'Événement d’entreprise', 'Autre']

export default function AdminReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [author, setAuthor] = useState('')
  const [eventType, setEventType] = useState(EVENT_TYPES[0])
  const [rating, setRating] = useState(5)
  const [content, setContent] = useState('')
  const [message, setMessage] = useState('')

  async function loadReviews() {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false })
    setReviews(data ?? [])
  }

  useEffect(() => {
    loadReviews()
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setMessage('')
    const { error } = await supabase.from('reviews').insert({
      author: author.trim(),
      event_type: eventType,
      rating,
      content: content.trim(),
    })
    if (error) {
      setMessage("Échec de l'enregistrement de l'avis.")
      return
    }
    setAuthor('')
    setContent('')
    setRating(5)
    setMessage('Avis ajouté ✓')
    loadReviews()
  }

  async function handleDelete(id: string) {
    if (!confirm('Supprimer cet avis ?')) return
    const { error } = await supabase.from('reviews').delete().eq('id', id)
    if (error) {
      setMessage('Suppression impossible.')
      return
    }
    loadReviews()
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">Avis clients</h2>

      <form onSubmit={handleSubmit} className="grid gap-4 border border-sand bg-white p-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-xs uppercase tracking-widest">
            Nom du client
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
              maxLength={80}
              placeholder="Ex. Camille & Thomas"
              className="border border-sand p-3 text-base normal-case tracking-normal"
            />
          </label>
          <label className="grid gap-1 text-xs uppercase tracking-widest">
            Type d'événement
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="border border-sand bg-white p-3 text-base normal-case tracking-normal"
            >
              {EVENT_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
        </div>

        <label className="grid gap-1 text-xs uppercase tracking-widest">
          Note
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border border-sand bg-white p-3 text-base normal-case tracking-normal"
          >
            {[5, 4, 3, 2, 1].map((n) => (
              <option key={n} value={n}>
                {'★'.repeat(n)} ({n}/5)
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-1 text-xs uppercase tracking-widest">
          Avis du client
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            maxLength={600}
            placeholder="Recopiez ici le message du client…"
            className="border border-sand p-3 text-base normal-case tracking-normal"
          />
        </label>

        <button className="bg-espresso p-3 text-xs uppercase tracking-widest text-cream">
          Publier l'avis
        </button>
        {message && <p className="text-sm text-caramel">{message}</p>}
      </form>

      <ul className="mt-8 grid gap-3">
        {reviews.length === 0 && (
          <li className="text-sm text-espresso/60">Aucun avis pour le moment.</li>
        )}
        {reviews.map((r) => (
          <li key={r.id} className="flex items-start justify-between gap-4 border border-sand bg-white p-4">
            <div>
              <p className="text-caramel">
                {'★'.repeat(r.rating)}
                {'☆'.repeat(5 - r.rating)}
              </p>
              <p className="font-serif italic">{r.content}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-espresso/60">
                {r.author}
                {r.event_type && ` — ${r.event_type}`}
              </p>
            </div>
            <button
              onClick={() => handleDelete(r.id)}
              className="shrink-0 bg-red-800 px-3 py-1 text-xs text-white"
            >
              Supprimer
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}