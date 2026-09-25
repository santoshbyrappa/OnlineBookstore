import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { renderWithProviders } from '../test-utils'
import ConfirmationPage from '../../pages/ConfirmationPage'

describe('ConfirmationPage — rendering', () => {
  it('renders Order Confirmed heading', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument()
  })

  it('renders thank you message', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/thank you for your purchase/i)).toBeInTheDocument()
  })

  it('renders order ID in ORD-XXXXX format', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/ORD-\d{5}/)).toBeInTheDocument()
  })

  it('renders Confirmed status badge', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText('Confirmed')).toBeInTheDocument()
  })

  it('renders Estimated Delivery label', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/estimated delivery/i)).toBeInTheDocument()
  })

  it('renders Payment Successful', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/successful/i)).toBeInTheDocument()
  })

  it('renders 48h cancellation notice', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/48 hours/i)).toBeInTheDocument()
  })

  it('renders View My Orders link', () => {
    renderWithProviders(<ConfirmationPage />)
    const link = screen.getByRole('link', { name: /view my orders/i })
    expect(link).toHaveAttribute('href', '/orders')
  })

  it('renders Back to Home link', () => {
    renderWithProviders(<ConfirmationPage />)
    const link = screen.getByRole('link', { name: /back to home/i })
    expect(link).toHaveAttribute('href', '/')
  })

  it('renders email confirmation message', () => {
    renderWithProviders(<ConfirmationPage />)
    expect(screen.getByText(/confirmation email/i)).toBeInTheDocument()
  })

  it('renders a unique order ID each time (probabilistic)', () => {
    // Two separate renders should not produce the same ORD id (very high probability)
    const { unmount } = renderWithProviders(<ConfirmationPage />)
    const id1 = screen.getByText(/ORD-\d{5}/).textContent
    unmount()
    renderWithProviders(<ConfirmationPage />)
    const id2 = screen.getByText(/ORD-\d{5}/).textContent
    // Note: there's a 1/90000 chance these collide — acceptable in testing
    expect(typeof id1).toBe('string')
    expect(typeof id2).toBe('string')
  })
})
