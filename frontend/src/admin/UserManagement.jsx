import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api/auth.service";

const UserManagement = () => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  // Loading State
  if (isPending) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
        <div className="relative flex h-14 w-14 items-center justify-center">
          <div className="absolute h-full w-full animate-ping rounded-full bg-pink-400 opacity-20"></div>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-pink-500 border-t-transparent shadow-md"></div>
        </div>
        <span className="text-sm font-semibold tracking-wide text-pink-600 animate-pulse">
          Loading registered users...
        </span>
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="mx-auto my-8 max-w-md rounded-2xl border border-rose-200 bg-gradient-to-b from-rose-50 to-white p-6 text-center shadow-sm">
        <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="font-bold text-gray-900">Something went wrong</p>
        <p className="text-sm text-rose-600/90 mt-1">Could not fetch the system user registry database.</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 sm:px-6 py-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8 relative pb-4 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-12 after:bg-pink-500 after:rounded-full">
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-gray-900 bg-gradient-to-r from-gray-900 to-pink-700 bg-clip-text text-transparent">
          User Management
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-gray-500 font-medium">
          Review system accounts, manage authorization levels, and view registration dates.
        </p>
      </div>

      {/* --- Mobile View (Stacked Cards) --- */}
      <div className="space-y-4 md:hidden">
        {data?.users?.map((user) => {
          const isAdmin = user.role?.toLowerCase() === "admin";
          return (
            <div 
              key={user._id} 
              className="rounded-2xl border border-pink-100 bg-white p-5 shadow-[0_4px_20px_-4px_rgba(244,63,94,0.06)] flex flex-col gap-4 relative overflow-hidden"
            >
              {/* Decorative side accent for Admin */}
              {isAdmin && <div className="absolute top-0 bottom-0 left-0 w-1 bg-pink-500" />}
              
              {/* Top Row: Avatar, Name, and Role Badge */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm transition-transform ${
                    isAdmin 
                      ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-200' 
                      : 'bg-pink-50 text-pink-700 border border-pink-100'
                  }`}>
                    {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="font-bold text-gray-800 tracking-tight">{user.fullname}</div>
                </div>
                
                <span
                  className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border transition-colors ${
                    isAdmin
                      ? "bg-pink-50 text-pink-700 border-pink-200"
                      : "bg-gray-50 text-gray-500 border-gray-200"
                  }`}
                >
                  {user.role || "user"}
                </span>
              </div>

              {/* Bottom Row: Detail Row for Email */}
              <div className="pt-3 border-t border-gray-50 flex flex-col gap-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-pink-400">Email Address</span>
                <span className="text-sm font-medium text-gray-600 break-all">{user.email}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* --- Desktop View (Traditional Table) --- */}
      <div className="hidden md:block overflow-hidden rounded-2xl border border-pink-100/80 bg-white shadow-[0_8px_30px_rgb(244,63,94,0.04)]">
        <table className="min-w-full divide-y divide-pink-100 text-left text-sm">
          <thead className="bg-pink-50/50 text-[11px] font-bold uppercase tracking-widest text-pink-500">
            <tr>
              <th scope="col" className="px-6 py-4.5 font-bold">Name</th>
              <th scope="col" className="px-6 py-4.5 font-bold">Email Address</th>
              <th scope="col" className="px-6 py-4.5 font-bold">Account Role</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-pink-50/60 bg-white">
            {data?.users?.map((user) => {
              const isAdmin = user.role?.toLowerCase() === "admin";

              return (
                <tr key={user._id} className="hover:bg-pink-50/20 transition-colors group">
                  {/* Fullname + Initial Avatar */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-3.5">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shadow-sm transition-transform group-hover:scale-105 ${
                        isAdmin 
                          ? 'bg-gradient-to-br from-pink-500 to-rose-600 text-white shadow-pink-200' 
                          : 'bg-pink-50 text-pink-700 border border-pink-100'
                      }`}>
                        {user.fullname ? user.fullname.charAt(0).toUpperCase() : 'U'}
                      </div>
                      <div className="font-bold text-gray-800 group-hover:text-pink-900 transition-colors tracking-tight">
                        {user.fullname}
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="whitespace-nowrap px-6 py-4 font-medium text-gray-600">
                    {user.email}
                  </td>

                  {/* Dynamic Role Badge */}
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-lg px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider border shadow-sm/5 transition-all ${
                        isAdmin
                          ? "bg-pink-50 text-pink-700 border-pink-200/80"
                          : "bg-gray-50 text-gray-500 border-gray-200"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;