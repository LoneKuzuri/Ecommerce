import React from "react";
import "./ProductCard.css";

function ProductCard({ product, addToCart }) {
  
  const imageUrl = product?.image
    ? `http://localhost:1337${product.image}`
    : "/fallback.png"; // local fallback

  return (
    <li className="product-card">
      <div className="product-card-image">
        <img src={imageUrl} alt={product?.name || "No name"} />
      </div>
      <h3 className="product-card-name">{product?.name || "Unnamed Product"}</h3>
      <p className="product-card-price">
        Rs. {product?.price ?? "N/A"} / {product?.unit ?? ""}
      </p>
      <button onClick={() => addToCart(product)} className="product-card-btn">
        Add to Cart
      </button>
    </li>
  );
}

export default ProductCard;
