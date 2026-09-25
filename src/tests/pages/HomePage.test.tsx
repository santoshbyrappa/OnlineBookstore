import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import HomePage from '../../pages/HomePage'

describe('HomePage — rendering', () => {
  it('renders hero heading', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/discover your/i)).toBeInTheDocument()
  })

  it('renders hero Browse Catalogue CTA', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('link', { name: /browse catalogue/i })).toBeInTheDocument()
  })

  it('renders My Orders link in hero', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('link', { name: /my orders/i })).toBeInTheDocument()
  })

  it('renders Browse by Category section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/browse by category/i)).toBeInTheDocument()
  })

  it('renders all 8 category tiles', () => {
    renderWithProviders(<HomePage />)
    const categoryNames = ['Fiction', 'Non-Fiction', 'Science & Tech', 'Children', 'Business', 'History', 'Self-Help', 'Biographies']
    categoryNames.forEach(cat => {
      expect(screen.getAllByText(cat).length).toBeGreaterThan(0)
    })
  })

  it('renders Featured Books section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/featured books/i)).toBeInTheDocument()
  })

  it('renders Bestsellers section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Bestsellers')).toBeInTheDocument()
  })

  it('renders New Arrivals section', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/new arrivals/i)).toBeInTheDocument()
  })

  it('renders trust badge: Free Delivery', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Free Delivery')).toBeInTheDocument()
  })

  it('renders trust badge: Secure Payment', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Secure Payment')).toBeInTheDocument()
  })

  it('renders trust badge: Easy Returns', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Easy Returns')).toBeInTheDocument()
  })

  it('renders trust badge: Gift Points', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText('Gift Points')).toBeInTheDocument()
  })

  it('renders gift points promo banner', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByText(/earn gift points on every purchase/i)).toBeInTheDocument()
  })

  it('renders Shop Now button in promo banner', () => {
    renderWithProviders(<HomePage />)
    expect(screen.getByRole('link', { name: /shop now/i })).toBeInTheDocument()
  })

  it('renders book cards on homepage', () => {
    renderWithProviders(<HomePage />)
    // At least one "Add" button means BookCard components rendered
    const addButtons = screen.getAllByRole('button', { name: /add/i })
    expect(addButtons.length).toBeGreaterThan(0)
  })
})
