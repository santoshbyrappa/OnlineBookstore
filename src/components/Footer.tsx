import { BookOpen, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-lg mb-3">
            <BookOpen size={22} />
            BookStore
          </div>
          <p className="text-sm leading-relaxed text-gray-400">
            Your one-stop destination for books across all genres. Browse, buy, and enjoy reading.
          </p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            {[['Home', '/'], ['Catalogue', '/catalogue'], ['My Orders', '/orders'], ['Cart', '/cart']].map(([label, path]) => (
              <li key={label}><Link to={path} className="hover:text-yellow-400 transition-colors">{label}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Categories</h4>
          <ul className="space-y-2 text-sm">
            {['Fiction', 'Non-Fiction', 'Science & Tech', 'Business', 'Self-Help'].map(cat => (
              <li key={cat}>
                <Link to={`/catalogue?category=${encodeURIComponent(cat)}`} className="hover:text-yellow-400 transition-colors">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-3">Contact</h4>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><Mail size={14} /> support@bookstore.com</li>
            <li className="flex items-center gap-2"><Phone size={14} /> +1 800 123 4567</li>
            <li className="flex items-center gap-2"><MapPin size={14} /> 123 Book Lane, NY 10001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-700 text-center text-xs text-gray-500 py-4">
        © 2025 BookStore. All rights reserved.
      </div>
    </footer>
  );
}
