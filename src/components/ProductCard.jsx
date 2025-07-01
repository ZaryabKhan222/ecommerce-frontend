import React from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(product);
    toast.success(`${product.title} added to cart`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden">
      <img
        src={product.image || product.images?.[0]}
        alt={product.title}
        className="w-full h-48 object-cover rounded"
      />

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{product.title}</h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {product.description}
        </p>
        <div className="font-bold text-lg text-blue-600 mt-2">
          ${product.price}
        </div>
        <button
          onClick={handleAddToCart}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
