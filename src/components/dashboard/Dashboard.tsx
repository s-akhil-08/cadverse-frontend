import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import DashboardHeader from './DashboardHeader';
import ProfileSection from './ProfileSection';
import ProjectProgress from './ProjectProgress';
import UploadSection from './UploadSection';
import MessagesSection from './MessagesSection';
import FeedbackSection from './FeedbackSection';
import FeedbackStatusList from './FeedbackStatusList';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [activeSection, setActiveSection] = useState<'overview' | 'projects' | 'messages' | 'upload' | 'feedback' | 'feedback-status'>('overview');

  // Gear rotation animations
  const gearRotateClockwise = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearRotateCounterClockwise = {
    animate: {
      rotate: [360, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Listen for upload section navigation
  React.useEffect(() => {
    const handleSwitchToUpload = () => {
      setActiveSection('upload');
    };
    
    const handleSwitchToFeedback = () => {
      setActiveSection('feedback');
    };
    
    window.addEventListener('switchToUpload', handleSwitchToUpload);
    window.addEventListener('switchToFeedback', handleSwitchToFeedback);
    return () => {
      window.removeEventListener('switchToUpload', handleSwitchToUpload);
      window.removeEventListener('switchToFeedback', handleSwitchToFeedback);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Grid Background */}
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 163, 175, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>
      
      {/* Dark mode grid overlay */}
      <div className="absolute inset-0 opacity-0 dark:opacity-15">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      {/* Floating Gears Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gear 1 - Top Left */}
        <motion.div 
          className="absolute top-20 left-20"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-32 h-32 text-blue-400/30 dark:text-blue-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 2 - Top Right */}
        <motion.div 
          className="absolute top-32 right-24"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-28 h-28 text-purple-400/30 dark:text-purple-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 3 - Bottom Left */}
        <motion.div 
          className="absolute bottom-32 left-32"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-36 h-36 text-teal-400/30 dark:text-teal-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 4 - Bottom Right */}
        <motion.div 
          className="absolute bottom-20 right-32"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-30 h-30 text-orange-400/30 dark:text-orange-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 5 - Center Top */}
        <motion.div 
          className="absolute top-16 left-1/2 transform -translate-x-1/2"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-24 h-24 text-indigo-400/30 dark:text-indigo-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 6 - Center Bottom */}
        <motion.div 
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-26 h-26 text-pink-400/30 dark:text-pink-300/20" strokeWidth={1} />
        </motion.div>
      </div>

      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Manage your projects and track your progress from your dashboard.
          </p>
        </motion.div>

        {/* Navigation Tabs with Swipe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <nav className="flex space-x-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto whitespace-nowrap scrollbar-hide snap-x snap-mandatory md:flex md:space-x-8 md:overflow-visible">
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'projects', label: 'Projects' },
              { id: 'messages', label: 'Messages' },
              { id: 'upload', label: 'Upload' },
              { id: 'feedback', label: 'Feedback' },
              { id: 'feedback-status', label: 'Feedback Status' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id as any)}
                className={`py-4 px-4 snap-start font-medium text-sm transition-colors min-w-[100px] text-center ${
                  activeSection === tab.id
                    ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-b-2 border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content Sections */}
        <div className="space-y-8">
          {activeSection === 'overview' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              <div className="lg:col-span-2 space-y-8">
                <ProjectProgress />
              </div>
              <div className="lg:col-span-1">
                <ProfileSection />
              </div>
            </motion.div>
          )}

          {activeSection === 'projects' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <ProjectProgress />
            </motion.div>
          )}

          {activeSection === 'upload' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <UploadSection />
            </motion.div>
          )}

          {activeSection === 'feedback' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FeedbackSection />
            </motion.div>
          )}

          {activeSection === 'feedback-status' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FeedbackStatusList />
            </motion.div>
          )}

          {activeSection === 'messages' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <MessagesSection />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;