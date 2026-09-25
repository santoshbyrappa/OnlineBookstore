import { describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import React from 'react'
import { CartProvider, useCart } from '../../context/CartContext'
import { books } from '../../data/books'

function wrapper({ children }: { children: React.ReactNode }) {
  return React.createElement(CartProvider, null, children)
}

const bookA = books[0] // The Midnight Library — $14.99
const bookB = books[1] // Atomic Habits — $16.99

describe('CartContext — initial state', () => {
  it('starts empty', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.items).toHaveLength(0)
  })

  it('total starts at 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.total).toBe(0)
  })

  it('itemCount starts at 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.itemCount).toBe(0)
  })

  it('giftPoints is 250', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    expect(result.current.giftPoints).toBe(250)
  })

  it('useCart throws when used outside CartProvider', () => {
    expect(() => renderHook(() => useCart())).toThrow(
      'useCart must be used inside CartProvider',
    )
  })
})

describe('CartContext — addToCart', () => {
  it('adds a new book to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].book.id).toBe(bookA.id)
    expect(result.current.items[0].qty).toBe(1)
  })

  it('increments quantity when same book added twice', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookA) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].qty).toBe(2)
  })

  it('keeps separate items for different books', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    expect(result.current.items).toHaveLength(2)
  })

  it('updates itemCount correctly after additions', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    expect(result.current.itemCount).toBe(3)
  })

  it('updates total correctly after additions', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    const expected = bookA.price + bookB.price
    expect(result.current.total).toBeCloseTo(expected, 2)
  })
})

describe('CartContext — removeFromCart', () => {
  it('removes a book from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.removeFromCart(bookA.id) })
    expect(result.current.items).toHaveLength(0)
  })

  it('only removes the specified book', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    act(() => { result.current.removeFromCart(bookA.id) })
    expect(result.current.items).toHaveLength(1)
    expect(result.current.items[0].book.id).toBe(bookB.id)
  })

  it('reduces total when book is removed', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    act(() => { result.current.removeFromCart(bookA.id) })
    expect(result.current.total).toBeCloseTo(bookB.price, 2)
  })
})

describe('CartContext — updateQty', () => {
  it('updates quantity to specified value', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.updateQty(bookA.id, 5) })
    expect(result.current.items[0].qty).toBe(5)
  })

  it('removes item when qty is set to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.updateQty(bookA.id, 0) })
    expect(result.current.items).toHaveLength(0)
  })

  it('removes item when qty is set to negative', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.updateQty(bookA.id, -1) })
    expect(result.current.items).toHaveLength(0)
  })

  it('recalculates total correctly after qty update', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.updateQty(bookA.id, 3) })
    expect(result.current.total).toBeCloseTo(bookA.price * 3, 2)
  })
})

describe('CartContext — clearCart', () => {
  it('empties all items', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    act(() => { result.current.clearCart() })
    expect(result.current.items).toHaveLength(0)
  })

  it('resets total to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.clearCart() })
    expect(result.current.total).toBe(0)
  })

  it('resets itemCount to 0', () => {
    const { result } = renderHook(() => useCart(), { wrapper })
    act(() => { result.current.addToCart(bookA) })
    act(() => { result.current.addToCart(bookB) })
    act(() => { result.current.clearCart() })
    expect(result.current.itemCount).toBe(0)
  })
})
