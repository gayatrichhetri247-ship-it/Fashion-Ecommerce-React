import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product, onIncrement, onDecrement, onRemove }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, x: -20 }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      className="relative flex items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition-shadow duration-300 hover:shadow-md xs:p-4 sm:gap-6"
    >
      {/* Product Image */}
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-gray-100 xs:h-24 xs:w-24 sm:h-28 sm:w-28"
      >
        <img
          src={product.photo}
          alt={product.name}
          className="h-full w-full object-cover object-center"
        />
      </motion.div>

      {/* Product Details */}
      <div className="flex flex-1 flex-col justify-between self-stretch py-0.5">
        <div>
          <div className="flex justify-between items-start gap-2 pr-6 sm:pr-0">
            <h2 className="text-base font-bold text-gray-900 xs:text-lg sm:text-xl line-clamp-1">
              {product.name}
            </h2>
            <p className="text-right text-sm font-black text-pink-600 whitespace-nowrap xs:text-base">
              Rs. {(product.price * product.quantity).toFixed(2)}
            </p>
          </div>
          {/* Responsive description: visible at small sizes but truncates cleanly */}
          <p className="mt-1 text-xs text-gray-400 line-clamp-1 xs:text-sm xs:text-gray-500 max-w-[180px] xs:max-w-none">
            {product.description}
          </p>
        </div>

        {/* Quantity & Actions Row */}
        <div className="flex items-center justify-between mt-2 xs:mt-4">
          {/* Interactive Quantity Selector */}
          <div className="flex items-center bg-gray-50 border border-gray-200/80 p-0.5 rounded-xl shadow-inner xs:p-1">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onDecrement}
              className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-lg font-bold text-gray-500 hover:bg-white hover:text-gray-800 transition-colors xs:w-8 xs:h-8"
            >
              —
            </motion.button>
            <motion.span 
              key={product.quantity}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-7 text-center font-bold text-gray-800 text-xs xs:w-8 xs:text-sm inline-block"
            >
              {product.quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onIncrement}
              className="w-7 h-7 flex items-center justify-center cursor-pointer rounded-lg font-bold text-gray-500 hover:bg-white hover:text-gray-800 transition-colors xs:w-8 xs:h-8"
            >
              +
            </motion.button>
          </div>

          {/* Remove Button (Desktop Viewport) */}
          <button
            onClick={onRemove}
            className="hidden sm:flex items-center gap-1.5 text-xs cursor-pointer font-semibold text-gray-400 hover:text-rose-600 transition-colors group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform group-hover:scale-110 group-hover:rotate-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Remove
          </button>
        </div>
      </div>

      {/* Absolute Positioned Remove Button for Mobile Viewports */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onRemove}
        className="absolute top-3 right-3 sm:hidden text-gray-300 hover:text-rose-600 transition-colors cursor-pointer xs:top-4 xs:right-4"
        aria-label="Remove item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 xs:h-5 xs:w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </motion.button>
    </motion.div>
  );
};

export default ProductCard;