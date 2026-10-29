import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'

// Page temporaire pour les pages pas encore créées
function Soon({ title }: { title: string }) {
  return (
    <main className="grid min-h-[60vh] place-items-center px-6 text-center">
      <h1 className="font-serif text-5xl italic text-caramel">{title} : bientôt disponible</h1>
    </main>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/galerie" element={<Gallery />} />
        <Route path="/avis" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Soon title="Connexion" />} />
        <Route path="/admin" element={<Soon title="Administration" />} />
      </Routes>
      <Footer />
    </>
  )
}