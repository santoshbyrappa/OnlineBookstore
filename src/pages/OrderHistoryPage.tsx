import { Link } from 'react-router-dom';
import { History, RefreshCw, Package, X } from 'lucide-react';
import { orderHistory } from '../data/books';
import { useCart } from '../context/CartContext';
import BookCard from '../components/BookCard';
import { books } from '../data/books';
import { useState } from 'react';

const STATUS_COLOR: Record<string, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Processing: 'bg-blue-100 text-blue-700',
  Cancelled: 'bg-red-100 text-red-700',
  Shipped: 'bg-yellow-100 text-yellow-700',
};

export default function OrderHistoryPage() {
  const { addToCart } = useCart();
  const [cancelled, setCancelled] = useState<string[]>([]);

  const handleCancel = (orderId: string) => setCancelled(prev => [...prev, orderId]);

  // Recommendations based on ordered categories
  const categories = orderHistory.map(o => o.book.category);
  const recommended = books.filter(b => categories.includes(b.category) && !orderHistory.find(o => o.book.id === b.id)).slice(0, 4);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <History size={24} /> Order History
      </h1>

      {orderHistory.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <Package size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-lg">No orders yet.</p>
          <Link to="/catalogue" className="text-indigo-600 hover:underline text-sm mt-2 inline-block">Start Shopping</Link>
        </div>
      ) : (
        <div className="space-y-5 mb-12">
          {orderHistory.map(order => {
            const isCancelled = cancelled.includes(order.id);
            const currentStatus = isCancelled ? 'Cancelled' : order.status;

            return (
              <div key={order.id} className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  <div>
                    <p className="font-bold text-gray-800">{order.id}</p>
                    <p className="text-xs text-gray-400">Ordered on {order.date}</p>
                  </div>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${STATUS_COLOR[currentStatus] || 'bg-gray-100 text-gray-600'}`}>
                    {currentStatus}
                  </span>
                </div>

                <div className="flex gap-4 items-start">
                  <img
                    src={order.book.cover}
                    alt={order.book.title}
                    onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/80x110/e0e7ff/4f46e5?text=Book`; }}
                    className="w-16 h-22 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1">
                    <Link to={`/book/${order.book.id}`} className="font-semibold text-gray-800 hover:text-indigo-700 text-sm">{order.book.title}</Link>
                    <p className="text-xs text-gray-500">{order.book.author}</p>
                    <p className="text-sm font-medium text-gray-700 mt-1">Qty: {order.qty} · ${(order.book.price * order.qty).toFixed(2)}</p>
                  </div>
                  <div className="flex flex-col gap-2 shrink-0">
                    {/* Buy Again */}
                    {!isCancelled && (
                      <button
                        onClick={() => addToCart(order.book)}
                        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-4 py-2 rounded-full transition-colors"
                      >
                        <RefreshCw size={13} /> Buy Again
                      </button>
                    )}
                    {/* Cancel within 48h */}
                    {!isCancelled && order.status === 'Delivered' === false && (
                      <button
                        onClick={() => handleCancel(order.id)}
                        className="flex items-center gap-1.5 border border-red-300 text-red-600 hover:bg-red-50 text-xs px-4 py-2 rounded-full transition-colors"
                      >
                        <X size={13} /> Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Recommendations based on history */}
      {recommended.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Recommended Based on Your Orders</h2>
          <p className="text-sm text-gray-500 mb-4">Books you might enjoy based on your purchase history</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            {recommended.map(b => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}
    </div>
  );
}
