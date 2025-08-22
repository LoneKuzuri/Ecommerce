import React from 'react';
import './Home.css';
import ProductCard from "../components/ProductCard";
import { categories } from "../data/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faBowlRice, faUtensils, faOilCan, faBottleWater, faBoxOpen, faSoap 
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

const categoryIconColors = {
  Rice: "#eab308",
  Daal: "#a3e635",
  Oil: "#f59e42",
  Beverages: "#38bdf8",
  Noodles: "#f87171",
  Soap: "#a78bfa",
  default: "#64748b"
};

function Home({ setActiveTab, setSelectedCategory, addToCart }) {
  const quickCategories = categories.slice(0, 6);

  const getCategoryIcon = (category) => {
    const color = categoryIconColors[category] || categoryIconColors.default;
    switch (category) {
      case 'Rice':
        return <FontAwesomeIcon icon={faBowlRice} style={{ color }} />;
      case 'Daal':
        return <FontAwesomeIcon icon={faUtensils} style={{ color }} />;
      case 'Oil':
        return <FontAwesomeIcon icon={faOilCan} style={{ color }} />;
      case 'Beverages':
        return <FontAwesomeIcon icon={faBottleWater} style={{ color }} />;
      case 'Noodles':
        return <FontAwesomeIcon icon={faBoxOpen} style={{ color }} />;
      case 'Soap':
        return <FontAwesomeIcon icon={faSoap} style={{ color }} />;
      default:
        return <FontAwesomeIcon icon={faPagelines} style={{ color }} />;
    }
  };

  return (
    <section>
      <div className="home">
        <h2 className="home-title">Welcome to Subha OM Kirana!</h2>
        <p className="home-desc">Your trusted neighborhood store since 2081</p>
        <p className="home-desc">Quality products at wholesale prices</p>
      </div>

      <div className="home-categories">
        <h3 className="home-section-title">Shop by Category</h3>
        <div className="home-categories-list">
          {quickCategories.map(category => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveTab('categories');
              }}
              className="home-category-btn"
            >
              <div className="home-category-icon">
                {getCategoryIcon(category)}
              </div>
              <span className="home-category-label">{category}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home;