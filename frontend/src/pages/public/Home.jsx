import React from "react";
import { NavLink } from "react-router";
import { motion } from "framer-motion";
import ShopByMood from "../../components/ShopByMood";
import PromoBanner from "../../components/PromoBanner";
import FeaturesBar from "../../components/FeatureBar";
import About from "./About";
import girlImage from '../../assets/home-page/home-girl-image.jpg';
import tulip from '../../assets/home-page/tulip.png';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="flex flex-col overflow-x-hidden">
      {/* Hero Wrapper - Responsive height adjustments */}
      <div className="relative flex flex-col lg:flex-row justify-center lg:justify-between items-center min-h-screen lg:min-h-0 lg:h-[calc(100vh-4rem)] xl:h-screen px-4 sm:px-8 md:px-12 lg:px-16 py-12 lg:py-0 gap-10 lg:gap-12 xl:gap-20 bg-linear-to-r from-pink-100 via-yellow-50 to-pink-100">
        
        {/* Decorative Floating Elements (Hidden on small screens) */}
        <motion.div 
          className="absolute top-12 left-8 text-pink-300/30 text-3xl hidden xl:block select-none pointer-events-none"
          animate={{ y: [0, -12, 0], rotate: [0, 8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          ✿
        </motion.div>
        <motion.div 
          className="absolute bottom-16 left-1/3 text-yellow-300/40 text-4xl hidden xl:block select-none pointer-events-none"
          animate={{ y: [0, 16, 0], rotate: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          ❀
        </motion.div>

        {/* Left Content Column */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center lg:items-start text-center lg:text-left max-w-xl lg:max-w-xl xl:max-w-2xl order-2 lg:order-1 z-10"
        >
          {/* Collection Tag */}
          <motion.div 
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            className="px-4 sm:px-5 h-9 sm:h-10 rounded-full bg-white w-fit flex gap-3 items-center border border-pink-200 shadow-xs cursor-default mb-2"
          >
            <motion.img
              src={tulip}
              alt="Tulip"
              className="w-4 h-4 sm:w-5 sm:h-5"
              animate={{ rotate: [0, 12, -12, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            />
            <span className="text-xs sm:text-sm font-medium text-gray-700 tracking-wide">
              New Spring Collection
            </span>
          </motion.div>

          {/* Headings */}
          <motion.div variants={itemVariants} className="flex flex-col gap-1 sm:gap-2 mb-3">
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-extrabold text-amber-950 tracking-tight leading-tight">
              Bloom into
            </span>
            <span className="text-pink-500 text-3xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-7xl font-extrabold capitalize tracking-tight leading-tight">
              your softest era
            </span>
          </motion.div>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xs sm:text-base max-w-xs sm:max-w-md lg:max-w-sm xl:max-w-md text-gray-500 leading-relaxed"
          >
            Dreamy dresses, cloud-soft knits and twirly skirts in every shade of
            pretty. Dress like the main character, darling. ♡
          </motion.p>

          {/* Responsive Action Buttons */}
          <motion.div 
            variants={itemVariants} 
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 w-full sm:w-auto min-w-[280px] sm:min-w-[400px] lg:min-w-0"
          >
            <NavLink to="/products" className="w-full lg:w-44 xl:w-52">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="text-center cursor-pointer py-3 text-sm sm:text-base bg-pink-600 text-white rounded-full font-bold shadow-md hover:bg-pink-700 transition-colors"
              >
                Shop Now
              </motion.div>
            </NavLink>
            <NavLink to="/products" className="w-full lg:w-44 xl:w-52">
              <motion.div 
                whileHover={{ scale: 1.02, y: -2, backgroundColor: "rgba(253, 242, 248, 1)" }}
                whileTap={{ scale: 0.98 }}
                className="text-center cursor-pointer py-3 text-sm sm:text-base bg-white text-pink-600 border border-pink-600 rounded-full font-bold transition-colors"
              >
                Explore Dresses
              </motion.div>
            </NavLink>
          </motion.div>
        </motion.div>

        {/* Right Image Container - Fully Responsive Scaling */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.3 }}
          className="relative order-1 lg:order-2 w-full max-w-[260px] sm:max-w-[340px] md:max-w-[380px] lg:max-w-[400px] xl:max-w-[460px] aspect-[4/5] flex items-center justify-center mt-4 lg:mt-0"
        >
          <motion.img
            src={girlImage}
            alt="Image of a girl in a spring dress"
            whileHover={{ scale: 1.01, rotate: -0.5 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="w-full h-full object-cover border-4 sm:border-8 border-white rounded-2xl shadow-xl"
          />

          {/* Promotional Sale Badge */}
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 12 }}
            transition={{ type: "spring", delay: 0.8, stiffness: 120 }}
            whileHover={{ scale: 1.05, rotate: 14 }}
            className="absolute -top-3 -right-3 sm:-top-4 sm:-right-6 flex flex-col items-start bg-pink-600 w-fit py-1.5 px-3.5 sm:py-2 sm:px-5 text-white font-bold text-[10px] sm:text-xs md:text-sm rounded-full shadow-lg cursor-pointer select-none"
          >
            <span>20% Off</span>
            <span className="whitespace-nowrap">End of Season Sale</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Grid sections below main hero */}
      <ShopByMood />
      <PromoBanner />
      <FeaturesBar />
    </div>
  );
};

export default Home;