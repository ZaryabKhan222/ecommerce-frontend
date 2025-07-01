import React from "react";
import { Link } from "react-router-dom";

const categories = [
  { name: "Supercars", slug: "supercars", image: "https://images.pexels.com/photos/17377920/pexels-photo-17377920.jpeg" },
  { name: "SUVs", slug: "suvs", image: "https://images.pexels.com/photos/2676096/pexels-photo-2676096.jpeg" },
  { name: "Classics", slug: "classics", image: "https://images.pexels.com/photos/205740/pexels-photo-205740.jpeg" },
];

const CategorySection = () => {
  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            to={`/shop?category=${cat.slug}`}
            key={cat.slug}
            className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform hover:scale-105 bg-white"
          >
            <img src={cat.image} alt={cat.name} className="w-full h-48 object-cover" />
            <div className="p-4 text-center font-semibold text-gray-800">{cat.name}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
