import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import LoginPage from '../../pages/LoginPage'

describe('LoginPage — rendering', () => {
  it('renders BookStore heading', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText('BookStore')).toBeInTheDocument()
  })

  it('renders Sign in heading text', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText(/sign in to your account/i)).toBeInTheDocument()
  })

  it('renders email input', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByPlaceholderText('you@example.com')).toBeInTheDocument()
  })

  it('renders password input', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByPlaceholderText('••••••••')).toBeInTheDocument()
  })

  it('renders Sign In submit button', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument()
  })

  it('renders demo hint', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByText(/demo:/i)).toBeInTheDocument()
  })

  it('renders Browse as Guest link', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.getByRole('link', { name: /browse as guest/i })).toBeInTheDocument()
  })

  it('password field is masked by default', () => {
    renderWithProviders(<LoginPage />)
    const pw = screen.getByPlaceholderText('••••••••')
    expect(pw).toHaveAttribute('type', 'password')
  })
})

describe('LoginPage — validation', () => {
  it('shows error when submitting with empty fields', async () => {
    renderWithProviders(<LoginPage />)
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument()
  })

  it('shows error when only email is provided', async () => {
    renderWithProviders(<LoginPage />)
    await userEvent.type(screen.getByPlaceholderText('you@example.com'), 'test@test.com')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument()
  })

  it('shows error when only password is provided', async () => {
    renderWithProviders(<LoginPage />)
    await userEvent.type(screen.getByPlaceholderText('••••••••'), 'password123')
    await userEvent.click(screen.getByRole('button', { name: /sign in/i }))
    expect(screen.getByText(/please fill in all fields/i)).toBeInTheDocument()
  })

  it('no error shown on initial render', () => {
    renderWithProviders(<LoginPage />)
    expect(screen.queryByText(/please fill in all fields/i)).not.toBeInTheDocument()
  })
})

describe('LoginPage — password visibility toggle', () => {
  it('toggles password visibility when eye button clicked', async () => {
    renderWithProviders(<LoginPage />)
    const pwInput = screen.getByPlaceholderText('••••••••')
    expect(pwInput).toHaveAttribute('type', 'password')

    // The toggle button is the one that's NOT the submit button
    const buttons = screen.getAllByRole('button')
    const toggleBtn = buttons.find(b => b.getAttribute('type') === 'button')
    expect(toggleBtn).toBeDefined()

    await userEvent.click(toggleBtn!)
    expect(pwInput).toHaveAttribute('type', 'text')
  })

  it('toggles back to hidden when clicked again', async () => {
    renderWithProviders(<LoginPage />)
    const pwInput = screen.getByPlaceholderText('••••••••')
    const buttons = screen.getAllByRole('button')
    const toggleBtn = buttons.find(b => b.getAttribute('type') === 'button')!

    await userEvent.click(toggleBtn)
    await userEvent.click(toggleBtn)
    expect(pwInput).toHaveAttribute('type', 'password')
  })
})
