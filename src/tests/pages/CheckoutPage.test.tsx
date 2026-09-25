import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../test-utils'
import CheckoutPage from '../../pages/CheckoutPage'

describe('CheckoutPage — rendering', () => {
  it('renders Select Delivery Address heading', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByText(/select delivery address/i)).toBeInTheDocument()
  })

  it('renders checkout progress steps', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByText('Cart')).toBeInTheDocument()
    expect(screen.getByText('Address')).toBeInTheDocument()
    expect(screen.getByText('Payment')).toBeInTheDocument()
    expect(screen.getByText('Confirmation')).toBeInTheDocument()
  })

  it('renders pre-saved Home address', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText(/42 Elm Street/)).toBeInTheDocument()
  })

  it('renders pre-saved Office address', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByText('Office')).toBeInTheDocument()
    expect(screen.getByText(/100 Broadway/)).toBeInTheDocument()
  })

  it('Home address is selected by default', () => {
    renderWithProviders(<CheckoutPage />)
    const radios = screen.getAllByRole('radio')
    expect(radios[0]).toBeChecked()
    expect(radios[1]).not.toBeChecked()
  })

  it('renders Add New Address button', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByRole('button', { name: /add new address/i })).toBeInTheDocument()
  })

  it('renders Continue to Payment button', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByRole('button', { name: /continue to payment/i })).toBeInTheDocument()
  })

  it('renders Order Summary panel', () => {
    renderWithProviders(<CheckoutPage />)
    expect(screen.getByText('Order Summary')).toBeInTheDocument()
  })
})

describe('CheckoutPage — address selection', () => {
  it('selects Office address when its radio area is clicked', async () => {
    renderWithProviders(<CheckoutPage />)
    const radios = screen.getAllByRole('radio')
    // Click the second radio (Office)
    await userEvent.click(radios[1].closest('div')!)
    expect(radios[1]).toBeChecked()
  })
})

describe('CheckoutPage — Add New Address form', () => {
  it('shows new address form fields when button is clicked', async () => {
    renderWithProviders(<CheckoutPage />)
    await userEvent.click(screen.getByRole('button', { name: /add new address/i }))
    expect(screen.getByRole('button', { name: /save address/i })).toBeInTheDocument()
  })

  it('hides new address form when button is clicked again', async () => {
    renderWithProviders(<CheckoutPage />)
    await userEvent.click(screen.getByRole('button', { name: /add new address/i }))
    await userEvent.click(screen.getByRole('button', { name: /add new address/i }))
    expect(screen.queryByRole('button', { name: /save address/i })).not.toBeInTheDocument()
  })
})
