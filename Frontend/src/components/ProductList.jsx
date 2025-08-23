// ProductList.jsx - Updated with error state
import React, { useEffect, useState } from "react";
import { fetchOil } from "../api/api";
import ProductCard from "./ProductCard";

function ProductList() {
  const [oils, setOils] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);
        const oilProducts = await fetchOil();
        setOils(oilProducts);
      } catch (err) {
        console.error("Error loading products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p>Loading oils...</p>;
  
  if (error) return (
    <div>
      <p style={{ color: 'red' }}>Error: {error}</p>
      <p>Make sure Strapi is running on http://localhost:1337</p>
    </div>
  );

  return (
    <div className="product-list">
      {oils.length > 0 ? (
        oils.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No oils available</p>
      )}
    </div>
  );
}

export default ProductList;