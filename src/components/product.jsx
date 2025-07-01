import React from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({ ...product, quantity: 1 });
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg">{product.title}</h3>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="text-blue-600 font-bold text-lg mt-2">
          ${product.price?.toLocaleString()}
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
