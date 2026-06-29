import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { add } from '../../redux/features/cartSlice';
import { motion, AnimatePresence } from 'framer-motion'; // Added Framer Motion for premium animations

const ProductDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = location?.state;
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-amber-50/40 px-4 text-center">
        <motion.div 
          animate={{ y: [0, -20, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="rounded-full bg-amber-100 p-4 text-amber-600 text-2xl"
        >
          🍳
        </motion.div>
        <h3 className="mt-4 text-xl font-bold text-gray-800">Product item not found</h3>
        <p className="mt-2 text-sm text-gray-500">It looks like you refreshed or came here directly.</p>
        <button 
          onClick={() => navigate('/')} 
          className="mt-6 rounded-xl bg-gray-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-gray-800 transition-all active:scale-95"
        >
          Back to Product
        </button>
      </div>
    );
  }

  const handleAddToBasket = () => {
    dispatch(add({ ...product, quantity }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-100 py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      {/* Container Card with Entry Fade & Scale */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden border border-gray-100/80 grid grid-cols-1 md:grid-cols-2"
      >
        
        {/* Left: Premium Image Section */}
        <div className="relative h-64 sm:h-80 md:h-full min-h-[300px] md:min-h-[550px] w-full overflow-hidden group">
          <motion.img 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            src={product.photo} 
            alt={product.name} 
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-black/5" />
          
          {/* Floating Category Badge */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="absolute top-4 left-4"
          >
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 backdrop-blur-md px-3 py-1.5 text-xs font-bold text-pink-800 shadow-sm border border-pink-100/50">
              <span className="h-2 w-2 rounded-full bg-pink-500 animate-pulse" />
              {product.category}
            </span>
          </motion.div>
        </div>

        {/* Right: Elegant Content & Interactive Section */}
        <div className="p-6 sm:p-10 lg:p-12 flex flex-col justify-between bg-white">
          <div className="space-y-4">
            {/* Tag */}
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 bg-pink-50 px-2.5 py-1 rounded-md inline-block">
                Fresh & Delicious
              </span>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 font-serif leading-tight">
              {product.name}
            </h1>

            {/* Animated Divider Line */}
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full" 
            />

            {/* Description */}
            <p className="text-sm sm:text-base leading-relaxed text-gray-600 font-normal">
              {product.description || "Savor the rich, authentic flavors prepared with handpicked ingredients and crafted to perfection by our master chefs."}
            </p>
          </div>

          {/* Interactive Actions & Pricing */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              {/* Price Display */}
              <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Price</p>
                <AnimatePresence mode="wait">
                  <motion.p 
                    key={quantity}
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 10, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="text-2xl sm:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-orange-600 mt-0.5"
                  >
                    RS. {(product.price * quantity).toLocaleString()}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center bg-gray-50 border border-gray-200/80 p-1 rounded-2xl shadow-inner w-full sm:w-auto justify-between sm:justify-start">
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-gray-600 hover:bg-white transition-all shadow-sm disabled:opacity-40"
                  disabled={quantity <= 1}
                >
                  —
                </motion.button>
                <span className="w-12 text-center font-bold text-gray-800 text-lg select-none">
                  {quantity}
                </span>
                <motion.button 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-gray-600 hover:bg-white transition-all shadow-sm"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToBasket}
                className="flex-1 group relative flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500 to-orange-600 px-6 py-4 text-center text-base font-bold text-white shadow-md shadow-orange-500/10 hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300"
              >
                <span>Add to Basket</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>

              <motion.button 
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 flex items-center justify-center rounded-2xl border-2 border-gray-100 bg-white text-gray-400 hover:text-rose-500 hover:border-rose-100 hover:bg-rose-50/30 transition-all group"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform group-hover:scale-110 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </motion.button>
            </div>
            
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ProductDetails;