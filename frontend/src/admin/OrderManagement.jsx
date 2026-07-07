import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/order.service";
import { motion } from "framer-motion";

const OrderManagement = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute h-full w-full animate-spin rounded-full border-4 border-pink-500 border-t-transparent"></div>
          <div className="absolute h-8 w-8 animate-ping rounded-full bg-pink-100 opacity-75"></div>
        </div>
        <span className="text-base font-semibold text-pink-600 tracking-wide animate-pulse">
          Loading incoming orders...
        </span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto my-12 max-w-md rounded-2xl border border-rose-200 bg-rose-50 p-6 text-center shadow-sm"
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <p className="font-bold text-rose-800">Failed to load orders</p>
        <p className="text-sm text-rose-600 mt-1">
          Please refresh or check your server connection.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 py-8 bg-gradient-to-br from-pink-50/20 via-transparent to-transparent min-h-screen">
      {/* Header */}
      <div className="mb-8 relative pb-4 border-b border-pink-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-600 to-rose-500 bg-clip-text text-transparent">
          Order Management
        </h1>
        <p className="mt-1.5 text-xs sm:text-sm text-gray-500 font-medium">
          Track customer purchases, fulfillment status, and order timeline details.
        </p>
        <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-pink-500 to-rose-400" />
      </div>

      {/* --- Mobile View (Stacked Order Cards) --- */}
      <div className="space-y-4 md:hidden">
        {data?.orders?.map((order, idx) => {
          const isPaid = order.products[0]?.paymentStatus === "COMPLETE";
          return (
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              key={order._id}
              className="rounded-2xl border border-pink-100 bg-white p-5 shadow-sm hover:shadow-md transition-all flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Decorative top-border line for pink theme */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-pink-400/30 to-rose-400/30" />
              
              {/* Top Row: Customer Info and Status Badge */}
              <div className="flex items-start justify-between gap-2 mt-1">
                <div className="min-w-0">
                  <div className="font-bold text-gray-900 truncate text-base">
                    {order.userId?.fullname || "Guest User"}
                  </div>
                  <div className="text-xs text-gray-500 truncate font-medium mt-0.5">
                    {order.userId?.email || "N/A"}
                  </div>
                </div>

                <span
                  className={`inline-flex items-center shrink-0 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    isPaid
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "bg-pink-50 text-pink-700 border border-pink-200"
                  }`}
                >
                  {order.products[0]?.paymentStatus || "Pending"}
                </span>
              </div>

              {/* Middle Row: Product List & Quantities Map */}
              <div className="pt-3 border-t border-gray-100">
                <div className="text-[10px] font-bold uppercase tracking-widest text-pink-400 mb-2">
                  Ordered Items
                </div>
                <div className="divide-y divide-pink-100 bg-pink-50/10 rounded-xl border border-pink-50/80 p-3 space-y-2 max-h-40 overflow-y-auto backdrop-blur-sm">
                  {order.products.map((item) => (
                    <div 
                      key={item.productId?._id}
                      className="flex justify-between items-center text-xs text-gray-700 pt-2 first:pt-0"
                    >
                      <span className="font-semibold text-gray-800 truncate pr-4">
                        {item.productId?.name || "Deleted Item"}
                      </span>
                      <span className="font-bold bg-pink-50 text-pink-600 rounded px-1.5 py-0.5 text-[11px] tabular-nums shrink-0">
                        x{item.quantity}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* --- Desktop View (Traditional Table) --- */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block overflow-x-auto rounded-2xl border border-pink-100 bg-white shadow-sm"
      >
        <table className="min-w-full divide-y divide-pink-100 text-left text-sm">
          <thead className="bg-pink-50/40 text-xs font-bold uppercase tracking-wider text-pink-700 backdrop-blur-sm">
            <tr>
              <th scope="col" className="px-6 py-4.5">Customer</th>
              <th scope="col" className="px-6 py-4.5">Email</th>
              <th scope="col" className="px-6 py-4.5">Ordered Items</th>
              <th scope="col" className="px-6 py-4.5 text-center">Qty</th>
              <th scope="col" className="px-6 py-4.5">Payment Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {data?.orders?.map((order) => {
              return (
                <tr
                  key={order._id}
                  className="hover:bg-pink-50/10 transition-colors align-top"
                >
                  {/* User Fullname */}
                  <td className="whitespace-nowrap px-6 py-5 font-bold text-gray-900">
                    {order.userId?.fullname || "Guest User"}
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-5 text-gray-600 font-medium">
                    {order.userId?.email || "N/A"}
                  </td>

                  {/* Nested product Items list */}
                  <td className="px-6 py-5 text-gray-700">
                    <div className="space-y-2">
                      {order.products.map((item) => (
                        <div
                          key={item.productId?._id}
                          className="font-semibold text-gray-800 truncate max-w-xs"
                        >
                          {item.productId?.name || "Deleted Item"}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Nested Quantities list */}
                  <td className="px-6 py-5 text-gray-600 text-center">
                    <div className="space-y-2">
                      {order.products.map((item) => (
                        <div key={item.productId?._id} className="tabular-nums font-bold text-pink-600 bg-pink-50/50 rounded inline-block px-2 py-0.5 text-xs">
                          {item.quantity}
                        </div>
                      ))}
                    </div>
                  </td>

                  {/* Status Badges */}
                  <td className="whitespace-nowrap px-6 py-5">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                        order.products[0]?.paymentStatus === "COMPLETE"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-pink-50 text-pink-700 border border-pink-200"
                      }`}
                    >
                      {order.products[0]?.paymentStatus || "Pending"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default OrderManagement;