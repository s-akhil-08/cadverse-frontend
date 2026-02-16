import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';
import { projects } from '../data/projects';

const Projects: React.FC = () => {
  const navigate = useNavigate();
  const displayedProjects = projects.slice(0, 6);
  const hasMoreProjects = projects.length > 6;

  const handleSeeAllProjects = () => {
    navigate('/all-projects');
  };

  return (
    <section id="projects" className="py-20 grid-bg dark:grid-bg-dark bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Projects
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-mono">
            Explore our recent projects showcasing creativity, innovation, and 
            impactful design solutions across multiple industries.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* See All Projects Button */}
        {hasMoreProjects && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <button
              onClick={handleSeeAllProjects}
              className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 group"
            >
              See All Projects
              <span className="bg-white/20 px-2 py-1 rounded-full text-sm">
                {projects.length} Projects
              </span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;
