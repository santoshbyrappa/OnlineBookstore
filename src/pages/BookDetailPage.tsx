import { useParams, Link } from 'react-router-dom';
import { ShoppingCart, Star, Truck, ArrowLeft, Heart } from 'lucide-react';
import { books } from '../data/books';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';

export default function BookDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const book = books.find(b => b.id === Number(id));

  if (!book) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">📖</p>
        <h2 className="text-xl font-bold text-gray-700">Book not found</h2>
        <Link to="/catalogue" className="text-indigo-600 hover:underline mt-4 inline-block">Back to Catalogue</Link>
      </div>
    );
  }

  const related = books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4);
  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(book.rating));
  const discount = book.originalPrice
    ? Math.round((1 - book.price / book.originalPrice) * 100)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Link to="/catalogue" className="flex items-center gap-1 text-sm text-indigo-600 hover:underline mb-6">
        <ArrowLeft size={15} /> Back to Catalogue
      </Link>

      {/* Product Layout */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 flex flex-col md:flex-row gap-10 mb-10">
        {/* Cover */}
        <div className="flex-shrink-0 flex flex-col items-center gap-3">
          {discount > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">-{discount}% OFF</span>
          )}
          <img
            src={book.cover}
            alt={book.title}
            onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/240x320/e0e7ff/4f46e5?text=${encodeURIComponent(book.title.slice(0, 12))}`; }}
            className="w-52 rounded-xl shadow-md"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <p className="text-indigo-600 text-sm font-medium mb-1">{book.category} · {book.brand}</p>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{book.title}</h1>
          <p className="text-gray-500 text-base mb-4">by <span className="font-medium text-gray-700">{book.author}</span></p>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-4">
            {stars.map((filled, i) => (
              <Star key={i} size={18} className={filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
            ))}
            <span className="font-semibold text-gray-700">{book.rating}</span>
            <span className="text-gray-400 text-sm">({book.reviews.toLocaleString()} reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-extrabold text-gray-900">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-xl text-gray-400 line-through">${book.originalPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Delivery */}
          <div className="flex items-center gap-2 text-green-700 bg-green-50 rounded-lg px-4 py-2 text-sm mb-6 w-fit">
            <Truck size={16} /> {book.deliveryDate}
          </div>

          {/* Description mock */}
          <p className="text-gray-600 leading-relaxed mb-8">
            A captivating read by {book.author}. This book explores themes relevant to {book.category.toLowerCase()} enthusiasts worldwide.
            Perfect for readers looking to expand their horizons and discover new perspectives.
            Published by {book.brand}.
          </p>

          {/* Actions */}
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => addToCart(book)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              <ShoppingCart size={18} /> Add to Cart
            </button>
            <Link
              to="/cart"
              onClick={() => addToCart(book)}
              className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Buy Now
            </Link>
            <button className="border border-gray-300 hover:border-red-400 hover:text-red-500 p-3 rounded-full transition-colors">
              <Heart size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {related.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
