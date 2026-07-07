import { useState } from "react";
import { signUpUser } from "../../api/auth.service";
import { useNavigate, Link } from "react-router";
import { AuthSuccess } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth);
  console.log(user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errorMessage) setErrorMessage(""); // Clear error when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    try {
      const res = await signUpUser(formData);
      dispatch(AuthSuccess(res.user));
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-pink-100 via-rose-50 to-amber-100 px-4 py-12 sm:px-6 lg:px-8 antialiased">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white/90 backdrop-blur-md p-8 shadow-xl shadow-pink-500/5 border border-pink-200/40 transform transition-all duration-300">
        
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-50 text-pink-600 border border-pink-100 shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0zM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif font-black tracking-tight text-gray-900">
            Create Account
          </h2>
          <p className="mt-2 text-xs font-medium text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-pink-600 hover:text-pink-700 underline underline-offset-4 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Error Feedback Message Block */}
        {errorMessage && (
          <div className="rounded-xl border border-red-100 bg-red-50 p-3.5 text-center text-xs font-semibold text-red-600 animate-fade-in">
            <p>{errorMessage}</p>
          </div>
        )}

        {/* Form Fields */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-4">
            
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullname" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </span>
                <input
                  id="fullName"
                  name="fullname"
                  type="text"
                  required
                  value={formData.fullname}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-pink-100 bg-white/80 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs outline-none transition-all duration-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 disabled:opacity-60"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-pink-100 bg-white/80 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs outline-none transition-all duration-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 disabled:opacity-60"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wider text-gray-600 mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-pink-400">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                </span>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  className="block w-full rounded-xl border border-pink-100 bg-white/80 py-2.5 pl-10 pr-4 text-sm font-medium text-gray-800 placeholder-gray-400 shadow-xs outline-none transition-all duration-200 focus:border-pink-500 focus:ring-4 focus:ring-pink-500/10 disabled:opacity-60"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="relative flex w-full justify-center items-center gap-2 rounded-xl bg-pink-600 px-4 py-3 text-xs font-bold tracking-wider uppercase text-white shadow-md shadow-pink-600/20 hover:bg-pink-700 active:scale-[0.97] transition-all duration-200 disabled:opacity-70 disabled:pointer-events-none"
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Creating Account...</span>
                </>
              ) : (
                <span>Sign Up</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;