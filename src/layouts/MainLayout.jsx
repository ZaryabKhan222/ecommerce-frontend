import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CartSidebar from "../components/CartSidebar";
import { useAuth } from "../context/AuthContext";

const MainLayout = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <div className="flex flex-col min-h-screen relative">
      <Navbar onCartToggle={() => setCartOpen(!cartOpen)} />

      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      <main className="flex-grow container mx-auto px-4 py-6">
        {/* ✅ Optional Admin Panel shortcut */}
        {isAdmin && (
          <div className="mb-6 bg-yellow-100 p-4 rounded shadow text-yellow-800">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
            <ul className="list-disc list-inside">
              <li>
                <a href="/admin/products" className="text-blue-700 hover:underline">
                  Manage Products
                </a>
              </li>
              <li>
                <a href="/admin/products/new" className="text-blue-700 hover:underline">
                  Add Product
                </a>
              </li>
              {/* Add more admin links as needed */}
            </ul>
          </div>
        )}

        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
