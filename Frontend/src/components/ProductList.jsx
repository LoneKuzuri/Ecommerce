import React, { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import { fetchProducts, fetchProductsByCategory, fetchCategories } from "../api/api";

function ProductList({ cart, addToCart, getCartItemQuantity, updateCartQuantity }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedProducts = await fetchProducts();
      console.log("Fetched products:", fetchedProducts); 
      setProducts(fetchedProducts || []);
    } catch (err) {
      setError("Failed to load products. Please try again.");
      console.error("Error loading products:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const fetchedCategories = await fetchCategories();
      console.log("Fetched categories:", fetchedCategories); 
      setCategories(fetchedCategories || []);
    } catch (err) {
      console.error("Error loading categories:", err);
      setCategories([]);
    }
  };

  const loadProductsByCategory = async (category) => {
    try {
      setLoading(true);
      setError(null);
      if (category === "all") {
        await loadProducts();
      } else {
        const fetchedProducts = await fetchProductsByCategory(category);
        console.log(`Fetched products for category ${category}:`, fetchedProducts); // Debug
        setProducts(fetchedProducts || []);
      }
    } catch (err) {
      setError(`Failed to load products for category ${category}. Please try again.`);
      console.error(`Error loading products for category ${category}:`, err);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    loadProductsByCategory(category);
  }, []);

  const handleUpdateQuantity = useCallback((productId, newQty) => {
    if (updateCartQuantity) {
      updateCartQuantity(productId, newQty);
    }
  }, [updateCartQuantity]);

  const clearCart = useCallback(() => {
    
  }, []);

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
      <div className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
            <p className="text-gray-600">{products.length} products available</p>
          </div>
        
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Filter by Category</h2>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
              }`}
            >
              All Products
            </button>
            {categories.length > 0 ? (
              categories.map((category) => (
                <button
                  key={category.name}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.name
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-white text-gray-600 hover:bg-blue-50 border border-gray-200"
                  }`}
                >
                  {category.displayName} ({category.count})
                </button>
              ))
            ) : (
              <p className="text-gray-600">No categories available</p>
            )}
          </div>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📦</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">
              {selectedCategory === "all"
                ? "No products are available at the moment."
                : `No products found in the ${selectedCategory} category.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={addToCart}
                cartQuantity={getCartItemQuantity(product.id)}
                onUpdateQuantity={updateCartQuantity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;