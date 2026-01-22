import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/projects';

const AllProjectsPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/', { replace: true });
    setTimeout(() => {
      const element = document.getElementById('projects');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

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
                All Projects
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                {projects.length} Projects
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Header section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 grid-bg dark:grid-bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              All Projects
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono leading-relaxed">
              Explore our complete portfolio showcasing creativity, innovation, and 
              impactful design solutions across multiple industries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AllProjectsPage;