import React from "react";
import { categories } from "../data/categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBowlRice,
  faUtensils,
  faOilCan,
  faBottleWater,
  faBoxOpen,
  faSoap,
} from "@fortawesome/free-solid-svg-icons";
import { faPagelines } from "@fortawesome/free-brands-svg-icons";

const categoryIconColors = {
  Rice: "#eab308",
  Daal: "#a3e635",
  Oil: "#f59e42",
  Beverages: "#38bdf8",
  Noodles: "#f87171",
  Soap: "#a78bfa",
  default: "#64748b",
};

function Home({ setActiveTab, setSelectedCategory }) {
  const quickCategories = categories.slice(0, 6);

  const getCategoryIcon = (category) => {
    const color = categoryIconColors[category] || categoryIconColors.default;
    switch (category) {
      case "Rice":
        return <FontAwesomeIcon icon={faBowlRice} style={{ color }} className="group-hover:animate-bounce" />;
      case "Daal":
        return <FontAwesomeIcon icon={faUtensils} style={{ color }} className="group-hover:animate-pulse" />;
      case "Oil":
        return <FontAwesomeIcon icon={faOilCan} style={{ color }} className="group-hover:animate-wiggle" />;
      case "Beverages":
        return <FontAwesomeIcon icon={faBottleWater} style={{ color }} className="group-hover:animate-shake" />;
      case "Noodles":
        return <FontAwesomeIcon icon={faBoxOpen} style={{ color }} className="group-hover:animate-bounce" />;
      case "Soap":
        return <FontAwesomeIcon icon={faSoap} style={{ color }} className="group-hover:animate-spin-slow" />;
      default:
        return <FontAwesomeIcon icon={faPagelines} style={{ color }} className="group-hover:animate-pulse" />;
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 px-6 py-12 relative overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full animate-float-slow"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400/20 to-red-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-green-400/20 to-teal-400/20 rounded-full animate-float-reverse"></div>
      </div>

    
      <div className="relative z-10 text-center mb-12 animate-fade-in-up">
        <div className="mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
            Welcome to Subha OM Enterprises!
          </h1>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-purple-500 animate-expand-right"></div>
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-purple-500 animate-expand-left"></div>
          </div>
        </div>
        
        <div className="space-y-3 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
          <p className="text-xl md:text-2xl text-gray-700 font-medium">
            Your trusted neighborhood store since 
            <span className="inline-block mx-2 px-3 py-1 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-full text-lg font-bold animate-bounce-subtle">
              2081
            </span>
          </p>
          <p className="text-lg md:text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Quality products at 
            <span className="text-green-600 font-bold animate-text-glow"> wholesale prices</span>
          </p>
        </div>
      </div>

      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-slide-in-up" style={{ animationDelay: '0.7s' }}>
          <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
            Shop by Category
          </h3>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto animate-expand-center"></div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {quickCategories.map((category, index) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setActiveTab("categories");
              }}
              className="group relative flex flex-col items-center justify-center p-6 md:p-8 bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-2xl rounded-2xl border border-white/50 hover:border-purple-300 transform hover:scale-110 hover:-translate-y-2 transition-all duration-500 animate-float-up overflow-hidden"
              style={{ animationDelay: `${0.9 + index * 0.1}s` }}
            >
              
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300">
                <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-purple-400 rounded-full group-hover:w-full group-hover:h-full group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 transition-all duration-700 ease-out"></div>
              </div>
              
           
              <div className="relative z-10 mb-3 p-4 rounded-full bg-gradient-to-br from-white to-gray-50 shadow-lg group-hover:shadow-xl transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-500">
                <div className="text-4xl">
                  {getCategoryIcon(category)}
                </div>
              </div>
              
           
              <span className="relative z-10 text-sm md:text-base font-bold text-gray-700 group-hover:text-purple-700 transition-colors duration-300 text-center animate-fade-in">
                {category}
              </span>
              
             
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full"></div>
            </button>
          ))}
        </div>
      </div>

      
      <div className="fixed bottom-6 right-6 z-50 animate-float">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer animate-pulse-glow">
          <span className="text-sm font-semibold">🛒 Start Shopping</span>
        </div>
      </div>
    </section>
  );
}

export default Home;

<style jsx>{`
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-up {
    from {
      opacity: 0;
      transform: translateY(50px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes float-up {
    from {
      opacity: 0;
      transform: translateY(20px) scale(0.9);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes float-slow {
    0%, 100% {
      transform: translate(0px, 0px);
    }
    33% {
      transform: translate(10px, -10px);
    }
    66% {
      transform: translate(-5px, 5px);
    }
  }

  @keyframes float-delayed {
    0%, 100% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(-15px, 10px);
    }
  }

  @keyframes float-reverse {
    0%, 100% {
      transform: translate(0px, 0px);
    }
    50% {
      transform: translate(5px, -15px);
    }
  }

  @keyframes text-shimmer {
    0% {
      background-position: -200% center;
    }
    100% {
      background-position: 200% center;
    }
  }

  @keyframes expand-right {
    from {
      width: 0;
    }
    to {
      width: 3rem;
    }
  }

  @keyframes expand-left {
    from {
      width: 0;
    }
    to {
      width: 3rem;
    }
  }

  @keyframes expand-center {
    from {
      width: 0;
    }
    to {
      width: 6rem;
    }
  }

  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes text-glow {
    0%, 100% {
      text-shadow: 0 0 5px rgba(34, 197, 94, 0.3);
    }
    50% {
      text-shadow: 0 0 20px rgba(34, 197, 94, 0.6), 0 0 30px rgba(34, 197, 94, 0.4);
    }
  }

  @keyframes wiggle {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(-3deg); }
    75% { transform: rotate(3deg); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-2px); }
    75% { transform: translateX(2px); }
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(147, 51, 234, 0.4);
    }
    50% {
      box-shadow: 0 0 40px rgba(147, 51, 234, 0.8), 0 0 60px rgba(147, 51, 234, 0.4);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }

  .animate-slide-in-up {
    animation: slide-in-up 1s ease-out;
  }

  .animate-float-up {
    animation: float-up 0.8s ease-out;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-float-slow {
    animation: float-slow 8s ease-in-out infinite;
  }

  .animate-float-delayed {
    animation: float-delayed 6s ease-in-out infinite;
    animation-delay: 2s;
  }

  .animate-float-reverse {
    animation: float-reverse 10s ease-in-out infinite;
    animation-delay: 4s;
  }

  .animate-text-shimmer {
    background: linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899, #4f46e5);
    background-size: 400% 100%;
    animation: text-shimmer 3s ease-in-out infinite;
  }

  .animate-expand-right {
    animation: expand-right 1s ease-out;
  }

  .animate-expand-left {
    animation: expand-left 1s ease-out;
  }

  .animate-expand-center {
    animation: expand-center 1s ease-out;
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }

  .animate-text-glow {
    animation: text-glow 2s ease-in-out infinite;
  }

  .animate-wiggle {
    animation: wiggle 0.5s ease-in-out;
  }

  .animate-shake {
    animation: shake 0.5s ease-in-out;
  }

  .animate-spin-slow {
    animation: spin-slow 2s linear infinite;
  }

  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fade-in-up 1s ease-out;
  }
`}</style>