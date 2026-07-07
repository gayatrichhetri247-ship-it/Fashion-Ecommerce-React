import React, { useState } from 'react'
import { Link, Outlet, useLocation } from 'react-router' // Imported useLocation for active styling

const Dashboard = () => {
  // Simple state to control mobile sidebar visibility
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const location = useLocation()

  // Helper to determine if a route is active
  const isActive = (path) => location.pathname === path

  // Shared Navigation Links component to keep code DRY and maintainable
  const NavLinks = ({ closeMobile }) => {
    const links = [
      { to: '/admin/product-management', label: 'Product Management', icon: '🛍️' },
      { to: '/admin/user-management', label: 'User Management', icon: '👥' },
      { to: '/admin/order-management', label: 'Order Management', icon: '📦' },
    ]

    return (
      <nav className="space-y-1.5">
        {links.map((link) => {
          const active = isActive(link.to)
          return (
            <Link
              key={link.to}
              to={link.to}
              onClick={closeMobile}
              className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group ${
                active
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-200 font-semibold scale-[1.02]'
                  : 'text-gray-600 hover:bg-pink-50 hover:text-pink-700'
              }`}
            >
              <span className={`text-base transition-transform group-hover:scale-110 ${active ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          )
        })}
      </nav>
    )
  }

  return (
    <div className="flex min-h-screen font-sans antialiased text-gray-800 bg-linear-to-br from-pink-50/50 via-gray-50 to-pink-100/30 relative selection:bg-pink-200 selection:text-pink-900">
      
      {/* ========================================================================= */}
      {/* MOBILE DRAWER SIDEBAR & BACKDROP OVERLAY                                  */}
      {/* ========================================================================= */}
      {/* Backdrop overlay */}
      <div 
        className={`fixed inset-0 bg-gray-900/40 backdrop-blur-xs z-40 transition-opacity duration-300 md:hidden ${
          isMobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileOpen(false)}
      />

      {/* Mobile Drawer */}
      <aside 
        className={`fixed inset-y-0 left-0 w-68 bg-white border-r border-pink-100/80 flex flex-col justify-between z-50 transform transition-transform duration-300 ease-in-out md:hidden shadow-2xl ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm font-bold text-lg">
                A
              </div>
              <div>
                <h1 className="text-lg font-bold bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent tracking-wide">Admin Panel</h1>
                <p className="text-xs text-gray-400 font-medium">Management Hub</p>
              </div>
            </div>
            
            <button 
              onClick={() => setIsMobileOpen(false)}
              className="p-2 text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <NavLinks closeMobile={() => setIsMobileOpen(false)} />
        </div>

        <div className="p-4 border-t border-pink-50 text-xs font-medium text-gray-400 text-center tracking-wider">
          © 2026 DASHBOARD INC.
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* ORIGINAL DESKTOP SIDEBAR NAVIGATION                                       */}
      {/* ========================================================================= */}
      <aside className="w-68 bg-white border-r border-pink-100/70 flex flex-col justify-between hidden md:flex flex-shrink-0 sticky top-0 h-screen">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10 px-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-200 font-bold text-lg">
              A
            </div>
            <div>
              <h1 className="text-lg font-bold bg-linear-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent tracking-wide">Admin Panel</h1>
              <p className="text-xs text-gray-400 font-medium">Management Hub</p>
            </div>
          </div>
          
          <NavLinks closeMobile={() => {}} />
        </div>

        <div className="p-5 border-t border-pink-50 text-xs font-medium text-gray-400 text-center tracking-wider">
          © 2026 DASHBOARD INC.
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA                                                         */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-pink-100/50 flex items-center justify-between px-4 sm:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileOpen(true)}
              className="p-2 rounded-xl text-gray-500 hover:bg-pink-50 hover:text-pink-600 md:hidden focus:outline-hidden transition-colors"
              aria-label="Open navigation menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h2 className="text-sm sm:text-base font-bold text-gray-700 uppercase tracking-wider">Dashboard</h2>
          </div>
          
          <div className="flex items-center gap-3.5">
            <span className="text-sm text-gray-600 font-semibold hidden sm:inline">Welcome, Admin</span>
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-pink-500 to-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-md shadow-pink-100 hover:scale-105 transition-transform cursor-pointer border-2 border-white ring-2 ring-pink-100">
              A
            </div>
          </div>
        </header>

        {/* Page Content Container */}
        <main className="p-4 sm:p-8 flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto bg-white/70 backdrop-blur-md rounded-2xl shadow-xs border border-pink-100/60 p-5 sm:p-8 min-h-[calc(100vh-8rem)]">
            <Outlet />
          </div>
        </main>
      </div>

    </div>
  )
}

export default Dashboard