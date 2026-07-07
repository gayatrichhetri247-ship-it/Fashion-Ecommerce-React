import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/features/cartSlice';
import { getproducts } from '../../api/products.service';

const Products = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cartItems);
  console.log(cart);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: getproducts,
  });

  const navigate = useNavigate();

  // State for search and category filters
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Dresses", "Tops", "Pants", "Skirts", "Accessories"];

  // Loading State with Spinner Animation
  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-50 to-pink-100">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-white border-t-pink-600 shadow-sm"></div>
          <div className="h-6 w-6 animate-pulse rounded-full bg-pink-200"></div>
        </div>
        <span className="ml-3 mt-4 text-sm font-semibold tracking-wide text-pink-700 animate-pulse">Loading sweet catalog...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-12 max-w-md rounded-2xl border border-red-200 bg-white/90 backdrop-blur-sm p-6 text-center shadow-xl shadow-pink-500/10">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="font-bold text-gray-800">Something went wrong!</p>
        <p className="text-sm text-red-500 mt-1">{error.message}</p>
      </div>
    );
  }

  // Filter products based on search and selected category
  const filteredProducts = data?.products?.filter((product) => {
    const dbCategory = product.category ? product.category.trim().toLowerCase() : "";
    const selectedCategory = activeCategory.trim().toLowerCase();
    const matchesCategory = activeCategory === "All" || dbCategory === selectedCategory;
    const matchesSearch = product.name 
      ? product.name.toLowerCase().includes(searchQuery.toLowerCase()) 
      : true;

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-100 pb-16 antialiased selection:bg-pink-200">
      
      {/* Header Banner Section */}
      <div className="flex flex-col items-center justify-center pt-12 pb-8 text-center px-4">
        <div className="text-pink-600 bg-white/60 p-4 rounded-2xl shadow-sm border border-pink-200/40 backdrop-blur-xs mb-4 transform hover:scale-105 hover:rotate-3 transition-all duration-300">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10 mx-auto">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
          </svg>
        </div>
        <h1 className="text-4xl sm:text-5xl font-serif font-black text-gray-900 tracking-tight mb-2">
          Shop All
        </h1>
        <div className="flex items-center gap-1.5 bg-pink-600/10 px-3 py-1 rounded-full border border-pink-600/20">
          <span className="text-xs font-semibold text-pink-700 tracking-wider uppercase">
            Curated with love, just for you ♡
          </span>
        </div>
      </div>

      {/* Controls Container: Categories, Search & Filter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Categories Dynamic Pill Tabs */}
        <div className="flex flex-wrap gap-2.5 items-center justify-center lg:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all duration-300 border transform active:scale-95 ${
                activeCategory === category
                  ? "bg-pink-600 text-white border-pink-600 shadow-md shadow-pink-600/30 -translate-y-0.5"
                  : "bg-white/80 backdrop-blur-xs text-gray-700 border-pink-200/40 hover:bg-pink-600 hover:text-white hover:border-pink-600 hover:shadow-md hover:shadow-pink-600/20"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
          <div className="relative flex-1 sm:max-w-xs md:max-w-md lg:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-pink-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search premium pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-pink-200/60 bg-white/90 backdrop-blur-xs py-2.5 pl-10 pr-4 text-xs font-semibold text-gray-800 outline-none placeholder-gray-400 shadow-inner focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Product Count Display */}
        <div className="mb-6 flex justify-between items-center bg-white/40 backdrop-blur-xs border border-pink-200/30 rounded-xl px-4 py-2">
          <p className="text-xs font-bold tracking-wider uppercase text-pink-700">
            Collections Boutique
          </p>
          <p className="text-xs font-medium text-gray-600">
            Unveiling <span className="font-bold text-pink-600 bg-pink-100 px-2 py-0.5 rounded-md">{filteredProducts?.length || 0}</span> gorgeous items
          </p>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((product) => (
            <div
              key={product.id || product._id || product.name}
              className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-pink-100/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-pink-500/10 hover:border-pink-300/60 hover:-translate-y-1.5 transform"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50/50">
                <img
                  src={product.photo}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`, { state: product })}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                />

                {/* Micro-Interaction: Modern Image Gradient Edge Mask */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Dynamic Trend Tag overlaying Image */}
                {product.oldPrice && (
                  <div className="absolute top-3 left-3 bg-pink-600 text-[10px] tracking-widest uppercase font-black text-white px-2.5 py-1 rounded-lg shadow-md animate-pulse">
                    Sale
                  </div>
                )}
              </div>

              {/* Card Meta Content Details */}
              <div className="flex flex-1 flex-col p-5 bg-gradient-to-b from-white to-pink-50/10">
                <div className="flex-1">
                  
                  {/* Dynamic Category Tag with Ribbon Design */}
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] uppercase tracking-widest font-black text-pink-600 bg-pink-50 px-2 py-0.5 rounded-md">
                      {product.category || "Premium"}
                    </span>
                    <span className="inline-flex items-center text-[10px] font-bold text-emerald-600">
                      ● Instock
                    </span>
                  </div>
                  
                  {/* Product Title */}
                  <h2 
                    onClick={() => navigate(`/product/${product._id}`, { state: product })}
                    className="text-base font-serif font-bold text-gray-900 line-clamp-1 hover:text-pink-600 transition-colors cursor-pointer tracking-tight"
                  >
                    {product.name}
                  </h2> 

                  {/* Dynamic Star Rating Block */}
                  <div className="mt-1 flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-md py-0.5 px-1.5 w-fit">
                    <span className="text-amber-500 text-xs font-semibold">★</span>
                    <span className="text-[11px] font-bold text-amber-800">
                      {product.ratings !== undefined ? product.ratings.toFixed(1) : "4.0"}
                    </span>
                    <span className="text-[10px] text-amber-600/70 font-medium">
                      ({product.reviewsCount ?? 0})
                    </span>
                  </div>
                </div>

                {/* Price Display and Add-to-Cart Row */}
                <div className="mt-4 flex flex-col gap-2.5">
                  <div className="flex items-baseline gap-2 bg-gray-50/50 p-2 rounded-xl border border-gray-100">
                    <span className="text-base font-black text-gray-900">
                      Rs. {product.price?.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-pink-400 font-bold line-through">
                        Rs. {product.oldPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <button
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-pink-600 py-3 text-xs font-bold tracking-wider uppercase text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 active:scale-[0.96] transition-all duration-300"
                    onClick={() => {
                      dispatch(add(product));
                    }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;