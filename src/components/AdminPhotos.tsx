import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Photo = { id: string; title: string; category: string; image_path: string }

const CATEGORIES = ['Mariage', 'Anniversaire', 'Entremets', 'Cupcakes', 'Autre']

export default function AdminPhotos() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState(CATEGORIES[0])
  const [message, setMessage] = useState('')

  async function loadPhotos() {
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false })
    setPhotos(data ?? [])
  }

  useEffect(() => {
    loadPhotos()
  }, [])

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    setMessage('Envoi en cours…')

    const ext = file.name.split('.').pop()
    const path = `${crypto.randomUUID()}.${ext}`

    const { error: upErr } = await supabase.storage.from('photos').upload(path, file)
    if (upErr) {
      setMessage("Échec de l'envoi de la photo.")
      return
    }

    const { error } = await supabase
      .from('gallery')
      .insert({ title: title.trim(), category, image_path: path })
    if (error) {
      setMessage("Échec de l'enregistrement.")
      return
    }

    setFile(null)
    setTitle('')
    ;(e.target as HTMLFormElement).reset()
    setMessage('Photo ajoutée ✓')
    loadPhotos()
  }

  async function handleDelete(photo: Photo) {
    if (!confirm('Supprimer cette photo ?')) return
    await supabase.storage.from('photos').remove([photo.image_path])
    await supabase.from('gallery').delete().eq('id', photo.id)
    loadPhotos()
  }

  return (
    <div>
      <h2 className="mb-6 font-serif text-3xl">Galerie photos</h2>

      <form onSubmit={handleUpload} className="grid gap-4 border border-sand bg-white p-6">
        <label className="grid gap-1 text-xs uppercase tracking-widest">
          Photo
          <input
            type="file"
            accept="image/*"
            required
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="border border-sand p-3 text-base normal-case tracking-normal"
          />
        </label>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="grid gap-1 text-xs uppercase tracking-widest">
            Titre
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={80}
              placeholder="Ex. Gâteau Rose & Or"
              className="border border-sand p-3 text-base normal-case tracking-normal"
            />
          </label>
          <label className="grid gap-1 text-xs uppercase tracking-widest">
            Catégorie
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-sand bg-white p-3 text-base normal-case tracking-normal"
            >
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="bg-espresso p-3 text-xs uppercase tracking-widest text-cream">
          Publier dans la galerie
        </button>
        {message && <p className="text-sm text-caramel">{message}</p>}
      </form>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((p) => {
          const url = supabase.storage.from('photos').getPublicUrl(p.image_path).data.publicUrl
          return (
            <figure key={p.id} className="relative aspect-square overflow-hidden border border-sand">
              <img src={url} alt={p.title} className="h-full w-full object-cover" />
              <button
                onClick={() => handleDelete(p)}
                className="absolute right-2 top-2 bg-red-800 px-2 py-1 text-xs text-white"
              >
                Supprimer
              </button>
            </figure>
          )
        })}
      </div>
    </div>
  )
}