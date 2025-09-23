import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

export default function ProductCart() {
  const { cart, totalAmount, updateCartQty, removeFromCart } = useContext(AppContext);

  if (!cart.length)
    return (
      <div className="p-6 bg-white rounded-lg shadow text-center">
        <p className="text-gray-600">Your cart is empty.</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.product_id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
              <img src={item.imgSrc} alt={item.title} className="w-24 h-24 object-cover rounded" />

              <div className="flex-1">
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-500">₹{item.price} each</p>

                <div className="mt-3 flex items-center gap-3">
                  <div className="flex items-center border rounded overflow-hidden">
                    <button
                      onClick={() => updateCartQty(item.product_id, Math.max(item.quantity - 1, 1))}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      -
                    </button>
                    <div className="px-4">{item.quantity}</div>
                    <button
                      onClick={() => updateCartQty(item.product_id, item.quantity + 1)}
                      className="px-3 py-1 hover:bg-gray-100"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product_id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="text-right font-medium">₹{item.subtotal}</div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <aside className="bg-white rounded-lg shadow p-5">
          <h4 className="text-lg font-medium mb-3">Order Summary</h4>
          <div className="border-t my-3"></div>
          <div className="flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
