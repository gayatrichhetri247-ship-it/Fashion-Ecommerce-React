import React, { useState } from 'react'
import { Link, Outlet } from 'react-router'

const Dashboard = () => {
  // Simple state to control mobile sidebar visibility
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  return (
    <div className="flex min-h-screen font-sans antialiased text-gray-800 relative">
      
      {/* ========================================================================= */}
      {/* MOBILE DRAWER SIDEBAR & BACKDROP OVERLAY                                  */}
      {/* ========================================================================= */}
      {/* Backdrop overlay when mobile menu is active */}
      <div 
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 md:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Drawer (Uses the exact same classes and content as desktop layout) */}
      <aside 
        className={`fixed inset-y-0 left-0 w-64 bg-linear-to-r from-pink-100 via-yellow-50 to-pink-100 border-r border-gray-200 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-xl font-bold text-gray-900 tracking-wide">Admin Panel</h1>
              <p className="text-xs text-gray-500 mt-1">Management Hub</p>
            </div>
            {/* Close icon button */}
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-1 text-gray-500 hover:text-gray-900"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-1">
            <Link 
              to="/admin/product-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Product Management
            </Link>
            <Link 
              to="/admin/user-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              User Management
            </Link>
            <Link 
              to="/admin/order-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              onClick={() => setIsMobileOpen(false)}
            >
              Order Management
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          © 2026 Dashboard Inc.
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* ORIGINAL DESKTOP SIDEBAR NAVIGATION                                       */}
      {/* ========================================================================= */}
      <aside className="w-64 bg-linear-to-r from-pink-100 via-yellow-50 to-pink-100 border-r border-gray-200 flex flex-col justify-between hidden md:flex flex-shrink-0">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold text-gray-900 tracking-wide">Admin Panel</h1>
            <p className="text-xs text-gray-500 mt-1">Management Hub</p>
          </div>
          
          <nav className="space-y-1">
            <Link 
              to="/admin/product-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Product Management
            </Link>
            <Link 
              to="/admin/user-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              User Management
            </Link>
            <Link 
              to="/admin/order-management" 
              className="flex items-center px-4 py-2.5 text-sm font-medium rounded-lg text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors"
            >
              Order Management
            </Link>
          </nav>
        </div>

        <div className="p-4 border-t border-gray-200 text-xs text-gray-400 text-center">
          © 2026 Dashboard Inc.
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header - Added Hamburger Button & Responsive Padding adjustment */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 sm:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger button visible only on small screens */}
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-1.5 rounded-md text-gray-600 hover:bg-gray-100 md:hidden focus:outline-hidden"
              aria-label="Open navigation menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-md sm:text-lg font-semibold text-gray-700">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600 font-medium hidden xs:inline">Welcome, Admin</span>
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
              A
            </div>
          </div>
        </header>

        {/* Page Content Container - Adjusted padding for cleaner mobile display */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto bg-gray-50/30">
          <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}

export default Dashboard