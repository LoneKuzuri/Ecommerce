import React from 'react';
import { categories } from "../data/categories";
import './CategoryList.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice, faUtensils, faOilCan, faBottleWater, faBoxOpen, faSoap, faEgg, faLeaf, faCandyCane,
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

const categoryIcons = {
  Rice: faBowlRice,
  Daal: faUtensils,
  Aata: faPagelines,
  Oil: faOilCan,
  Beverages: faBottleWater,
  Noodles: faBoxOpen,
  Soap: faSoap,
  Surf: faBoxOpen,
  Chiyapatti: faLeaf,
  Icepop: faCandyCane,
  Egg: faEgg,
};

const categoryColors = {
  Rice: "#eab308",
  Daal: "#a3e635",
  Aata: "#fbbf24",
  Oil: "#f59e42",
  Beverages: "#38bdf8",
  Noodles: "#f87171",
  Soap: "#a78bfa",
  Surf: "#f472b6",
  Chiyapatti: "#22c55e",
  Icepop: "#f43f5e",
  Egg: "#fde68a",
  default: "#64748b"
};

function CategoryList({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="category-list">
      {categories.map(category => (
        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`category-btn${selectedCategory === category ? ' selected' : ''}`}
        >
          <div className="category-icon">
            <FontAwesomeIcon
              icon={categoryIcons[category] || faBoxOpen}
              style={{ color: categoryColors[category] || categoryColors.default }}
            />
          </div>
          <span className="category-label">{category}</span>
        </button>
      ))}
    </div>
  );
}

export default CategoryList;