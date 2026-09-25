import { Link } from 'react-router-dom';
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react';

export default function ConfirmationPage() {
  const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
  const eta = new Date();
  eta.setDate(eta.getDate() + 3);
  const etaStr = eta.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  return (
    <div className="max-w-2xl mx-auto px-4 py-16 text-center">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="bg-green-100 rounded-full p-6">
          <CheckCircle size={64} className="text-green-600" />
        </div>
      </div>

      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Order Confirmed! 🎉</h1>
      <p className="text-gray-500 text-lg mb-2">Thank you for your purchase.</p>
      <p className="text-gray-400 text-sm mb-8">A confirmation email has been sent to your inbox.</p>

      {/* Order Card */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-8 text-left">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Order ID</p>
            <p className="font-bold text-indigo-700 text-lg">{orderId}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Status</p>
            <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-3 py-0.5 rounded-full mt-0.5">
              Confirmed
            </span>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Estimated Delivery</p>
            <p className="font-medium text-gray-700 text-sm">{etaStr}</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider">Payment</p>
            <p className="font-medium text-green-600 text-sm">✅ Successful</p>
          </div>
        </div>
      </div>

      {/* Cancel within 48h note */}
      <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-8 text-sm text-orange-800">
        <Package size={16} className="inline mr-1" />
        You can cancel this order within <strong>48 hours</strong> from your order history.
      </div>

      {/* Actions */}
      <div className="flex gap-4 justify-center flex-wrap">
        <Link
          to="/orders"
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-semibold transition-colors"
        >
          <ShoppingBag size={18} /> View My Orders
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 border border-gray-300 hover:border-indigo-300 text-gray-700 px-6 py-3 rounded-full font-medium transition-colors"
        >
          <Home size={18} /> Back to Home
        </Link>
      </div>
    </div>
  );
}
