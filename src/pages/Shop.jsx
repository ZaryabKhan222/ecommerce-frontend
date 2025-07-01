import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";

const PRODUCTS_PER_PAGE = 6;

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category");
  const searchQuery = searchParams.get("search");
  const page = parseInt(searchParams.get("page")) || 1;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const startIndex = (page - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`);
        setProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic (memoized)
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (category) {
      result = result.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (searchQuery) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return result;
  }, [products, category, searchQuery]);

  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    const params = Object.fromEntries(searchParams.entries());
    setSearchParams({ ...params, page: newPage });
  };

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shop Cars</h1>

      {loading ? (
        <div className="text-center text-lg">Loading products...</div>
      ) : filteredProducts.length === 0 ? (
        <p>No products found for this filter.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-8 space-x-4">
            <button
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
              className={`px-4 py-2 rounded ${
                page <= 1
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Previous
            </button>

            <button
              disabled={endIndex >= filteredProducts.length}
              onClick={() => handlePageChange(page + 1)}
              className={`px-4 py-2 rounded ${
                endIndex >= filteredProducts.length
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shop;
