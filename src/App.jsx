import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import AddProduct from "./pages/admin/AddProduct";
import ManageProducts from "./pages/admin/ManageProducts";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProductDetail from "./pages/ProductDetail";

function App() {
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/product/:id" element={<ProductDetail />} />

          {/* ✅ Admin-only routes */}
          {isAdmin && (
            <>
              <Route path="admin/products" element={<ManageProducts />} />
              <Route path="admin/products/new" element={<AddProduct />} />
            </>
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
