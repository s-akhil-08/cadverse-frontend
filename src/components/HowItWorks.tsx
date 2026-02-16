import React from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { UserPlus, LogIn, Upload, Activity, Mail, MessageCircle } from 'lucide-react';

const FeatureCard: React.FC<{
  feature: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    emoji: string;
  };
  index: number;
}> = ({ feature, index }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [30, -30]);
  const rotateY = useTransform(x, [-100, 100], [-30, 30]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="perspective-1000"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        className="text-center group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 cursor-pointer transform-gpu"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-200">
          <feature.icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-2xl mb-2">{feature.emoji}</div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {feature.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-mono">
          {feature.description}
        </p>
      </motion.div>
    </motion.div>
  );
};

const HowItWorks: React.FC = () => {
  const features = [
    {
      icon: UserPlus,
      title: 'Sign Up',
      description: 'Create your account in just a few clicks and join our platform.',
      emoji: '🚀',
    },
    {
      icon: LogIn,
      title: 'Log In',
      description: 'Securely log in to access your personalized dashboard.',
      emoji: '🔐',
    },
    {
      icon: Upload,
      title: 'Upload Your Project',
      description: 'Easily upload your sketches, designs, or files for review.',
      emoji: '📁',
    },
    {
      icon: Activity,
      title: 'Track Project Status',
      description: 'Monitor your project\'s progress and stay updated in real time.',
      emoji: '📊',
    },
    {
      icon: Mail,
      title: 'Give Your Feedback',
      description: 'Tell us what you think anytime—your feedback helps us grow.',
      emoji: '📝',
    },

    {
      icon: MessageCircle,
      title: 'Contact Us',
      description: 'For updates or questions, reach out anytime through our contact form.',
      emoji: '💬',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            Get started with CADverse in just a few simple steps. From account creation 
            to project completion, we've made the process seamless and intuitive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              feature={feature}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
