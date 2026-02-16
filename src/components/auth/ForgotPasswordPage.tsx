import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Loader2, Shield, ArrowLeft } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../Toast';
import OTPSpamNotice from '../OTPSpamNotice';

const ForgotPasswordPage: React.FC = () => {
  const [step, setStep] = useState<'email' | 'otp' | 'reset' | 'success'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  const { forgotPassword, verifyForgotPasswordOTPForget, resetPassword } = useAuth();
  const navigate = useNavigate();
  const otpInputRef = useRef<HTMLInputElement>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setToast({
        message: 'Please enter your email address',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setToast({
        message: 'Please enter a valid email address',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await forgotPassword(email);
      if (success) {
        setStep('otp');
        setToast({
          message: 'OTP sent to your email address',
          type: 'success',
          isVisible: true,
        });
      } else {
        setToast({
          message: 'No account exists with this email. Try another or create one.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      setToast({
        message: 'No account exists with this email. Try another or create one.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setToast({
        message: 'Please enter a valid 6-digit OTP',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await verifyForgotPasswordOTPForget(email, otp); // Updated to use verifyForgotPasswordOTPForget
      if (success) {
        setStep('reset');
        setToast({
          message: 'OTP verified successfully',
          type: 'success',
          isVisible: true,
        });
      } else {
        setToast({
          message: 'Invalid OTP. Please try again.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      setToast({
        message: 'Invalid OTP. Please try again.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passwords.newPassword || !passwords.confirmPassword) {
      setToast({
        message: 'Please fill in all fields',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setToast({
        message: 'Passwords do not match',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    if (passwords.newPassword.length < 6) {
      setToast({
        message: 'Password must be at least 6 characters long',
        type: 'error',
        isVisible: true,
      });
      return;
    }
    setIsLoading(true);
    try {
      const success = await resetPassword(email, otp, passwords.newPassword);
      if (success) {
        setStep('success');
        setToast({
          message: 'Password reset successfully!',
          type: 'success',
          isVisible: true,
        });
      } else {
        setToast({
          message: 'Failed to reset password. Please try again.',
          type: 'error',
          isVisible: true,
        });
      }
    } catch (error) {
      setToast({
        message: 'Failed to reset password. Please try again.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full text-center"
        >
          <div className="bg-white dark:bg-gray-800 py-12 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <Shield className="w-10 h-10 text-green-600 dark:text-green-400" />
            </motion.div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Password Reset Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-8">
              Your password has been reset. You can now sign in with your new password.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 transform hover:scale-105"
            >
              Continue to Login
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

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
            <span className="font-mono text-2xl font-bold text-blue-600 dark:text-blue-400">CADverse</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            {step === 'email' && 'Reset Password'}
            {step === 'otp' && 'Verify Email'}
            {step === 'reset' && 'New Password'}
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400 font-mono">
            {step === 'email' && 'Enter your email to receive a reset code'}
            {step === 'otp' && `Enter the 6-digit code sent to ${email}`}
            {step === 'reset' && 'Create your new password'}
          </p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 py-8 px-6 shadow-xl rounded-xl border border-gray-200 dark:border-gray-700"
        >
          {step === 'email' && (
            <form className="space-y-6" onSubmit={handleEmailSubmit}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Reset Code
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
          {step === 'otp' && (
            <form className="space-y-6" onSubmit={handleOTPSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Verification Code
                </label>
                <input
                  ref={otpInputRef}
                  id="otp"
                  name="otp"
                  type="text"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono text-center text-2xl tracking-widest transition-colors"
                  placeholder="000000"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || otp.length !== 6}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify Code
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
          {step === 'reset' && (
            <form className="space-y-6" onSubmit={handlePasswordReset}>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  New Password
                </label>
                <input
                  id="newPassword"
                  name="newPassword"
                  type="password"
                  required
                  value={passwords.newPassword}
                  onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono transition-colors"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={passwords.confirmPassword}
                  onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 font-mono transition-colors"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Resetting...
                  </>
                ) : (
                  <>
                    Reset Password
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          )}
          <div className="mt-6 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Login
            </Link>
          </div>
          <div className="mt-4 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 font-medium transition-colors"
            >
              ← Return to Homepage
            </Link>
          </div>
        </motion.div>
      </motion.div>
      {step === 'otp' && <OTPSpamNotice inputFieldRef={otpInputRef} />}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
};

export default ForgotPasswordPage;