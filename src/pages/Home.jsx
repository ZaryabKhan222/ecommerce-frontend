import React, { useEffect, useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import ProductGrid from "../components/ProductGrid";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/products");
        setProducts(data);
      } catch (error) {
        console.error("❌ Failed to fetch products:", error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <Hero />
      <CategorySection />
      <ProductGrid products={products} />
    </main>
  );
};

export default Home;
