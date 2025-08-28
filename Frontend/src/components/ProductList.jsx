import React, { useEffect, useState } from "react";
import { fetchAllProducts, fetchProductsByCategory, searchProducts, getAvailableCategories } from "../api/api";
import ProductCard from "./ProductCard";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./transistions.css";

function ProductList({ addToCart, getCartItemQuantity, updateCartQuantity }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Initial load
  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load categories and all products
      const [productsData, categoriesData] = await Promise.all([
        fetchAllProducts(),
        getAvailableCategories()
      ]);
      
      console.log("Loaded products:", productsData);
      console.log("Loaded categories:", categoriesData);
      
      setProducts(productsData);
      setCategories(categoriesData);
      
    } catch (err) {
      console.error("Error loading initial data:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = async (categoryName) => {
    try {
      setLoading(true);
      setSelectedCategory(categoryName);
      setSearchTerm(''); // Clear search when changing category
      
      let productsData;
      if (categoryName === 'all') {
        productsData = await fetchAllProducts();
      } else {
        productsData = await fetchProductsByCategory(categoryName);
      }
      
      setProducts(productsData);
      console.log(`Loaded ${categoryName} products:`, productsData);
      
    } catch (err) {
      console.error(`Error loading ${categoryName} products:`, err);
      setError(`Failed to load ${categoryName} products: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = async (searchValue) => {
    setSearchTerm(searchValue);
    
    if (searchValue.trim() === '') {
      // If search is empty, reload current category
      handleCategoryChange(selectedCategory);
      return;
    }
    
    try {
      setIsSearching(true);
      const searchResults = await searchProducts(searchValue);
      setProducts(searchResults);
      console.log(`Search results for "${searchValue}":`, searchResults);
      
    } catch (err) {
      console.error('Error searching products:', err);
      setError(`Search failed: ${err.message}`);
    } finally {
      setIsSearching(false);
    }
  };

  // Get category display name
  const getCategoryDisplayName = (categoryName) => {
    if (categoryName === 'all') return 'All Products';
    const category = categories.find(cat => cat.name === categoryName);
    return category ? category.displayName : categoryName;
  };

  // Loading state
  if (loading && !isSearching) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        <p className="mt-4 text-gray-600 animate-pulse">
          {selectedCategory === 'all' ? 'Loading all products...' : `Loading ${getCategoryDisplayName(selectedCategory)}...`}
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-fadeIn">
        <div className="text-6xl mb-4">❌</div>
        <p className="text-red-500 font-medium mb-2">Error: {error}</p>
        <p className="text-gray-500 mb-4">
          Make sure Strapi is running on{" "}
          <span className="font-mono">http://localhost:1337</span>
        </p>
        <button
          onClick={loadInitialData}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          🔄 Retry
        </button>
      </div>
    );
  }

  return (
    <div className="px-6 py-10">
      {/* Search and Filter Header */}
      <div className="mb-8 animate-fadeInDown">
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products... (e.g., नेवारी, चामल, दाल)"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-3 pl-10 pr-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-gray-400 border-t-blue-500 rounded-full animate-spin"></div>
              ) : (
                <span className="text-xl">🔍</span>
              )}
            </div>
            {searchTerm && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                ❌
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {/* All Products */}
          <button
            onClick={() => handleCategoryChange('all')}
            className={`px-4 py-2 rounded-full font-medium transition ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🌟 All Products ({categories.reduce((total, cat) => total + cat.count, 0)})
          </button>

          {/* Individual Categories */}
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleCategoryChange(category.name)}
              className={`px-4 py-2 rounded-full font-medium transition ${
                selectedCategory === category.name
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {getCategoryIcon(category.name)} {category.displayName} ({category.count})
            </button>
          ))}
        </div>

        {/* Results Header */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : getCategoryDisplayName(selectedCategory)}
          </h2>
          <p className="text-gray-500">
            {isSearching ? 'Searching...' : `${products.length} products found`}
          </p>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <TransitionGroup component={null}>
          {products.length > 0 ? (
            products.map((product) => (
              <CSSTransition key={product.id} timeout={400} classNames="fade">
                <ProductCard
                  product={product}
                  onAddToCart={addToCart}
                  cartQuantity={
                    getCartItemQuantity ? getCartItemQuantity(product.id) : 0
                  }
                  onUpdateQuantity={updateCartQuantity}
                />
              </CSSTransition>
            ))
          ) : (
            <CSSTransition timeout={400} classNames="fade">
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <div className="text-6xl mb-4">
                  {searchTerm ? '🔍' : '📦'}
                </div>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">
                  {searchTerm 
                    ? `No products found for "${searchTerm}"`
                    : `No products available in ${getCategoryDisplayName(selectedCategory)}`
                  }
                </h3>
                <p className="text-gray-500 mb-4">
                  {searchTerm 
                    ? 'Try searching with different keywords'
                    : 'Check back later for new products!'
                  }
                </p>
                {searchTerm && (
                  <button
                    onClick={() => handleSearch('')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Clear Search
                  </button>
                )}
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </div>

      {/* Quick Stats */}
      {!searchTerm && products.length > 0 && (
        <div className="mt-12 text-center animate-fadeIn">
          <div className="inline-flex items-center space-x-6 bg-gray-50 px-6 py-4 rounded-xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{products.length}</div>
              <div className="text-sm text-gray-600">Products</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {products.filter(p => p.inStock !== undefined ? p.inStock : (p.stock > 0 || p.stock === true)).length}
              </div>
              <div className="text-sm text-gray-600">In Stock</div>
            </div>
            <div className="w-px h-8 bg-gray-300"></div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function to get category icons
function getCategoryIcon(categoryName) {
  const icons = {
    'oils': '🛢️',
    'chamal-and-chiuras': '🍚',
    'daal': '🫘'
  };
  return icons[categoryName] || '📦';
}

export default ProductList;