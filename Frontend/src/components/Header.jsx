import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header({ searchQuery, setSearchQuery, getTotalItems, setActiveTab }) {
  return (
    <header className="relative bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-10 w-32 h-32 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full animate-[float-gentle_10s_ease-in-out_infinite]"></div>
        <div className="absolute top-8 right-12 w-24 h-24 bg-gradient-to-r from-indigo-400/30 to-blue-400/30 rounded-full animate-[float-reverse-gentle_8s_ease-in-out_infinite_2s]"></div>
      </div>

      {/* Header Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div 
          className="flex items-center animate-[fade-in-down_1s_ease-out] cursor-pointer"
          onClick={() => setActiveTab('home')}
          aria-label="Go to homepage"
        >
          <div className="relative">
            <img 
              src="/Subha om Logo.png" 
              alt="Subha OM Enterprises Logo" 
              className="h-12 sm:h-14 md:h-16 object-contain transition-all duration-300 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.5)] hover:animate-[text-glow_2.5s_ease-in-out_infinite]"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/150x50?text=Logo';
                console.warn('Failed to load logo, using fallback');
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full opacity-0 hover:opacity-50 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Search Input */}
          <div className="relative animate-[fade-in-up_1s_ease-out_0.3s]">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white/10 backdrop-blur-sm text-white placeholder-gray-300 rounded-full py-2 px-4 pr-10 w-48 sm:w-64 border border-white/20 focus:outline-none focus:ring-2 focus:ring-violet-300 transition-all duration-300"
              aria-label="Search products"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
          </div>

          {/* Cart Button */}
          <div className="relative group">
            <button
              onClick={() => setActiveTab('cart')}
              className="relative bg-white/20 backdrop-blur-sm rounded-full p-3 hover:bg-white/30 transition-all duration-300 animate-[pulse-gentle_3s_ease-in-out_infinite] group"
              aria-label={`View cart with ${getTotalItems()} items`}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="text-xl text-white group-hover:animate-bounce" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold rounded-full w-5 h-5 flex items-center justify-center animate-[scale-in_1s_ease-out]">
                  {getTotalItems()}
                </span>
              )}
            </button>
            {/* Tooltip */}
            <span className="absolute hidden group-hover:block -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              View Cart ({getTotalItems()} items)
            </span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 animate-[slide-progress_3s_ease-in-out_infinite]"></div>
    </header>
  );
}

export default Header;