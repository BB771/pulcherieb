async function handleUpload(e: React.FormEvent) {
  e.preventDefault()
  if (!file) return
  const ext = file.name.split('.').pop()
  const path = `${crypto.randomUUID()}.${ext}`

  // 1. envoyer le fichier dans le stockage
  const { error: upErr } = await supabase.storage.from('photos').upload(path, file)
  if (upErr) return setMessage("Échec de l'envoi de la photo.")

  // 2. enregistrer la ligne dans la galerie
  const { error } = await supabase.from('gallery')
    .insert({ title, category, image_path: path })
  setMessage(error ? "Échec de l'enregistrement." : 'Photo ajoutée ✓')
}