import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const ProjectsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { projects, setProjects } = useAuth();

  const gearRotateClockwise = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearRotateCounterClockwise = {
    animate: {
      rotate: [360, 0],
      transition: {
        duration: 15,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  useEffect(() => {
    const eventSource = new EventSource('https://backend-ak.vercel.app/api/project-status-stream/');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setProjects((prevProjects) =>
        prevProjects.map((project) =>
          project.id === data.id ? { ...project, status: data.status } : project
        )
      );
    };
    eventSource.onerror = () => {
      console.error('SSE error occurred');
      eventSource.close();
    };
    return () => {
      eventSource.close();
    };
  }, [setProjects]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'In Review':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'Submitted':
        return <FileText className="w-5 h-5 text-gray-500" />;
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
      case 'Submitted':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-40 dark:opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(156, 163, 175, 0.3) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(156, 163, 175, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>
      <div className="absolute inset-0 opacity-0 dark:opacity-15">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(75, 85, 99, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(75, 85, 99, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-20"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-32 h-32 text-blue-400/30 dark:text-blue-300/20" strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute top-32 right-24"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-28 h-28 text-purple-400/30 dark:text-purple-300/20" strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-32"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-36 h-36 text-teal-400/30 dark:text-teal-300/20" strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-32"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-30 h-30 text-orange-400/30 dark:text-orange-300/20" strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute top-16 left-1/2 transform -translate-x-1/2"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-24 h-24 text-indigo-400/30 dark:text-indigo-300/20" strokeWidth={1} />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-1/2 transform -translate-x-1/2"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-26 h-26 text-pink-400/30 dark:text-pink-300/20" strokeWidth={1} />
        </motion.div>
      </div>
      <DashboardHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            All Projects
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-mono">
            Complete overview of all your uploaded projects and their current status.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => navigate(`/projectprogress/${project.id}`)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getStatusIcon(project.status)}
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {project.name}
                  </h3>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  <Calendar className="w-4 h-4" />
                  Submitted: {formatDate(project.submittedDate)}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 font-mono">
                  <FileText className="w-4 h-4" />
                  Type: {project.type}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600 dark:text-gray-400">Progress</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {project.status === 'Completed' ? '100%' :
                     project.status === 'In Progress' ? '60%' :
                     project.status === 'In Review' ? '30%' :
                     project.status === 'Submitted' ? '0%' : '0%'}
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      project.status === 'Completed' ? 'bg-green-500 w-full' :
                      project.status === 'In Progress' ? 'bg-blue-500 w-3/5' :
                      project.status === 'In Review' ? 'bg-yellow-500 w-1/3' :
                      project.status === 'Submitted' ? 'bg-gray-500 w-0' : 'bg-gray-500 w-0'
                    }`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        {projects.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Projects Yet
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-6">
              Upload your first project to get started with CADverse.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Upload Project
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsListPage;
