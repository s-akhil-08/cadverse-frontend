
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { API_BASE_URL } from "../config/api";
import { supabase } from '../lib/supabaseClient'; // Add this

interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  is_verified: boolean;
  profilePicture?: string;
}

interface Project {
  id: string;
  name: string;
  description?: string;
  status: 'Submitted' | 'In Review' | 'In Progress' | 'Completed';
  submittedDate: string;
  type: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  signup: (formData: any) => Promise<boolean>;
  verifyOTP: (email: string, otp: string) => Promise<boolean>;
  logout: () => Promise<boolean>;
  updateProfile: (userData: Partial<User>) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  addProject: (project: Omit<Project, 'id'>) => void;
  sendMessage: (subject: string, message: string) => Promise<boolean>;
  uploadFile: (formData: FormData) => Promise<boolean>;  // ← Updated signature
  forgotPassword: (email: string) => Promise<boolean>;
  verifyForgotPasswordOTPForget: (email: string, otp: string) => Promise<boolean>;
  resetPassword: (email: string, otp: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};


axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token && config.headers) {
      config.headers['Authorization'] = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}projects/`);
      setProjects(response.data);
      localStorage.setItem('cadverse_projects', JSON.stringify(response.data));
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const savedUser = localStorage.getItem('cadverse_user');
      const savedProjects = localStorage.getItem('cadverse_projects');
      const token = localStorage.getItem('token');
      if (savedProjects) {
        try {
          setProjects(JSON.parse(savedProjects));
        } catch {
          console.warn('Failed to parse stored projects');
        }
      }
      if (token) {
        try {
          // Validate token with Django
          const response = await axios.get(`${API_BASE_URL}protected/`, {
            headers: { Authorization: `Token ${token}` },
          });
          const userData = response.data.user;
          const updatedUser = {
            id: String(userData.id),
            name: userData.name,
            email: userData.email,
            mobile: userData.mobile,
            is_verified: userData.is_verified,
          };
          setUser(updatedUser);
          localStorage.setItem('cadverse_user', JSON.stringify(updatedUser));
          await fetchProjects();
        } catch (error: any) {
          if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('cadverse_user');
            setUser(null);
            setProjects([]);
            localStorage.removeItem('cadverse_projects');
          } else {
            console.warn('Token check failed, keeping stored user:', error.message);
            if (savedUser) {
              setUser(JSON.parse(savedUser));
            }
          }
        }
      } else if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      // Check Supabase session for Google OAuth
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const authUser = session.user;
        if (authUser) {
          await handleGoogleUser(authUser);
        }
      }
      setIsLoading(false);
    };
    initializeAuth();
  }, []);

  const handleGoogleUser = async (authUser: any) => {
    const { email, user_metadata } = authUser;
    const name = user_metadata?.full_name || user_metadata?.name || 'Unknown User';
    const mobile = ''; // Google doesn't provide mobile; use empty string
    if (!email) {
      console.error('No email provided by Google');
      return;
    }
    // Check if user exists in api_user
    const { data: existingUser, error: checkError } = await supabase
      .from('api_user')
      .select('id, name, email, mobile, is_verified')
      .eq('email', email)
      .single();
    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows
      console.error('Error checking user:', checkError);
      return;
    }
    if (existingUser) {
      // User exists: Update name if changed
      if (existingUser.name !== name) {
        await supabase
          .from('api_user')
          .update({ name })
          .eq('id', existingUser.id);
      }
      const updatedUser = {
        id: String(existingUser.id),
        name: existingUser.name,
        email: existingUser.email,
        mobile: existingUser.mobile,
        is_verified: existingUser.is_verified,
      };
      setUser(updatedUser);
      localStorage.setItem('cadverse_user', JSON.stringify(updatedUser));
      // Generate a pseudo-token for compatibility with Django
      const token = `google_${authUser.id}`;
      localStorage.setItem('token', token);
      await fetchProjects();
    } else {
      // Create new user
      const { data, error: insertError } = await supabase
        .from('api_user')
        .insert({
          name,
          email,
          mobile,
          password: 'google_oauth', // Dummy password
          is_active: true,
          is_verified: true, // Google users are verified
          is_staff: false,
          is_superuser: false,
          date_joined: new Date().toISOString(),
          auth_method: 'google',
        })
        .select('id, name, email, mobile, is_verified')
        .single();
      if (insertError) {
        console.error('Error creating user:', insertError);
        return;
      }
      const newUser = {
        id: String(data.id),
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        is_verified: data.is_verified,
      };
      setUser(newUser);
      localStorage.setItem('cadverse_user', JSON.stringify(newUser));
      const token = `google_${authUser.id}`;
      localStorage.setItem('token', token);
      await fetchProjects();
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}login/`, { email, password });
      const { token, user } = response.data;
      const updatedUser = {
        id: String(user.id),
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        is_verified: user.is_verified,
      };
      setUser(updatedUser);
      localStorage.setItem('token', token);
      localStorage.setItem('cadverse_user', JSON.stringify(updatedUser));
      await fetchProjects();
      return true;
    } catch (error) {
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          scopes: 'email profile',
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });
      if (error) {
        console.error('Google OAuth error:', error);
        return false;
      }
      // onAuthStateChange will handle user creation/check
      return true;
    } catch (error) {
      console.error('Unexpected Google login error:', error);
      return false;
    }
  };

  // Add onAuthStateChange listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        await handleGoogleUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProjects([]);
        localStorage.removeItem('token');
        localStorage.removeItem('cadverse_user');
        localStorage.removeItem('cadverse_projects');
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const signup = async (formData: any): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}signup/`, formData);
      return response.status === 201;
    } catch {
      return false;
    }
  };

  const verifyOTP = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}verify-otp/`, { email, otp });
      if (response.status === 200) {
        const { token, user } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('cadverse_user', JSON.stringify(user));
        setUser(user);
        await fetchProjects();
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('OTP Verification failed:', error.response?.data || error.message);
      return false;
    }
  };

  const logout = async (): Promise<boolean> => {
    try {
      await supabase.auth.signOut(); // Sign out from Supabase
      await axios.post(`${API_BASE_URL}logout/`); // Also notify Django
      localStorage.removeItem('cadverse_feedback_popup_shown_this_login');
      setUser(null);
      setProjects([]);
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  };

  const updateProfile = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('cadverse_user', JSON.stringify(updatedUser));
      // Optionally update api_user in Supabase
      supabase
        .from('api_user')
        .update(userData)
        .eq('id', user.id)
        .then(({ error }) => {
          if (error) console.error('Error updating profile:', error);
        });
    }
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject: Project = {
      ...project,
      id: Date.now().toString(),
    };
    const updatedProjects = [newProject, ...projects];
    setProjects(updatedProjects);
    localStorage.setItem('cadverse_projects', JSON.stringify(updatedProjects));
  };

  const sendMessage = async (subject: string, message: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}send-message/`, { subject, message });
      return response.status === 200;
    } catch {
      return false;
    }
  };

  const uploadFile = async (formData: FormData): Promise<boolean> => {
    try {
      if (!user) throw new Error('User not authenticated');
      const response = await axios.post(`${API_BASE_URL}upload-file/`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      if (response.status !== 200) {
        throw new Error('Upload failed');
      }
      await fetchProjects();
      return true;
    } catch (error: any) {
      console.error('File upload failed:', error?.message || error);
      return false;
    }
  };

  const forgotPassword = async (email: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}forgot-password/`, { email });
      if (response.status === 200) {
        console.log('Forgot password OTP sent:', response.data);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Forgot password failed:', error.response?.data || error.message);
      return false;
    }
  };

  const verifyForgotPasswordOTPForget = async (email: string, otp: string): Promise<boolean> => {
    try {
      const response = await axios.post(`${API_BASE_URL}verify-reset-otp/`, { email, otp });
      if (response.status === 200) {
        console.log('Forgot password OTP verification successful:', response.data);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Forgot password OTP verification failed:', error.response?.data || error.message);
      return false;
    }
  };

  const resetPassword = async (email: string, otp: string, newPassword: string): Promise<boolean> => {
    try {
      // Step 1: Verify OTP first to get the reset_token
      const verifyResponse = await axios.post(`${API_BASE_URL}verify-reset-otp/`, {
        email,
        otp,
      });

      if (verifyResponse.status !== 200) {
        console.error('OTP verification failed during reset:', verifyResponse.data);
        return false;
      }

      // Step 2: Extract reset_token from the response
      const resetToken = verifyResponse.data.reset_token;
      if (!resetToken) {
        console.error('No reset_token received from verify endpoint');
        return false;
      }

      console.log('Using reset_token for reset:', resetToken);

      // Step 3: Reset password using reset_token
      const response = await axios.post(`${API_BASE_URL}reset-password/`, {
        email,
        reset_token: resetToken,
        new_password: newPassword,
        confirm_password: newPassword,
      });

      if (response.status === 200) {
        console.log('Password reset successful:', response.data);
        return true;
      }
      return false;
    } catch (error: any) {
      console.error('Password reset failed:', error.response?.data || error.message);
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    loginWithGoogle,
    signup,
    verifyOTP,
    logout,
    updateProfile,
    projects,
    setProjects,
    addProject,
    sendMessage,
    uploadFile,
    forgotPassword,
    verifyForgotPasswordOTPForget,
    resetPassword,
  };

  return isLoading ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-mono">Loading...</p>
      </div>
    </div>
  ) : (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
};
