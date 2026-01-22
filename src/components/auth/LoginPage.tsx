import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Loader2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../Toast';
/**
 * @typedef {object} ToastState
 * @property {string} message - The message to display in the toast.
 * @property {'success' | 'error'} type - The type of toast, which determines its styling.
 * @property {boolean} isVisible - Whether the toast is currently visible.
 */
/**
 * LoginPage component.
 * This component handles user authentication by providing a form for existing users to sign in.
 * It uses client-side validation and interacts with an AuthContext for authentication logic.
 */
const LoginPage = () => {
  // State for the login form data.
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  // State to toggle password visibility.
  const [showPassword, setShowPassword] = useState(false);
  // State to handle loading status for API calls.
  const [isLoading, setIsLoading] = useState(false);
  // State for Google login loading status
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  // State for displaying toast notifications.
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  // Custom hooks for authentication and navigation.
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  /**
   * Handles changes to the form input fields.
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event from the input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  /**
   * Handles the login form submission.
   * Performs client-side validation before attempting to log in.
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Client-side validation checks
    if (!formData.email || !formData.password) {
      setToast({ message: 'Please enter both email and password', type: 'error', isVisible: true });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setToast({ message: 'Please enter a valid email address', type: 'error', isVisible: true });
      return;
    }
    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        setToast({ message: 'Login successful!', type: 'success', isVisible: true });
        navigate('/dashboard');
      } else {
        setToast({ message: 'Invalid email or password', type: 'error', isVisible: true });
      }
    } catch (error: any) {
      console.error('Login error:', error);
      setToast({ message: 'Invalid email or password', type: 'error', isVisible: true });
    } finally {
      setIsLoading(false);
    }
  };
  /**
   * Handles Google login authentication.
   */
  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    
    try {
      const success = await loginWithGoogle();
      
      if (success) {
        setToast({
          message: 'Google login successful! Redirecting...',
          type: 'success',
          isVisible: true
        });
        
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        setToast({
          message: 'Google login failed',
          type: 'error',
          isVisible: true
        });
      }
    } catch (error) {
      setToast({
        message: 'Google login failed. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">
              CADverse
            </span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-mono">
            Welcome back! Please enter your details.
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono transition-colors"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono transition-colors"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300" />
                  )}
                </button>
              </div>
            </div>

           {/* Forgot Password Link */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
          {/* Divider */}
          {/* <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-mono">
                  Or continue with
                </span>
              </div>
            </div>
          </div> */}
          {/* Google Login Button */}
          {/* <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading}
            className="mt-4 w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
          >
            {isGoogleLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Signing in with Google...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </>
            )}
          </button> */}
          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-semibold transition-colors"
              >
                Sign Up
              </Link>
            </p>
          </div>
          {/* Return to Homepage Button */}
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
            >
              &larr; Return to Homepage
            </Link>
          </div>
        </motion.div>
      </motion.div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};
export default LoginPage;
