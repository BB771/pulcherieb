import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

type Photo = { id: string; title: string; category: string; image_path: string }

export default function Admin() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('Mariage')
  const [message, setMessage] = useState('')
  const navigate = useNavigate()

  async function loadPhotos() {
    const { data } = await supabase
      .from('gallery').select('*').order('created_at', { ascending: false })
    setPhotos(data ?? [])
  }

  useEffect(() => { loadPhotos() }, [])

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault()
    if (!file) return
    const ext = file.name.split('.').pop()
    const path = `${crypto.randomUUID()}.${ext}`

    const { error: upErr } = await supabase.storage.from('photos').upload(path, file)
    if (upErr) return setMessage("Échec de l'envoi de la photo.")

    const { error } = await supabase
      .from('gallery').insert({ title, category, image_path: path })
    if (error) return setMessage("Échec de l'enregistrement.")

    setMessage('Photo ajoutée ✓')
    setTitle('')
    setFile(null)
    loadPhotos()
  }

  async function handleDelete(p: Photo) {
    if (!confirm('Supprimer cette photo ?')) return
    await supabase.storage.from('photos').remove([p.image_path])
    await supabase.from('gallery').delete().eq('id', p.id)
    loadPhotos()
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/')
  }

  return (
    <section className="mx-auto max-w-4xl px-6 py-16">
      <div className="mb-10 flex items-center justify-between">
        <h1 className="font-serif text-4xl">Espace pâtissière</h1>
        <button onClick={handleLogout} className="text-xs uppercase tracking-widest">
          Déconnexion
        </button>
      </div>

      <form onSubmit={handleUpload} className="mb-12 grid gap-4 border border-sand p-6">
        <input type="file" accept="image/*" required
          onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          placeholder="Titre" required className="border border-sand bg-white p-3" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}
          className="border border-sand bg-white p-3">
          <option>Mariage</option><option>Anniversaire</option>
          <option>Entremets</option><option>Cupcakes</option><option>Autre</option>
        </select>
        <button className="bg-espresso p-3 text-xs uppercase tracking-widest text-cream">
          Publier dans la galerie
        </button>
        <p className="text-sm text-caramel">{message}</p>
      </form>

      <div className="grid gap-4 sm:grid-cols-3">
        {photos.map((p) => (
          <div key={p.id} className="border border-sand p-3">
            <img
              src={supabase.storage.from('photos').getPublicUrl(p.image_path).data.publicUrl}
              alt={p.title} className="aspect-square w-full object-cover" />
            <p className="mt-2 font-serif text-lg">{p.title}</p>
            <button onClick={() => handleDelete(p)} className="text-xs text-red-700">
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}