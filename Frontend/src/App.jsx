import { useState, useMemo } from "react";
import "./index.css";
import Header from "./components/Header";
import BottomNav from "./components/BottomNav";

import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Profile from "./Pages/Profile";

import ProductList from "./components/ProductList";

function App() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  return (
    <div className="app-root">
      <Header 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        getTotalItems={() => cart.reduce((s, i) => s + i.quantity, 0)} 
        setActiveTab={setActiveTab}
      />

      <main className="app-main">
        {activeTab === 'home' && (
          <>
            <Home 
              setActiveTab={setActiveTab} 
              setSelectedCategory={setSelectedCategory} 
              addToCart={addToCart} 
            />
            <ProductList addToCart={addToCart} /> 
          </>
        )}

        {activeTab === 'categories' && (
          <Categories 
            selectedCategory={selectedCategory} 
            setSelectedCategory={setSelectedCategory} 
            addToCart={addToCart} 
          />
        )}

        {activeTab === 'cart' && (
          <Cart 
            cart={cart} 
            updateCartQuantity={(id, q) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: q } : item))} 
            removeFromCart={(id) => setCart(prev => prev.filter(i => i.id !== id))} 
            getTotalItems={() => cart.reduce((s, i) => s + i.quantity, 0)} 
            getTotalPrice={() => cart.reduce((s, i) => s + i.price * i.quantity, 0)} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'profile' && <Profile />}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
