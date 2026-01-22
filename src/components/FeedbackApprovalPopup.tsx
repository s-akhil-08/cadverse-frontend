import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FeedbackApprovalPopupProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  feedbackId: number;
}

interface ConfettiParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
  rotation: number;
  type: 'circle' | 'square' | 'rectangle';
  source: 'top' | 'left' | 'right';
}

const FeedbackApprovalPopup: React.FC<FeedbackApprovalPopupProps> = ({
  isOpen,
  onClose,
  projectName,
  feedbackId,
}) => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    const colors = [
      'from-blue-400 to-blue-600',
      'from-blue-300 to-blue-500',
      'from-slate-300 to-slate-500',
      'from-blue-500 to-blue-700',
      'from-slate-400 to-slate-600',
      'from-blue-200 to-blue-400',
    ];

    /** 🔽 TOP CONFETTI (YOUR ORIGINAL BEHAVIOR) */
    const topConfetti: ConfettiParticle[] = Array.from(
      { length: 140 },
      (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.2,
        duration: 3.5 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: ['circle', 'square', 'rectangle'][
          Math.floor(Math.random() * 3)
        ] as 'circle' | 'square' | 'rectangle',
        source: 'top',
      })
    );

    /** 🔽 SIDE CONFETTI (ADDED – STARTS AFTER TOP) */
    const sideConfetti: ConfettiParticle[] = Array.from(
      { length: 80 },
      (_, i) => ({
        id: 1000 + i,
        left: Math.random() * 100,
        delay: 1.4 + Math.random() * 0.4, // ⏱ after top finishes
        duration: 3.5 + Math.random() * 2.5,
        size: 6 + Math.random() * 8,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        type: ['circle', 'square', 'rectangle'][
          Math.floor(Math.random() * 3)
        ] as 'circle' | 'square' | 'rectangle',
        source: Math.random() > 0.5 ? 'left' : 'right',
      })
    );

    setConfetti([...topConfetti, ...sideConfetti]);
  }, [isOpen]);

  const handleViewOnWebsite = () => {
    onClose();
    navigate('/reviews');
  };

  const renderConfettiShape = (particle: ConfettiParticle) => {
    if (particle.type === 'circle') {
      return (
        <div
          className={`bg-gradient-to-r ${particle.color} rounded-full`}
          style={{ width: particle.size, height: particle.size }}
        />
      );
    }

    if (particle.type === 'square') {
      return (
        <div
          className={`bg-gradient-to-r ${particle.color}`}
          style={{ width: particle.size, height: particle.size }}
        />
      );
    }

    return (
      <div
        className={`bg-gradient-to-r ${particle.color}`}
        style={{
          width: particle.size * 1.5,
          height: particle.size * 0.5,
        }}
      />
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-hidden">
          {/* Backdrop (UNCHANGED) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* CONFETTI LAYER (EXTENDED, NOT REPLACED) */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {confetti.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{
                  y:
                    particle.source === 'top'
                      ? window.innerHeight * -0.2
                      : Math.random() * window.innerHeight,
                  x:
                    particle.source === 'left'
                      ? -100
                      : particle.source === 'right'
                      ? window.innerWidth + 100
                      : 0,
                  opacity: 1,
                  rotate: 0,
                }}
                animate={{
                  y:
                    particle.source === 'top'
                      ? window.innerHeight * 1.2
                      : (Math.random() - 0.5) * window.innerHeight,
                  x:
                    particle.source === 'top'
                      ? (Math.random() - 0.5) *
                        window.innerWidth *
                        0.6
                      : particle.source === 'left'
                      ? window.innerWidth * 0.6
                      : -window.innerWidth * 0.6,
                  opacity: 0,
                  rotate:
                    particle.rotation +
                    (Math.random() > 0.5 ? 360 : -360),
                }}
                transition={{
                  duration: particle.duration,
                  delay: particle.delay,
                  ease: 'easeIn',
                }}
                className="absolute"
                style={{
                  left: `${particle.left}%`,
                  top: particle.source === 'top' ? '-20px' : '50%',
                }}
              >
                {renderConfettiShape(particle)}
              </motion.div>
            ))}
          </div>

          {/* POPUP CARD — 100% YOUR ORIGINAL */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="relative z-20 max-w-md w-full pointer-events-auto"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-100 dark:border-gray-800">
              <div className="relative p-8 sm:p-10">
                {/* Sparkles animation UNTOUCHED */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="flex items-center justify-center gap-3 mb-6"
                >
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </motion.div>

                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                    Holla!
                  </h2>

                  <motion.div
                    animate={{ rotate: [0, 10, -10, 10, 0] }}
                    transition={{
                      duration: 0.6,
                      delay: 0.5,
                      repeat: Infinity,
                      repeatDelay: 2,
                    }}
                  >
                    <Sparkles className="w-8 h-8 text-blue-500" />
                  </motion.div>
                </motion.div>

                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  className="text-center text-gray-700 dark:text-gray-300 mb-8 text-base sm:text-lg leading-relaxed"
                >
                  Your feedback for{' '}
                  <span className="font-bold text-gray-900 dark:text-white bg-blue-50 dark:bg-gray-800 px-2 py-1 rounded">
                    {projectName}
                  </span>{' '}
                  is approved and now live on our website!
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="flex gap-3"
                >
                  <button
                    onClick={handleViewOnWebsite}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View on Website
                  </button>

                  <button
                    onClick={onClose}
                    className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center active:scale-95"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default FeedbackApprovalPopup;
