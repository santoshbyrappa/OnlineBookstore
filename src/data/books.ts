// Shared mock data used across all pages
export interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  cover: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  deliveryDate: string;
  badge?: string;
}

export interface Category {
  id: number;
  name: string;
  icon: string;
  count: number;
}

export const categories: Category[] = [
  { id: 1, name: 'Fiction', icon: '📖', count: 1240 },
  { id: 2, name: 'Non-Fiction', icon: '📚', count: 980 },
  { id: 3, name: 'Science & Tech', icon: '🔬', count: 540 },
  { id: 4, name: 'Children', icon: '🧸', count: 320 },
  { id: 5, name: 'Business', icon: '💼', count: 460 },
  { id: 6, name: 'History', icon: '🏛️', count: 290 },
  { id: 7, name: 'Self-Help', icon: '🌱', count: 380 },
  { id: 8, name: 'Biographies', icon: '👤', count: 210 },
];

export const books: Book[] = [
  {
    id: 1, title: 'The Midnight Library', author: 'Matt Haig', price: 14.99, originalPrice: 19.99,
    cover: 'https://covers.openlibrary.org/b/id/10909258-L.jpg',
    category: 'Fiction', brand: 'Canongate Books', rating: 4.5, reviews: 2341,
    deliveryDate: 'Delivers by Jun 28', badge: 'Bestseller',
  },
  {
    id: 2, title: 'Atomic Habits', author: 'James Clear', price: 16.99, originalPrice: 24.99,
    cover: 'https://covers.openlibrary.org/b/id/10523478-L.jpg',
    category: 'Self-Help', brand: 'Penguin', rating: 4.8, reviews: 5100,
    deliveryDate: 'Delivers by Jun 27', badge: 'Top Rated',
  },
  {
    id: 3, title: 'Sapiens', author: 'Yuval Noah Harari', price: 13.99,
    cover: 'https://covers.openlibrary.org/b/id/8406786-L.jpg',
    category: 'History', brand: 'HarperCollins', rating: 4.7, reviews: 3800,
    deliveryDate: 'Delivers by Jun 29',
  },
  {
    id: 4, title: 'Educated', author: 'Tara Westover', price: 12.99, originalPrice: 17.99,
    cover: 'https://covers.openlibrary.org/b/id/8739161-L.jpg',
    category: 'Biographies', brand: 'Random House', rating: 4.6, reviews: 2900,
    deliveryDate: 'Delivers by Jul 1', badge: 'New',
  },
  {
    id: 5, title: 'The Lean Startup', author: 'Eric Ries', price: 15.99,
    cover: 'https://covers.openlibrary.org/b/id/7991027-L.jpg',
    category: 'Business', brand: 'Crown Business', rating: 4.4, reviews: 1700,
    deliveryDate: 'Delivers by Jun 30',
  },
  {
    id: 6, title: 'Dune', author: 'Frank Herbert', price: 11.99, originalPrice: 15.99,
    cover: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
    category: 'Fiction', brand: 'Ace Books', rating: 4.7, reviews: 4200,
    deliveryDate: 'Delivers by Jun 28', badge: 'Classic',
  },
  {
    id: 7, title: 'Clean Code', author: 'Robert C. Martin', price: 29.99,
    cover: 'https://covers.openlibrary.org/b/id/8346620-L.jpg',
    category: 'Science & Tech', brand: 'Prentice Hall', rating: 4.6, reviews: 3100,
    deliveryDate: 'Delivers by Jun 29',
  },
  {
    id: 8, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', price: 13.49,
    cover: 'https://covers.openlibrary.org/b/id/8268093-L.jpg',
    category: 'Non-Fiction', brand: 'FSG', rating: 4.5, reviews: 2600,
    deliveryDate: 'Delivers by Jun 30',
  },
  {
    id: 9, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 8.99,
    cover: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
    category: 'Fiction', brand: 'Scribner', rating: 4.3, reviews: 5500,
    deliveryDate: 'Delivers by Jun 27',
  },
  {
    id: 10, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', price: 10.99, originalPrice: 14.99,
    cover: 'https://covers.openlibrary.org/b/id/10110415-L.jpg',
    category: 'Children', brand: 'Bloomsbury', rating: 4.9, reviews: 9800,
    deliveryDate: 'Delivers by Jun 26', badge: 'Bestseller',
  },
  {
    id: 11, title: 'Zero to One', author: 'Peter Thiel', price: 14.49,
    cover: 'https://covers.openlibrary.org/b/id/8739681-L.jpg',
    category: 'Business', brand: 'Crown Business', rating: 4.5, reviews: 1900,
    deliveryDate: 'Delivers by Jun 29',
  },
  {
    id: 12, title: 'The Power of Now', author: 'Eckhart Tolle', price: 11.99,
    cover: 'https://covers.openlibrary.org/b/id/8226217-L.jpg',
    category: 'Self-Help', brand: 'New World Library', rating: 4.4, reviews: 2200,
    deliveryDate: 'Delivers by Jul 2',
  },
];

export const orderHistory = [
  { id: 'ORD-1001', date: 'May 12, 2025', book: books[1], qty: 1, status: 'Delivered' },
  { id: 'ORD-1002', date: 'Apr 28, 2025', book: books[0], qty: 2, status: 'Delivered' },
  { id: 'ORD-1003', date: 'Mar 15, 2025', book: books[5], qty: 1, status: 'Delivered' },
];
