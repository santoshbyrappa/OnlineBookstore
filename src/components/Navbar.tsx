import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, BookOpen, Search, User, LogOut, History, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  // Sync search input with URL ?q= param so it stays accurate on navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q') || '';
    setSearch(q);
  }, [location.search]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      navigate(`/catalogue?q=${encodeURIComponent(trimmed)}`);
    } else {
      // Empty search — go to catalogue with no ?q= param (clears results)
      navigate('/catalogue');
    }
  };

  const handleClearSearch = () => {
    setSearch('');
    navigate('/catalogue');
  };

  return (
    <nav className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl shrink-0">
          <BookOpen size={26} />
          <span className="hidden sm:inline">BookStore</span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 flex max-w-xl relative">
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            type="text"
            placeholder="Search books, authors, categories..."
            className="flex-1 px-4 py-2 rounded-l-full text-gray-800 text-sm focus:outline-none pr-8"
          />
          {/* Clear button — only visible when there is text */}
          {search && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
          <button type="submit" className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 px-4 py-2 rounded-r-full">
            <Search size={18} />
          </button>
        </form>

        {/* Right side */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Cart */}
          <Link to="/cart" className="relative p-2 hover:text-yellow-300 transition-colors">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {/* User menu */}
          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1 hover:text-yellow-300 text-sm">
                <User size={20} />
                <span className="hidden md:inline">{user.name}</span>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl w-48 py-1 z-50">
                  <Link to="/orders" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm">
                    <History size={16} /> Order History
                  </Link>
                  <button onClick={() => { logout(); setMenuOpen(false); navigate('/'); }} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-sm w-full text-left text-red-600">
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-1 hover:text-yellow-300 text-sm">
              <User size={20} />
              <span className="hidden md:inline">Sign In</span>
            </Link>
          )}
        </div>
      </div>

      {/* Category nav bar */}
      <div className="bg-indigo-800 overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 flex gap-6 py-2 text-sm whitespace-nowrap">
          {['All Books', 'Fiction', 'Non-Fiction', 'Science & Tech', 'Children', 'Business', 'History', 'Self-Help', 'Biographies'].map(cat => (
            <Link
              key={cat}
              to={cat === 'All Books' ? '/catalogue' : `/catalogue?category=${encodeURIComponent(cat)}`}
              className="hover:text-yellow-300 transition-colors"
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
