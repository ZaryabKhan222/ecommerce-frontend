import React from "react";
import { useCart } from "../context/CartContext";
import { FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom"; // ✅ Navigation

const CartSidebar = ({ isOpen, onClose }) => {
  const { items, removeItem } = useCart();
  const navigate = useNavigate(); // ✅ useNavigate hook

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div
      className={`fixed top-0 right-0 h-full w-80 bg-white shadow-lg transform transition-transform z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={onClose}>
          <FiX size={24} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-4 text-gray-500">Your cart is empty.</div>
      ) : (
        <div className="p-4 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex items-start justify-between gap-4"
            >
              <img
                src={item.images?.[0]}
                alt={item.title}
                className="w-16 h-16 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-medium text-sm">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  ${item.price} × {item.quantity}
                </p>
                <button
                  className="text-red-500 text-sm mt-1"
                  onClick={() => removeItem(item._id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="border-t pt-4 font-bold text-lg">
            Total: ${total.toLocaleString()}
          </div>

          <button
            onClick={() => {
              onClose();
              navigate("/checkout");
            }}
            className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
