import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import React from 'react'
import { renderWithProviders } from '../test-utils'
import CartPage from '../../pages/CartPage'
import { AuthProvider } from '../../context/AuthContext'
import { CartProvider, useCart } from '../../context/CartContext'
import { ToastProvider } from '../../context/ToastContext'
import { books } from '../../data/books'
import { act, renderHook } from '@testing-library/react'

// Helper: render CartPage with pre-populated cart
function renderCartWithBook() {
  function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <AuthProvider>
        <CartProvider>
          <ToastProvider>
            <MemoryRouter>{children}</MemoryRouter>
          </ToastProvider>
        </CartProvider>
      </AuthProvider>
    )
  }

  // Pre-add a book by rendering a helper that mutates state
  const hookResult = renderHook(() => useCart(), { wrapper: ({ children }) => <CartProvider>{children}</CartProvider> })
  act(() => { hookResult.result.current.addToCart(books[0]) })

  // Render CartPage in its own separate context with a book already added via direct render
  function CartWithItems() {
    const { addToCart } = useCart()
    React.useEffect(() => { addToCart(books[0]) }, [])
    return <CartPage />
  }

  return render(<Wrapper><CartWithItems /></Wrapper>)
}

describe('CartPage — empty cart', () => {
  it('renders empty cart message', () => {
    renderWithProviders(<CartPage />)
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument()
  })

  it('renders Browse Books link', () => {
    renderWithProviders(<CartPage />)
    expect(screen.getByRole('link', { name: /browse books/i })).toBeInTheDocument()
  })

  it('does not render Order Summary when empty', () => {
    renderWithProviders(<CartPage />)
    expect(screen.queryByText(/order summary/i)).not.toBeInTheDocument()
  })
})

describe('CartPage — with items', () => {
  it('renders Shopping Cart heading', () => {
    renderCartWithBook()
    expect(screen.getByText(/shopping cart/i)).toBeInTheDocument()
  })

  it('renders item title in cart', () => {
    renderCartWithBook()
    expect(screen.getByText(books[0].title)).toBeInTheDocument()
  })

  it('renders Order Summary panel', () => {
    renderCartWithBook()
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })

  it('renders Proceed to Checkout button', () => {
    renderCartWithBook()
    expect(screen.getByRole('link', { name: /proceed to checkout/i })).toBeInTheDocument()
  })

  it('renders gift points banner', () => {
    renderCartWithBook()
    expect(screen.getByText(/gift points/i)).toBeInTheDocument()
  })

  it('renders quantity controls', () => {
    renderCartWithBook()
    // Plus and minus buttons
    expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
  })

  it('renders Continue Shopping link', () => {
    renderCartWithBook()
    expect(screen.getByRole('link', { name: /continue shopping/i })).toBeInTheDocument()
  })

  it('shows FREE shipping when total >= $25', () => {
    // books[0] = $14.99, add twice to exceed $25
    function Wrapper({ children }: { children: React.ReactNode }) {
      return (
        <AuthProvider><CartProvider><ToastProvider>
          <MemoryRouter>{children}</MemoryRouter>
        </ToastProvider></CartProvider></AuthProvider>
      )
    }
    function CartTwoItems() {
      const { addToCart } = useCart()
      React.useEffect(() => {
        addToCart(books[0]) // $14.99
        addToCart(books[1]) // $16.99 — total = $31.98 > $25
      }, [])
      return <CartPage />
    }
    render(<Wrapper><CartTwoItems /></Wrapper>)
    expect(screen.getByText('FREE')).toBeInTheDocument()
  })
})
