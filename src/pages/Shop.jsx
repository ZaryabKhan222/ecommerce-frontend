import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
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
    // Always use hardcoded products
    const fallbackProducts = [
      {
        _id: "1",
        title: "Toyota Corolla 2023",
        price: 4200000,
        category: "Sedan",
        image: "https://images.pexels.com/photos/20867335/pexels-photo-20867335.jpeg",
      },
      {
        _id: "2",
        title: "Honda Civic 2022",
        price: 4800000,
        category: "Sedan",
        image: "https://images.pexels.com/photos/16475132/pexels-photo-16475132.jpeg",
      },
      {
        _id: "3",
        title: "Toyota V8 2023",
        price: 39000000,
        category: "SUV",
        image: "https://www.shutterstock.com/shutterstock/photos/2051104811/display_1500/stock-photo-st-petersburg-russia-august-toyota-land-cruiser-series-restyling-front-view-2051104811.jpg",
      },
    ];
    setProducts(fallbackProducts);
    setLoading(false);
  }, []);

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
