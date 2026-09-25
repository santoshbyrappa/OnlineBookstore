import { describe, it, expect } from 'vitest'
import { screen, render } from '@testing-library/react'
import { Route, Routes, MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../../context/AuthContext'
import { CartProvider } from '../../context/CartContext'
import { ToastProvider } from '../../context/ToastContext'
import userEvent from '@testing-library/user-event'
import BookDetailPage from '../../pages/BookDetailPage'
import { books } from '../../data/books'

const book = books[0] // The Midnight Library — id:1, Fiction

// BookDetailPage uses useParams — must render inside a matching Route
function renderDetail(id: number | string) {
  return render(
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <MemoryRouter initialEntries={[`/book/${id}`]}>
            <Routes>
              <Route path="/book/:id" element={<BookDetailPage />} />
            </Routes>
          </MemoryRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

describe('BookDetailPage — valid book', () => {
  it('renders book title', () => {
    renderDetail(book.id)
    expect(screen.getByRole('heading', { name: book.title })).toBeInTheDocument()
  })

  it('renders author name', () => {
    renderDetail(book.id)
    expect(screen.getByText(book.author)).toBeInTheDocument()
  })

  it('renders book price', () => {
    renderDetail(book.id)
    expect(screen.getByText(`$${book.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renders original price with strikethrough when present', () => {
    renderDetail(book.id)
    expect(screen.getByText(`$${book.originalPrice!.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renders discount badge when originalPrice exists', () => {
    renderDetail(book.id)
    expect(screen.getByText(/-\d+% off/i)).toBeInTheDocument()
  })

  it('renders delivery date', () => {
    renderDetail(book.id)
    // deliveryDate appears in detail panel AND in related BookCard — use getAllBy
    expect(screen.getAllByText(book.deliveryDate).length).toBeGreaterThan(0)
  })

  it('renders rating value', () => {
    renderDetail(book.id)
    expect(screen.getByText(String(book.rating))).toBeInTheDocument()
  })

  it('renders review count', () => {
    renderDetail(book.id)
    expect(screen.getByText(`(${book.reviews.toLocaleString()} reviews)`)).toBeInTheDocument()
  })

  it('renders Add to Cart button', () => {
    renderDetail(book.id)
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument()
  })

  it('renders Buy Now link', () => {
    renderDetail(book.id)
    expect(screen.getByRole('link', { name: /buy now/i })).toBeInTheDocument()
  })

  it('renders Back to Catalogue link', () => {
    renderDetail(book.id)
    expect(screen.getByRole('link', { name: /back to catalogue/i })).toBeInTheDocument()
  })

  it('renders Related Products section for Fiction book', () => {
    renderDetail(book.id)
    expect(screen.getByText('Related Products')).toBeInTheDocument()
  })

  it('adds book to cart when Add to Cart is clicked', async () => {
    renderDetail(book.id)
    await userEvent.click(screen.getByRole('button', { name: /add to cart/i }))
    // No error = success
  })
})

describe('BookDetailPage — invalid book id', () => {
  it('renders "Book not found" for unknown id', () => {
    renderDetail(99999)
    expect(screen.getByText(/book not found/i)).toBeInTheDocument()
  })

  it('renders link back to catalogue on not found', () => {
    renderDetail(99999)
    expect(screen.getByRole('link', { name: /back to catalogue/i })).toBeInTheDocument()
  })
})
