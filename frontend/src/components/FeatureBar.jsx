import React from 'react';
import { motion } from 'framer-motion';
// Using standard Lucide icons as placeholders, but styled to match the vibe.
import { Truck, Heart, Leaf } from 'lucide-react';

export default function FeaturesBar() {
  const features = [
    {
      icon: <Truck className="w-6 h-6 text-orange-600 fill-orange-500" />,
      title: "Free Shipping",
      description: "On all orders over $75",
    },
    {
      icon: <Heart className="w-6 h-6 text-red-600 fill-red-500" />,
      title: "Sweet Returns",
      description: "Easy 3-day returns",
    },
    {
      icon: <Leaf className="w-6 h-6 text-green-600 fill-green-500" />,
      title: "Lovingly Made",
      description: "Ethically sourced fabrics",
    },
  ];

  // Animation variants for the staggered container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Delay between each item appearing
      },
    },
  };

  // Animation variants for individual items
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  return (
    <div className="w-full bg-[#FFF5F6] border-t border-b border-[#FFE5E9] py-8 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 justify-items-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Animates when 20% of the bar enters view
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex items-center space-x-4 w-full max-w-xs p-4 rounded-2xl transition-all duration-300 hover:bg-white/50 hover:shadow-sm"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }} // Micro-interaction on hover
          >
            {/* Soft rounded icon container with a subtle hover rotation */}
            <motion.div 
              className="flex items-center justify-center w-14 h-14 bg-[#FFF0F2] rounded-2xl shadow-sm border border-[#FFE0E4]/50 shrink-0"
              whileHover={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.5 }}
            >
              {feature.icon}
            </motion.div>
            
            {/* Text content */}
            <div className="flex flex-col">
              <h3 className="font-serif text-lg font-bold text-[#1A1A1A] tracking-wide leading-snug">
                {feature.title}
              </h3>
              <p className="text-sm text-[#707070] font-sans mt-0.5">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}