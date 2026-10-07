/**
 * API Configuration Module
 * 
 * Supports dual backend URLs:
 * 1. General Backend URL (`VITE_BACKEND_URL` / `VITE_API_URL`):
 *    Used for all primary backend requests (login, projects, feedback, messaging, file uploads, SSE streams, etc.)
 * 
 * 2. OTP Backend URL (`VITE_OTP_BACKEND_URL` / `VITE_OTP_API_URL`):
 *    Used specifically for sending and verifying OTPs (signup OTP, verify OTP, forgot password OTP, verify reset OTP, reset password)
 */

const normalizeUrl = (url?: string, defaultUrl: string = 'https://backend-ak.vercel.app/api/'): string => {
  const target = url && url.trim().length > 0 ? url.trim() : defaultUrl;
  return target.endsWith('/') ? target : `${target}/`;
};

// General Backend API Base URL
export const API_BASE_URL: string = normalizeUrl(
  import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL,
  'https://backend-ak.vercel.app/api/'
);

// OTP Sending & Verification Backend API Base URL
export const OTP_API_BASE_URL: string = normalizeUrl(
  import.meta.env.VITE_OTP_BACKEND_URL || import.meta.env.VITE_OTP_API_URL || import.meta.env.VITE_OTP_API_BASE_URL,
  API_BASE_URL // Defaults to general backend URL if not explicitly provided
);

// Backward compatibility & convenience aliases
export const BACKEND_URL = API_BASE_URL;
export const OTP_BACKEND_URL = OTP_API_BASE_URL;
export const BASE_URL = API_BASE_URL;

export default API_BASE_URL;
