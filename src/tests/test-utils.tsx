// Shared test helpers: wraps components with all required providers + router
import React from 'react'
import { render, type RenderOptions } from '@testing-library/react'
import { MemoryRouter, type MemoryRouterProps } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import { CartProvider } from '../context/CartContext'
import { ToastProvider } from '../context/ToastContext'

interface WrapperOptions extends RenderOptions {
  routerProps?: MemoryRouterProps
}

function AllProviders({
  children,
  routerProps,
}: {
  children: React.ReactNode
  routerProps?: MemoryRouterProps
}) {
  return (
    <AuthProvider>
      <CartProvider>
        <ToastProvider>
          <MemoryRouter {...routerProps}>{children}</MemoryRouter>
        </ToastProvider>
      </CartProvider>
    </AuthProvider>
  )
}

export function renderWithProviders(
  ui: React.ReactElement,
  options: WrapperOptions = {},
) {
  const { routerProps, ...rest } = options
  return render(ui, {
    wrapper: ({ children }) => (
      <AllProviders routerProps={routerProps}>{children}</AllProviders>
    ),
    ...rest,
  })
}

export * from '@testing-library/react'
