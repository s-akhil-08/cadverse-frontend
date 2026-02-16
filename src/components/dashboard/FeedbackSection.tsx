import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, MessageSquare, Send, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../Toast';

const FeedbackSection: React.FC = () => {
  const { user, projects } = useAuth();
  const [selectedProject, setSelectedProject] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackText, setFeedbackText] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

  // const availableEmojis = ['😊', '👍', '🚀', '⭐', '💯', '🔥', '🎯', '✨', '👌', '🤩', '🎉', '👏', '❤️'];
  const availableEmojis = ['😊', '👍', '🚀', '⭐', '💯', '🔥', '🎯', '✨', '👌', '🤩', '🎉', '👏', '❤️', '😐', '🤔', '📝', '💡'];


  const handleStarClick = (starRating: number) => {
    setRating(starRating);
  };

  const handleStarHover = (starRating: number) => {
    setHoverRating(starRating);
  };

  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const handleEmojiToggle = (emoji: string) => {
    setSelectedEmojis(prev =>
      prev.includes(emoji)
        ? prev.filter(e => e !== emoji)
        : [...prev, emoji]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedProject) {
      setToast({
        message: 'Please select a project',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (rating === 0) {
      setToast({
        message: 'Please provide a rating',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (!feedbackText.trim()) {
      setToast({
        message: 'Please write your feedback',
        type: 'error',
        isVisible: true
      });
      return;
    }

    if (selectedEmojis.length === 0) {
      setToast({
        message: 'Please select at least one emoji',
        type: 'error',
        isVisible: true
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://backend-ak.vercel.app/api/submit-feedback/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          project: selectedProject,
          rating,
          feedback_text: feedbackText,
          emojis: selectedEmojis.join(' '),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setToast({
          message: 'Feedback submitted successfully! It will appear on the homepage after review.',
          type: 'success',
          isVisible: true
        });
        setSelectedProject('');
        setRating(0);
        setFeedbackText('');
        setSelectedEmojis([]);
      } else {
        const errors = Object.values(data).flat().join(' ');
        setToast({
          message: `Failed to submit feedback: ${errors}`,
          type: 'error',
          isVisible: true
        });
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setToast({
        message: `Failed to submit feedback. ${errorMessage}`,
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => {
      const starNumber = i + 1;
      const currentRating = hoverRating || rating;
      const isFull = starNumber <= currentRating;

      return (
        <button
          key={i}
          type="button"
          onClick={() => handleStarClick(starNumber)}
          onMouseEnter={() => handleStarHover(starNumber)}
          onMouseLeave={handleStarLeave}
          className="focus:outline-none transition-transform duration-200 hover:scale-110"
        >
          <Star
            className={`w-8 h-8 transition-colors duration-200 ${
              isFull
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300 dark:text-gray-600 hover:text-yellow-300'
            }`}
          />
        </button>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <MessageSquare className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Write Feedback
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Project Selection */}
          <div>
            <label htmlFor="project" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Project <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <select
                id="project"
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-colors font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white appearance-none"
              >
                <option value="">Choose a project...</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name} - {project.status}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            {projects.length === 0 && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">
                No projects found. Please upload a project first to write feedback.
              </p>
            )}
          </div>
          {/* Star Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Rating <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 mb-2">
              {renderStars()}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {rating > 0 ? `You rated ${rating} out of 5 stars` : 'Click to rate'}
            </p>
          </div>
          {/* Emoji Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Add Emojis
            </label>
            <div className="grid grid-cols-6 gap-2 mb-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide md:grid md:overflow-visible">
              {availableEmojis.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleEmojiToggle(emoji)}
                  className={`p-3 text-2xl rounded-lg border-2 transition-all duration-200 hover:scale-110 snap-start ${
                    selectedEmojis.includes(emoji)
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-500'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              {selectedEmojis.length > 0 ? `Selected: ${selectedEmojis.join(' ')}` : 'Click emojis to add them to your feedback.'}
            </p>
          </div>
          {/* Feedback Text */}
          <div>
            <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Your Feedback <span className="text-red-500">*</span>
            </label>
            <textarea
              id="feedback"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400 transition-colors font-mono resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Share your experience working with CADverse. What did you like about our service? How was the quality of work? Any suggestions for improvement?"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-mono">
              {feedbackText.length}/500 characters
            </p>
          </div>
          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || projects.length === 0}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
              isSubmitting || projects.length === 0
                ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
            } text-white`}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting Feedback...
              </>
            ) : (
              <>
                Submit Feedback
                <Send className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
        {/* Help Text */}
        <div className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
          <h4 className="font-semibold text-green-800 dark:text-green-300 mb-2">
            Feedback Guidelines:
          </h4>
          <ul className="text-sm text-green-700 dark:text-green-400 font-mono space-y-1">
            <li>• Be honest and constructive in your feedback</li>
            <li>• Mention specific aspects of our service you experienced</li>
            <li>• Your feedback helps us improve and helps other clients</li>
            <li>• Feedback will be reviewed before appearing on the homepage</li>
          </ul>
        </div>
      </motion.div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
};

export default FeedbackSection;
