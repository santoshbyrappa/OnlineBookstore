import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Check } from 'lucide-react';
import type { Book } from '../data/books';
import { useCart } from '../context/CartContext';
import { useToast } from '../context/ToastContext';

interface Props {
  book: Book;
}

export default function BookCard({ book }: Props) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(book);
    showToast(book.title);
    // Show ✓ on button for 1.5s then revert
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const stars = Array.from({ length: 5 }, (_, i) => i < Math.floor(book.rating));

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col overflow-hidden group">
      {/* Badge */}
      <div className="relative">
        {book.badge && (
          <span className="absolute top-2 left-2 z-10 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-0.5 rounded-full">
            {book.badge}
          </span>
        )}
        <Link to={`/book/${book.id}`}>
          <img
            src={book.cover}
            alt={book.title}
            onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/200x280/e0e7ff/4f46e5?text=${encodeURIComponent(book.title.slice(0, 15))}`; }}
            className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs text-indigo-600 font-medium mb-1">{book.category}</p>
        <Link to={`/book/${book.id}`} className="font-semibold text-gray-800 hover:text-indigo-700 text-sm leading-snug line-clamp-2 mb-1">
          {book.title}
        </Link>
        <p className="text-xs text-gray-500 mb-2">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          {stars.map((filled, i) => (
            <Star key={i} size={12} className={filled ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />
          ))}
          <span className="text-xs text-gray-400 ml-1">({book.reviews.toLocaleString()})</span>
        </div>

        {/* Delivery */}
        <p className="text-xs text-green-600 mb-3">{book.deliveryDate}</p>

        {/* Price & CTA */}
        <div className="mt-auto flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-900">${book.price.toFixed(2)}</span>
            {book.originalPrice && (
              <span className="text-xs text-gray-400 line-through ml-1">${book.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className={`text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1 transition-all duration-300 ${
              added
                ? 'bg-green-500 scale-105'
                : 'bg-indigo-600 hover:bg-indigo-700'
            }`}
          >
            {added ? <><Check size={13} /> Added!</> : <><ShoppingCart size={13} /> Add</>}
          </button>
        </div>
      </div>
    </div>
  );
}
