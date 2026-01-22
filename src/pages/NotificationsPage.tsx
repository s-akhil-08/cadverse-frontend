import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Bell, MessageCircle, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const NotificationsPage: React.FC = () => {
  const navigate = useNavigate();

  // Mock notification data - full list
  const allNotifications = [
    {
      id: 1,
      title: 'Project Update',
      message: 'Your Aircraft Landing Gear model is now in progress. Our team has started working on the 3D modeling phase.',
      time: '2 hours ago',
      type: 'update',
      read: false
    },
    {
      id: 2,
      title: 'File Uploaded',
      message: 'Wind Turbine Prototype files received successfully. Initial review will begin shortly.',
      time: '1 day ago',
      type: 'upload',
      read: false
    },
    {
      id: 3,
      title: 'Review Complete',
      message: 'Mechanical Joint Analysis review completed. The project is ready for the next phase.',
      time: '2 days ago',
      type: 'review',
      read: true
    },
    {
      id: 4,
      title: 'Payment Received',
      message: 'Payment for Truck Fairing Analysis project has been received. Thank you!',
      time: '3 days ago',
      type: 'payment',
      read: true
    },
    {
      id: 5,
      title: 'Project Delivered',
      message: 'Gas Turbine Blade modeling project has been completed and delivered to your email.',
      time: '1 week ago',
      type: 'delivery',
      read: true
    },
    {
      id: 6,
      title: 'Welcome to CADverse',
      message: 'Welcome to CADverse! We\'re excited to help you bring your ideas to life.',
      time: '2 weeks ago',
      type: 'welcome',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'update':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'upload':
        return <MessageCircle className="w-5 h-5 text-green-500" />;
      case 'review':
        return <AlertCircle className="w-5 h-5 text-orange-500" />;
      case 'payment':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'delivery':
        return <CheckCircle className="w-5 h-5 text-purple-500" />;
      case 'welcome':
        return <Bell className="w-5 h-5 text-blue-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'update':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'upload':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'review':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'payment':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'delivery':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'welcome':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <DashboardHeader />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <Bell className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              All Notifications
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Stay updated with all your project notifications and messages.
          </p>
        </motion.div>

        {/* Notifications List */}
        <div className="space-y-4">
          {allNotifications.map((notification, index) => (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow ${
                !notification.read ? 'ring-2 ring-blue-500/20 dark:ring-blue-400/20' : ''
              }`}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {notification.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {!notification.read && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(notification.type)}`}>
                        {notification.type}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 font-mono mb-3 leading-relaxed">
                    {notification.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                      {notification.time}
                    </span>
                    {!notification.read && (
                      <button className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors">
                        Mark as read
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {allNotifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Notifications
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-mono">
              You're all caught up! New notifications will appear here.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;