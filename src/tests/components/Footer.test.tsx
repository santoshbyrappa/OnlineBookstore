import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import Footer from '../../components/Footer'

describe('Footer — rendering', () => {
  it('renders BookStore brand name', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('BookStore')).toBeInTheDocument()
  })

  it('renders Quick Links section', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('Quick Links')).toBeInTheDocument()
  })

  it('renders Categories section', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('Categories')).toBeInTheDocument()
  })

  it('renders Contact section', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('renders support email', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('support@bookstore.com')).toBeInTheDocument()
  })

  it('renders support phone', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText('+1 800 123 4567')).toBeInTheDocument()
  })

  it('renders copyright notice', () => {
    renderWithProviders(<Footer />)
    expect(screen.getByText(/© 2025 BookStore/)).toBeInTheDocument()
  })

  it('renders Home navigation link', () => {
    renderWithProviders(<Footer />)
    const homeLink = screen.getByRole('link', { name: 'Home' })
    expect(homeLink).toHaveAttribute('href', '/')
  })

  it('renders Catalogue navigation link', () => {
    renderWithProviders(<Footer />)
    const catalogueLink = screen.getByRole('link', { name: 'Catalogue' })
    expect(catalogueLink).toHaveAttribute('href', '/catalogue')
  })

  it('renders My Orders navigation link', () => {
    renderWithProviders(<Footer />)
    const ordersLink = screen.getByRole('link', { name: 'My Orders' })
    expect(ordersLink).toHaveAttribute('href', '/orders')
  })

  it('renders Fiction category link', () => {
    renderWithProviders(<Footer />)
    const fictionLinks = screen.getAllByRole('link', { name: 'Fiction' })
    expect(fictionLinks.length).toBeGreaterThan(0)
  })
})
