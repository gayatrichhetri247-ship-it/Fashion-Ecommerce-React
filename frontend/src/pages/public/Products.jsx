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
      <div className="flex min-h-[500px] flex-col items-center justify-center bg-slate-50/50">
        <div className="relative flex h-16 w-16 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-pink-100 border-t-pink-600"></div>
          <div className="h-8 w-8 animate-pulse rounded-full bg-pink-100"></div>
        </div>
        <span className="mt-4 text-sm font-medium tracking-wide text-slate-500 animate-pulse">
          Loading catalog...
        </span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-16 max-w-md overflow-hidden rounded-2xl border border-red-100 bg-white p-6 text-center shadow-xl shadow-red-500/5 transition-all">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-slate-800">Something went wrong</h3>
        <p className="mt-1 text-sm text-slate-500">{error.message || "Failed to load products."}</p>
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
    <div className="min-h-screen bg-slate-50/50 pb-16 antialiased">
      
      {/* Header Banner Section */}
      <div className="relative overflow-hidden bg-white border-b border-slate-100 px-4 pt-12 pb-10 text-center">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-50/30 via-transparent to-amber-50/20 pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center justify-center p-3 bg-pink-50 rounded-2xl text-pink-600 mb-4 transition-transform duration-300 hover:scale-105">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-2 font-sans">
            Shop Our Collections
          </h1>
          <p className="text-sm text-slate-500 max-w-sm mx-auto font-medium">
            Curated pieces designed to bring love and confidence to your wardrobe.
          </p>
        </div>
      </div>

      {/* Controls Container: Categories, Search & Filter */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 my-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        
        {/* Categories Dynamic Pill Tabs */}
        <div className="flex items-center overflow-x-auto pb-2 md:pb-0 gap-2 no-scrollbar scroll-smooth -mx-4 px-4 md:mx-0 md:px-0">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all duration-200 whitespace-nowrap border transform active:scale-95 shadow-sm ${
                activeCategory === category
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200/80 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Input Controls */}
        <div className="relative w-full md:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.604 10.604z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-xs font-medium text-slate-800 placeholder-slate-400 shadow-sm outline-none transition-all duration-200 focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dynamic Product Count Display */}
        <div className="mb-4 border-b border-slate-100 pb-3 flex justify-between items-center">
          <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Catalog Results
          </p>
          <p className="text-xs font-medium text-slate-500">
            Showing <span className="font-bold text-slate-800">{filteredProducts?.length || 0}</span> products
          </p>
        </div>

        {/* Product Card Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {filteredProducts?.map((product) => (
            <div
              key={product.id || product._id || product.name}
              className="group flex flex-col overflow-hidden bg-white rounded-2xl border border-slate-100 transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-0.5"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-50">
                <img
                  src={product.photo}
                  alt={product.name}
                  onClick={() => navigate(`/product/${product._id}`, { state: product })}
                  className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-102 cursor-pointer"
                />
              </div>

              {/* Card Meta Content Details */}
              <div className="flex flex-1 flex-col p-4">
                <div className="flex-1">
                  {/* Dynamic Category Tag */}
                  <span className="text-[10px] uppercase tracking-widest font-bold text-pink-600 block mb-1">
                    {product.category}
                  </span>
                  
                  {/* Product Title */}
                  <h2 
                    onClick={() => navigate(`/product/${product._id}`, { state: product })}
                    className="text-sm font-semibold text-slate-800 line-clamp-1 hover:text-pink-600 transition-colors cursor-pointer mb-1.5"
                  >
                    {product.name}
                  </h2> 

                  {/* Dynamic Star Rating Block */}
                  <div className="flex items-center gap-1">
                    <div className="flex items-center text-amber-400">
                      <span className="text-xs">★</span>
                    </div>
                    <span className="text-xs font-semibold text-slate-700">
                      {product.ratings !== undefined ? product.ratings.toFixed(1) : "4.0"}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      ({product.reviewsCount ?? 0} reviews)
                    </span>
                  </div>
                </div>

                {/* Price Display and Add-to-Cart Row */}
                <div className="mt-4 pt-3 border-t border-slate-50 flex flex-col gap-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-sm font-bold text-slate-900">
                      Rs. {product.price?.toLocaleString()}
                    </span>
                    {product.oldPrice && (
                      <span className="text-xs font-medium text-slate-400 line-through">
                        Rs. {product.oldPrice?.toLocaleString()}
                      </span>
                    )}
                  </div>
                  
                  <button
                    className="w-full rounded-xl bg-pink-600 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm hover:bg-pink-700 active:scale-[0.98] transition-all duration-200"
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

        {/* Empty State Fallback */}
        {filteredProducts?.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-200 mt-4">
            <p className="text-sm font-medium text-slate-500">No products matched your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;