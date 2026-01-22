import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface Feedback {
  user: string;
  project: string;
  rating: number;
  feedback_text: string;
  emojis: string;
}

const FeedbackBlock: React.FC<{ feedback: Feedback | null }> = ({ feedback }) => {
  if (!feedback) return null;
  const emojis = feedback.emojis ? feedback.emojis.trim().split(/\s+/) : [];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg shadow-lg border-2 border-gray-200 dark:border-gray-700 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 dark:bg-white/5 rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 dark:bg-white/5 rounded-full -ml-12 -mb-12 opacity-50"></div>
      <div className="absolute top-3 right-3">
        <Sparkles className="w-6 h-6 text-yellow-400 dark:text-yellow-300 animate-pulse" />
      </div>
      <div className="absolute bottom-3 left-3">
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
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
          <div className="font-bold text-2xl text-gray-900 dark:text-white mb-1">{feedback.user}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">{feedback.project}</div>
        </div>
        <div className="relative mb-4">
          <span className="absolute -top-2 -left-2 text-5xl text-blue-400 dark:text-blue-500 opacity-50 font-serif">"</span>
          <p className="text-gray-700 dark:text-gray-300 font-mono italic pl-6">{feedback.feedback_text}</p>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-2xl drop-shadow-md">
                {i < feedback.rating ? '⭐' : '☆'}
              </span>
            ))}
          </div>

          <span className="text-sm text-gray-600">
            {feedback.rating}/5
          </span>
        </div>

        {emojis.length > 0 && (
          <div className="flex items-center gap-2">
            {emojis.map((emoji, i) => (
              <span
                key={i}
                className="text-2xl drop-shadow-lg"
                style={{ animation: 'bounce 1.5s infinite', animationDelay: `${i * 100}ms` }}
              >
                {emoji}
              </span>
            ))}
          </div>
        )}
      </div>
      <style jsx>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </motion.div>
  );
};

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

