import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home' 
import Rules from './pages/Rules'
import Footer from './components/Footer'
import './assets/scss/main.scss'
import Contacts from './pages/Contacts'
import Catalog from './pages/Catalog'
import { CartProvider } from './components/CartContext'
import { CartDrawer } from './components/CartDrawer'

export const App = () => {
  return (
    <CartProvider>
      <div className="app-wrapper">
        <Header />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/rules" element={<Rules />} />
            <Route path="/contacts" element={<Contacts />} />
          </Routes>
        </main>

        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  )
}

export default App