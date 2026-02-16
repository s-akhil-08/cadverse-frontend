import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Quote, Sparkles, Star, TrendingUp } from 'lucide-react';
import axios from 'axios';
import { SkeletonGrid } from '../components/Skeleton'; // ← Only this line added

interface ShowcaseItem {
  id: number;
  title: string;
  before_file: string;
  after_file: string;
  feedback: {
    user: { name: string };
    feedback_text: string;
    rating: number;
    emojis: string;
    project_title?: string;
  } | null;
}

const Reviews: React.FC = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<ShowcaseItem[]>([]);
  const [totalReviews, setTotalReviews] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // First: Load ALL approved feedbacks for correct stats
    axios.get('https://backend-is8n.onrender.com/api/feedback/')
      .then((feedbackRes) => {
        const allFeedback = feedbackRes.data || [];
        const approvedFeedback = allFeedback.filter((fb: any) => fb.is_approved);

        const validRatings = approvedFeedback
          .map((fb: any) => fb.rating)
          .filter((r: any): r is number => typeof r === 'number' && r >= 1 && r <= 5);

        const totalCount = validRatings.length;
        const average = totalCount > 0
          ? Number((validRatings.reduce((a: number, b: number) => a + b, 0) / totalCount).toFixed(1))
          : 0;

        setTotalReviews(totalCount);
        setAverageRating(average);

        // Second: Load showcase items for display (with before/after images)
        return axios.get('https://backend-is8n.onrender.com/api/showcase/');
      })
      .then((showcaseRes) => {
        const allShowcase = showcaseRes.data || [];

        // Only show showcase items that have feedback (for visual consistency)
        const validShowcase = allShowcase.filter((item: ShowcaseItem) =>
          item.feedback &&
          item.feedback.rating &&
          item.feedback.feedback_text &&
          item.feedback.user?.name
        );

        setReviews(validShowcase);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data:", err);
        setLoading(false);
      });
  }, []);

  const handleBack = () => {
    navigate('/');
    setTimeout(() => {
      const showcaseSection = document.getElementById('showcase');
      if (showcaseSection) showcaseSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const getRandomRotation = (index: number) => {
    const rotations = [-4, -3.5, -3, -2, 2, 3, 3.5, 4];
    return rotations[(index * 13) % rotations.length];
  };

  const getArrowVariation = (index: number) => {
    const horizontalVariations = [
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-orange-500 dark:text-orange-400 drop-shadow-lg">
        <path d="M15 80 Q 30 45, 50 70 Q 70 95, 90 65 Q 110 35, 130 75 Q 145 105, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 4" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 72 L 158 80 L 142 88 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-teal-500 dark:text-teal-400 drop-shadow-lg">
        <path d="M15 80 Q 35 115, 60 75 Q 85 35, 110 80 Q 135 125, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 75 L 158 80 L 140 85 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-blue-500 dark:text-blue-400 drop-shadow-lg">
        <path d="M15 80 Q 28 50, 42 80 Q 56 110, 72 70 Q 88 30, 104 75 Q 120 110, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 73 L 158 80 L 140 87 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-green-500 dark:text-green-400 drop-shadow-lg">
        <path d="M15 80 Q 33 105, 55 70 Q 77 35, 99 85 Q 121 125, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 74 L 158 80 L 140 86 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-pink-500 dark:text-pink-400 drop-shadow-lg">
        <path d="M15 80 Q 31 45, 50 78 Q 69 111, 88 68 Q 107 25, 126 78 Q 145 121, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 72 L 158 80 L 142 88 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="160" height="160" viewBox="0 0 160 160" fill="none" className="hidden md:block text-red-500 dark:text-red-400 drop-shadow-lg">
        <path d="M15 80 Q 26 100, 45 75 Q 64 50, 83 80 Q 102 110, 121 75 Q 140 50, 155 80" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />
        <circle cx="15" cy="80" r="5" fill="currentColor" />
        <path d="M 140 73 L 158 80 L 140 87 Z" fill="currentColor" />
      </svg>,
    ];

    const verticalVariations = [
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-orange-500 dark:text-orange-400 drop-shadow-lg">
        <path d="M65 15 Q 30 30, 55 50 Q 80 70, 60 90 Q 40 110, 65 125 Q 90 140, 75 155 L 80 170" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 4" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 72 160 L 80 173 L 88 160 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-teal-500 dark:text-teal-400 drop-shadow-lg">
        <path d="M65 15 Q 100 35, 75 60 Q 50 85, 75 105 Q 100 125, 80 145 Q 65 160, 75 170" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 3" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 70 165 L 75 178 L 80 165 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-blue-500 dark:text-blue-400 drop-shadow-lg">
        <path d="M65 15 Q 35 28, 52 50 Q 69 72, 52 92 Q 35 112, 60 130 Q 85 148, 70 165 L 73 173" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 68 168 L 73 181 L 78 168 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-green-500 dark:text-green-400 drop-shadow-lg">
        <path d="M65 15 Q 90 33, 70 55 Q 50 77, 70 95 Q 90 113, 65 135 Q 45 152, 60 165 L 65 173" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 2" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 60 168 L 65 181 L 70 168 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-pink-500 dark:text-pink-400 drop-shadow-lg">
        <path d="M65 15 Q 40 31, 58 53 Q 76 75, 58 93 Q 40 111, 63 128 Q 86 145, 72 162 L 78 173" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 73 168 L 78 181 L 83 168 Z" fill="currentColor" />
      </svg>,
      <svg key={index} width="130" height="180" viewBox="0 0 130 180" fill="none" className="block md:hidden text-red-500 dark:text-red-400 drop-shadow-lg">
        <path d="M65 15 Q 85 26, 65 45 Q 45 64, 65 80 Q 85 96, 65 115 Q 45 134, 65 150 L 68 173" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 3" />
        <circle cx="65" cy="15" r="5" fill="currentColor" />
        <path d="M 63 168 L 68 181 L 73 168 Z" fill="currentColor" />
      </svg>,
    ];

    return (
      <>
        {horizontalVariations[index % horizontalVariations.length]}
        {verticalVariations[index % verticalVariations.length]}
      </>
    );
  };

  // SKELETON LOADING STATE — REPLACED ONLY THIS PART
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        {/* Sticky Header - kept during loading */}
        <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </button>
            </div>
          </div>
        </div>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Header Skeleton */}
            <div className="text-center mb-12 space-y-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto animate-pulse" />
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto animate-pulse" />
            </div>

            {/* Stats Card Skeleton */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border-2 border-blue-100 dark:border-gray-700">
                <div className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg mb-8 animate-pulse" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse mx-auto" />
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-24 mx-auto animate-pulse" />
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32 mx-auto animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Reviews Grid Skeleton */}
            <SkeletonGrid count={6} />
          </div>
        </section>
      </motion.div>
    );
  }

  if (reviews.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="text-center px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-flex items-center justify-center w-24 h-24 bg-blue-100 dark:bg-blue-900/50 rounded-full mb-8"
          >
            <Quote className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            No reviews yet
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 font-mono">
            Be the first to share your success story!
          </p>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mt-8"
          >
            <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      {/* Sticky Header */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBack}
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Home
            </button>
          </div>
        </div>
      </div>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
              <Quote className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Client Success Stories
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
              Discover how we've helped our clients transform their ideas into reality
            </p>
          </motion.div>

          {/* Real Stats */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border-2 border-blue-100 dark:border-gray-700 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 dark:bg-blue-900/20 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-200 dark:bg-teal-900/20 rounded-full -ml-12 -mb-12 opacity-50"></div>
              <div className="relative z-10">
                <p className="text-center text-gray-700 dark:text-gray-300 font-mono mb-8 max-w-4xl mx-auto">
                  Hear what our clients say about their experience working with CADverse and the quality of our 3D modeling and prototyping services.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-3">
                      <Star className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{totalReviews}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Total Reviews</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-lg mb-3">
                      <TrendingUp className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{averageRating}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg mb-3">
                      <Sparkles className="w-8 h-8 text-green-600 dark:text-green-400" />
                    </div>
                    <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                      {totalReviews > 0 ? Math.round((averageRating / 5) * 100) : 0}%
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Satisfaction Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Reviews */}
          <div className="space-y-24">
            {Array.from({ length: Math.ceil(reviews.length / 2) }).map((_, rowIndex) => {
              const rowItems = reviews.slice(rowIndex * 2, rowIndex * 2 + 2);
              return (
                <div key={rowIndex} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                  {rowItems.map((item, colIndex) => {
                    const index = rowIndex * 2 + colIndex;
                    const feedback = item.feedback!;
                    const emojis = feedback.emojis?.trim().split(/\s+/) || [];

                    return (
                      <motion.div key={item.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: colIndex * 0.1 }} viewport={{ once: true }} className="space-y-6">

                        {/* Title */}
                        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }} className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-6 py-5 rounded-lg shadow-lg relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                          <h3 className="text-2xl font-bold relative z-10">{item.title || "CAD Project"}</h3>
                        </motion.div>

                        {/* Before / After */}
                        <div className="relative min-h-[300px] flex items-center justify-center">
                          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                            <motion.div initial={{ opacity: 0, scale: 0, rotate: -180 }} whileInView={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 0.8, delay: 0.4, type: "spring" }} viewport={{ once: true }}>
                              {getArrowVariation(index)}
                            </motion.div>
                          </div>

                          <div className="grid grid-cols-2 gap-6 w-full">
                            {/* BEFORE */}
                            <motion.div
                              initial={{ opacity: 0, x: -30, rotate: 0 }}
                              whileInView={{ opacity: 1, x: 0, rotate: getRandomRotation(index * 2) }}
                              whileHover={{ scale: 1.05, rotate: getRandomRotation(index * 2) + 2 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="relative group"
                            >
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-blue-400 dark:border-blue-500 rounded-tl-lg"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-blue-400 dark:border-blue-500 rounded-br-lg"></div>

                                {item.before_file?.includes('.mp4') || item.before_file?.includes('.webm') || item.before_file?.includes('.mov') ? (
                                  <video src={item.before_file} autoPlay loop muted playsInline className="w-full aspect-square object-cover rounded-md" />
                                ) : (
                                  <img src={item.before_file} alt="Before" className="w-full aspect-square object-cover rounded-md" onError={e => e.currentTarget.src = 'https://via.placeholder.com/400?text=Before'} />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end justify-center pb-3">
                                  <span className="text-white font-bold text-lg">Before</span>
                                </div>

                                <div className="mt-3 text-center">
                                  <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold rounded-full font-mono shadow-sm">BEFORE</span>
                                </div>
                              </div>
                            </motion.div>

                            {/* AFTER */}
                            <motion.div
                              initial={{ opacity: 0, x: 30, rotate: 0 }}
                              whileInView={{ opacity: 1, x: 0, rotate: -getRandomRotation(index * 2 + 1) }}
                              whileHover={{ scale: 1.05, rotate: -getRandomRotation(index * 2 + 1) - 2 }}
                              transition={{ duration: 0.6, delay: 0.2 }}
                              viewport={{ once: true }}
                              className="relative group"
                            >
                              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
                                <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-400 dark:border-green-500 rounded-tl-lg"></div>
                                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-400 dark:border-green-500 rounded-br-lg"></div>

                                {item.after_file?.includes('.mp4') || item.after_file?.includes('.webm') || item.after_file?.includes('.mov') ? (
                                  <video src={item.after_file} autoPlay loop muted playsInline className="w-full aspect-square object-cover rounded-md" />
                                ) : (
                                  <img src={item.after_file} alt="After" className="w-full aspect-square object-cover rounded-md" onError={e => e.currentTarget.src = 'https://via.placeholder.com/400?text=After'} />
                                )}

                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end justify-center pb-3">
                                  <span className="text-white font-bold text-lg">After</span>
                                </div>

                                <div className="mt-3 text-center">
                                  <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-bold rounded-full font-mono shadow-sm">AFTER</span>
                                </div>
                              </div>
                            </motion.div>
                          </div>
                        </div>

                        {/* Feedback Block */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden"
                        >
                          {/* Decorative Elements */}
                          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full -mr-16 -mt-16 opacity-50"></div>
                          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full -ml-12 -mb-12 opacity-50"></div>
                          <div className="absolute top-3 right-3"><Sparkles className="w-6 h-6 text-yellow-400 dark:text-yellow-300 animate-pulse" /></div>
                          <div className="absolute bottom-3 left-3"><Sparkles className="w-5 h-5 text-yellow-400 dark:text-yellow-300 animate-pulse" style={{ animationDelay: '0.5s' }} /></div>
                          <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" className="text-pink-300 dark:text-pink-500 opacity-40">
                              <path d="M5 15 Q 10 8, 15 15 Q 20 22, 25 15" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
                            </svg>
                          </div>
                          <div className="absolute bottom-8 right-8">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-blue-300 dark:text-blue-500 opacity-40">
                              <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
                              <circle cx="10" cy="10" r="3" fill="currentColor" />
                            </svg>
                          </div>

                          <div className="relative z-10">
                            <div className="mb-4">
                              <div className="font-bold text-2xl text-gray-900 dark:text-white mb-1">{feedback.user.name}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Client Project</div>
                            </div>
                            <div className="relative mb-4">
                              <span className="absolute -top-2 -left-2 text-5xl text-blue-400 dark:text-blue-500 opacity-50 font-serif">"</span>
                              <p className="text-gray-700 dark:text-gray-300 font-mono italic pl-6">{feedback.feedback_text}</p>
                            </div>
                            <div className="flex gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <span key={i} className="text-2xl drop-shadow-md">
                                  {i < feedback.rating ? '⭐' : '☆'}
                                </span>
                              ))}
                            </div>
                            {emojis.length > 0 && (
                              <div className="flex gap-2">
                                {emojis.map((e, i) => (
                                  <span key={i} className="text-2xl drop-shadow-lg" style={{ animation: 'bounce 1.5s infinite', animationDelay: `${i * 100}ms` }}>
                                    {e}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
};

export default Reviews;