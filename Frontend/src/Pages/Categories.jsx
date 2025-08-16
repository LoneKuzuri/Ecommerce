import React from 'react';
import './Categories.css';
import CategoryList from "../components/CategoryList";

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <section>
      <div className="categories-header">
        <h2 className="categories-title">
          All Categories
        </h2>
      </div>
      <CategoryList selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
    </section>
  );
}

export default Categories;