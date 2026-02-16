import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Camera, Edit3, Save, X, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../Toast';

const ProfileSection: React.FC = () => {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editingField, setEditingField] = useState<'email' | 'mobile' | null>(null);
  const [tempValue, setTempValue] = useState('');
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    mobile: user?.mobile || ''
  });
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  const [otpModal, setOtpModal] = useState({ 
    isOpen: false, 
    field: '', 
    newValue: '',
    value: '', 
    otp: '' 
  });

  if (!user) return null;

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({
      name: user.name,
      email: user.email,
      mobile: user.mobile
    });
  };

  const handleFieldEdit = (field: 'email' | 'mobile') => {
    setEditingField(field);
    setTempValue(user?.[field] || '');
  };

  const handleVerifyClick = (field: 'email' | 'mobile') => {
    if (!tempValue.trim()) {
      setToast({
        message: `Please enter a valid ${field}`,
        type: 'error',
        isVisible: true
      });
      return;
    }

    // Show OTP modal for verification
    setOtpModal({
      isOpen: true,
      field,
      newValue: tempValue,
      value: tempValue,
      otp: ''
    });
  };

  const handleCancelEdit = () => {
    setEditingField(null);
    setTempValue('');
  };

  const handleOTPVerification = async () => {
    if (otpModal.otp.length !== 6) {
      setToast({
        message: 'Please enter a valid 6-digit OTP',
        type: 'error',
        isVisible: true
      });
      return;
    }

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the user profile after OTP verification
    updateProfile({ [otpModal.field]: otpModal.newValue });
    setOtpModal({ isOpen: false, field: '', newValue: '', value: '', otp: '' });
    setEditingField(null);
    setTempValue('');
    
    setToast({
      message: `${otpModal.field === 'email' ? 'Email' : 'Mobile'} updated successfully!`,
      type: 'success',
      isVisible: true
    });
  };

  const handleSave = () => {
    if (!editData.name || !editData.email || !editData.mobile) {
      setToast({
        message: 'Please fill in all fields',
        type: 'error',
        isVisible: true
      });
      return;
    }

    updateProfile(editData);
    setIsEditing(false);
    setToast({
      message: 'Profile updated successfully!',
      type: 'success',
      isVisible: true
    });
  };

  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updateProfile({ profilePicture: result });
        setToast({
          message: 'Profile picture updated successfully!',
          type: 'success',
          isVisible: true
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <motion.div
        data-section="profile"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Profile
          </h2>
          {/* {!isEditing ? (
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Cancel
              </button>
            </div>
          )} */}
        </div>

        {/* Profile Picture */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative">
            <img
              src={user.profilePicture || '/Profile.jpg'}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover border-4 border-gray-200 dark:border-gray-600"
            />
            {/* <label className="absolute bottom-0 right-0 bg-blue-600 dark:bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg">
              <Camera className="w-4 h-4" />
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="hidden"
              />
            </label> */}
          </div>
          <p className="text-m text-gray-500 dark:text-gray-400 mt-2 font-mono">
            Welcome to CADverse 😊 {user.name} ✨
          </p>
        </div>

        {/* Profile Information */}
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Full Name
            </label>
            {isEditing ? (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={editData.name}
                  onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono transition-colors"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <User className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-mono">{user.name}</span>
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email Address
              {/* {!isEditing && (
                <button
                  onClick={() => handleFieldEdit('email')}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                >
                  <Edit3 className="w-4 h-4 inline" />
                </button>
              )} */}
            </label>
            {editingField === 'email' ? (
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono transition-colors"
                      placeholder="Enter new email"
                    />
                  </div>
                  <button
                    onClick={() => handleVerifyClick('email')}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Verify
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-mono">{user.email}</span>
              </div>
            )}
          </div>

          {/* Mobile */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Mobile Number
              {/* {!isEditing && (
                <button
                  onClick={() => handleFieldEdit('mobile')}
                  className="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                >
                  <Edit3 className="w-4 h-4 inline" />
                </button>
              )} */}
            </label>
            {editingField === 'mobile' ? (
              <div className="relative">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono transition-colors"
                      placeholder="Enter new mobile number"
                    />
                  </div>
                  <button
                    onClick={() => handleVerifyClick('mobile')}
                    className="px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors text-sm font-medium"
                  >
                    Verify
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900 dark:text-white font-mono">{user.mobile}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* OTP Verification Modal */}
      {otpModal.isOpen && editingField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOtpModal({ isOpen: false, field: '', newValue: '', value: '', otp: '' })} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 max-w-md w-full mx-4 border border-gray-200 dark:border-gray-700"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Verify {otpModal.field === 'email' ? 'Email' : 'Mobile'} Change
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono text-sm">
                Enter the 6-digit code sent to: {otpModal.newValue}
              </p>
            </div>

            <div className="space-y-4">
              <input
                type="text"
                maxLength={6}
                value={otpModal.otp}
                onChange={(e) => setOtpModal({ ...otpModal, otp: e.target.value.replace(/\D/g, '') })}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-center text-2xl tracking-widest transition-colors"
                placeholder="000000"
              />

              <div className="flex gap-3">
                <button
                  onClick={() => setOtpModal({ isOpen: false, field: '', newValue: '', value: '', otp: '' })}
                  className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleOTPVerification}
                  disabled={otpModal.otp.length !== 6}
                  className="flex-1 py-3 px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                >
                  Verify
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
};

export default ProfileSection;
