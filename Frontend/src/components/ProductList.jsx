import React, { useEffect, useState } from "react";
import "./ProductList.css";
import { fetchProducts } from "../api/api";
import ProductCard from "./ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        const response = await fetchProducts();
        console.log("Full Response:", response); 
        setProducts(Array.isArray(response?.data) ? response.data : []);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p className="loading-text">Loading products...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (products.length === 0) return <p className="empty-text">No products found.</p>;

  return (
    <div className="product-list">
      <h2>Products</h2>
      <ul>
        {products.map((item) => (
          <ProductCard
            key={item.id}
            product={{
              name: item?.attributes?.name,
              price: item?.attributes?.price,
              unit: item?.attributes?.unit,
              image: item?.attributes?.image?.data?.attributes?.url,
            }}
            addToCart={() => console.log("Add to cart:", item?.attributes?.name)}
          />
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
