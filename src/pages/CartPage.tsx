import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Tag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';
import { books } from '../data/books';

export default function CartPage() {
  const { items, removeFromCart, updateQty, total, giftPoints } = useCart();

  // Recommendations based on cart categories
  const cartCategories = items.map(i => i.book.category);
  const recommended = books
    .filter(b => cartCategories.includes(b.category) && !items.find(i => i.book.id === b.id))
    .slice(0, 4);

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Looks like you haven't added any books yet.</p>
        <Link to="/catalogue" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-full font-semibold transition-colors inline-block">
          Browse Books
        </Link>
      </div>
    );
  }

  const shipping = total >= 25 ? 0 : 3.99;
  const pointsDiscount = 0; // will be applied on checkout

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <ShoppingBag size={24} /> Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="flex-1 space-y-4">
          {items.map(({ book, qty }) => (
            <div key={book.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-4 flex gap-4 items-start">
              <img
                src={book.cover}
                alt={book.title}
                onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/80x110/e0e7ff/4f46e5?text=Book`; }}
                className="w-20 h-28 object-cover rounded-lg shrink-0"
              />
              <div className="flex-1">
                <Link to={`/book/${book.id}`} className="font-semibold text-gray-800 hover:text-indigo-700 text-sm">{book.title}</Link>
                <p className="text-xs text-gray-500 mb-1">{book.author}</p>
                <p className="text-xs text-green-600 mb-3">{book.deliveryDate}</p>

                <div className="flex items-center justify-between flex-wrap gap-2">
                  {/* Qty control */}
                  <div className="flex items-center border border-gray-200 rounded-full overflow-hidden">
                    <button onClick={() => updateQty(book.id, qty - 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors">
                      <Minus size={13} />
                    </button>
                    <span className="px-3 text-sm font-medium">{qty}</span>
                    <button onClick={() => updateQty(book.id, qty + 1)} className="px-3 py-1 hover:bg-gray-100 transition-colors">
                      <Plus size={13} />
                    </button>
                  </div>

                  <span className="font-bold text-gray-900">${(book.price * qty).toFixed(2)}</span>

                  <button onClick={() => removeFromCart(book.id)} className="text-red-500 hover:text-red-700 p-1">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <h2 className="font-bold text-gray-800 mb-4 text-lg">Order Summary</h2>

            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span><span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                  {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-gray-400">Add ${(25 - total).toFixed(2)} more for free shipping</p>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Points discount</span><span className="text-green-600">-${pointsDiscount.toFixed(2)}</span>
              </div>
            </div>

            {/* Gift Points */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 flex items-center gap-2 mb-4">
              <Tag size={16} className="text-yellow-600" />
              <div>
                <p className="text-xs font-semibold text-yellow-800">You have {giftPoints} gift points</p>
                <p className="text-xs text-yellow-600">Redeem at checkout for up to ${(giftPoints * 0.01).toFixed(2)} off</p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-3 mb-5">
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span><span>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>

            <Link
              to="/checkout"
              className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white text-center py-3 rounded-full font-semibold transition-colors"
            >
              Proceed to Checkout
            </Link>
            <Link to="/catalogue" className="block w-full text-center text-indigo-600 hover:underline mt-3 text-sm">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommended.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recommended for You</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {recommended.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
