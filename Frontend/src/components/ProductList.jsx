import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { fetchAllProducts, fetchProductsByCategory, getAvailableCategories } from "../api/api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cart state
  const [cart, setCart] = useState([]);

  // Load products + categories on mount
  useEffect(() => {
    loadProducts();
    loadCategories();

    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await fetchAllProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Failed to load products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await getAvailableCategories();
      setCategories(fetchedCategories);
    } catch (err) {
      console.error('Error loading categories:', err);
    }
  };

  const loadProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      if (category === 'all') {
        await loadProducts();
      } else {
        const fetchedProducts = await fetchProductsByCategory(category);
        setProducts(fetchedProducts);
      }
    } catch (err) {
      setError('Failed to load category products: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    loadProductsByCategory(category);
  };

  // Add product to cart or increase qty if already in cart
  const handleAddToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Update quantity or remove if zero
  const handleUpdateQuantity = (productId, newQty) => {
    if (newQty < 1) {
      setCart(prevCart => prevCart.filter(item => item.id !== productId));
    } else {
      setCart(prevCart =>
        prevCart.map(item =>
          item.id === productId ? { ...item, quantity: newQty } : item
        )
      );
    }
  };

  const getCartQuantity = (productId) => {
    const found = cart.find(item => item.id === productId);
    return found ? found.quantity : 0;
  };

  // Clear full cart
  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😞</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={loadProducts}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Cart Summary */}
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600">{products.length} products available</p>
          </div>

          {/* Cart Summary */}
          {cart.length > 0 && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg px-6 py-3 border border-blue-200 flex items-center space-x-4">
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">{totalItems}</div>
                <div className="text-xs text-blue-500">Items</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-blue-600">Rs. {totalPrice.toLocaleString()}</div>
                <div className="text-xs text-blue-500">Total</div>
              </div>
              <button
                onClick={clearCart}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Category Filter */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === 'all'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
              }`}
            >
              All Products
            </button>
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => handleCategoryChange(category.name)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.name
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-blue-50 border border-gray-200'
                }`}
              >
                {category.displayName} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">
              {selectedCategory === 'all'
                ? 'No products are available at the moment.'
                : `No products found in the ${selectedCategory} category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <ProductCard
                key={`${product.id}-${index}`}
                product={product}
                onAddToCart={handleAddToCart}
                cartQuantity={getCartQuantity(product.id)}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
