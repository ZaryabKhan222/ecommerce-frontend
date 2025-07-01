import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { FiShoppingCart } from "react-icons/fi";
import { FiUser } from "react-icons/fi";
import toast from "react-hot-toast";

export default function Navbar({ onCartToggle }) {
  const { items } = useCart();
  const { user, logout } = useAuth();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-0">
      {/* Logo */}
      <Link to="/" className="text-2xl font-bold text-gray-800">
        ZK CAR SHOP
      </Link>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search products..."
          className="border rounded px-3 py-1 text-sm"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {/* Navigation Links */}
      <ul className="flex items-center space-x-6">
        <li>
          <Link to="/" className="hover:text-blue-500">
            Home
          </Link>
        </li>
        <li>
          <Link to="/shop" className="hover:text-blue-500">
            Shop
          </Link>
        </li>

        {/* 🛒 Cart */}
        <li>
          <button
            onClick={onCartToggle}
            className="relative p-2 hover:bg-gray-100 rounded"
            aria-label="Toggle cart"
          >
            <FiShoppingCart size={24} />
            {itemCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1 text-xs font-bold leading-none text-white bg-red-500 rounded-full">
                {itemCount}
              </span>
            )}
          </button>
        </li>

        {/* 🔐 Auth Buttons */}
        {user ? (
          <>
            <li className="flex items-center gap-1 text-blue-600 font-semibold">
              <FiUser className="text-lg" />
              Hi {user.name}
            </li>

            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="hover:text-blue-500">
                Login
              </Link>
            </li>
            <li>
              <Link to="/signup" className="hover:text-blue-500">
                Sign Up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
