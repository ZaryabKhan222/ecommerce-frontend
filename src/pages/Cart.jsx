import React from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cartItems, removeItem, getTotalPrice } = useCart();

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">
          Your cart is empty. <Link to="/shop" className="text-blue-600 underline">Browse cars</Link>
        </p>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded shadow"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.images?.[0]}
                  alt={item.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">${item.price.toLocaleString()}</p>
                </div>
              </div>
              <button
                onClick={() => removeItem(item._id)}
                className="text-red-600 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}

          {/* Total */}
          <div className="text-right text-lg font-semibold">
            Total: ${getTotalPrice().toLocaleString()}
          </div>

          {/* Checkout Button */}
          <div className="text-right">
            <button className="mt-4 bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
