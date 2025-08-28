import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faThLarge, faShoppingCart, faUser } from "@fortawesome/free-solid-svg-icons";

function BottomNav({ activeTab, setActiveTab }) {
  const tabs = [
    { key: 'home', icon: faHome, label: 'Home' },
    { key: 'categories', icon: faThLarge, label: 'Categories' },
    { key: 'cart', icon: faShoppingCart, label: 'Cart' },
    { key: 'profile', icon: faUser, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-lg z-50">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-around items-center">
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex flex-col items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${activeTab === tab.key
              ? 'bg-white/20 backdrop-blur-sm text-white scale-110'
              : 'hover:bg-white/10 hover:text-gray-200'
            }`}
            aria-label={`Go to ${tab.label}`}
          >
            <span className="text-xl mb-1 animate-[pulse-gentle_3s_ease-in-out_infinite]">
              <FontAwesomeIcon icon={tab.icon} />
            </span>
            <span className="text-xs font-medium">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}

export default BottomNav;