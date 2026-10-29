import { useState } from 'react'
import { supabase } from '../lib/supabase'

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  event_date: '',
  cake_type: 'Mariage',
  guests: '',
  message: '',
}

const field =
  'w-full border border-sand bg-white p-3 font-light focus:outline focus:outline-1 focus:outline-caramel'
const label = 'grid gap-2 text-xs uppercase tracking-[0.18em] text-espresso/70'

export default function Contact() {
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  function update(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setStatus('')

    const { error } = await supabase.from('quotes').insert({
      ...form,
      event_date: form.event_date || null,
      guests: form.guests ? Number(form.guests) : null,
    })

    setSending(false)
    if (error) {
      setStatus('Une erreur est survenue, merci de réessayer.')
    } else {
      setStatus('Merci ! Votre demande a bien été envoyée.')
      setForm(emptyForm)
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <h1 className="mb-12 text-center font-serif text-5xl">Demande de devis</h1>

      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            Nom
            <input name="name" value={form.name} onChange={update} required className={field} />
          </label>
          <label className={label}>
            Email
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={update}
              required
              className={field}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            Téléphone
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={update}
              className={field}
            />
          </label>
          <label className={label}>
            Date de l’événement
            <input
              name="event_date"
              type="date"
              value={form.event_date}
              onChange={update}
              className={field}
            />
          </label>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <label className={label}>
            Type de gâteau
            <select name="cake_type" value={form.cake_type} onChange={update} className={field}>
              <option>Mariage</option>
              <option>Anniversaire</option>
              <option>Baptême</option>
              <option>Événement d’entreprise</option>
              <option>Autre</option>
            </select>
          </label>
          <label className={label}>
            Nombre de convives
            <input
              name="guests"
              type="number"
              min="1"
              value={form.guests}
              onChange={update}
              className={field}
            />
          </label>
        </div>

        <label className={label}>
          Votre projet
          <textarea
            name="message"
            rows={5}
            value={form.message}
            onChange={update}
            placeholder="Thème, saveurs, couleurs, inspirations…"
            className={field}
          />
        </label>

        <button
          type="submit"
          disabled={sending}
          className="bg-espresso px-8 py-3 text-xs uppercase tracking-[0.2em] text-cream transition hover:bg-caramel disabled:opacity-50"
        >
          {sending ? 'Envoi en cours…' : 'Envoyer ma demande'}
        </button>

        {status && (
          <p role="status" className="text-center text-sm text-caramel">
            {status}
          </p>
        )}
      </form>
    </main>
  )
}