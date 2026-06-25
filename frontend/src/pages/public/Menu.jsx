import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { getfoods } from '../../api/food.service';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../../redux/features/cartSlice';

const Menu = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state)=>state.cart.cartItems);
  console.log(cart);
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["foods"],
    queryFn: getfoods,
  });

  const navigate = useNavigate();

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent"></div>
        <span className="ml-3 text-lg font-medium text-gray-600">Loading delicious food...</span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-lg border border-red-200 bg-red-50 p-4 text-center text-red-700">
        <p className="font-semibold">Something went wrong!</p>
        <p className="text-sm text-red-500">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 border-b border-gray-200 pb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our Menu</h1>
        <p className="mt-2 text-sm text-gray-500">Discover our fresh and flavorful dishes.</p>
      </div>

      {/* Food Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data?.foods?.map((food) => (
          <div 
            key={food.id || food.name} // Added a unique key for React rendering
            className="group flex flex-col overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Image Wrapper */}
            <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
              <img 
                src={food.photo} 
                alt={food.name} 
                onClick={() => navigate(`/menu/${food._id}`,{state:food})}
                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
              />
            </div>

            {/* Content Container */}
            <div className="flex flex-1 flex-col p-5">
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                  {food.name}
                </h2>
                <p className="mt-2 text-sm line-clamp-2 text-gray-500">
                  {food.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="mt-4 flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-xl font-extrabold text-orange-600">
                  RS. {food.price}
                </span>
                <button 
                  className="rounded-xl bg-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
                  onClick ={()=>{
                    dispatch(add(food));
                  }}
                 
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;