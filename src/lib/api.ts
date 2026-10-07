/**
 * API Configuration Module
 * 
 * Supports dual backend URLs:
 * 1. General Backend URL (`VITE_BACKEND_URL` / `VITE_API_URL`):
 *    Used for all primary backend requests (login, projects, feedback, messaging, file uploads, SSE streams, etc.)
 *    Default: https://cadverse-platform-backend.onrender.com/api/
 * 
 * 2. OTP Backend URL (`VITE_OTP_BACKEND_URL` / `VITE_OTP_API_URL`):
 *    Used specifically for sending and verifying OTPs and SMTP messaging (signup OTP, verify OTP, forgot password OTP, verify reset OTP, reset password, send-message)
 *    Default: https://otp-service-django.vercel.app/api/
 */

const normalizeUrl = (url?: string, defaultUrl: string = 'https://cadverse-platform-backend.onrender.com/api/'): string => {
  const target = url && url.trim().length > 0 ? url.trim() : defaultUrl;
  return target.endsWith('/') ? target : `${target}/`;
};

// General Backend API Base URL
export const API_BASE_URL: string = normalizeUrl(
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL,
  'https://cadverse-platform-backend.onrender.com/api/'
);

// OTP Sending & Verification Backend API Base URL
export const OTP_API_BASE_URL: string = normalizeUrl(
  import.meta.env.VITE_OTP_BACKEND_URL || import.meta.env.VITE_OTP_API_URL || import.meta.env.VITE_OTP_API_BASE_URL,
  'https://otp-service-django.vercel.app/api/'
);

// Backward compatibility & convenience aliases
export const BACKEND_URL = API_BASE_URL;
export const OTP_BACKEND_URL = OTP_API_BASE_URL;
export const BASE_URL = API_BASE_URL;

export default API_BASE_URL;
