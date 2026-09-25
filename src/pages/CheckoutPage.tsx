import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Plus, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

const SAVED_ADDRESSES = [
  { id: 1, name: 'Home', line1: '42 Elm Street', line2: 'Apt 3B', city: 'New York', state: 'NY', zip: '10001' },
  { id: 2, name: 'Office', line1: '100 Broadway', line2: 'Floor 12', city: 'New York', state: 'NY', zip: '10005' },
];

export default function CheckoutPage() {
  const { items, total } = useCart();
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number>(1);
  const [showNew, setShowNew] = useState(false);
  const [newAddr, setNewAddr] = useState({ name: '', line1: '', city: '', state: '', zip: '' });

  const shipping = total >= 25 ? 0 : 3.99;

  const handleContinue = () => navigate('/payment');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2 text-xs mb-8">
        {['Cart', 'Address', 'Payment', 'Confirmation'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 1 ? 'bg-indigo-600 text-white' : i < 1 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <span className={i === 1 ? 'font-semibold text-indigo-700' : 'text-gray-400'}>{step}</span>
            {i < 3 && <ChevronRight size={14} className="text-gray-300" />}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <MapPin size={22} /> Select Delivery Address
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 space-y-4">
          {SAVED_ADDRESSES.map(addr => (
            <div
              key={addr.id}
              onClick={() => setSelected(addr.id)}
              className={`bg-white rounded-xl border-2 p-5 cursor-pointer transition-all ${selected === addr.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin size={15} className="text-indigo-600" />
                    <span className="font-semibold text-gray-800">{addr.name}</span>
                  </div>
                  <p className="text-sm text-gray-600">{addr.line1}, {addr.line2}</p>
                  <p className="text-sm text-gray-600">{addr.city}, {addr.state} {addr.zip}</p>
                </div>
                <input type="radio" checked={selected === addr.id} readOnly className="accent-indigo-600 mt-1" />
              </div>
            </div>
          ))}

          {/* Add new address */}
          <button
            onClick={() => setShowNew(!showNew)}
            className="flex items-center gap-2 text-sm text-indigo-600 hover:underline"
          >
            <Plus size={16} /> Add New Address
          </button>

          {showNew && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 space-y-3">
              {[
                { label: 'Address Label (e.g. Home)', key: 'name' },
                { label: 'Street Address', key: 'line1' },
                { label: 'City', key: 'city' },
                { label: 'State', key: 'state' },
                { label: 'ZIP Code', key: 'zip' },
              ].map(({ label, key }) => (
                <div key={key}>
                  <label className="block text-xs font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={newAddr[key as keyof typeof newAddr]}
                    onChange={e => setNewAddr({ ...newAddr, [key]: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              ))}
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-indigo-700 transition-colors">
                Save Address
              </button>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5">
            <h3 className="font-bold text-gray-800 mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm mb-4">
              {items.map(({ book, qty }) => (
                <div key={book.id} className="flex justify-between text-gray-600">
                  <span className="truncate pr-2">{book.title} ×{qty}</span>
                  <span>${(book.price * qty).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-gray-800">
                <span>Total</span><span>${(total + shipping).toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
