import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import BookCard from '../../components/BookCard'
import { books } from '../../data/books'

const book = books[0] // The Midnight Library — has badge, originalPrice
const bookNoExtras = books[2] // Sapiens — no badge, no originalPrice

describe('BookCard — rendering', () => {
  it('renders book title', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(book.title)).toBeInTheDocument()
  })

  it('renders book author', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(book.author)).toBeInTheDocument()
  })

  it('renders book price', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(`$${book.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('renders strikethrough original price when present', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(`$${book.originalPrice!.toFixed(2)}`)).toBeInTheDocument()
  })

  it('does not render original price when absent', () => {
    renderWithProviders(<BookCard book={bookNoExtras} />)
    expect(screen.queryByText(`$${(bookNoExtras as any).originalPrice}`)).not.toBeInTheDocument()
  })

  it('renders badge when present', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(book.badge!)).toBeInTheDocument()
  })

  it('does not render badge when absent', () => {
    renderWithProviders(<BookCard book={bookNoExtras} />)
    expect(screen.queryByText(/Bestseller|New|Classic|Top Rated/)).not.toBeInTheDocument()
  })

  it('renders delivery date', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(book.deliveryDate)).toBeInTheDocument()
  })

  it('renders review count', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(`(${book.reviews.toLocaleString()})`)).toBeInTheDocument()
  })

  it('renders category label', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByText(book.category)).toBeInTheDocument()
  })

  it('renders Add button', () => {
    renderWithProviders(<BookCard book={book} />)
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument()
  })

  it('book title links to detail page', () => {
    renderWithProviders(<BookCard book={book} />)
    const links = screen.getAllByRole('link')
    const detailLinks = links.filter(l => l.getAttribute('href') === `/book/${book.id}`)
    expect(detailLinks.length).toBeGreaterThan(0)
  })
})

describe('BookCard — Add to Cart interaction', () => {
  it('shows "Added!" on button after click', async () => {
    renderWithProviders(<BookCard book={book} />)
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))
    expect(await screen.findByRole('button', { name: /added/i })).toBeInTheDocument()
  })

  it('shows toast notification after click', async () => {
    renderWithProviders(<BookCard book={book} />)
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))
    expect(await screen.findByText('Added to cart!')).toBeInTheDocument()
    expect(screen.getByText(`"${book.title}"`)).toBeInTheDocument()
  })

  it('reverts button back to "Add" after 1.5s', async () => {
    renderWithProviders(<BookCard book={book} />)
    await userEvent.click(screen.getByRole('button', { name: /^add$/i }))
    expect(await screen.findByRole('button', { name: /added/i })).toBeInTheDocument()
    // Wait for the 1500ms revert timeout
    expect(await screen.findByRole('button', { name: /^add$/i }, { timeout: 3000 })).toBeInTheDocument()
  })
})
