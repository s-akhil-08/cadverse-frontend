import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, ArrowRight, Tag, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Project } from '../data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleViewDetails = () => {
    navigate(`/projects/${project.slug}`);
  };

  const visibleTechCount = 3;
  const remainingTechCount = project.technologies.length - visibleTechCount;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden sketch-shadow dark:sketch-shadow-dark hover:shadow-2xl dark:hover:shadow-2xl transition-all duration-500 group cursor-pointer transform hover:-translate-y-2"
      onClick={handleViewDetails}
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-56">
        <div className={`absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        <img
          src={project.thumbnail}
          alt={project.title}
          className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600/90 dark:bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg">
            {project.category}
          </span>
        </div>

        {/* Date Badge */}
        <div className="absolute top-4 right-4">
          <div className="flex items-center gap-1.5 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium shadow-lg">
            <Calendar className="w-3.5 h-3.5" />
            {project.date}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Quick Action Button */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-900 dark:text-white p-2.5 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 font-mono text-sm mb-4 line-clamp-3 leading-relaxed">
          {project.shortDescription}
        </p>

        {/* Technology Tags */}
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Tag className="w-3.5 h-3.5 text-gray-500 dark:text-gray-400" />
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
              Technologies
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, visibleTechCount).map((tech, techIndex) => (
              <span
                key={techIndex}
                className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md text-xs font-medium border border-gray-200 dark:border-gray-700"
              >
                {tech}
              </span>
            ))}
            {remainingTechCount > 0 && (
              <span className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md text-xs font-medium border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                <Plus className="w-3 h-3" />
                {remainingTechCount} more
              </span>
            )}
          </div>
        </div>

        {/* Action Button */}
        <button 
          onClick={(e) => {
            e.stopPropagation();
            handleViewDetails();
          }}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg hover:shadow-xl"
        >
          View Project Details
          <div className="relative w-5 h-5">
            {/* Arrow Icon */}
            <ArrowRight className="absolute inset-0 w-5 h-5 group-hover/btn:opacity-0 group-hover/btn:scale-75 transition-all duration-300" />
            
            {/* Drawing Tool Icon - Different for each project */}
            {project.id % 3 === 1 ? (
              // Ruler for projects 1, 4, etc.
              <svg 
                className="absolute inset-0 w-5 h-5 opacity-0 scale-125 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-300"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <rect x="3" y="10" width="18" height="4" rx="1" className="group-hover/btn:fill-orange-200 group-hover/btn:animate-pulse transition-all duration-300" />
                <path d="M6 10v4M9 10v2M12 10v4M15 10v2M18 10v4" className="group-hover/btn:stroke-orange-100 transition-all duration-300" />
              </svg>
            ) : project.id % 3 === 2 ? (
              // Pencil for projects 2, 5, etc.
              <svg 
                className="absolute inset-0 w-5 h-5 opacity-0 scale-125 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-300"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" className="group-hover/btn:fill-yellow-200 group-hover/btn:drop-shadow-sm transition-all duration-300" />
                <path d="m15 5 4 4" className="group-hover/btn:stroke-yellow-100 group-hover/btn:animate-pulse transition-all duration-300" />
              </svg>
            ) : (
              // Triangle Scale for projects 3, 6, etc.
              <svg 
                className="absolute inset-0 w-5 h-5 opacity-0 scale-125 group-hover/btn:opacity-100 group-hover/btn:scale-100 transition-all duration-300"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2L2 20h20L12 2z" className="group-hover/btn:fill-green-200 transition-all duration-300" />
                <path d="M12 8v8M8 16h8M10 12h4" className="group-hover/btn:stroke-green-100 group-hover/btn:animate-pulse transition-all duration-300" />
              </svg>
            )}
          </div>
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;