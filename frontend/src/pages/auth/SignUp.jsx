import { useState } from "react";
import { signUpUser } from "../../api/auth.service";
import { useNavigate, Link } from "react-router";
import { AuthSuccess } from "../../redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion"; // 1. Import Framer Motion

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signUpUser(formData);
      dispatch(AuthSuccess(res.user));
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Responsive container: uses min-h-screen to ensure full coverage and centers items cleanly
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-pink-100 via-yellow-50 to-pink-100 px-4 py-8 sm:px-6 lg:px-8">
      
      {/* 2. Added entry motion animation matching the Login page */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md space-y-8 rounded-2xl bg-gradient-to-r from-pink-200 via-green-50 to-pink-100 p-6 sm:p-10 md:p-12 shadow-xl"
      >
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="font-medium text-pink-600 hover:text-pink-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4 rounded-md">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="fullName"
                name="fullname"
                type="text"
                required
                value={formData.fullname}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all"
                placeholder="John Doe"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all"
                placeholder="you@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:text-sm transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            {/* 3. Replaced standard button with motion.button for satisfying active touch/click feedback */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-pink-600 px-4 py-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600 shadow-md hover:shadow-lg transition-all disabled:opacity-70"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SignUp;