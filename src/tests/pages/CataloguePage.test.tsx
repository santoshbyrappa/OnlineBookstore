import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import CataloguePage from '../../pages/CataloguePage'

describe('CataloguePage — default rendering', () => {
  it('renders page heading', () => {
    renderWithProviders(<CataloguePage />)
    // heading is an h1 element — check it renders "All Books"
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('All Books')
  })

  it('renders book count', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByText(/books found/i)).toBeInTheDocument()
  })

  it('renders all 12 books by default', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByText('12 books found')).toBeInTheDocument()
  })

  it('renders Category filter sidebar', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByText('Category')).toBeInTheDocument()
  })

  it('renders Max Price slider', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByText(/max price/i)).toBeInTheDocument()
  })

  it('renders Relevance sort option', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByRole('button', { name: 'Relevance' })).toBeInTheDocument()
  })

  it('renders Price: Low to High sort option', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByRole('button', { name: 'Price: Low to High' })).toBeInTheDocument()
  })

  it('renders Top Rated sort option', () => {
    renderWithProviders(<CataloguePage />)
    expect(screen.getByRole('button', { name: 'Top Rated' })).toBeInTheDocument()
  })
})

describe('CataloguePage — category filter from URL', () => {
  it('filters books when category param is set', () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?category=Fiction'] },
    })
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Fiction')
  })

  it('shows only books from that category', () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?category=Business'] },
    })
    expect(screen.getByText('2 books found')).toBeInTheDocument()
  })
})

describe('CataloguePage — search filter from URL', () => {
  it('shows search heading with query', () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?q=Dune'] },
    })
    expect(screen.getByText('Results for "Dune"')).toBeInTheDocument()
  })

  it('filters books matching search query', () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?q=Dune'] },
    })
    expect(screen.getByText('1 books found')).toBeInTheDocument()
  })

  it('shows "no books found" for unmatched query', () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?q=xyznotabook123'] },
    })
    expect(screen.getByText(/no books found/i)).toBeInTheDocument()
  })
})

describe('CataloguePage — sidebar category filter interaction', () => {
  it('clicking a category button updates filter', async () => {
    renderWithProviders(<CataloguePage />)
    const fictionBtn = screen.getByRole('button', { name: /^fiction/i })
    await userEvent.click(fictionBtn)
    expect(screen.getByText('3 books found')).toBeInTheDocument()
  })

  it('clicking All Books button clears category filter', async () => {
    renderWithProviders(<CataloguePage />, {
      routerProps: { initialEntries: ['/catalogue?category=Fiction'] },
    })
    const allBooksBtn = screen.getByRole('button', { name: /^all books$/i })
    await userEvent.click(allBooksBtn)
    expect(screen.getByText('12 books found')).toBeInTheDocument()
  })
})

describe('CataloguePage — sort interaction', () => {
  it('clicking Price: Low to High sorts books', async () => {
    renderWithProviders(<CataloguePage />)
    await userEvent.click(screen.getByRole('button', { name: 'Price: Low to High' }))
    expect(screen.getByText('12 books found')).toBeInTheDocument()
  })
})
