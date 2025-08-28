import React from 'react';
import CartItem from "../components/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Cart({ cart, updateCartQuantity, removeFromCart, getTotalItems, getTotalPrice, setActiveTab }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 relative overflow-hidden py-8">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full animate-[float-gentle_12s_ease-in-out_infinite]"></div>
        <div className="absolute top-32 right-16 w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full animate-[float-reverse-gentle_10s_ease-in-out_infinite_2s]"></div>
        <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full animate-[float-slow-gentle_14s_ease-in-out_infinite_4s]"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full animate-[float-delayed-gentle_8s_ease-in-out_infinite_6s]"></div>
      </div>

      {/* Header Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center animate-[fade-in-down_1s_ease-out]">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-[text-shimmer_3s_ease-in-out_infinite]">
            Shopping Cart
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6 animate-[slide-in-up_1s_ease-out_0.3s]">
            <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-[expand-horizontal_1.5s_ease-out]"></div>
            <div className="flex space-x-2">
              <div className="w-2 h-2 bg-violet-500 rounded-full animate-[pulse_2s_ease-in-out_infinite_0.1s]"></div>
              <div className="w-3 h-3 bg-purple-500 rounded-full animate-[pulse_2s_ease-in-out_infinite_0.2s]"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-[pulse_2s_ease-in-out_infinite_0.3s]"></div>
            </div>
            <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-indigo-500 to-transparent animate-[expand-horizontal_1.5s_ease-out]"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-[fade-in-up_1s_ease-out_0.5s]">
            Review your selected items and proceed to checkout.
            <span className="block mt-1 text-violet-600 font-semibold animate-[text-glow_2.5s_ease-in-out_infinite]">
              Shop with confidence!
            </span>
          </p>
        </div>
      </div>

      {/* Cart Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-12">
        {cart.length === 0 ? (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 text-center animate-[fade-in-up_1s_ease-out_0.7s]">
            <div className="flex justify-center mb-6">
              <FontAwesomeIcon 
                icon={faShoppingCart} 
                className="text-6xl text-violet-600 animate-[pulse-gentle_3s_ease-in-out_infinite]" 
              />
            </div>
            <p className="text-xl text-gray-600 mb-6 animate-[fade-in_1s_ease-out_0.9s]">
              Your cart is empty
            </p>
            <button
              onClick={() => setActiveTab('home')}
              className="bg-gradient-to-r from-violet-500 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-[scale-in_1s_ease-out]"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 animate-[scale-in_1s_ease-out]">
            <div className="space-y-6 mb-8">
              {cart.map(item => (
                <CartItem 
                  key={item.id} 
                  item={item} 
                  updateCartQuantity={updateCartQuantity} 
                  removeFromCart={removeFromCart} 
                />
              ))}
            </div>
            <div className="border-t border-gray-200 pt-6">
              <div className="flex justify-between text-lg font-semibold text-gray-800 mb-4 animate-[fade-in-up_1s_ease-out_0.2s]">
                <span>Total Items:</span>
                <span>{getTotalItems()}</span>
              </div>
              <div className="flex justify-between text-xl font-bold text-gray-800 mb-6 animate-[fade-in-up_1s_ease-out_0.4s]">
                <span>Total Price:</span>
                <span>Rs. {getTotalPrice()}</span>
              </div>
              <button className="w-full bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 animate-[scale-in_1s_ease-out_0.6s]">
                Place Order via WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => setActiveTab('home')} 
          className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 animate-[float_3s_ease-in-out_infinite] group"
        >
          <div className="flex items-center space-x-2">
            <span className="text-2xl group-hover:animate-bounce">🛍️</span>
            <span className="hidden sm:inline font-semibold">Continue Shopping</span>
          </div>
        </button>
      </div>

      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-[slide-progress_3s_ease-in-out_infinite]"></div>
      </div>
    </section>
  );
}

export default Cart;