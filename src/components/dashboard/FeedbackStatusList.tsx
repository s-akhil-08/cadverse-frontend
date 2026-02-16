import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Calendar, CheckCircle, Clock, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import { API_BASE_URL } from "../../config/api";

interface UserFeedback {
  id: number;
  projectName: string;
  title: string;
  rating: number;
  emojis: string[];
  feedbackText: string;
  submittedDate: string;
  approvalStatus: 'approved' | 'pending' | 'rejected';
}



const FeedbackStatusList: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [userFeedbackData, setUserFeedbackData] = useState<UserFeedback[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}user-feedback/`);
        const rawData = response.data;

        const mappedData: UserFeedback[] = rawData.map((item: any) => ({
          id: item.id,
          projectName: item.project_name || 'Untitled Project',
          title: item.short_note ? item.short_note.trim() : 'N/A', // fallback if short_note is null
          rating: item.rating || 0,
          emojis: item.emojis ? item.emojis.trim().split(/\s+/).filter((e: string) => e) : [],
          feedbackText: item.feedback_text || '',
          submittedDate: item.created_at.split('T')[0], // Extract YYYY-MM-DD
          approvalStatus: (
            item.status === 'approved' ? 'approved' :
            item.status === 'rejected' ? 'rejected' :
            'pending'
          ) as 'approved' | 'pending' | 'rejected',
        }));

        setUserFeedbackData(mappedData);
      } catch (error) {
        console.error('Failed to fetch user feedback:', error);
        setUserFeedbackData([]); // Show empty state on error
      } finally {
        setLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          icon: CheckCircle,
          bgColor: 'bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30',
          borderColor: 'border-green-300 dark:border-green-700',
          badgeColor: 'bg-green-500 dark:bg-green-600',
          textColor: 'text-green-700 dark:text-green-300',
          iconColor: 'text-green-600 dark:text-green-400'
        };
      case 'pending':
        return {
          label: 'Under Review',
          icon: Clock,
          bgColor: 'bg-gradient-to-br from-yellow-50 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/30',
          borderColor: 'border-yellow-300 dark:border-yellow-700',
          badgeColor: 'bg-yellow-500 dark:bg-yellow-600',
          textColor: 'text-yellow-700 dark:text-yellow-300',
          iconColor: 'text-yellow-600 dark:text-yellow-400'
        };
      case 'rejected':
        return {
          label: 'Not Approved',
          icon: XCircle,
          bgColor: 'bg-gradient-to-br from-red-50 to-pink-100 dark:from-red-900/20 dark:to-pink-900/30',
          borderColor: 'border-red-300 dark:border-red-700',
          badgeColor: 'bg-red-500 dark:bg-red-600',
          textColor: 'text-red-700 dark:text-red-300',
          iconColor: 'text-red-600 dark:text-red-400'
        };
      default:
        return {
          label: 'Unknown',
          icon: Clock,
          bgColor: 'bg-gray-50 dark:bg-gray-800',
          borderColor: 'border-gray-300 dark:border-gray-600',
          badgeColor: 'bg-gray-500',
          textColor: 'text-gray-700 dark:text-gray-300',
          iconColor: 'text-gray-600 dark:text-gray-400'
        };
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-all duration-200 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400 drop-shadow-md'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400 font-mono">Loading feedback...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
          <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
            Your Feedback Status
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            Track the approval status of your submitted feedback
          </p>
        </div>
      </div>

      {userFeedbackData.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            No feedback submitted yet. Submit your first feedback above!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {userFeedbackData.map((feedback, index) => {
            const statusConfig = getStatusConfig(feedback.approvalStatus);
            const StatusIcon = statusConfig.icon;
            const isExpanded = expandedId === feedback.id;

            return (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`${statusConfig.bgColor} ${statusConfig.borderColor} border-2 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer`}
                onClick={() => toggleExpand(feedback.id)}
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {feedback.projectName}
                        </h4>
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${statusConfig.badgeColor} text-white text-sm font-semibold shadow-md`}>
                          <StatusIcon className="w-4 h-4" />
                          {statusConfig.label}
                        </div>
                      </div>
                      <p className={`text-base font-medium ${statusConfig.textColor} mb-3`}>
                        {feedback.title}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ChevronDown className="w-6 h-6 text-gray-600 dark:text-gray-400" />
                    </motion.div>
                  </div>

                  <div className="flex items-center gap-6 mb-4">
                    <div className="flex items-center gap-2">
                      {renderStars(feedback.rating)}
                      <span className="text-lg font-bold text-gray-900 dark:text-white ml-1">
                        {feedback.rating}/5
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {feedback.emojis.map((emoji, emojiIndex) => (
                        <motion.span
                          key={emojiIndex}
                          whileHover={{ scale: 1.3, rotate: 10 }}
                          className="text-3xl cursor-pointer drop-shadow-md"
                        >
                          {emoji}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 font-mono ml-auto">
                      <Calendar className="w-4 h-4" />
                      {formatDate(feedback.submittedDate)}
                    </div>
                  </div>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 border-t-2 border-gray-200 dark:border-gray-700">
                          <h5 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            Full Feedback:
                          </h5>
                          <p className="text-gray-700 dark:text-gray-300 font-mono leading-relaxed bg-white/50 dark:bg-gray-900/30 p-4 rounded-lg">
                            {feedback.feedbackText}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!isExpanded && (
                    <p className="text-gray-600 dark:text-gray-400 font-mono text-sm line-clamp-2 bg-white/50 dark:bg-gray-900/30 p-3 rounded-lg">
                      {feedback.feedbackText}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <div className="text-sm text-blue-800 dark:text-blue-300">
            <p className="font-semibold mb-1">Status Guide:</p>
            <ul className="space-y-1 font-mono">
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
                <span>Approved - Your feedback is live on the website</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span>Under Review - Our team is reviewing your feedback</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span>Not Approved - Feedback didn't meet our guidelines</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeedbackStatusList;