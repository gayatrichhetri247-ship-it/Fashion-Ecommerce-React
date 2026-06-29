import React from "react";
import { NavLink } from "react-router";

export default function PromoBanner() {
  return (
    <div className="w-full bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-50 transition-colors duration-500">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12 lg:py-16">
        
        {/* Main Card Container with Entrance Animation */}
        <div className="relative w-full bg-[#ff6392] rounded-3xl md:rounded-[2.5rem] px-4 sm:px-8 py-10 sm:py-14 md:py-16 lg:py-20 text-center flex flex-col items-center justify-center shadow-lg shadow-pink-200/50 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:shadow-pink-300/50 animate-fade-in-up">
          
          {/* Subtle Background Glow Decorative Elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-44 h-44 bg-white/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 pointer-events-none" />

          {/* Ribbon Bow Icon Container with Continuous Floating Animation */}
          <div className="text-4xl sm:text-5xl lg:text-6xl mb-4 sm:mb-6 select-none animate-bounce [animation-duration:2s]">
            🎀
          </div>

          {/* Primary Heading */}
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight max-w-3xl mb-4 drop-shadow-sm">
            20% off your first order
          </h2>

          {/* Subtitle Description */}
          <p className="text-white/90 text-xs sm:text-sm md:text-base font-medium tracking-wide max-w-md md:max-w-xl leading-relaxed mb-8 px-2 sm:px-4">
            Join the Blush Club for exclusive drops, birthday treats, and a sweet
            welcome gift. 
          </p>

          {/* CTA Call to Action Button */}
          <NavLink to="/products" className="inline-block group">
            <button
              onClick={() => {
                console.log("Treating yourself!");
              }}
              className="bg-white text-[#ff6392] font-semibold text-xs sm:text-sm md:text-base tracking-wider px-8 py-3.5 sm:px-10 sm:py-4 rounded-full transition-all duration-300 shadow-md shadow-pink-900/20 group-hover:bg-pink-50 group-hover:scale-105 active:scale-95 cursor-pointer ease-out"
            >
              Treat Yourself
            </button>
          </NavLink>

        </div>
      </div>
    </div>
  );
}