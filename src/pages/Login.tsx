import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Email ou mot de passe incorrect.')
    else navigate('/admin')
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto my-24 grid max-w-sm gap-4 px-6">
      <h1 className="font-serif text-4xl">Espace pâtissière</h1>
      <input type="email" placeholder="Email" value={email}
        onChange={(e) => setEmail(e.target.value)} required
        className="border border-sand bg-white p-3" />
      <input type="password" placeholder="Mot de passe" value={password}
        onChange={(e) => setPassword(e.target.value)} required
        className="border border-sand bg-white p-3" />
      {error && <p className="text-sm text-red-700">{error}</p>}
      <button className="bg-espresso p-3 text-xs uppercase tracking-widest text-cream">
        Se connecter
      </button>
    </form>
  )
}