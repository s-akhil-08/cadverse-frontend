import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, AlertCircle, Calendar, FileText, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProjectProgress: React.FC = () => {
  const { projects } = useAuth();
  const navigate = useNavigate();
  const [isCreatingProject, setIsCreatingProject] = useState(false);

  const handleNewProject = () => {
    // Navigate to upload section in dashboard
    const uploadSection = document.querySelector('[data-section="upload"]');
    if (uploadSection) {
      uploadSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      // Add highlight effect
      uploadSection.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
      setTimeout(() => {
        uploadSection.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
      }, 3000);
    }
    
    // Also trigger the upload tab in dashboard
    const event = new CustomEvent('switchToUpload');
    window.dispatchEvent(event);
  };

  const handleShowFullProjects = () => {
    navigate('/projects-list');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'In Review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <FileText className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'In Review':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/project-progress/${projectId}`);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Project Progress
        </h2>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
          {projects.length} total projects
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400 font-mono">
            No projects yet. Upload your first project to get started!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.slice(0, 4).map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {getStatusIcon(project.status)}
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {project.name}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 font-mono">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(project.submittedDate)}
                    </div>
                    <div className="flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      {project.type}
                    </div>
                  </div>
                </div>
                
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </motion.div>
          ))}
          
          {/* Show Full Projects Button */}
          {projects.length > 4 && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: projects.length * 0.1 }}
              onClick={handleShowFullProjects}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-400 hover:border-blue-400 dark:hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium"
            >
              Show Full Projects ({projects.length - 4} more)
            </motion.button>
          )}
        </div>
      )}

      {/* New Project Button */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <button
          onClick={handleNewProject}
          disabled={isCreatingProject}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 bg-blue-600 dark:bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isCreatingProject ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Creating...
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              New Project
            </>
          )}
        </button>
      </div>
      {/* Project Statistics */}
      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {projects.filter(p => p.status === 'Completed').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              Completed
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {projects.filter(p => p.status === 'In Progress').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              In Progress
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
              {projects.filter(p => p.status === 'In Review').length}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              In Review
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectProgress;