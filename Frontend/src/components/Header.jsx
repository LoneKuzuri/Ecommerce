import './Header.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Header({ searchQuery, setSearchQuery, getTotalItems, setActiveTab }) {
  return (
    <header className="header">
      <h1 className="header-title">Subha OM Enterprises</h1>
      <div className="header-actions">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="header-search"
        />
        <button 
          onClick={() => setActiveTab('cart')}
          className="header-cart-btn"
        >
          <span className="header-cart-icon"><FontAwesomeIcon icon={faShoppingCart} /></span>
          {getTotalItems() > 0 && (
            <span className="header-cart-badge">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
    </header>
  )
}

export default Header;