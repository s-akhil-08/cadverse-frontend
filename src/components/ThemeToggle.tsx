import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <motion.div
        initial={false}
        animate={{
          rotate: isDarkMode ? 0 : 180,
          scale: isDarkMode ? 0.8 : 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {isDarkMode ? (
          <Moon className="w-5 h-5 text-blue-400" style={{ transform: 'scaleX(-1)' }} />
        ) : (
          <Sun className="w-5 h-5 text-orange-500" />
        )}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;