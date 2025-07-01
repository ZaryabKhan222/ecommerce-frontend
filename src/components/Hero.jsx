import React from "react";

const Hero = () => {
  return (
    <section className="bg-gray-900 text-white py-20 px-6 text-center">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Discover Your Dream Car
      </h1>
      <p className="text-lg md:text-xl mb-6">
        Luxury. Performance. Style. All in one place.
      </p>
      <a
        href="#products"
        className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
      >
        Browse Cars
      </a>
    </section>
  );
};

export default Hero;
