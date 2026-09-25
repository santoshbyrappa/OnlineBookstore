import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import Navbar from '../../components/Navbar'

describe('Navbar — rendering', () => {
  it('renders BookStore logo text', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByText('BookStore')).toBeInTheDocument()
  })

  it('renders search input', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByPlaceholderText(/search books/i)).toBeInTheDocument()
  })

  it('renders Sign In link when not logged in', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('link', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders cart link with /cart href', () => {
    renderWithProviders(<Navbar />)
    const links = screen.getAllByRole('link')
    const cartLink = links.find(l => l.getAttribute('href') === '/cart')
    expect(cartLink).toBeDefined()
  })

  it('renders All Books category tab', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('link', { name: 'All Books' })).toBeInTheDocument()
  })

  it('renders Fiction category tab', () => {
    renderWithProviders(<Navbar />)
    expect(screen.getByRole('link', { name: 'Fiction' })).toBeInTheDocument()
  })

  it('Fiction tab links to correct URL', () => {
    renderWithProviders(<Navbar />)
    const fictionLink = screen.getByRole('link', { name: 'Fiction' })
    expect(fictionLink).toHaveAttribute('href', '/catalogue?category=Fiction')
  })

  it('All Books tab links to /catalogue', () => {
    renderWithProviders(<Navbar />)
    const allLink = screen.getByRole('link', { name: 'All Books' })
    expect(allLink).toHaveAttribute('href', '/catalogue')
  })

  it('does not show cart badge when cart is empty', () => {
    renderWithProviders(<Navbar />)
    expect(screen.queryByText('0')).not.toBeInTheDocument()
  })
})

describe('Navbar — search behaviour', () => {
  it('clear button is not visible when search is empty', () => {
    renderWithProviders(<Navbar />)
    expect(screen.queryByRole('button', { name: /clear search/i })).not.toBeInTheDocument()
  })

  it('clear button appears after typing in search', async () => {
    renderWithProviders(<Navbar />)
    const input = screen.getByPlaceholderText(/search books/i)
    await userEvent.type(input, 'Dune')
    expect(screen.getByRole('button', { name: /clear search/i })).toBeInTheDocument()
  })

  it('clear button removes text from search input', async () => {
    renderWithProviders(<Navbar />)
    const input = screen.getByPlaceholderText(/search books/i)
    await userEvent.type(input, 'Dune')
    await userEvent.click(screen.getByRole('button', { name: /clear search/i }))
    expect(input).toHaveValue('')
  })
})
