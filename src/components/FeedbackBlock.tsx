// src/components/FeedbackBlock.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface FeedbackBlockProps {
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

const FeedbackBlock: React.FC<FeedbackBlockProps> = ({ feedback, index }) => {
  const getRandomRotation = (i: number) => {
    const rotations = [-4, -3.5, -3, -2, 2, 3, 3.5, 4];
    return rotations[(i * 13) % rotations.length];
  };

  const getArrowVariation = (i: number) => {
    // Same arrow variations as your original code (copy-paste from Reviews.tsx)
    const horizontalVariations = [ /* paste all 6 horizontal svgs here */ ];
    const verticalVariations = [ /* paste all 6 vertical svgs here */ ];

    return (
      <>
        {horizontalVariations[i % horizontalVariations.length]}
        {verticalVariations[i % verticalVariations.length]}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="space-y-6"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-5 rounded-lg shadow-lg relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
        <h3 className="text-2xl font-bold relative z-10">{feedback.project}</h3>
      </motion.div>

      <div className="relative min-h-[300px] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
            viewport={{ once: true }}
          >
            {getArrowVariation(index)}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-6 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: getRandomRotation(index * 2) }}
            whileHover={{ scale: 1.05, rotate: getRandomRotation(index * 2) + 2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-blue-400 dark:border-blue-500 rounded-tl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-blue-400 dark:border-blue-500 rounded-br-lg"></div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold rounded-full font-mono shadow-sm">
                  BEFORE
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30, rotate: 0 }}
            whileInView={{ opacity: 1, x: 0, rotate: -getRandomRotation(index * 2 + 1) }}
            whileHover={{ scale: 1.05, rotate: -getRandomRotation(index * 2 + 1) - 2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
              <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-400 dark:border-green-500 rounded-tl-lg"></div>
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-400 dark:border-green-500 rounded-br-lg"></div>
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full h-64" />
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-bold rounded-full font-mono shadow-sm">
                  AFTER
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden"
      >
        <div className="absolute top-3 right-3">
          <Sparkles className="w-6 h-6 text-yellow-400 dark:text-yellow-300 animate-pulse" />
        </div>
        <div className="absolute bottom-3 left-3">
          <Sparkles className="w-5 h-5 text-yellow-400 dark:text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>

        <div className="relative z-10">
          <div className="mb-4">
            <div className="font-bold text-2xl text-gray-900 dark:text-white mb-1">
              {feedback.user}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">
              Client Review • {new Date(feedback.created_at).toLocaleDateString()}
            </div>
          </div>

          <div className="relative mb-4">
            <span className="absolute -top-2 -left-2 text-5xl text-blue-400 dark:text-blue-500 opacity-50 font-serif">"</span>
            <p className="text-gray-700 dark:text-gray-300 font-mono italic pl-6">
              {feedback.feedback_text}
            </p>
          </div>

          <div className="flex items-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`text-2xl ${i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                ⭐
              </span>
            ))}
          </div>

          {feedback.emojis && (
            <div className="flex items-center gap-2 text-2xl">
              {feedback.emojis.split('').map((emoji, i) => (
                <span key={i}>{emoji}</span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackBlock;