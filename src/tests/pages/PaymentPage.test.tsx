import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import PaymentPage from '../../pages/PaymentPage'
import userEvent from '@testing-library/user-event'

describe('PaymentPage — rendering', () => {
  it('renders Payment page title text', () => {
    renderWithProviders(<PaymentPage />)
    // h1 contains icon + "Payment" text
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Payment')
  })

  it('renders checkout progress steps', () => {
    renderWithProviders(<PaymentPage />)
    // Steps are plain text spans, not headings
    expect(screen.getAllByText('Cart').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Payment').length).toBeGreaterThan(0)
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
  })

  it('renders all 4 payment method buttons', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByRole('button', { name: /credit \/ debit card/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /digital wallet/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /upi \/ mobile pay/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /net banking/i })).toBeInTheDocument()
  })

  it('Credit/Debit Card is selected by default', () => {
    renderWithProviders(<PaymentPage />)
    const cardBtn = screen.getByRole('button', { name: /credit \/ debit card/i })
    expect(cardBtn.className).toContain('indigo')
  })

  it('renders card detail fields when card method selected', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByPlaceholderText(/1234 5678/)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/john doe/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/mm\/yy/i)).toBeInTheDocument()
  })

  it('renders gift points redemption section', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByText(/redeem gift points/i)).toBeInTheDocument()
  })

  it('renders Apply checkbox for gift points', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('renders Pay button', () => {
    renderWithProviders(<PaymentPage />)
    // The pay button text starts with "Pay"
    const payBtn = screen.getAllByRole('button').find(b => b.textContent?.startsWith('Pay'))
    expect(payBtn).toBeDefined()
  })

  it('renders Payment Summary panel', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByText('Payment Summary')).toBeInTheDocument()
  })

  it('renders SSL security notice', () => {
    renderWithProviders(<PaymentPage />)
    expect(screen.getByText(/256-bit ssl/i)).toBeInTheDocument()
  })
})

describe('PaymentPage — payment method switching', () => {
  it('hides card fields when Digital Wallet is selected', async () => {
    renderWithProviders(<PaymentPage />)
    await userEvent.click(screen.getByRole('button', { name: /digital wallet/i }))
    expect(screen.queryByPlaceholderText(/1234 5678/)).not.toBeInTheDocument()
  })

  it('hides card fields when Net Banking is selected', async () => {
    renderWithProviders(<PaymentPage />)
    await userEvent.click(screen.getByRole('button', { name: /net banking/i }))
    expect(screen.queryByPlaceholderText(/1234 5678/)).not.toBeInTheDocument()
  })

  it('shows card fields again when Credit Card is reselected', async () => {
    renderWithProviders(<PaymentPage />)
    await userEvent.click(screen.getByRole('button', { name: /digital wallet/i }))
    await userEvent.click(screen.getByRole('button', { name: /credit \/ debit card/i }))
    expect(screen.getByPlaceholderText(/1234 5678/)).toBeInTheDocument()
  })
})

describe('PaymentPage — gift points', () => {
  it('shows discount confirmation when Apply is checked', async () => {
    renderWithProviders(<PaymentPage />)
    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.getByText(/discount applied/i)).toBeInTheDocument()
  })

  it('hides discount confirmation when unchecked', async () => {
    renderWithProviders(<PaymentPage />)
    await userEvent.click(screen.getByRole('checkbox'))
    await userEvent.click(screen.getByRole('checkbox'))
    expect(screen.queryByText(/discount applied/i)).not.toBeInTheDocument()
  })
})
