import { useState } from "react";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";
import ProductList from "./components/ProductList";
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Update cart quantity
  const updateCartQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // Get cart item quantity
  const getCartItemQuantity = (productId) => {
    const item = cart.find((item) => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Totals
  const getTotalItems = () =>
    cart.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () =>
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* ✅ Top Header */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        getTotalItems={getTotalItems}
        setActiveTab={setActiveTab}
      />

      {/* ✅ Main Body */}
      <main className="flex-1 p-4 bg-white">
        {activeTab === "home" && (
          <div className="mb-8 animate-fadeIn">
            <Home
              setActiveTab={setActiveTab}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
            />
            <ProductList
              addToCart={addToCart}
              getCartItemQuantity={getCartItemQuantity}
              updateCartQuantity={updateCartQuantity}
            />
          </div>
        )}

        {activeTab === "categories" && (
          <div className="mb-8 animate-fadeIn">
            <Categories
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              addToCart={addToCart}
              getCartItemQuantity={getCartItemQuantity}
              updateCartQuantity={updateCartQuantity}
            />
          </div>
        )}

        {activeTab === "cart" && (
          <div className="mb-8 animate-fadeIn">
            <Cart
              cart={cart}
              updateCartQuantity={updateCartQuantity}
              removeFromCart={removeFromCart}
              getTotalItems={getTotalItems}
              getTotalPrice={getTotalPrice}
              setActiveTab={setActiveTab}
            />
          </div>
        )}

        {activeTab === "profile" && (
          <div className="mb-8 animate-fadeIn">
            <Profile />
          </div>
        )}
      </main>

      {/* ✅ Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
