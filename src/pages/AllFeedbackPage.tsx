import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Calendar, MessageSquare, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

interface Feedback {
  id: number;
  user: string;
  project: string;
  feedback_text: string;
  rating: number;
  emojis: string | null;
  created_at: string;
  is_approved: boolean;
}

const AllFeedbackPage: React.FC = () => {
  const navigate = useNavigate();
  const [feedbackData, setFeedbackData] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        // Add cache-busting query parameter
        const response = await fetch('https://backend-ak.vercel.app/feedback/?t=' + new Date().getTime());
        if (!response.ok) {
          throw new Error(`Failed to fetch feedback: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        console.log('AllFeedbackPage.tsx - Raw API data:', data); // Debug: log raw response
        // Filter for approved feedback and normalize emojis
        const approvedFeedback = data
          .filter((fb: Feedback) => fb.is_approved)
          .map((fb: Feedback) => ({
            ...fb,
            emojis: fb.emojis ?? null,
            rating: Number(fb.rating) // Ensure rating is a number
          }));
        console.log('AllFeedbackPage.tsx - Approved feedback:', approvedFeedback); // Debug: log filtered data
        console.log('AllFeedbackPage.tsx - Approved count:', approvedFeedback.length); // Debug: log count
        setFeedbackData(approvedFeedback);
      } catch (error: any) {
        console.error('AllFeedbackPage.tsx - Error fetching feedback:', error);
        setError(error.message || 'Failed to load feedback');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeedback();
  }, []);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleFeedbackClick = (feedbackId: number) => {
    navigate(`/feedback/${feedbackId}`);
  };

  const handleBackToHome = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const element = document.getElementById('feedback');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleServicesRedirect = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const element = document.getElementById('services');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading feedback...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-600 dark:text-red-400">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navigation />

      {/* Top navigation bar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-16 left-0 right-0 z-40 backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <button
              onClick={handleBackToHome}
              className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
              Back to Home
            </button>
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                All Feedback
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {feedbackData.length} Reviews
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
                All Client Feedback
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
              Read what our clients say about their experience working with CADverse.
              Each feedback represents a successful project and satisfied client.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto">
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
                  {(feedbackData.length ? feedbackData.reduce((sum, f) => sum + Number(f.rating), 0) / feedbackData.length : 0).toFixed(1)}
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-mono">
                  Average Rating
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                  {feedbackData.length ? Math.round((feedbackData.filter(f => Number(f.rating) >= 4).length / feedbackData.length) * 100) : 0}%
                </div>
                <div className="text-gray-600 dark:text-gray-400 font-mono">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feedback cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {feedbackData.map((feedback, index) => (
              <motion.div
                key={feedback.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleFeedbackClick(feedback.id)}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 cursor-pointer group hover:bg-gray-50 dark:hover:bg-gray-750 transform hover:-translate-y-1"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
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
                </div>

                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-xs font-mono">
                      <Calendar className="w-3 h-3" />
                      {formatDate(feedback.created_at)}
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                    {feedback.project}
                  </h4>
                </div>

                <p className="text-gray-600 dark:text-gray-400 font-mono mb-4 leading-relaxed line-clamp-3 text-sm">
                  {feedback.feedback_text}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {feedback.emojis ? (
                      feedback.emojis.split(' ').map((emoji, emojiIndex) => (
                        <span key={emojiIndex} className="text-lg">
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
            ))}
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 font-mono mb-6">
                Join our satisfied clients and transform your ideas into reality with CADverse.
              </p>
              <button
                onClick={handleServicesRedirect}
                className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Get Started Today
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AllFeedbackPage;
