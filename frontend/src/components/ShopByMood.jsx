import React from "react";
import { motion } from "framer-motion";
import moodData from "../Data/mooddata.json"; 
import MoodCard from "./ShopByMoodcard";

export default function ShopByMood() {
  // Staggered entry definitions for the map stream
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    show: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 15 } 
    },
  };

  return (
    <section className="w-full overflow-hidden bg-linear-to-r from-pink-100 via-yellow-50 to-pink-50 px-4 py-16 sm:py-20 md:py-24 flex flex-col items-center gap-10 sm:gap-14">
      
      {/* Header Block Section */}
      <motion.div 
        initial={{ opacity: 0, y: -15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center flex flex-col gap-2.5 z-10"
      >
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Shop by Mood
        </h2>
        <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium flex items-center justify-center gap-1.5">
          Find your flavor of pretty{" "}
          <motion.span 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className="text-xs text-pink-400"
          >
            ✿
          </motion.span>
        </p>
      </motion.div>

      {/* Responsive Grid Layout */}
      <motion.div 
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full max-w-[90rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6 px-2 sm:px-4 md:px-8"
      >
        {moodData.map((mood, index) => {
          // If there are exactly 5 items, the 4th and 5th items can expand on medium 3-column tablet viewports
          // so that they cleanly fill out the bottom row rather than leaving an awkward blank grid spot.
          const isTabletOddItem = index >= 3;

          return (
            <motion.div
              key={mood.id}
              variants={cardItemVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`w-full transition-shadow duration-300 rounded-2xl hover:shadow-xl ${
                isTabletOddItem ? "md:col-span-1 md:max-w-full sm:col-span-1" : ""
              }`}
            >
              <MoodCard 
                title={mood.title}
                image={mood.image}
                link={mood.link}
              />
            </motion.div>
          );
        })}
      </motion.div>

    </section>
  );
}