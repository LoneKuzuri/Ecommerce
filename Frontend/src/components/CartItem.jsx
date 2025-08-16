import './CartItem.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function CartItem({ item, updateCartQuantity, removeFromCart }) {
  return (
    <div className="cart-item">
      <div className="cart-item-image">{item.image}</div>
      <div className="cart-item-info">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-price">Rs. {item.price}/{item.unit}</p>
      </div>
      <div className="cart-item-actions">
        <button 
          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
          className="cart-item-btn"
        >
          -
        </button>
        <span className="cart-item-qty">{item.quantity}</span>
        <button 
          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
          className="cart-item-btn"
        >
          +
        </button>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="cart-item-remove"
        >
          🗑️
        </button>
      </div>
    </div>
  )
}

export default CartItem;