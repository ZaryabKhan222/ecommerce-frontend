import React from "react";
import ProductCard from "./ProductCard";

const fallbackProducts = [
  {
    _id: "1",
    title: "Toyota Corolla 2023",
    price: 4200000,
    category: "Sedan",
    image: "https://wallpapers.com/images/hd/gray-camry-hybrid-toyota-4k-mv8d4x3bp23yni87.jpg",
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

const ProductGrid = ({ products }) => {
  const displayProducts = products?.length ? products : fallbackProducts;

  return (
    <section id="products" className="px-6">
      <h2 className="text-2xl font-bold mb-4">Featured Cars</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
