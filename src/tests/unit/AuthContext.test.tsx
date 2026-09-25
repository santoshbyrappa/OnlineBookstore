import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { AuthProvider, useAuth } from '../../context/AuthContext'

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(AuthProvider, null, children)
}

describe('AuthContext', () => {
  it('starts with no user (null)', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    expect(result.current.user).toBeNull()
  })

  it('login with valid email sets user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login('john@example.com', 'password123')
    })
    expect(result.current.user).not.toBeNull()
    expect(result.current.user?.email).toBe('john@example.com')
  })

  it('login derives username from email (part before @)', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login('alice@bookstore.com', 'pass')
    })
    expect(result.current.user?.name).toBe('alice')
  })

  it('login returns true on success', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let returnVal: boolean = false
    act(() => {
      returnVal = result.current.login('test@test.com', 'abc')
    })
    expect(returnVal).toBe(true)
  })

  it('login with empty email returns false and does not set user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    let returnVal: boolean = true
    act(() => {
      returnVal = result.current.login('', 'password')
    })
    expect(returnVal).toBe(false)
    expect(result.current.user).toBeNull()
  })

  it('logout clears user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login('john@example.com', 'pass')
    })
    expect(result.current.user).not.toBeNull()
    act(() => {
      result.current.logout()
    })
    expect(result.current.user).toBeNull()
  })

  it('useAuth throws when used outside AuthProvider', () => {
    expect(() => renderHook(() => useAuth())).toThrow(
      'useAuth must be used inside AuthProvider',
    )
  })

  it('login accepts any non-empty password', () => {
    const { result } = renderHook(() => useAuth(), { wrapper })
    act(() => {
      result.current.login('user@test.com', 'any-password-works')
    })
    expect(result.current.user?.email).toBe('user@test.com')
  })
})
