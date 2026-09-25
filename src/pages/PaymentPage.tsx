import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, ChevronRight, Tag, Wallet, Smartphone, Building } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PAYMENT_METHODS = [
  { id: 'card', label: 'Credit / Debit Card', icon: <CreditCard size={20} /> },
  { id: 'wallet', label: 'Digital Wallet', icon: <Wallet size={20} /> },
  { id: 'upi', label: 'UPI / Mobile Pay', icon: <Smartphone size={20} /> },
  { id: 'bank', label: 'Net Banking', icon: <Building size={20} /> },
];

export default function PaymentPage() {
  const { total, giftPoints, clearCart } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [processing, setProcessing] = useState(false);

  const shipping = total >= 25 ? 0 : 3.99;
  const pointsDiscount = redeemPoints ? Math.min(giftPoints * 0.01, total) : 0;
  const finalTotal = Math.max(0, total + shipping - pointsDiscount);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    setTimeout(() => {
      clearCart();
      navigate('/confirmation');
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Progress bar */}
      <div className="flex items-center gap-2 text-xs mb-8">
        {['Cart', 'Address', 'Payment', 'Confirmation'].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${i === 2 ? 'bg-indigo-600 text-white' : i < 2 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {i + 1}
            </div>
            <span className={i === 2 ? 'font-semibold text-indigo-700' : i < 2 ? 'text-green-600' : 'text-gray-400'}>{step}</span>
            {i < 3 && <ChevronRight size={14} className="text-gray-300" />}
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <CreditCard size={22} /> Payment
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <form onSubmit={handlePay} className="flex-1 space-y-6">
          {/* Payment Methods */}
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h2 className="font-semibold text-gray-800 mb-3">Select Payment Method</h2>
            <div className="grid grid-cols-2 gap-3">
              {PAYMENT_METHODS.map(pm => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() => setMethod(pm.id)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm transition-all ${method === pm.id ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-medium' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                >
                  {pm.icon} {pm.label}
                </button>
              ))}
            </div>
          </div>

          {/* Card Details */}
          {method === 'card' && (
            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              <h2 className="font-semibold text-gray-800">Card Details</h2>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  value={card.number}
                  onChange={e => setCard({ ...card, number: e.target.value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim() })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Cardholder Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={card.name}
                  onChange={e => setCard({ ...card, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    maxLength={5}
                    value={card.expiry}
                    onChange={e => setCard({ ...card, expiry: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    maxLength={4}
                    value={card.cvv}
                    onChange={e => setCard({ ...card, cvv: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Gift Points */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Tag size={18} className="text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-800 text-sm">Redeem Gift Points</p>
                  <p className="text-xs text-yellow-600">You have {giftPoints} points = ${(giftPoints * 0.01).toFixed(2)} discount</p>
                </div>
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={redeemPoints}
                  onChange={e => setRedeemPoints(e.target.checked)}
                  className="accent-yellow-500 w-4 h-4"
                />
                <span className="text-sm font-medium text-yellow-800">Apply</span>
              </label>
            </div>
            {redeemPoints && (
              <p className="text-sm text-green-700 font-medium mt-2">
                ✅ -${pointsDiscount.toFixed(2)} discount applied!
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={processing}
            className={`w-full py-4 rounded-full font-bold text-lg transition-all ${processing ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {processing ? '⏳ Processing Payment...' : `Pay $${finalTotal.toFixed(2)}`}
          </button>
        </form>

        {/* Summary */}
        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 sticky top-24">
            <h3 className="font-bold text-gray-800 mb-3">Payment Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span></div>
              {redeemPoints && (
                <div className="flex justify-between text-green-600"><span>Points Discount</span><span>-${pointsDiscount.toFixed(2)}</span></div>
              )}
              <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-lg">
                <span>Total</span><span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
              <CreditCard size={14} /> Secured by 256-bit SSL encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
