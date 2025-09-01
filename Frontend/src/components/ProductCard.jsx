import React, { useState } from "react";

const ProductCard = ({ product, onAddToCart, cartQuantity = 0, onUpdateQuantity }) => {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const getImageUrl = () => {
    if (!product.image) return null;
    if (product.image.startsWith("http")) {
      return product.image;
    }
    return `http://localhost:1337${product.image}`;
  };

  const handleImageLoad = () => setIsImageLoading(false);
  const handleImageError = () => {
    setIsImageLoading(false);
    setImageError(true);
  };

  const handleAddToCart = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (!product || !product.id) {
      console.error("Invalid product:", product);
      return;
    }
    
    if (product.stock > 0 && onAddToCart) {
      console.log("Adding to cart:", product.name);
      onAddToCart(product);
    } else {
      console.warn("Cannot add to cart: Product out of stock or invalid action");
    }
  };

  const handleQuantityDecrease = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (cartQuantity > 0 && onUpdateQuantity && product.id) {
      console.log("Decreasing quantity for:", product.name);
      onUpdateQuantity(product.id, cartQuantity - 1);
    }
  };

  const handleQuantityIncrease = (event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const maxStock = typeof product.stock === "number" ? product.stock : 999;
    
    if (cartQuantity < maxStock && onUpdateQuantity && product.id) {
      console.log("Increasing quantity for:", product.name);
      onUpdateQuantity(product.id, cartQuantity + 1);
    } else {
      console.warn("Cannot increase quantity: Max stock reached or invalid action");
    }
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'oils': '🛢️',
      'chamal-and-chiuras': '🍚',
      'daals': '🫘',
      'oil': '🛢️' 
    };
    return icons[category.toLowerCase()] || '📦';
  };

  const getCategoryDisplayName = (category) => {
    const names = {
      'oils': 'Oil',
      'chamal-and-chiuras': 'Rice & Chiura',
      'daals': 'Lentils',
      'oil': 'Oil' 
    };
    return names[category.toLowerCase()] || category;
  };

  const imageUrl = getImageUrl();
  const isOutOfStock = !product.stock || product.stock === 0 || product.stock === false;
  const isInCart = cartQuantity > 0;
  
  const stockDisplay = typeof product.stock === "number" 
    ? product.stock 
    : product.stock 
    ? "Available" 
    : "Out of Stock";

  return (
    <div
      className={`relative bg-white rounded-2xl shadow-md p-4 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl ${
        isOutOfStock ? "opacity-60" : ""
      }`}
      onClick={(e) => e.stopPropagation()}
    >
  
      {product.category && (
        <div className="absolute top-2 left-2 z-10 bg-white/90 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-lg shadow-sm">
          {getCategoryIcon(product.category)} {getCategoryDisplayName(product.category)}
        </div>
      )}

  
      <div className="relative w-full h-48 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden">
        {imageUrl && !imageError ? (
          <>
            {isImageLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="ml-2 text-sm text-gray-500">Loading...</span>
              </div>
            )}
            <img
              src={imageUrl}
              alt={product.name || "Product Image"}
              onLoad={handleImageLoad}
              onError={handleImageError}
              className={`object-contain max-h-48 transition-all duration-500 ${
                isImageLoading ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400">
            <span className="text-5xl mb-2">{getCategoryIcon(product.category)}</span>
            <p className="text-sm font-medium">No Image Available</p>
          </div>
        )}

        
        {isOutOfStock && (
          <div className="absolute inset-0 bg-black/70 text-white flex items-center justify-center font-semibold text-lg backdrop-blur-sm">
            <div className="text-center">
              <div className="text-3xl mb-2">❌</div>
              <div>Out of Stock</div>
            </div>
          </div>
        )}

        {/* Cart quantity badge */}
        {isInCart && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
            {cartQuantity}
          </div>
        )}
      </div>

      {/* Product ko Info */}
      <div className="mt-4 space-y-3">
        {/* Product ko Name */}
        <div>
          <h4 className="text-lg font-semibold text-gray-800 line-clamp-2 leading-tight">
            {product.name || 'Unknown Product'}
          </h4>
          {product.description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {/* Price and Stock Status Check garna*/}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            <span className="text-sm font-medium text-gray-500">Rs.</span>
            {product.price?.toLocaleString() || 0}
          </div>
          
          <div className="text-right">
            <span
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                isOutOfStock 
                  ? "bg-red-100 text-red-600" 
                  : "bg-green-100 text-green-600"
              }`}
            >
              {typeof product.stock === "boolean"
                ? product.stock
                  ? "✓ Available"
                  : "✗ Unavailable"
                : isOutOfStock
                ? "Out of Stock"
                : `${stockDisplay} left`}
            </span>
          </div>
        </div>

        
        <div className="mt-4">
          {!isInCart ? (
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className={`w-full py-3 px-4 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
                isOutOfStock
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
              }`}
            >
              <span className="text-lg">{isOutOfStock ? "❌" : "🛒"}</span>
              <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
            </button>
          ) : (
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-3">
              <div className="flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleQuantityDecrease}
                  className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 text-xl font-bold transition-all duration-200 flex items-center justify-center shadow-sm"
                >
                  −
                </button>
                
                <div className="flex flex-col items-center">
                  <span className="text-lg font-bold text-blue-600">{cartQuantity}</span>
                  <span className="text-xs text-gray-500 font-medium">in cart</span>
                </div>
                
                <button
                  type="button"
                  onClick={handleQuantityIncrease}
                  disabled={cartQuantity >= (typeof product.stock === "number" ? product.stock : 999)}
                  className="w-10 h-10 bg-white border-2 border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 text-xl font-bold transition-all duration-200 flex items-center justify-center shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  +
                </button>
              </div>
              
              {/* Total price for this item */}
              <div className="mt-2 text-center">
                <span className="text-sm text-gray-600">Total: </span>
                <span className="font-bold text-blue-600">
                  Rs. {((product.price || 0) * cartQuantity).toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400/0 via-purple-400/0 to-pink-400/0 hover:from-blue-400/5 hover:via-purple-400/5 hover:to-pink-400/5 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
};

export default ProductCard;