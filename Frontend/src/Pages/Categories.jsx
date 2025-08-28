import React from 'react';
import CategoryList from "../components/CategoryList";

function Categories({ selectedCategory, setSelectedCategory }) {
  return (
    <section className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-indigo-50 relative overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-40 h-40 bg-gradient-to-r from-violet-400/20 to-purple-400/20 rounded-full animate-float-gentle"></div>
        <div className="absolute top-32 right-16 w-28 h-28 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 rounded-full animate-float-reverse-gentle"></div>
        <div className="absolute bottom-24 left-1/3 w-36 h-36 bg-gradient-to-r from-pink-400/20 to-rose-400/20 rounded-full animate-float-slow-gentle"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-r from-teal-400/20 to-cyan-400/20 rounded-full animate-float-delayed-gentle"></div>
      </div>

      
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Main Title */}
          <div className="text-center animate-fade-in-down">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4 animate-text-shimmer">
              All Categories
            </h2>
            
            
            <div className="flex items-center justify-center space-x-4 mb-6 animate-slide-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-violet-500 to-transparent animate-expand-horizontal"></div>
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-violet-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
              </div>
              <div className="w-16 h-0.5 bg-gradient-to-l from-transparent via-indigo-500 to-transparent animate-expand-horizontal"></div>
            </div>

           
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.5s' }}>
              Discover our wide range of quality products organized by category. 
              <span className="block mt-1 text-violet-600 font-semibold animate-text-glow">
                Find exactly what you're looking for!
              </span>
            </p>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-left">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full flex items-center justify-center animate-pulse-gentle">
                  <span className="text-white font-bold text-lg">📦</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Premium Quality</h3>
                  <p className="text-gray-600 text-sm">Carefully selected products</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '0.2s' }}>
                  <span className="text-white font-bold text-lg">💰</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Best Prices</h3>
                  <p className="text-gray-600 text-sm">Wholesale rates guaranteed</p>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl border border-white/50 transform hover:-translate-y-1 transition-all duration-300 animate-slide-in-right" style={{ animationDelay: '0.4s' }}>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-rose-600 rounded-full flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '0.4s' }}>
                  <span className="text-white font-bold text-lg">⚡</span>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-lg">Fast Service</h3>
                  <p className="text-gray-600 text-sm">Quick and reliable delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      
      <div className="relative z-10 animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
        <div className="max-w-7xl mx-auto px-6 pb-12">
          {/* Category List Wrapper with Enhanced Styling */}
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/30 p-8 animate-scale-in">
            <CategoryList 
              selectedCategory={selectedCategory} 
              setSelectedCategory={setSelectedCategory} 
            />
          </div>
        </div>
      </div>

    
      <div className="fixed bottom-8 right-8 z-50">
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 cursor-pointer animate-float group">
          <div className="flex items-center space-x-2">
            <span className="text-2xl group-hover:animate-bounce">🛍️</span>
            <span className="hidden sm:inline font-semibold">Browse All</span>
          </div>
        </div>
      </div>

   
      <div className="fixed top-0 left-0 right-0 z-50">
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 animate-slide-progress"></div>
      </div>
    </section>
  );
}

export default Categories;

<style jsx>{`
  @keyframes fade-in-down {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

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
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes scale-in {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
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

  @keyframes expand-horizontal {
    from {
      width: 0;
    }
    to {
      width: 4rem;
    }
  }

  @keyframes text-glow {
    0%, 100% {
      text-shadow: 0 0 8px rgba(124, 58, 237, 0.3);
    }
    50% {
      text-shadow: 0 0 25px rgba(124, 58, 237, 0.6), 0 0 35px rgba(124, 58, 237, 0.4);
    }
  }

  @keyframes float-gentle {
    0%, 100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    33% {
      transform: translate(15px, -10px) rotate(1deg);
    }
    66% {
      transform: translate(-8px, 8px) rotate(-1deg);
    }
  }

  @keyframes float-reverse-gentle {
    0%, 100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    50% {
      transform: translate(-12px, 12px) rotate(2deg);
    }
  }

  @keyframes float-slow-gentle {
    0%, 100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    25% {
      transform: translate(8px, -15px) rotate(-1deg);
    }
    75% {
      transform: translate(-10px, 5px) rotate(1deg);
    }
  }

  @keyframes float-delayed-gentle {
    0%, 100% {
      transform: translate(0px, 0px) rotate(0deg);
    }
    40% {
      transform: translate(-5px, -12px) rotate(1deg);
    }
    80% {
      transform: translate(8px, 8px) rotate(-1deg);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes pulse-gentle {
    0%, 100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
  }

  @keyframes slide-progress {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }

  .animate-fade-in-down {
    animation: fade-in-down 1s ease-out;
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }

  .animate-slide-in-up {
    animation: slide-in-up 1s ease-out;
  }

  .animate-slide-in-left {
    animation: slide-in-left 1s ease-out;
  }

  .animate-slide-in-right {
    animation: slide-in-right 1s ease-out;
  }

  .animate-scale-in {
    animation: scale-in 1s ease-out;
  }

  .animate-text-shimmer {
    background: linear-gradient(90deg, #7c3aed, #8b5cf6, #a855f7, #c084fc, #7c3aed);
    background-size: 400% 100%;
    animation: text-shimmer 3s ease-in-out infinite;
  }

  .animate-expand-horizontal {
    animation: expand-horizontal 1.5s ease-out;
  }

  .animate-text-glow {
    animation: text-glow 2.5s ease-in-out infinite;
  }

  .animate-float-gentle {
    animation: float-gentle 12s ease-in-out infinite;
  }

  .animate-float-reverse-gentle {
    animation: float-reverse-gentle 10s ease-in-out infinite;
    animation-delay: 2s;
  }

  .animate-float-slow-gentle {
    animation: float-slow-gentle 14s ease-in-out infinite;
    animation-delay: 4s;
  }

  .animate-float-delayed-gentle {
    animation: float-delayed-gentle 8s ease-in-out infinite;
    animation-delay: 6s;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-gentle {
    animation: pulse-gentle 3s ease-in-out infinite;
  }

  .animate-slide-progress {
    animation: slide-progress 3s ease-in-out infinite;
  }

  .animate-fade-in {
    animation: fade-in-up 1s ease-out;
  }
`}</style>