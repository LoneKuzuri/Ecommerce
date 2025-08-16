import React from 'react'; 
import './Cart.css';
import CartItem from "../components/CartItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function Cart({ cart, updateCartQuantity, removeFromCart, getTotalItems, getTotalPrice, setActiveTab }) {
  return (
    <section>
      <h2 className="cart-title">Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div className="cart-empty">
          <div className="cart-empty-icon">
            <FontAwesomeIcon icon={faShoppingCart} />
          </div>
          <p className="cart-empty-text">Your cart is empty</p>
          <button 
            onClick={() => setActiveTab('home')}
            className="cart-empty-btn"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <CartItem 
              key={item.id} 
              item={item} 
              updateCartQuantity={updateCartQuantity} 
              removeFromCart={removeFromCart} 
            />
          ))}

          <div className="cart-summary">
            <div className="cart-summary-row">
              <span className="cart-summary-label">Total Items:</span>
              <span className="cart-summary-value">{getTotalItems()}</span>
            </div>
            <div className="cart-summary-row">
              <span className="cart-summary-total-label">Total Price:</span>
              <span className="cart-summary-total-value">Rs. {getTotalPrice()}</span>
            </div>
            <button className="cart-whatsapp-btn">
              Place Order via WhatsApp
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Cart;