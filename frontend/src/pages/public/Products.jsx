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
      <div className="flex min-h-[400px] items-center justify-center animate-pulse">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-pink-600 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading catalog...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700 animate-bounce">
        <p className="font-semibold">Something went wrong!</p>
        <p className="text-sm text-red-500">{error.message}</p>
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
    <div className="min-h-screen bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-100 pb-12 animate-fade-in transition-all duration-500">
      
      {/* Header Banner Section */}
      <div className="flex flex-col items-center justify-center pt-8 pb-6 md:pt-12 md:pb-8 text-center px-4">
        <div className="text-pink-600 text-4xl sm:text-5xl mb-3 transform hover:scale-110 transition-transform duration-300">
          {/* Shopping Cart Icon */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="w-12 h-12 sm:w-14 sm:h-14 mx-auto" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold text-neutral-800 tracking-wide mb-1">
          Shop All
        </h1>
        <p className="text-xs sm:text-sm italic text-gray-500 font-light">
          Curated with love, just for you ♡
        </p>
      </div>

      {/* Controls Container: Categories, Search & Filter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* Categories Dynamic Pill Tabs */}
        <div className="flex flex-wrap gap-2 items-center justify-center lg:justify-start">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs font-medium transition-all duration-300 shadow-sm border transform active:scale-95 ${
                activeCategory === category
                  ? "bg-pink-600 text-white border-pink-600 scale-105"
                  : "bg-white text-gray-700 border-gray-100 hover:bg-pink-50 hover:text-pink-600 hover:border-pink-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input Controls */}
        <div className="flex items-center gap-3 w-full lg:w-auto justify-center">
          <div className="relative flex-1 sm:max-w-xs md:max-w-md lg:w-64">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-full border border-gray-200 bg-white py-2 pl-9 pr-4 text-xs text-gray-700 outline-none placeholder-gray-400 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Product Count Display */}
        <div className="mb-6 text-center sm:text-left">
          <p className="text-xs font-serif text-gray-600">
            Showing <span className="font-bold text-pink-600">{filteredProducts?.length || 0}</span> products
          </p>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((product) => (
            <div
              key={product.id || product._id || product.name}
              className="group flex flex-col overflow-hidden bg-white rounded-xl border border-gray-100 transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 transform"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-gray-50">
                <img
                  src={product.photo}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`, { state: product })}
                  className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105 cursor-pointer"
                />

                {/* Wishlist/Remove Icon Button */}
                <button className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-500 shadow-sm hover:text-red-500 active:scale-90 transition-all duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>

              {/* Card Meta Content Details */}
              <div className="flex flex-1 flex-col p-4 pt-3">
                <div className="flex-1">
                  {/* Dynamic Category Tag */}
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-pink-600 block mb-1">
                    {product.category}
                  </span>
                  
                  {/* Product Title */}
                  <h2 
                    onClick={() => navigate(`/product/${product._id}`, { state: product })}
                    className="text-sm font-serif font-bold text-gray-900 line-clamp-1 hover:text-pink-600 transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h2> 

                  {/* Dynamic Star Rating Block */}
                  <div className="mt-1.5 flex items-center gap-1">
                    <span className="text-yellow-400 text-xs">★</span>
                    <span className="text-[11px] font-medium text-gray-700">
                      {product.ratings !== undefined ? product.ratings.toFixed(1) : "4.0"}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      ({product.reviewsCount ?? 0})
                    </span>
                  </div>
                </div>

                {/* Price Display and Add-to-Cart Row */}
                <div className="mt-4 flex flex-col gap-2">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-gray-900">
                      Rs. {product.price?.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs text-gray-400 line-through">
                        Rs. {product.oldPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <button
                    className="w-full rounded-md bg-pink-600 py-2.5 text-xs font-medium text-white shadow-sm hover:bg-pink-700 active:scale-[0.97] transition-all duration-300 mt-1"
                    onClick={() => {
                      dispatch(add(product));
                    }}
                  >
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