import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(res.data);
        setSelectedImage(res.data.images[0]);
      } catch (err) {
        console.error("❌ Failed to fetch product:", err.message);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItem({ ...product, id: product._id });
  };

  if (!product) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Image Gallery */}
      <div>
        <img
          src={selectedImage}
          alt={product.title}
          className="w-full h-[400px] object-contain rounded-lg shadow"
        />
        <div className="flex mt-4 gap-2">
          {product.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt={`thumb-${idx}`}
              className={`w-20 h-20 object-contain border-2 rounded cursor-pointer ${
                img === selectedImage ? "border-blue-500" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(img)}
            />
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-gray-600">{product.category}</p>
        <p className="text-xl font-semibold text-blue-600">${product.price}</p>
        <p className="text-gray-700 leading-relaxed">{product.description}</p>

        <button
          onClick={handleAddToCart}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
