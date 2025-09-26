// ShippingAddress.jsx
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function ShippingAddress({ onAddressSaved }) {
  const { user, token } = useContext(AppContext);
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
    type: "Home", // default type
  });

  const url = "http://localhost:3000/api/address";

  // Fetch existing address (optional)
  useEffect(() => {
    if (!user || !token) return;

    const fetchAddress = async () => {
      try {
        const res = await axios.get(`${url}/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data) setForm(res.data);
      } catch (err) {
        console.log("No existing address");
      }
    };

    fetchAddress();
  }, [user, token]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleTypeChange = (type) => setForm({ ...form, type });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !token) return toast.error("Please login first");

    try {
      await axios.post(
        url,
        { user_id: user.id, ...form },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Address saved successfully");
      if (onAddressSaved) onAddressSaved();
      setForm({ ...form, type: "Home" }); // reset type if needed
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to save address");
    }
  };

  return (
    <div className="mt-4 max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Add / Update Address</h2>

      {/* Type selector */}
      <div className="flex gap-4 mb-4">
        {["Home", "Office", "Other"].map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => handleTypeChange(t)}
            className={`px-4 py-2 rounded border ${
              form.type === t ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="fullName"
          placeholder="Full Name"
          value={form.fullName}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="border p-3 rounded w-full md:col-span-2"
          required
        />
        <input
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <input
          name="pincode"
          placeholder="Pincode"
          value={form.pincode}
          onChange={handleChange}
          className="border p-3 rounded w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded w-full md:col-span-2"
        >
          Save Address
        </button>
      </form>
    </div>
  );
}
