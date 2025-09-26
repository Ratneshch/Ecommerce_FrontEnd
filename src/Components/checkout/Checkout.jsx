// Checkout.jsx
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ShippingAddress from "./ShippingAddress";

const Checkout = () => {
  const { cart, totalAmount, token, user } = useContext(AppContext);
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_ADDRESS = "http://localhost:3000/api/address";
  const API_ORDER = "http://localhost:3000/api/orders";

  // Fetch saved addresses
  const fetchAddresses = async () => {
    if (!token || !user) return;
    try {
      const res = await axios.get(`${API_ADDRESS}/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const addrArray = Array.isArray(res.data) ? res.data : [res.data];
      setAddresses(addrArray);
      if (addrArray.length > 0) setSelectedAddress(addrArray[0]);
    } catch (err) {
      console.log("No existing address");
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, [token, user]);

  const handleAddressSaved = () => {
    fetchAddresses();
  };

  const handlePlaceOrder = async () => {
    if (!cart.length) return toast.error("Cart is empty");
    if (!selectedAddress) return toast.error("Please select a shipping address");
    if (!selectedAddress.phoneNumber) return toast.error("Address must have a phone number");

    const orderItems = cart.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
    }));

    const payload = {
      user_id: user.id,
      address: selectedAddress,
      total_amount: totalAmount,
      items: orderItems,
    };

    try {
      setLoading(true);

      // 1️⃣ Place the order
      const orderRes = await axios.post(API_ORDER, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Order placed successfully!");

      const order_id = orderRes.data.order_id;

      // 2️⃣ Create PhonePe payment (no Authorization header needed)
      const paymentRes = await axios.post("http://localhost:3000/api/payment/phonepe", {
        order_id,
        amount: totalAmount,
        phone: selectedAddress.phoneNumber,
      });

      // 3️⃣ Redirect to PhonePe payment page
      if (paymentRes.data.paymentUrl) {
        window.location.href = paymentRes.data.paymentUrl;
      } else {
        toast.error("PhonePe did not return a payment URL");
        console.log("PhonePe response:", paymentRes.data);
      }
    } catch (err) {
      console.error("Checkout Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Failed to place order or payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Shipping Addresses */}
      <div className="bg-white rounded-lg shadow p-6 space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Select Shipping Address</h2>

        {addresses.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr.id}
              onClick={() => setSelectedAddress(addr)}
              className={`p-4 rounded border cursor-pointer mb-2 ${
                selectedAddress?.id === addr.id ? "border-blue-600 bg-blue-50" : ""
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <strong>{addr.fullName}</strong>
                <span className="text-sm font-semibold">{addr.type || "Home"}</span>
              </div>
              <p>
                {addr.address}, {addr.city}, {addr.state}, {addr.country} - {addr.pincode}
              </p>
              <p>📞 {addr.phoneNumber}</p>
            </div>
          ))
        ) : (
          <p>No saved addresses. Please add one below.</p>
        )}

        {/* Add / Update Address */}
        <ShippingAddress onAddressSaved={handleAddressSaved} />
      </div>

      {/* Order Summary */}
      <div className="bg-white rounded-lg shadow p-6 flex flex-col justify-between">
        <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>

        <div className="flex flex-col space-y-2 mb-4">
          {cart.map((item) => (
            <div key={item.product_id} className="flex justify-between">
              <span>
                {item.title} x {item.quantity}
              </span>
              <span>₹{item.subtotal}</span>
            </div>
          ))}
        </div>

        <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{totalAmount}</span>
        </div>

        <button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
