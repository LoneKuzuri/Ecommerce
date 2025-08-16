import React from "react";
import "./ProductList.css";
import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";
import { fetchProducts } from "../api";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data.data); // Strapi response has { data: [...] }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map((item) => (
          <li key={item.id}>
            <h3>{item.attributes.name}</h3>
            <p>Price: ${item.attributes.price}</p>
            {item.attributes.image?.data && (
              <img
                src={`http://localhost:1337${item.attributes.image.data.attributes.url}`}
                alt={item.attributes.name}
                width="150"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
