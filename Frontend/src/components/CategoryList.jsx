import React from 'react';
import { categories } from "../data/categories";
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
  default: "#64748b",
};

function CategoryList({ selectedCategory, setSelectedCategory }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-xl shadow-lg border border-white/30">
      {categories.map(category => {
        const iconColor = categoryColors[category] || categoryColors.default;
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex flex-col items-center justify-center w-full h-20 rounded-lg transition-all duration-300 ${isSelected
              ? 'bg-gradient-to-br from-violet-500/20 to-purple-500/20 scale-105 text-white'
              : 'hover:bg-white/10 hover:scale-105'
            }`}
            aria-label={`Select ${category}`}
          >
            <div className="text-2xl mb-2 animate-[pulse-gentle_3s_ease-in-out_infinite]">
              <FontAwesomeIcon
                icon={categoryIcons[category] || faBoxOpen}
                style={{ color: iconColor }}
              />
            </div>
            <span className="text-sm font-medium text-gray-800 animate-[fade-in-up_1s_ease-out]">
              {category}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default CategoryList;''