import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, User } from 'lucide-react';
import Navigation from '../components/Navigation';

interface Feedback {
  id: number;
  user: string;
  project: string;
  feedback_text: string;
  rating: number;
  emojis: string | null;
  created_at: string;
}

const FeedbackDetail: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [relatedFeedback, setRelatedFeedback] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await fetch('https://backend-ak.vercel.app/feedback/');
        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const selectedFeedback = data.find((f: Feedback) => f.id === parseInt(feedbackId || '0'));
        const related = data
          .filter((f: Feedback) => f.id !== parseInt(feedbackId || '0'))
          .map((f: Feedback) => ({ ...f, emojis: f.emojis ?? null }))
          .slice(0, 3);
        setFeedback(selectedFeedback ? { ...selectedFeedback, emojis: selectedFeedback.emojis ?? null } : null);
        setRelatedFeedback(related);
      } catch (error: any) {
        console.error('Error fetching feedback:', error);
        setError(error.message || 'Failed to load feedback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, [feedbackId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating
            ? 'text-yellow-400 fill-yellow-400'
            : 'text-gray-300 dark:text-gray-600'
        }`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 dark:text-red-400">{error}</div>;
  }

  if (!feedback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Feedback Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                Client Feedback
              </span>
            </div>
          </div>
        </div>
      </motion.nav>
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="text-left">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {feedback.user}
                </h1>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto mb-8">
              <div className="flex items-center gap-3 mb-4">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Client Feedback
                </h2>
              </div>
              <blockquote className="text-lg text-gray-700 dark:text-gray-300 font-mono leading-relaxed italic">
                "{feedback.feedback_text}"
              </blockquote>
              <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  {feedback.emojis ? (
                    feedback.emojis.split(' ').map((emoji, index) => (
                      <span key={index} className="text-2xl">
                        {emoji}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-500 dark:text-gray-400 text-sm">No emojis</span>
                  )}
                </div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-mono">
                  <Calendar className="w-4 h-4" />
                  {formatDate(feedback.created_at)}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex justify-center items-center gap-3">
                <User className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                Client Information
              </h3>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-4xl mx-auto">
                <div className="mb-4">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {feedback.user}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 font-mono">
                    Project: {feedback.project}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    {feedback.emojis ? (
                      feedback.emojis.split(' ').map((emoji, index) => (
                        <span key={index} className="text-2xl">
                          {emoji}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">No emojis</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-mono">
                    {renderStars(feedback.rating)}
                    <span>{feedback.rating}/5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              More Client Feedback
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-mono max-w-2xl mx-auto">
              Discover what other clients have shared
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedFeedback.map((relatedFeedback, index) => (
              <motion.div
                key={relatedFeedback.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                onClick={() => navigate(`/feedback/${relatedFeedback.id}`)}
              >
                <div className="mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {relatedFeedback.user}
                  </h4>
                  <div className="flex items-center gap-1">
                    {renderStars(relatedFeedback.rating)}
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm font-mono line-clamp-3 mb-4">
                  {relatedFeedback.feedback_text}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {relatedFeedback.emojis ? (
                      relatedFeedback.emojis.split(' ').map((emoji, emojiIndex) => (
                        <span key={emojiIndex} className="text-lg">
                          {emoji}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400 text-sm">No emojis</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                    {formatDate(relatedFeedback.created_at)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={() => navigate('/feedback')}
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Feedback
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default FeedbackDetail;