const ProjectShowcase: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const [showcaseItems, setShowcaseItems] = useState<ShowcaseItem[]>([]);
  const [totalFeedbacks, setTotalFeedbacks] = useState(0);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
    // 🔽 Added Section – Handles Scroll Coming From Navigation
  useEffect(() => {
    const handleScrollTrigger = (e: any) => {
      if (e.detail?.sectionId) {
        const targetElement = document.getElementById(e.detail.sectionId);
        if (targetElement) {
          setTimeout(() => {
            targetElement.scrollIntoView({ behavior: "smooth" });
          }, 150);
        }
      }
    };

    window.addEventListener("scrollToHomepageSection", handleScrollTrigger);

    return () => {
      window.removeEventListener("scrollToHomepageSection", handleScrollTrigger);
    };
  }, []);


  useEffect(() => {
    axios
      .get('https://backend-is8n.onrender.com/api/feedback/')
      .then((res) => {
        const allFeedback = res.data || [];
        const approvedFeedback = allFeedback.filter((fb: any) => fb.is_approved);
        const validRatings = approvedFeedback
          .map((fb: any) => fb.rating)
          .filter((r: any): r is number => typeof r === 'number' && r >= 1 && r <= 5);
        const totalCount = validRatings.length;
        const average = totalCount > 0
          ? Number((validRatings.reduce((a: number, b: number) => a + b, 0) / totalCount).toFixed(1))
          : 0;
        setTotalFeedbacks(totalCount);
        setAverageRating(average);

        axios.get('https://backend-is8n.onrender.com/api/showcase/')
          .then((showcaseRes) => {
            const showcaseData = showcaseRes.data || [];
            const itemsWithFeedback = showcaseData.filter((item: ShowcaseItem) => item.feedback);
            setShowcaseItems(itemsWithFeedback.slice(0, 4));
          });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load feedback:", err);
        setLoading(false);
      });
  }, []);

  const getRandomRotation = (index: number) => {
    const rotations = [-4, -3, -2, 2, 3, 4];
    return rotations[(index * 7) % rotations.length];
  };

  const getSpiralArrow = (index: number) => (
    <svg width="140" height="140" viewBox="0 0 140 140" fill="none" className="hidden md:block text-orange-500 dark:text-orange-400 drop-shadow-lg">
      <path d="M20 70 C20 50, 35 40, 50 50 C65 60, 65 75, 55 85 C45 95, 30 95, 25 85 C20 75, 25 65, 35 60 C50 52, 70 55, 85 65 C95 72, 100 80, 110 85 L125 85" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="20" cy="70" r="4" fill="currentColor" />
      <path d="M115 80 L128 85 L115 90 Z" fill="currentColor" />
    </svg>
  );

  const handleWriteFeedback = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      navigate('/dashboard');
      setTimeout(() => {
        const event = new CustomEvent('switchToFeedback');
        window.dispatchEvent(event);
      }, 100);
    }
  };

  if (loading) {
    return (
      <section id="showcase" className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-6 animate-pulse">
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg w-96 mx-auto"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-80 mx-auto"></div>
          </div>
          <div className="mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-lg p-8 border-2 border-blue-100 dark:border-gray-700 relative overflow-hidden animate-pulse">
              <div className="space-y-8">
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-lg w-3/4 mx-auto"></div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="text-center space-y-4">
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg mx-auto"></div>
                      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg w-20 mx-auto"></div>
                      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded-lg w-32 mx-auto"></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-24">
            {[1, 2].map((row) => (
              <div key={row} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {[1, 2].map((col) => (
                  <div key={col} className="space-y-6 animate-pulse">
                    <div className="h-16 bg-gradient-to-r from-blue-600/20 to-blue-700/20 dark:from-blue-500/20 dark:to-blue-600/20 rounded-lg"></div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-4 border-gray-100 dark:border-gray-700">
                          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                          <div className="mt-3 h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mx-auto"></div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border-4 border-gray-100 dark:border-gray-700">
                          <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                          <div className="mt-3 h-8 bg-gray-200 dark:bg-gray-700 rounded-full w-20 mx-auto"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg border-2 border-gray-200 dark:border-gray-700 space-y-6">
                      <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
                      <div className="space-y-3">
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
                      </div>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                          <div key={i} className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="showcase" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">Transformation Showcase</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            See how we transform rough sketches into production-ready prototypes
          </p>
        </motion.div>

        {/* Stats Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="mb-16"
        >
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
                    <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{totalFeedbacks}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Total Reviews</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 dark:bg-teal-900/30 rounded-lg mb-3">
                    <Sparkles className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{averageRating || '0.0'}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Average Rating</div>
                </div>
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-lg mb-3">
                    <Sparkles className="w-8 h-8 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
                    {totalFeedbacks > 0 ? Math.round((averageRating / 5) * 100) : 0}%
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 font-mono">Satisfaction Rate</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Showcase Grid */}
        <div className="space-y-24">
          {Array.from({ length: Math.ceil(showcaseItems.length / 2) }).map((_, rowIndex) => (
            <div key={`row-${rowIndex}`} className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {showcaseItems.slice(rowIndex * 2, rowIndex * 2 + 2).map((item, colIndex) => {
                const index = rowIndex * 2 + colIndex;
                const beforeRotation = getRandomRotation(index * 2);
                const afterRotation = -getRandomRotation(index * 2 + 1);
                const feedbackData = item.feedback ? {
                  user: item.feedback.user.name,
                  project: item.title || "CAD Project",
                  rating: item.feedback.rating || 5,
                  feedback_text: item.feedback.feedback_text || "Amazing work!",
                  emojis: item.feedback.emojis || "amazing"
                } : null;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: colIndex * 0.2 }}
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
                      <h3 className="text-2xl font-bold relative z-10">{item.title || "Untitled Project"}</h3>
                    </motion.div>
                    <div className="relative min-h-[300px] flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                        <motion.div
                          initial={{ opacity: 0, scale: 0, rotate: -180 }}
                          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
                          viewport={{ once: true }}
                        >
                          {getSpiralArrow(index)}
                        </motion.div>
                      </div>
                      <div className="grid grid-cols-2 gap-6 w-full">
                        {/* BEFORE */}
                        <motion.div
                          initial={{ opacity: 0, x: -30, rotate: 0 }}
                          whileInView={{ opacity: 1, x: 0, rotate: beforeRotation }}
                          whileHover={{ scale: 1.05, rotate: beforeRotation + 2 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="relative group"
                        >
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
                            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-blue-400 dark:border-blue-500 rounded-tl-lg"></div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-blue-400 dark:border-blue-500 rounded-br-lg"></div>
                            {item.before_file && (item.before_file.includes('.mp4') || item.before_file.includes('.webm') || item.before_file.includes('.mov')) ? (
                              <video src={item.before_file} autoPlay loop muted playsInline className="w-full aspect-square object-cover rounded-md" />
                            ) : (
                              <img src={item.before_file} alt="Before" className="w-full aspect-square object-cover rounded-md" onError={e => e.currentTarget.src = 'https://via.placeholder.com/400?text=Before'} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end justify-center pb-3">
                              <span className="text-white font-bold text-lg">Before</span>
                            </div>
                            <div className="mt-3 text-center">
                              <span className="inline-block px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-bold rounded-full font-mono shadow-sm">
                                BEFORE
                              </span>
                            </div>
                          </div>
                        </motion.div>
                        {/* AFTER */}
                        <motion.div
                          initial={{ opacity: 0, x: 30, rotate: 0 }}
                          whileInView={{ opacity: 1, x: 0, rotate: afterRotation }}
                          whileHover={{ scale: 1.05, rotate: afterRotation - 2 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                          viewport={{ once: true }}
                          className="relative group"
                        >
                          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.4)] border-4 border-gray-100 dark:border-gray-700 relative">
                            <div className="absolute -top-2 -left-2 w-6 h-6 border-l-4 border-t-4 border-green-400 dark:border-green-500 rounded-tl-lg"></div>
                            <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-4 border-b-4 border-green-400 dark:border-green-500 rounded-br-lg"></div>
                            {item.after_file && (item.after_file.includes('.mp4') || item.after_file.includes('.webm') || item.after_file.includes('.mov')) ? (
                              <video src={item.after_file} autoPlay loop muted playsInline className="w-full aspect-square object-cover rounded-md" />
                            ) : (
                              <img src={item.after_file} alt="After" className="w-full aspect-square object-cover rounded-md" onError={e => e.currentTarget.src = 'https://via.placeholder.com/400?text=After'} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md flex items-end justify-center pb-3">
                              <span className="text-white font-bold text-lg">After</span>
                            </div>
                            <div className="mt-3 text-center">
                              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 text-sm font-bold rounded-full font-mono shadow-sm">
                                AFTER
                              </span>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                    </div>
                    <FeedbackBlock feedback={feedbackData} />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* BUTTONS SECTION */}
        <div className="mt-20">
          {totalFeedbacks >= 4 || showcaseItems.length > 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                {totalFeedbacks >= 5 && (
                  <button
                    onClick={() => navigate('/reviews')}
                    className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-10 py-5 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl group transform hover:-translate-y-1"
                  >
                    See All Reviews
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                  </button>
                )}
                <button
                  onClick={handleWriteFeedback}
                  className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-500 text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
                >
                  <MessageSquare className="w-5 h-5" />
                  Write Feedback
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <button
                onClick={handleWriteFeedback}
                className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-500 text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
              >
                <MessageSquare className="w-5 h-5" />
                Write Feedback
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </motion.div>
          )}
        </div>

        {/* AUTH MODAL */}
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          message="Authentication Required. Please log in or sign up to write a review."
        />
      </div>
    </section>
  );
};

export default ProjectShowcase;