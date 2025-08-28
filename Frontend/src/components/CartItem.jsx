import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartItem({ item, updateCartQuantity, removeFromCart }) {
  return (
    <div className="flex items-center justify-between p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30 hover:shadow-xl transition-all duration-300">
      {/* Image */}
      <div className="w-20 h-20 flex-shrink-0">
        <div className="w-full h-full bg-gradient-to-br from-violet-200/50 to-purple-200/50 rounded-lg overflow-hidden animate-[pulse-gentle_3s_ease-in-out_infinite]">
          {item.image}
        </div>
      </div>

      {/* Item Info */}
      <div className="flex-1 px-4">
        <h3 className="text-lg font-semibold text-gray-800 animate-[fade-in-up_1s_ease-out]">
          {item.name}
        </h3>
        <p className="text-md text-green-600 font-medium animate-[fade-in-up_1s_ease-out_0.2s]">
          Rs. {item.price}/{item.unit}
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        <button
          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
          className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center hover:bg-violet-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={item.quantity <= 1}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="text-lg font-bold text-gray-800 animate-[scale-in_1s_ease-out]">
          {item.quantity}
        </span>
        <button
          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          className="w-8 h-8 bg-violet-500 text-white rounded-full flex items-center justify-center hover:bg-violet-600 transition-all duration-300"
          aria-label="Increase quantity"
        >
          +
        </button>
        <button
          onClick={() => removeFromCart(item.id)}
          className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-300"
          aria-label="Remove item"
        >
          <FontAwesomeIcon icon="trash" />
        </button>
      </div>
    </div>
  );
}

export default CartItem;