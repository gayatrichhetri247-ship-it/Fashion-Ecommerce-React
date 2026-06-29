import React from "react";
import { NavLink } from "react-router";
import shoplogo from "../assets/home-page/shoplogo.png";

const Footer = () => {
  return (
    <footer className="bg-linear-to-r from-pink-100 via-yellow-50 to-pink-100 px-6 sm:px-12 pt-14 pb-4 overflow-hidden animate-fade-in-up">
      {/* Footer Content Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-7xl mx-auto">
        
        {/* Brand / Logo Section */}
        <div className="flex flex-col gap-4 transform transition-all duration-300 hover:-translate-y-1">
          <img 
            src={shoplogo} 
            alt="Logo" 
            className="h-auto w-40 object-contain hover:scale-105 transition-transform duration-300" 
          />
          <p className="max-w-xs text-sm text-gray-700 leading-relaxed">
            Dreamy, feminine fashion made to make you feel like the main
            character. Twirl on, darling. ♡
          </p>
          {/* Animated Emojis on Hover */}
          <div className="text-xl tracking-wide select-none flex gap-2">
            <span className="hover:scale-125 transition-transform duration-200 cursor-default">🌷</span>
            <span className="hover:scale-125 transition-transform duration-200 cursor-default">🎀</span>
            <span className="hover:scale-125 transition-transform duration-200 cursor-default">💌</span>
            <span className="hover:scale-125 transition-transform duration-200 cursor-default">🦋</span>
          </div>
        </div>

        {/* Shop Category Links */}
        <div className="flex gap-2 flex-col text-gray-700 text-sm">
          <h3 className="uppercase font-extrabold text-sm tracking-wider text-black mb-1">
            Shop
          </h3>
          <NavLink to="/products?category=dresses" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Dresses</NavLink>
          <NavLink to="/products?category=tops" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Tops</NavLink>
          <NavLink to="/products?category=skirts" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Skirts</NavLink>
          <NavLink to="/products?category=accessories" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Accessories</NavLink>
        </div>

        {/* Support & Admin Links */}
        <div className="flex gap-2 flex-col text-gray-700 text-sm">
          <h3 className="uppercase font-extrabold text-sm tracking-wider text-black mb-1">
            Sweet Help
          </h3>
          <NavLink to="/returns" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Shipping & Returns</NavLink>
          <NavLink to="/size-guide" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Size Guide</NavLink>
          <NavLink to="/track-order" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Track My Order</NavLink>
          <NavLink to="/contact" className="hover:text-pink-600 hover:translate-x-1 transition-all duration-200">Contact Us</NavLink>
          <NavLink to="/admin/adminlogin" className="mt-2 hover:text-pink-600 hover:scale-105 origin-left transition-all duration-200 font-medium inline-flex items-center gap-1">
            🛠️ Owner Dashboard
          </NavLink>
        </div>

        {/* Newsletter Section */}
        <div className="flex gap-2 flex-col text-gray-700 text-sm">
          <h3 className="uppercase font-extrabold text-sm tracking-wider text-black mb-1">
            Join the Club ♡
          </h3>
          <p className="max-w-xs">Get 20% off your first order and first dibs on new drops.</p>
          
          {/* Newsletter Input/Button */}
          <div className="flex items-center mt-2 max-w-sm group">
            <input 
              type="email" 
              placeholder="Your@email.com" 
              className="w-full min-w-0 border-2 border-transparent px-4 py-2 text-sm rounded-l-2xl bg-white focus:outline-none focus:border-pink-300 transition-all duration-300" 
            />
            <button className="px-5 py-2 bg-pink-400 hover:bg-pink-500 border border-pink-400 hover:border-pink-500 text-white font-extrabold rounded-r-2xl text-sm transition-all duration-300 shrink-0 cursor-pointer shadow-xs hover:shadow-md active:scale-95">
              Join
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Legal Line */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 mt-12 py-4 text-xs text-gray-700 border-t border-pink-200 text-center sm:text-left">
        <div className="hover:text-pink-600 transition-colors duration-300">
          © 2026 Girlish Fashion Shop. Made with ♡.
        </div>
        <div className="flex gap-4">
          <NavLink to="/privacy" className="hover:text-pink-600 transition-colors duration-200">Privacy</NavLink>
          <span className="text-pink-300">·</span>
          <NavLink to="/terms" className="hover:text-pink-600 transition-colors duration-200">Terms</NavLink>
          <span className="text-pink-300">·</span>
          <NavLink to="/cookies" className="hover:text-pink-600 transition-colors duration-200">Cookies</NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;