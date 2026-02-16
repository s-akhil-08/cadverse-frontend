// src/components/FeedbackTestimonial.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface Props {
  feedback: {
    user: string;
    project: string;
    rating: number;
    feedback_text: string;
    emojis?: string;
    created_at: string;
  };
  index: number;
}

const FeedbackTestimonial: React.FC<Props> = ({ feedback, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-2xl shadow-xl border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden hover:scale-105 transition-transform duration-300"
    >
      <Sparkles className="absolute top-4 right-4 w-8 h-8 text-yellow-400 animate-pulse" />
      
      <div className="mb-6">
        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">{feedback.user}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono mt-1">
          Project: {feedback.project} • {new Date(feedback.created_at).toLocaleDateString()}
        </p>
      </div>

      <p className="text-gray-700 dark:text-gray-300 italic text-lg leading-relaxed mb-6">
        "{feedback.feedback_text}"
      </p>

      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <span key={i} className={`text-2xl ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
            Star
          </span>
        ))}
        <span className="ml-3 text-sm font-bold text-gray-600 dark:text-gray-400">{feedback.rating}.0 / 5.0</span>
      </div>

      {feedback.emojis && (
        <div className="flex gap-3 text-3xl">
          {feedback.emojis.split('').map((emoji, i) => (
            <span key={i}>{emoji}</span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default FeedbackTestimonial;