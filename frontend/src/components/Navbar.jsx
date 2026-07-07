import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { getUser, logoutUser } from "../api/auth.service";
import { useDispatch, useSelector } from "react-redux";
import { AuthSuccess, LogoutSuccess } from "../redux/features/authSlice";
import shoplogo from "../assets/home-page/shoplogo.png";

const Navbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false); // Mobile menu toggle state

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const totalItemsCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Unified base link/button styles matching your active & hover rules
  const getLinkClass = (isActive) =>
    `px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform active:scale-95 cursor-pointer block text-center ${
      isActive
        ? "bg-pink-600 text-white shadow-md scale-105"
        : "text-black hover:bg-pink-200 hover:text-black hover:scale-105"
    }`;

  const linkStyles = ({ isActive }) => getLinkClass(isActive);

  const handleLogout = async () => {
    await logoutUser();
    dispatch(LogoutSuccess());
    isOpen(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUser();
        dispatch(AuthSuccess(res.user));
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [dispatch]);

  return (
    <nav className="border-b border-pink-100 bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-50 px-4 sm:px-6 shadow-md relative z-50 transition-all duration-300">
      <div className="flex h-16 items-center justify-between max-w-7xl mx-auto">
        
        {/* Logo with gentle hover effect */}
        <div className="w-40 sm:w-48 flex items-center transition-transform duration-300 hover:scale-102">
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            <img src={shoplogo} alt="Shop Logo" className="max-h-20 object-contain" />
          </NavLink>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-3">
          <NavLink to="/" className={linkStyles}>Home</NavLink>
          <NavLink to="/about" className={linkStyles}>About</NavLink>
          <NavLink to="/products" className={linkStyles}>Products</NavLink>
          <NavLink to="/contact" className={linkStyles}>Contact</NavLink>
        </div>

        {/* Desktop Action Buttons (Auth / Cart) */}
        <div className="hidden md:flex items-center gap-3">
          {user && isAuthenticated ? (
            <>
              {/* Cart Button with Icon and Counter */}
              <NavLink to="/cart" className={linkStyles} style={{ position: 'relative' }}>
                <span className="relative inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-3 -right-4 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-rose-600 px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white animate-bounce">
                      {totalItemsCount}
                    </span>
                  )}
                </span>
              </NavLink>
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 cursor-pointer bg-red-600 text-white hover:bg-red-700 hover:scale-105 active:scale-95 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-2">
              <NavLink to="/login" className={linkStyles}>Login</NavLink>
              <NavLink to="/sign-up" className={linkStyles}>Signup</NavLink>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button with Animated Icon */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-black hover:text-pink-600 p-2 rounded-md transition-colors focus:outline-none"
            aria-label="Toggle Menu"
          >
            <svg className="h-6 w-6 transform transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" className="origin-center rotate-180 transition-all duration-300" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu Drawer (Slide down + Fade in) */}
      <div
        className={`md:hidden border-t border-pink-100 space-y-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[400px] opacity-100 pb-4 pt-2" : "max-h-0 opacity-0 pointer-events-none"
        }`}
      >
        <NavLink to="/" className={linkStyles} onClick={() => setIsOpen(false)}>Home</NavLink>
        <NavLink to="/about" className={linkStyles} onClick={() => setIsOpen(false)}>About</NavLink>
        <NavLink to="/products" className={linkStyles} onClick={() => setIsOpen(false)}>Products</NavLink>
        <NavLink to="/contact" className={linkStyles} onClick={() => setIsOpen(false)}>Contact</NavLink>
        
        <div className="pt-2 border-t border-pink-200/50 space-y-2">
          {user && isAuthenticated ? (
            <>
              {/* Mobile Cart Button with Icon and Counter */}
              <NavLink to="/cart" className={linkStyles} onClick={() => setIsOpen(false)} style={{ position: 'relative' }}>
                <span className="relative inline-flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                  </svg>
                  {totalItemsCount > 0 && (
                    <span className="absolute -top-3 -right-4 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-rose-600 px-1 text-[9px] font-bold text-white animate-pulse">
                      {totalItemsCount}
                    </span>
                  )}
                </span>
              </NavLink>
              <button
                onClick={handleLogout}
                className="w-full px-4 py-2 rounded-md text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition-colors shadow-sm transform active:scale-95 duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="space-y-2">
              <NavLink to="/login" className={linkStyles} onClick={() => setIsOpen(false)}>Login</NavLink>
              <NavLink to="/sign-up" className={linkStyles} onClick={() => setIsOpen(false)}>Signup</NavLink>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;