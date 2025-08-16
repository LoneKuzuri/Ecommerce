import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="product-card-image">{product.image}</div>
      <h3 className="product-card-name">{product.name}</h3>
      <p className="product-card-price">Rs. {product.price}/{product.unit}</p>
      <button 
        onClick={() => addToCart(product)}
        className="product-card-btn"
      >
        Add to Cart
      </button>
    </div>
  )
}

export default ProductCard;