import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, MessageCircle, Calendar, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Toast from './Toast';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'notifications' | 'messages'>('notifications');
  const [messageForm, setMessageForm] = useState({
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  const { sendMessage } = useAuth();

  // Mock notification data - latest 2-3 messages
  const recentNotifications = [
    {
      id: 1,
      title: 'Project Update',
      message: 'Your Aircraft Landing Gear model is now in progress',
      time: '2 hours ago',
      type: 'update'
    },
    {
      id: 2,
      title: 'File Uploaded',
      message: 'Wind Turbine Prototype files received successfully',
      time: '1 day ago',
      type: 'upload'
    },
    {
      id: 3,
      title: 'Review Complete',
      message: 'Mechanical Joint Analysis review completed',
      time: '2 days ago',
      type: 'review'
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <Bell className="w-4 h-4 text-blue-500" />;
      case 'upload':
        return <MessageCircle className="w-4 h-4 text-green-500" />;
      case 'review':
        return <Calendar className="w-4 h-4 text-orange-500" />;
      default:
        return <Bell className="w-4 h-4 text-gray-500" />;
    }
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!messageForm.subject || !messageForm.message) {
      setToast({
        message: 'Please fill in all fields',
        type: 'error',
        isVisible: true
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await sendMessage(messageForm.subject, messageForm.message);
      
      if (success) {
        setToast({
          message: 'Message sent successfully!',
          type: 'success',
          isVisible: true
        });
        setMessageForm({ subject: '', message: '' });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setToast({
        message: 'Failed to send message. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-start justify-end pt-20 pr-4">
          {/* Blurred Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-sm w-full border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setActiveTab('notifications')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'notifications'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Notifications
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`text-sm font-medium transition-colors ${
                    activeTab === 'messages'
                      ? 'text-blue-600 dark:text-blue-400'
                      : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Send Message
                </button>
              </div>
              <button
                onClick={onClose}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            {activeTab === 'notifications' ? (
              /* Notifications List */
              <div className="max-h-80 overflow-y-auto">
                {recentNotifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="p-4 border-b border-gray-100 dark:border-gray-700 last:border-b-0 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getIcon(notification.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                          {notification.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Send Message Form */
              <div className="p-4">
                <form onSubmit={handleMessageSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      value={messageForm.subject}
                      onChange={(e) => setMessageForm({ ...messageForm, subject: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Enter message subject"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={messageForm.message}
                      onChange={(e) => setMessageForm({ ...messageForm, message: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="Type your message here..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                      isSubmitting
                        ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                        : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                    } text-white`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
            {/* Footer */}
            {activeTab === 'notifications' && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                {recentNotifications.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-gray-500 dark:text-gray-400 font-mono">
                      No notifications yet
                    </p>
                  </div>
                ) : (
                <Link
                  to="/notifications"
                  className="w-full bg-blue-600 dark:bg-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors block text-center text-sm"
                  onClick={onClose}
                >
                  See All Notifications
                </Link>
                )}
              </div>
            )}
          </motion.div>
          </div>
          
          <Toast
            message={toast.message}
            type={toast.type}
            isVisible={toast.isVisible}
            onClose={() => setToast({ ...toast, isVisible: false })}
          />
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationModal;