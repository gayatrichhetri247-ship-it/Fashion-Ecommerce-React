import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { addproduct } from "../api/products.service";
import { motion, AnimatePresence } from "framer-motion";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    oldPrice: "", 
    ratings: "",
    reviewsCount: "",
    description: "",
    photo: null, 
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(""); 

  const categories = ["Dresses", "Tops", "Pants", "Skirts", "Accessories"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        photo: file,
      }));
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const addMutation = useMutation({
    mutationFn: (data) => {
      return addproduct(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin/product-management");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("price", formData.price);
    data.append("oldPrice", formData.oldPrice); 
    data.append("ratings", formData.ratings); 
    data.append("reviewsCount", formData.reviewsCount); 
    data.append("description", formData.description);
    data.append("photo", formData.photo); 

    addMutation.mutate(data);
  };

  const handleClear = () => {
    setFormData({ 
      name: "", 
      category: "", 
      price: "", 
      oldPrice: "", 
      ratings: "",
      reviewsCount: "",
      description: "", 
      photo: null 
    }); 
    setPreviewUrl("");
  };

  // Animation variants for staggered inputs
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 py-8 my-6 bg-white rounded-2xl shadow-xl shadow-pink-100/50 border border-pink-50"
    >
      {/* Header Section */}
      <div className="mb-8 border-b border-pink-100 pb-5">
        <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          Add New Product Item
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Fill out the details and upload a photo to add this item to the database.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2"
        >
          {/* Product Name */}
          <motion.div variants={itemVariants} className="sm:col-span-2">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
              Product Item Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Summer Floral Dress"
              className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 placeholder:text-gray-400 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm"
            />
          </motion.div>

          {/* Category Dropdown */}
          <motion.div variants={itemVariants} className="sm:col-span-2">
            <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
              Category
            </label>
            <select
              name="category"
              id="category"
              required
              value={formData.category}
              onChange={handleChange}
              className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm bg-white cursor-pointer"
            >
              <option value="" disabled hidden>Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Current Price */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
              Current Price (RS)
            </label>
            <div className="relative mt-1.5 rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-sm font-medium text-pink-500">RS</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                required
                min="0"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-gray-900 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm"
              />
            </div>
          </motion.div>

          {/* Old Price */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="oldPrice" className="block text-sm font-semibold text-gray-700">
              Old Price (RS) <span className="text-xs font-normal text-gray-400">(Optional)</span>
            </label>
            <div className="relative mt-1.5 rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-sm font-medium text-gray-400">RS</span>
              </div>
              <input
                type="number"
                name="oldPrice"
                id="oldPrice"
                min="0"
                step="0.01"
                value={formData.oldPrice}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full rounded-xl border border-gray-200 py-3 pl-11 pr-4 text-gray-900 transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm"
              />
            </div>
          </motion.div>

          {/* Ratings */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="ratings" className="block text-sm font-semibold text-gray-700">
              Ratings
            </label>
            <input
              type="number"
              name="ratings"
              id="ratings"
              min="0"
              max="5"
              step="0.1"
              value={formData.ratings}
              onChange={handleChange}
              placeholder="e.g., 4.5"
              className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm"
            />
          </motion.div>

          {/* Reviews Count */}
          <motion.div variants={itemVariants} className="col-span-1">
            <label htmlFor="reviewsCount" className="block text-sm font-semibold text-gray-700">
              Reviews Count
            </label>
            <input
              type="number"
              name="reviewsCount"
              id="reviewsCount"
              min="0"
              value={formData.reviewsCount}
              onChange={handleChange}
              placeholder="e.g., 45"
              className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm"
            />
          </motion.div>

          {/* Description */}
          <motion.div variants={itemVariants} className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              required
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail the item specifications, fabric, sizing..."
              className="mt-1.5 block w-full rounded-xl border border-gray-200 px-4 py-3 text-gray-900 shadow-sm transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none sm:text-sm resize-none"
            />
          </motion.div>

          {/* File Upload Input */}
          <motion.div variants={itemVariants} className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Product Photo
            </label>
            <motion.div 
              whileHover={{ scale: 1.01, borderColor: "rgb(236, 72, 153)" }}
              whileTap={{ scale: 0.99 }}
              className="mt-1 flex justify-center rounded-xl border-2 border-dashed border-pink-200 px-6 py-8 transition-colors bg-pink-50/20 cursor-pointer"
            >
              <div className="space-y-2 text-center">
                <svg className="mx-auto h-12 w-12 text-pink-400 dynamic-pulse" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-transparent font-bold text-pink-600 focus-within:outline-none hover:text-pink-500">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="photo" 
                      type="file" 
                      accept="image/*" 
                      required
                      className="sr-only" 
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="pl-1 text-gray-500">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Live Image Preview with Smooth Presence Animation */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="rounded-xl border border-pink-100 bg-pink-50/30 p-4 mt-2">
                <span className="block text-xs font-bold uppercase tracking-wider text-pink-500 mb-2">
                  Selected File Preview
                </span>
                <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-lg border border-pink-100 bg-white shadow-inner">
                  <img
                    src={previewUrl}
                    alt="Upload preview"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="mt-2 text-xs text-gray-500 truncate font-medium">{formData.photo?.name}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 border-t border-pink-100 pt-6 mt-8">
          <motion.button
            whileHover={{ scale: 1.02, backgroundColor: "rgb(255, 241, 242)" }}
            whileTap={{ scale: 0.98 }}
            type="button"
            className="rounded-xl border border-pink-200 bg-white px-5 py-2.5 text-sm font-semibold text-pink-700 shadow-sm transition-all"
            onClick={handleClear}
          >
            Clear Form
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(219, 39, 119, 0.2)" }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={addMutation.isPending}
            className="rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition-all flex items-center justify-center disabled:opacity-70"
          >
            {addMutation.isPending ? "Saving..." : "Save Item"}
          </motion.button>
        </div>
      </form>
    </motion.div>
  );
};

export default AddProduct;