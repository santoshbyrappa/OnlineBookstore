import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { ToastProvider } from './context/ToastContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import CataloguePage from './pages/CataloguePage'
import BookDetailPage from './pages/BookDetailPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import ConfirmationPage from './pages/ConfirmationPage'
import OrderHistoryPage from './pages/OrderHistoryPage'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
        <BrowserRouter>
          <Routes>
            {/* Login — no navbar */}
            <Route path="/login" element={<LoginPage />} />

            {/* All other pages — with layout */}
            <Route path="/" element={<Layout><HomePage /></Layout>} />
            <Route path="/catalogue" element={<Layout><CataloguePage /></Layout>} />
            <Route path="/book/:id" element={<Layout><BookDetailPage /></Layout>} />
            <Route path="/cart" element={<Layout><CartPage /></Layout>} />
            <Route path="/checkout" element={<Layout><CheckoutPage /></Layout>} />
            <Route path="/payment" element={<Layout><PaymentPage /></Layout>} />
            <Route path="/confirmation" element={<Layout><ConfirmationPage /></Layout>} />
            <Route path="/orders" element={<Layout><OrderHistoryPage /></Layout>} />
          </Routes>
        </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}
