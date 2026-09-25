import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, RotateCcw, Shield, Gift } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

export default function HomePage() {
  const featured = books.slice(0, 4);
  const bestsellers = books.filter(b => b.badge === 'Bestseller' || b.badge === 'Top Rated');

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-indigo-700 to-purple-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <p className="text-yellow-300 font-medium mb-2 text-sm uppercase tracking-widest">Welcome to BookStore</p>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Discover Your<br />Next Favourite Book
            </h1>
            <p className="text-indigo-200 mb-8 text-lg">Over 10,000 titles across all genres. Free delivery on orders over $25.</p>
            <div className="flex gap-3 flex-wrap">
              <Link to="/catalogue" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
                Browse Catalogue <ArrowRight size={18} />
              </Link>
              <Link to="/orders" className="border border-white text-white hover:bg-white hover:text-indigo-700 px-6 py-3 rounded-full transition-colors font-medium">
                My Orders
              </Link>
            </div>
          </div>
          <div className="flex-1 flex justify-center">
            <div className="grid grid-cols-2 gap-4 max-w-sm">
              {books.slice(0, 4).map(book => (
                <img
                  key={book.id}
                  src={book.cover}
                  alt={book.title}
                  onError={e => { (e.target as HTMLImageElement).src = `https://placehold.co/120x160/4f46e5/ffffff?text=Book`; }}
                  className="rounded-lg shadow-lg h-32 w-full object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Truck size={24} className="text-indigo-600" />, label: 'Free Delivery', sub: 'On orders over $25' },
            { icon: <RotateCcw size={24} className="text-green-600" />, label: 'Easy Returns', sub: '30-day return policy' },
            { icon: <Shield size={24} className="text-blue-600" />, label: 'Secure Payment', sub: '100% safe checkout' },
            { icon: <Gift size={24} className="text-yellow-500" />, label: 'Gift Points', sub: 'Earn on every purchase' },
          ].map(({ icon, label, sub }) => (
            <div key={label} className="flex items-center gap-3">
              {icon}
              <div>
                <p className="font-semibold text-sm text-gray-800">{label}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Browse by Category</h2>
          <Link to="/catalogue" className="text-indigo-600 hover:underline text-sm font-medium flex items-center gap-1">
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
          {categories.map(cat => (
            <Link
              key={cat.id}
              to={`/catalogue?category=${encodeURIComponent(cat.name)}`}
              className="bg-white border border-gray-100 hover:border-indigo-300 hover:bg-indigo-50 rounded-xl p-4 text-center transition-all group"
            >
              <div className="text-3xl mb-2">{cat.icon}</div>
              <p className="text-xs font-semibold text-gray-700 group-hover:text-indigo-700">{cat.name}</p>
              <p className="text-xs text-gray-400">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="bg-yellow-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Star className="text-yellow-400 fill-yellow-400" size={22} />
              <h2 className="text-2xl font-bold text-gray-800">Bestsellers</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {bestsellers.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          </div>
        </section>
      )}

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Featured Books</h2>
          <Link to="/catalogue" className="text-indigo-600 hover:underline text-sm font-medium flex items-center gap-1">
            See All <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featured.map(book => <BookCard key={book.id} book={book} />)}
        </div>
      </section>

      {/* All Books Preview */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">New Arrivals</h2>
            <Link to="/catalogue" className="text-indigo-600 hover:underline text-sm font-medium flex items-center gap-1">
              Browse All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {books.slice(4, 8).map(book => <BookCard key={book.id} book={book} />)}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-indigo-600 text-white py-12 px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">🎁 Earn Gift Points on Every Purchase</h2>
        <p className="text-indigo-200 mb-6 text-lg">Redeem your points at checkout for instant discounts</p>
        <Link to="/catalogue" className="bg-yellow-400 text-gray-900 font-bold px-8 py-3 rounded-full hover:bg-yellow-300 transition-colors inline-block">
          Shop Now &amp; Earn Points
        </Link>
      </section>
    </div>
  );
}
