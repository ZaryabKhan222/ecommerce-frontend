import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { items, clearCart } = useCart(); // ✅ Make sure clearCart exists in context
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("user"))?.token;

    if (!token) {
      toast.error("You must be logged in to place an order.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/orders",
        {
          customer: formData,
          items,
          total,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("✅ Order placed successfully!");
      clearCart(); // ✅ Clears cart state
      setTimeout(() => {
        navigate("/");
      }, 1000); // give time for user to see the toast
    } catch (err) {
      console.error("Order error:", err.response?.data || err.message);
      toast.error(
        err.response?.data?.message ||
          "❌ Failed to place order. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          className="w-full border p-2 rounded"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <textarea
          name="address"
          placeholder="Shipping Address"
          className="w-full border p-2 rounded"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <div className="mt-6 border-t pt-4">
          <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
          {items.map((item) => (
            <div key={item._id} className="flex justify-between text-sm mb-1">
              <span>
                {item.title} × {item.quantity}
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="mt-2 font-bold text-lg">
            Total: ${total.toLocaleString()}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
