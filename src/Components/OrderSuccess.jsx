import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../context/AppContext";
import { toast } from "react-toastify";

const OrderSuccess = () => {
  const { order_id } = useParams();
  const { token, user } = useContext(AppContext);

  const [order, setOrder] = useState(null);
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_ORDER = `http://localhost:3000/api/orders/${order_id}`;
  const API_ADDRESS = `http://localhost:3000/api/address/${user?.id}`;

  useEffect(() => {
    if (!token || !user) return;

    const fetchOrderAndAddress = async () => {
      try {
        // Fetch order details
        const orderRes = await axios.get(API_ORDER, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrder(orderRes.data);

        // Fetch shipping address using user_id
        const addressRes = await axios.get(API_ADDRESS, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAddress(addressRes.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndAddress();
  }, [token, user, order_id]);

  if (loading) return <p className="text-center mt-8">Loading order details...</p>;
  if (!order) return <p className="text-center mt-8">Order not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4 text-green-600">Order Placed Successfully!</h2>

      {/* Order Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-xl font-semibold mb-2">Order ID: {order.id}</h3>
        <p className="mb-1">Total Amount: ₹{order.total_amount}</p>
        <p className="mb-1">Placed On: {new Date(order.created_at).toLocaleString()}</p>

        {address && (
          <>
            <h4 className="text-lg font-semibold mt-4 mb-2">Shipping Address:</h4>
            <p>{address.fullName}</p>
            <p>
              {address.address}, {address.city}, {address.state}, {address.country} - {address.pincode}
            </p>
            <p>Phone: {address.phoneNumber}</p>
          </>
        )}
      </div>

      {/* Order Items */}
      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold mb-2">Order Items:</h4>
        {order.items.map((item) => (
          <div key={item.product_id} className="flex justify-between mb-2">
            <span>
              {item.title} x {item.quantity}
            </span>
            <span>₹{item.price}</span>
          </div>
        ))}

        <div className="border-t mt-2 pt-2 flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{order.total_amount}</span>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
