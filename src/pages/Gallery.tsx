import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

type Photo = { id: string; title: string; category: string; image_path: string }

export default function Gallery() {
  const [photos, setPhotos] = useState<Photo[]>([])

  useEffect(() => {
    supabase.from('gallery').select('*').order('created_at', { ascending: false })
      .then(({ data }) => setPhotos(data ?? []))
  }, [])

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mb-12 text-center font-serif text-5xl">Nos créations</h1>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p) => {
          const url = supabase.storage.from('photos').getPublicUrl(p.image_path).data.publicUrl
          return (
            <figure key={p.id} className="group relative aspect-[4/5] overflow-hidden"> 
              <img src={url} alt={p.title} loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              <figcaption className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 p-4 text-cream">
                <span className="text-xs uppercase tracking-widest text-caramel">{p.category}</span>
                <p className="font-serif text-xl italic">{p.title}</p>
              </figcaption>
            </figure>
          )
        })}
      </div>
    </section>
  )
}