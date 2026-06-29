import React from 'react'
import { NavLink } from 'react-router'
import { motion } from 'framer-motion'
import story from '../../assets/about/story.jpg'

const About = () => {
  // Animation Variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: "spring", stiffness: 60, damping: 15 } 
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 py-12 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-pink-100 via-yellow-50 to-pink-100 min-h-screen overflow-x-hidden">
      
      {/* Intro Header Section */}
      <motion.div 
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: [1, 1.1, 1], opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="text-4xl sm:text-5xl animate-bounce"
      >
        🌸
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center tracking-tight text-amber-950"
      >
        Our little love story
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
        className="max-w-2xl text-center text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed px-2"
      >
        Blush & Bloom began with a simple dream — to make fashion that feels
        like a warm hug and a soft daydream. We design dreamy, feminine pieces
        for the romantics, the twirlers, and the main characters of their own
        sweet stories.
      </motion.p>

      {/* Main Image Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="w-full flex justify-center my-6 max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-5xl px-2"
      >
        <img 
          src={story}
          alt="Our love story" 
          className="w-full h-auto border-4 sm:border-8 border-white rounded-2xl shadow-xl shadow-pink-200/60 object-cover transform hover:scale-[1.01] transition-transform duration-500 ease-out" 
        />
      </motion.div>

      {/* Core Values Grid */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl w-full px-2 mt-8"
      >
        {/* Card 1 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 border border-pink-200/40"
        >
          <div className="text-3xl sm:text-4xl">🌷</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Made with love</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Every piece is thoughtfully designed with delicate details, soft
            fabrics, and that little touch of magic that makes you feel
            beautiful.
          </p>
        </motion.div>

        {/* Card 2 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 border border-pink-200/40"
        >
          <div className="text-3xl sm:text-4xl">🌿</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">Kind to the planet</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            We use ethically sourced, responsibly made fabrics because looking
            pretty should feel good inside and out.
          </p>
        </motion.div>

        {/* Card 3 */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ y: -8, scale: 1.02 }}
          className="bg-white/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-xl hover:bg-white/80 transition-all duration-300 border border-pink-200/40"
        >
          <div className="text-3xl sm:text-4xl">💝</div>
          <h3 className="text-lg sm:text-xl font-bold text-gray-800">For every babe</h3>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            From XS to XL, our collections are crafted to celebrate every body
            and every kind of pretty. You belong here.
          </p>
        </motion.div>
      </motion.div>

      {/* Call to Action Banner Box */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ type: "spring", bounce: 0.3, duration: 1 }}
        className="flex flex-col items-center justify-center mt-16 w-full max-w-4xl px-6 py-12 sm:py-16 bg-gradient-to-b from-pink-300 to-pink-100 rounded-3xl gap-4 text-center shadow-lg mx-2 border border-white/20"
      >
        <div className="text-4xl animate-pulse">🎀</div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">Come bloom with us</h2>
        <p className="max-w-md text-xs sm:text-sm md:text-base text-gray-700 font-medium px-2">
          Join thousands of darlings who dress like the main character every single day.
        </p>
        <NavLink to="/products" className="mt-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-3.5 sm:py-4 bg-white rounded-2xl text-pink-500 font-extrabold shadow-md hover:shadow-pink-300/50 hover:shadow-xl transition-all cursor-pointer text-sm sm:text-base tracking-wide uppercase"
          >
            Shop the Collection
          </motion.button>
        </NavLink>
      </motion.div>
    </div>
  )
}

export default About