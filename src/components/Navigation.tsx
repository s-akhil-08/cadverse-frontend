import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ThemeToggle from './ThemeToggle';

const Navigation: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // const scrollToSection = (sectionId: string) => {
  //   const element = document.getElementById(sectionId);
  //   if (element) {
  //     element.scrollIntoView({ behavior: 'smooth' });
  //   }
  //   setIsMobileMenuOpen(false);
  // };
  const scrollToSection = (sectionId: string) => {
    // If already on homepage
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      // If inside dashboard or any other page → send event to homepage
      window.dispatchEvent(
        new CustomEvent("scrollToHomepageSection", { detail: { sectionId } })
      );
    }

    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: 'About', id: 'about' },
    // { label: 'Work', id: 'projects' },
    { label: 'How It Works', id: 'how-it-works' },
    { label: 'Showcase', id: 'showcase' },
    { label: 'Services', id: 'services' },
    // { label: 'Feedback', id: 'feedback' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-white/20 dark:border-gray-700/20 shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            {/* <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="/images/Logo.svg" />
            </svg> */}
            <span className="font-mono text-xl font-bold text-gray-900 dark:text-white">
              CADverse
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all duration-200 group-hover:w-full"></span>
              </button>
            ))}
            
            {/* Auth Button */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
              >
                Login / Sign Up
              </Link>
            )}
            
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button and Theme Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100/80 dark:hover:bg-gray-800/80 transition-colors backdrop-blur-sm"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-900 dark:text-white" />
              ) : (
                <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden py-4 border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-md bg-white/90 dark:bg-gray-900/90"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left px-4 py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50/80 dark:hover:bg-gray-800/80 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
            
            {/* Mobile Auth Button */}
            {isAuthenticated ? (
              <Link
                to="/dashboard"
                className="block w-full text-left px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                to="/login"
                className="block w-full text-left px-4 py-3 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 font-medium"
              >
                Login / Sign Up
              </Link>
            )}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};

export default Navigation;