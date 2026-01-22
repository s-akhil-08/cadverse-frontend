import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ArrowRight, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface Feedback {
  id: number;
  user: string;
  feedback_text: string;
  rating: number;
  emojis: string | null;
  created_at: string;
  is_approved: boolean;
  project: string;
}

const FeedbackCard: React.FC<{
  feedback: Feedback;
  index: number;
}> = ({ feedback, index }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/feedback/${feedback.id}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating 
            ? 'text-yellow-400 fill-yellow-400' 
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      onClick={handleCardClick}
      className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-750 transform hover:-translate-y-1"
    >
      {/* User Info */}
      <div className="mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {feedback.user}
        </h3>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            {renderStars(feedback.rating)}
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            {feedback.rating}/5
          </span>
        </div>
      </div>

      {/* Feedback Message */}
      <p className="text-gray-600 dark:text-gray-400 font-mono mb-4 leading-relaxed line-clamp-3">
        {feedback.feedback_text}
      </p>

      {/* Emojis */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {feedback.emojis ? (
            feedback.emojis.split(' ').map((emoji, emojiIndex) => (
              <span key={emojiIndex} className="text-xl">
                {emoji}
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-400 text-sm">No emojis</span>
          )}
        </div>
        
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">
          <span className="text-sm font-medium">View Feedback</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
        </div>
      </div>
    </motion.div>
  );
};

const Feedback: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Add cache-busting query parameter
        const response = await fetch('https://backend-is8n.onrender.com/api/feedback/?t=' + new Date().getTime());
        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Feedback.tsx - Raw API data:', data); // Debug: log raw response
        // Filter for approved feedback and normalize emojis
        const approvedFeedback = data
          .filter((fb: Feedback) => fb.is_approved)
          .map((fb: Feedback) => ({
            ...fb,
            emojis: fb.emojis ?? null,
          }));
        console.log('Feedback.tsx - Approved feedback:', approvedFeedback); // Debug: log filtered data
        console.log('Feedback.tsx - Approved count:', approvedFeedback.length); // Debug: log count
        setFeedbackData(approvedFeedback);
      } catch (error: any) {
        console.error('Feedback.tsx - Error fetching feedback:', error);
        setError(error.message || 'Failed to load feedback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

  const displayedFeedback = feedbackData.slice(0, 6);
  const hasMoreFeedback = feedbackData.length > 6;

  const handleShowAllFeedback = () => {
    navigate('/feedback');
  };

  const handleWriteFeedback = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
      return;
    }
    
    navigate('/dashboard');
    setTimeout(() => {
      const event = new CustomEvent('switchToFeedback');
      window.dispatchEvent(event);
    }, 100);
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <section id="feedback" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Client Feedback
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            Hear what our clients say about their experience working with CADverse 
            and the quality of our 3D modeling and prototyping services.
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {feedbackData.length}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-mono">
                Total Reviews
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500 mb-2">
                {(feedbackData.length ? feedbackData.reduce((sum, f) => sum + f.rating, 0) / feedbackData.length : 0).toFixed(1)}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-mono">
                Average Rating
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {feedbackData.length ? Math.round((feedbackData.filter(f => f.rating >= 4).length / feedbackData.length) * 100) : 0}%
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-mono">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feedback Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {displayedFeedback.map((feedback, index) => (
            <FeedbackCard
              key={feedback.id}
              feedback={feedback}
              index={index}
            />
          ))}
        </div>

        {/* Show All Feedback Button */}
        {hasMoreFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <button
              onClick={handleShowAllFeedback}
              className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              <MessageSquare className="w-5 h-5" />
              Show All Feedback
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {feedbackData.length} Reviews
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        )}

        {/* Write Feedback Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button
            onClick={handleWriteFeedback}
            className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
          >
            <MessageSquare className="w-5 h-5" />
            Write Feedback
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </motion.div>
      </div>
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        message="Please log in or sign up to write a review."
      />
    </section>
  );
};

export default Feedback;
