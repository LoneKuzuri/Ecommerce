// ProductCard.jsx - Updated with fallback for missing images
import React from "react";

function ProductCard({ product }) {
  // Handle image URL - prepend Strapi URL if it's a relative path
  const getImageUrl = () => {
    if (!product.image) return null;
    
    if (product.image.startsWith('http')) {
      return product.image;
    }
    
    // If it's a relative path, prepend Strapi URL
    return `http://localhost:1337${product.image}`;
  };

  const imageUrl = getImageUrl();

  return (
    <div className="product-card">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={product.name}
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
          onError={(e) => {
            e.target.style.display = 'none';
          }}
        />
      ) : (
        <div style={{ 
          width: "150px", 
          height: "150px", 
          backgroundColor: "#f0f0f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          No Image
        </div>
      )}
      <h4>{product.name}</h4>
      <p>Rs. {product.price}</p>
      {product.stock !== undefined && (
        <p>{product.stock ? 'In Stock' : 'Out of Stock'}</p>
      )}
    </div>
  );
}

export default ProductCard;