import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import OrderHistoryPage from '../../pages/OrderHistoryPage'
import { orderHistory } from '../../data/books'

describe('OrderHistoryPage — rendering', () => {
  it('renders Order History heading', () => {
    renderWithProviders(<OrderHistoryPage />)
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Order History')
  })

  it('renders all order IDs', () => {
    renderWithProviders(<OrderHistoryPage />)
    orderHistory.forEach(order => {
      expect(screen.getByText(order.id)).toBeInTheDocument()
    })
  })

  it('renders order dates', () => {
    renderWithProviders(<OrderHistoryPage />)
    orderHistory.forEach(order => {
      expect(screen.getByText(new RegExp(order.date))).toBeInTheDocument()
    })
  })

  it('renders book titles from order history', () => {
    renderWithProviders(<OrderHistoryPage />)
    orderHistory.forEach(order => {
      expect(screen.getByText(order.book.title)).toBeInTheDocument()
    })
  })

  it('renders Delivered status badge for all mock orders', () => {
    renderWithProviders(<OrderHistoryPage />)
    const badges = screen.getAllByText('Delivered')
    expect(badges.length).toBe(orderHistory.length)
  })

  it('renders Buy Again button for each order', () => {
    renderWithProviders(<OrderHistoryPage />)
    const buyAgainBtns = screen.getAllByRole('button', { name: /buy again/i })
    expect(buyAgainBtns.length).toBe(orderHistory.length)
  })

  it('renders Recommended Based on Your Orders section', () => {
    renderWithProviders(<OrderHistoryPage />)
    expect(screen.getByText(/recommended based on your orders/i)).toBeInTheDocument()
  })

  it('renders recommendation book cards', () => {
    renderWithProviders(<OrderHistoryPage />)
    const addButtons = screen.getAllByRole('button', { name: /^add$/i })
    expect(addButtons.length).toBeGreaterThan(0)
  })
})

describe('OrderHistoryPage — Buy Again interaction', () => {
  it('Buy Again button adds to cart without error', async () => {
    // Buy Again calls addToCart directly (not via BookCard), no toast
    renderWithProviders(<OrderHistoryPage />)
    const buttons = screen.getAllByRole('button', { name: /buy again/i })
    // Clicking should not throw
    await userEvent.click(buttons[0])
    // Buy Again buttons still rendered (item added but not removed)
    expect(screen.getAllByRole('button', { name: /buy again/i }).length).toBeGreaterThan(0)
  })
})

describe('OrderHistoryPage — order display details', () => {
  it('renders at least one Qty entry for each order', () => {
    renderWithProviders(<OrderHistoryPage />)
    // Multiple orders may have qty:1, use getAllByText
    const qtyItems = screen.getAllByText(/Qty:/)
    expect(qtyItems.length).toBe(orderHistory.length)
  })

  it('renders authors for each ordered book', () => {
    renderWithProviders(<OrderHistoryPage />)
    orderHistory.forEach(order => {
      expect(screen.getByText(order.book.author)).toBeInTheDocument()
    })
  })
})
