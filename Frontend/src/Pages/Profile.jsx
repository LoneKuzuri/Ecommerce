import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

function Profile() {
  return (
    <section className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen">
      <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 animate-fade-in-up">
        Store Information
      </h2>
      
      {/* Store Information Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl p-8 mb-8 border border-white/20 transform hover:-translate-y-2 transition-all duration-500 animate-slide-in-left">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-6 text-center animate-pulse-slow">
          Subha OM Enterprises
        </h3>
        <div className="space-y-4 text-gray-700">
          <div className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 transform hover:scale-[1.02]">
            <strong className="text-gray-800 w-full sm:w-32 mb-1 sm:mb-0 font-semibold">Proprietors:</strong>
            <span className="text-gray-700">Sita Pandey & Yubraj Pangeni</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 transform hover:scale-[1.02]">
            <strong className="text-gray-800 w-full sm:w-32 mb-1 sm:mb-0 font-semibold">Established:</strong>
            <span className="text-gray-700">2081, Baisakh 1</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 transform hover:scale-[1.02]">
            <strong className="text-gray-800 w-full sm:w-32 mb-1 sm:mb-0 font-semibold">Address:</strong>
            <span className="text-gray-700">Omsatiya-01, Rupandehi, Saraswati Tol</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center p-3 rounded-lg bg-gradient-to-r from-orange-50 to-red-50 hover:from-orange-100 hover:to-red-100 transition-all duration-300 transform hover:scale-[1.02]">
            <strong className="text-gray-800 w-full sm:w-32 mb-1 sm:mb-0 font-semibold">Landmark:</strong>
            <span className="text-gray-700">Opposite Hotel Sunrise</span>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl p-8 border border-white/20 transform hover:-translate-y-2 transition-all duration-500 animate-slide-in-right">
        <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-8 text-center animate-bounce-subtle">
          Contact Information
        </h3>
        <div className="space-y-6">
          
          {/* Phone Contact */}
          <a 
            href="tel:+9779857032030" 
            className="group flex items-center p-6 bg-gradient-to-r from-blue-50 to-indigo-100 hover:from-blue-400 hover:to-indigo-500 rounded-2xl transition-all duration-500 border border-blue-200 hover:border-blue-400 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 shadow-lg hover:shadow-2xl animate-float"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faPhone} className="text-xl group-hover:animate-pulse" />
            </span>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-xl group-hover:text-white transition-colors duration-300">Call Us</p>
              <p className="text-blue-600 font-semibold text-lg group-hover:text-blue-100 transition-colors duration-300">+977 9857032030</p>
            </div>
            <div className="w-6 h-6 border-2 border-blue-400 rounded-full group-hover:border-white group-hover:scale-125 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
          </a>

          {/* WhatsApp Contact */}
          <a 
            href="https://wa.me/9779857032030" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="group flex items-center p-6 bg-gradient-to-r from-green-50 to-emerald-100 hover:from-green-400 hover:to-emerald-500 rounded-2xl transition-all duration-500 border border-green-200 hover:border-green-400 transform hover:scale-105 hover:-translate-y-1 hover:-rotate-1 shadow-lg hover:shadow-2xl animate-float"
            style={{ animationDelay: '0.2s' }}
          >
            <span className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:-rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faWhatsapp} className="text-xl group-hover:animate-bounce" />
            </span>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-xl group-hover:text-white transition-colors duration-300">WhatsApp</p>
              <p className="text-green-600 font-semibold text-lg group-hover:text-green-100 transition-colors duration-300">+977 9857032030</p>
            </div>
            <div className="w-6 h-6 border-2 border-green-400 rounded-full group-hover:border-white group-hover:scale-125 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
          </a>

          {/* Email Contact */}
          <a 
            href="mailto:subhaom@gmail.com" 
            className="group flex items-center p-6 bg-gradient-to-r from-red-50 to-rose-100 hover:from-red-400 hover:to-rose-500 rounded-2xl transition-all duration-500 border border-red-200 hover:border-red-400 transform hover:scale-105 hover:-translate-y-1 hover:rotate-1 shadow-lg hover:shadow-2xl animate-float"
            style={{ animationDelay: '0.3s' }}
          >
            <span className="w-16 h-16 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-2xl flex items-center justify-center mr-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-xl">
              <FontAwesomeIcon icon={faEnvelope} className="text-xl group-hover:animate-pulse" />
            </span>
            <div className="flex-1">
              <p className="font-bold text-gray-800 text-xl group-hover:text-white transition-colors duration-300">Email</p>
              <p className="text-red-600 font-semibold text-lg group-hover:text-red-100 transition-colors duration-300">subhaom@gmail.com</p>
            </div>
            <div className="w-6 h-6 border-2 border-red-400 rounded-full group-hover:border-white group-hover:scale-125 transition-all duration-300 opacity-0 group-hover:opacity-100 animate-ping"></div>
          </a>
          
        </div>
      </div>
    </section>
  );
}

export default Profile;

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

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slide-in-right {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @keyframes pulse-slow {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.8;
    }
  }

  @keyframes bounce-subtle {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-3px);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 1s ease-out;
  }

  .animate-slide-in-left {
    animation: slide-in-left 0.8s ease-out;
  }

  .animate-slide-in-right {
    animation: slide-in-right 0.8s ease-out;
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .animate-pulse-slow {
    animation: pulse-slow 2s ease-in-out infinite;
  }

  .animate-bounce-subtle {
    animation: bounce-subtle 2s ease-in-out infinite;
  }
`}</style>