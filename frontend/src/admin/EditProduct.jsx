import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router";
import { editproduct } from "../api/products.service";
import { motion, AnimatePresence } from "framer-motion";

const EditProduct = () => {
  const location = useLocation();
  const product = location?.state;
  
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    description: product?.description || "",
    photo: product?.photo || null,
  });
  
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [previewUrl, setPreviewUrl] = useState(product?.photo || "");

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

  const editMutation = useMutation({
    mutationFn: ({ id, data }) => {
      return editproduct(id, data);
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
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("photo", formData.photo);

    editMutation.mutate({ id: product?._id, data: data });
  };

  const handleClear = () => {
    setFormData({ name: "", price: "", description: "", photo: null });
    setPreviewUrl("");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 py-8"
    >
      {/* Header Section */}
      <div className="mb-8 border-b border-pink-100 pb-5 relative">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          Edit Product Item
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Modify the details below and update the photo to refresh this item in the database.
        </p>
        <div className="absolute bottom-0 left-0 h-[2px] w-20 bg-gradient-to-r from-pink-500 to-rose-400" />
      </div>

      {/* Form Section */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          
          {/* Product Name */}
          <div className="sm:col-span-2">
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
              placeholder="e.g., Strawberry Glazed Donut"
              className="mt-1.5 block w-full rounded-xl border border-pink-200 px-4 py-3 text-gray-900 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200 sm:text-sm bg-pink-50/10 hover:bg-pink-50/30"
            />
          </div>

          {/* Price */}
          <div className="sm:col-span-2">
            <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
              Price (RS)
            </label>
            <div className="relative mt-1.5 rounded-xl shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <span className="text-sm font-medium text-pink-500">RS</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                min="0"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="block w-full rounded-xl border border-pink-200 py-3 pl-12 pr-4 text-gray-900 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200 sm:text-sm bg-pink-50/10 hover:bg-pink-50/30"
              />
            </div>
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Detail the delicious details, ingredients, allergens..."
              className="mt-1.5 block w-full rounded-xl border border-pink-200 px-4 py-3 text-gray-900 shadow-sm focus:border-pink-500 focus:ring-2 focus:ring-pink-200 focus:outline-none transition-all duration-200 sm:text-sm bg-pink-50/10 hover:bg-pink-50/30"
            />
          </div>

          {/* Drag & Drop File Upload Input */}
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Product Photo
            </label>
            <div className="group relative mt-1 flex justify-center rounded-xl border-2 border-dashed border-pink-200 px-6 py-8 hover:border-pink-400 transition-all duration-300 bg-pink-50/5 hover:bg-pink-50/20 cursor-pointer">
              <div className="space-y-2 text-center">
                {/* SVG Icon */}
                <svg className="mx-auto h-12 w-12 text-pink-400 group-hover:scale-110 transition-transform duration-300" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4-4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="flex text-sm text-gray-600 justify-center">
                  <label htmlFor="file-upload" className="relative cursor-pointer rounded-md font-bold text-pink-600 focus-within:outline-none hover:text-pink-500 transition-colors">
                    <span>Upload a file</span>
                    <input 
                      id="file-upload" 
                      name="photo" 
                      type="file" 
                      accept="image/*" 
                      className="sr-only" 
                      onChange={handleFileChange} 
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        </div>

        {/* Local Live Image Preview with Smooth Transition */}
        <AnimatePresence>
          {previewUrl && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="rounded-xl border border-pink-100 bg-pink-50/30 p-4 flex flex-col items-center sm:items-start"
            >
              <span className="block text-xs font-bold uppercase tracking-wider text-pink-500 mb-2.5">
                Selected File Preview
              </span>
              <div className="relative aspect-video w-full max-w-sm overflow-hidden rounded-xl border border-pink-100 bg-white shadow-md group">
                <img
                  src={previewUrl}
                  alt="Upload preview"
                  className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="mt-2 text-xs font-medium text-gray-500 truncate max-w-sm">
                {formData.photo?.name || "Current Product Image"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 border-t border-pink-100 pt-6">
          <button
            type="button"
            className="rounded-xl border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-95"
            onClick={handleClear}
          >
            Clear Form
          </button>
          
          <button
            type="submit"
            disabled={editMutation.isPending}
            className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-600 to-rose-500 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:from-pink-500 hover:to-rose-400 transition-all transform active:scale-95 disabled:opacity-50"
          >
            {editMutation.isPending ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Saving...
              </span>
            ) : (
              "Save Item"
            )}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default EditProduct;