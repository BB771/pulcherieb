import { Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import ScrollToHash from './components/ScrollToHash'
import Home from './pages/Home'
import Gallery from './pages/Gallery'
import Reviews from './pages/Reviews'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToHash />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/galerie" element={<Navigate to="/#galerie" replace />} />
          <Route path="/avis" element={<Navigate to="/#avis" replace />} />
          <Route path="/contact" element={<Navigate to="/#devis" replace />} />
          {/*<Route path="/connexion" element={<Navigate to="/#login" replace />} /> 

          {/* <Route path="/galerie" element={<Gallery />} />
          <Route path="/avis" element={<Reviews />} />
          <Route path="/contact" element={<Contact />} /> */}
          <Route path="/connexion" element={<Login />} /> 
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />
          <Route
            path="*"
            element={
              <p className="py-32 text-center font-serif text-3xl">
                Page introuvable
              </p>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}