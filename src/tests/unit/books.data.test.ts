import { describe, it, expect } from 'vitest'
import { books, categories, orderHistory } from '../../data/books'

// ─── books data ───────────────────────────────────────────────────────────────
describe('books data', () => {
  it('exports a non-empty books array', () => {
    expect(books.length).toBeGreaterThan(0)
  })

  it('every book has required fields', () => {
    books.forEach(book => {
      expect(book).toHaveProperty('id')
      expect(book).toHaveProperty('title')
      expect(book).toHaveProperty('author')
      expect(book).toHaveProperty('price')
      expect(book).toHaveProperty('cover')
      expect(book).toHaveProperty('category')
      expect(book).toHaveProperty('brand')
      expect(book).toHaveProperty('rating')
      expect(book).toHaveProperty('reviews')
      expect(book).toHaveProperty('deliveryDate')
    })
  })

  it('all book ids are unique', () => {
    const ids = books.map(b => b.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all book prices are positive numbers', () => {
    books.forEach(b => expect(b.price).toBeGreaterThan(0))
  })

  it('originalPrice is always greater than price when present', () => {
    books
      .filter(b => b.originalPrice !== undefined)
      .forEach(b => expect(b.originalPrice!).toBeGreaterThan(b.price))
  })

  it('rating is between 0 and 5', () => {
    books.forEach(b => {
      expect(b.rating).toBeGreaterThanOrEqual(0)
      expect(b.rating).toBeLessThanOrEqual(5)
    })
  })

  it('reviews count is a positive integer', () => {
    books.forEach(b => {
      expect(b.reviews).toBeGreaterThan(0)
      expect(Number.isInteger(b.reviews)).toBe(true)
    })
  })

  it('can filter books by category', () => {
    const fiction = books.filter(b => b.category === 'Fiction')
    expect(fiction.length).toBeGreaterThan(0)
    fiction.forEach(b => expect(b.category).toBe('Fiction'))
  })

  it('can find a book by id', () => {
    const book = books.find(b => b.id === 1)
    expect(book).toBeDefined()
    expect(book?.title).toBe('The Midnight Library')
  })

  it('book with badge "Bestseller" exists', () => {
    const bestseller = books.find(b => b.badge === 'Bestseller')
    expect(bestseller).toBeDefined()
  })
})

// ─── categories data ──────────────────────────────────────────────────────────
describe('categories data', () => {
  it('exports a non-empty categories array', () => {
    expect(categories.length).toBeGreaterThan(0)
  })

  it('every category has required fields', () => {
    categories.forEach(cat => {
      expect(cat).toHaveProperty('id')
      expect(cat).toHaveProperty('name')
      expect(cat).toHaveProperty('icon')
      expect(cat).toHaveProperty('count')
    })
  })

  it('all category ids are unique', () => {
    const ids = categories.map(c => c.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('all category counts are positive', () => {
    categories.forEach(c => expect(c.count).toBeGreaterThan(0))
  })
})

// ─── orderHistory data ────────────────────────────────────────────────────────
describe('orderHistory data', () => {
  it('exports a non-empty order history array', () => {
    expect(orderHistory.length).toBeGreaterThan(0)
  })

  it('every order has required fields', () => {
    orderHistory.forEach(order => {
      expect(order).toHaveProperty('id')
      expect(order).toHaveProperty('date')
      expect(order).toHaveProperty('book')
      expect(order).toHaveProperty('qty')
      expect(order).toHaveProperty('status')
    })
  })

  it('all order ids are unique', () => {
    const ids = orderHistory.map(o => o.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('order qty is a positive integer', () => {
    orderHistory.forEach(o => {
      expect(o.qty).toBeGreaterThan(0)
      expect(Number.isInteger(o.qty)).toBe(true)
    })
  })

  it('each order references a valid book', () => {
    orderHistory.forEach(o => {
      const found = books.find(b => b.id === o.book.id)
      expect(found).toBeDefined()
    })
  })
})
