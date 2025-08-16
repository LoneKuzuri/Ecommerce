import React from 'react';
import './BottomNav.css';
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
    <nav className="bottom-nav">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => setActiveTab(tab.key)}
          className={`bottom-nav-btn${activeTab === tab.key ? ' active' : ''}`}
        >
          <span className="bottom-nav-icon">
            <FontAwesomeIcon icon={tab.icon} />
          </span>
          {tab.label}
        </button>
      ))}
    </nav>
  );
}

export default BottomNav;