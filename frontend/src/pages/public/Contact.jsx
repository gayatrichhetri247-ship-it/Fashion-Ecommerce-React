import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Contact = () => {
  const [isSent, setIsSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulate API form submission logic here
    setIsSent(true);

    // Automatically hide the success message after 4 seconds
    setTimeout(() => {
      setIsSent(false);
    }, 4000);

    // Clear state fields safely
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  // Animation Variants for staggering the list items
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="min-h-screen w-full p-4 sm:p-8 md:p-12 bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-50 flex flex-col items-center gap-6 relative overflow-hidden">
      
      {/* Top Header Banner */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col gap-1.5 text-center mt-4 z-10"
      >
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="text-4xl select-none"
        >
          💌
        </motion.div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-amber-950 tracking-tight">Say hello</h1>
        <p className="text-xs sm:text-sm text-gray-700 max-w-xs sm:max-w-md">
          We would love to hear from you, darling ♡
        </p>
      </motion.div>

      {/* Main Split Layout Container */}
      <div className="flex flex-col lg:flex-row justify-between w-full max-w-6xl py-6 md:p-12 gap-10 lg:gap-8 items-start z-10">
        
        {/* Left Side: Brand Info / Touch Points */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 w-full lg:w-5/12"
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <h2 className="text-xl font-extrabold text-gray-800">Get in touch</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              Questions about an order, sizing, or just want to chat about
              pretty things? Our sweet support team is here for you.
            </p>
          </motion.div>

          {/* Contact Methods Container */}
          <div className="flex flex-col gap-4">
            {/* Email Field */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-pink-200/30 backdrop-blur-xs shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="text-2xl sm:text-3xl select-none bg-pink-100 p-2.5 rounded-xl">✉️</div>
              <div className="text-sm">
                <p className="text-pink-600 font-bold">Email</p>
                <p className="text-gray-700 text-xs sm:text-sm font-medium break-all">girlishfashion@gmail.com</p>
              </div>
            </motion.div>

            {/* Phone Field */}
            <motion.div 
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 5 }}
              className="flex gap-4 items-center bg-white/40 p-4 rounded-2xl border border-pink-200/30 backdrop-blur-xs shadow-xs transition-shadow hover:shadow-md"
            >
              <div className="text-2xl sm:text-3xl select-none bg-pink-100 p-2.5 rounded-xl">📞</div>
              <div className="text-sm">
                <p className="text-pink-600 font-bold">Phone</p>
                <p className="text-gray-700 text-xs sm:text-sm font-medium">+977 9867524170</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Right Side: Message Contact Form Wrapper */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: "spring", damping: 20, delay: 0.2 }}
          className="w-full lg:w-7/12 bg-white px-5 py-6 sm:p-10 rounded-2xl shadow-2xl shadow-pink-200/30 border border-pink-100/30"
        >
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h3 className="text-lg sm:text-xl font-bold text-gray-800">Send a message</h3>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 pl-1">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Daisy Darling"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 pl-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="daisy@gmail.com"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 pl-1">Subject</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="I have a question about..."
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-800 placeholder-gray-400"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-bold text-gray-700 pl-1">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us everything..."
                rows="4"
                className="w-full px-4 py-2.5 border border-gray-200 rounded-2xl bg-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition-all text-gray-800 placeholder-gray-400 resize-none"
                required
              ></textarea>
            </div>

            <motion.button 
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit" 
              className="bg-pink-600 hover:bg-pink-700 w-full h-12 rounded-2xl text-white font-bold transition-colors shadow-md shadow-pink-100 text-sm sm:text-base cursor-pointer mt-2"
            >
              Send Message ♡
            </motion.button>
          </form>
        </motion.div>

      </div>

      {/* Bottom Success Message Toast (AnimatePresence handles the unmounting smooth slide) */}
      <AnimatePresence>
        {isSent && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-sm sm:text-base z-50 whitespace-nowrap"
          >
            <span>✨</span>
            <span>Your message has been sent successfully!</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Contact;