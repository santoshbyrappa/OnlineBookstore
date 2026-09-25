import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import { books, categories } from '../data/books';
import BookCard from '../components/BookCard';

const SORT_OPTIONS = ['Relevance', 'Price: Low to High', 'Price: High to Low', 'Top Rated', 'Newest'];

export default function CataloguePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState('Relevance');
  const [maxPrice, setMaxPrice] = useState(50);
  const [showFilter, setShowFilter] = useState(false);

  // Always derive directly from URL — never stale local state
  const q = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || '';

  const filtered = useMemo(() => {
    let result = [...books];
    if (q) result = result.filter(b =>
      b.title.toLowerCase().includes(q.toLowerCase()) ||
      b.author.toLowerCase().includes(q.toLowerCase()) ||
      b.category.toLowerCase().includes(q.toLowerCase())
    );
    if (selectedCategory) result = result.filter(b => b.category === selectedCategory);
    result = result.filter(b => b.price <= maxPrice);
    if (sortBy === 'Price: Low to High') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'Price: High to Low') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'Top Rated') result.sort((a, b) => b.rating - a.rating);
    return result;
  }, [q, selectedCategory, maxPrice, sortBy]);

  const handleCategory = (cat: string) => {
    // Keep existing params (e.g. ?q=) but update category
    const params = new URLSearchParams(searchParams);
    if (cat) params.set('category', cat); else params.delete('category');
    setSearchParams(params);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {selectedCategory || (q ? `Results for "${q}"` : 'All Books')}
          </h1>
          <p className="text-sm text-gray-500">{filtered.length} books found</p>
        </div>
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm hover:bg-gray-50 md:hidden"
        >
          <SlidersHorizontal size={16} /> Filters
        </button>
      </div>

      <div className="flex gap-6">
        {/* Sidebar Filters */}
        <aside className={`
          ${showFilter ? 'fixed inset-0 z-40 bg-white p-6 overflow-y-auto' : 'hidden'}
          md:block md:static md:z-auto md:bg-transparent md:p-0 md:w-56 shrink-0
        `}>
          {showFilter && (
            <button onClick={() => setShowFilter(false)} className="flex items-center gap-1 text-sm text-gray-600 mb-4 md:hidden">
              <X size={16} /> Close Filters
            </button>
          )}

          {/* Category Filter */}
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Filter size={15} /> Category</h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => handleCategory('')}
                  className={`w-full text-left px-3 py-1.5 rounded-lg text-sm ${!selectedCategory ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  All Books
                </button>
              </li>
              {categories.map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => handleCategory(cat.name)}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-sm flex justify-between ${selectedCategory === cat.name ? 'bg-indigo-100 text-indigo-700 font-medium' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <span>{cat.name}</span>
                    <span className="text-gray-400 text-xs">{cat.count}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div className="bg-white rounded-xl border border-gray-200 p-4">
            <h3 className="font-semibold text-gray-800 mb-3">Max Price: <span className="text-indigo-600">${maxPrice}</span></h3>
            <input
              type="range" min={5} max={50} step={1}
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1"><span>$5</span><span>$50</span></div>
          </div>
        </aside>

        {/* Book Grid */}
        <div className="flex-1">
          {/* Sort bar */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-sm text-gray-500">Sort by:</span>
            {SORT_OPTIONS.map(opt => (
              <button
                key={opt}
                onClick={() => setSortBy(opt)}
                className={`text-sm px-3 py-1 rounded-full border ${sortBy === opt ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-600 hover:border-indigo-300'}`}
              >
                {opt}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-4">📚</p>
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm">Try adjusting your filters or search term</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map(book => <BookCard key={book.id} book={book} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
