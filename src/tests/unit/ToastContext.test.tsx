import { describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import React from 'react'
import { ToastProvider, useToast } from '../../context/ToastContext'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(ToastProvider, null, children)
}

describe('ToastContext — useToast hook', () => {
  it('useToast throws when used outside ToastProvider', () => {
    expect(() => renderHook(() => useToast())).toThrow(
      'useToast must be used inside ToastProvider',
    )
  })

  it('provides showToast function', () => {
    const { result } = renderHook(() => useToast(), { wrapper })
    expect(typeof result.current.showToast).toBe('function')
  })
})

describe('ToastProvider — UI behaviour', () => {
  function TestComponent() {
    const { showToast } = useToast()
    return <button onClick={() => showToast('Atomic Habits')}>Add</button>
  }

  it('shows toast with book title after showToast is called', async () => {
    render(React.createElement(ToastProvider, null, React.createElement(TestComponent)))
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(await screen.findByText('"Atomic Habits"')).toBeInTheDocument()
    expect(screen.getByText('Added to cart!')).toBeInTheDocument()
  })

  it('auto-dismisses toast after 3 seconds', async () => {
    render(React.createElement(ToastProvider, null, React.createElement(TestComponent)))
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    expect(await screen.findByText('"Atomic Habits"')).toBeInTheDocument()
    // Wait for auto-dismiss (3s + buffer)
    expect(await screen.findByText('"Atomic Habits"', {}, { timeout: 200 })).toBeInTheDocument()
    // After 3s the toast should be gone — use a longer findBy negation approach
    await new Promise(r => setTimeout(r, 3100))
    expect(screen.queryByText('"Atomic Habits"')).not.toBeInTheDocument()
  }, 7000)

  it('dismiss button removes toast immediately', async () => {
    render(React.createElement(ToastProvider, null, React.createElement(TestComponent)))
    await userEvent.click(screen.getByRole('button', { name: 'Add' }))
    const dismissBtn = await screen.findByRole('button', { name: 'Dismiss' })
    await userEvent.click(dismissBtn)
    expect(screen.queryByText('"Atomic Habits"')).not.toBeInTheDocument()
  })

  it('stacks multiple toasts', async () => {
    function MultiAdd() {
      const { showToast } = useToast()
      return (
        <>
          <button onClick={() => showToast('Book One')}>add1</button>
          <button onClick={() => showToast('Book Two')}>add2</button>
        </>
      )
    }
    render(React.createElement(ToastProvider, null, React.createElement(MultiAdd)))
    await userEvent.click(screen.getByRole('button', { name: 'add1' }))
    await userEvent.click(screen.getByRole('button', { name: 'add2' }))
    expect(await screen.findByText('"Book One"')).toBeInTheDocument()
    expect(screen.getByText('"Book Two"')).toBeInTheDocument()
  })
})
