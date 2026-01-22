import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, FileText, Clock, CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardHeader from '../components/dashboard/DashboardHeader';

const ProjectProgressPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const { projects } = useAuth();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Gear rotation animations
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
    // First, check if the project exists in context
    const found = projects.find(p => String(p.id) === String(projectId));
    if (found) {
      setProject(found);
      setLoading(false);
    } else {
      // If not found, fetch it directly from backend using project_detail API
      fetch(`https://backend-ak.vercel.app/projects/${projectId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem("authToken")}`
        }
      })
        .then(res => {
          if (!res.ok) throw new Error("Project not found");
          return res.json();
        })
        .then(data => setProject(data))
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }

    // Subscribe to SSE for real-time status updates
    const eventSource = new EventSource('https://backend-ak.vercel.app/api/project-status-stream/');
    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (String(data.id) === String(projectId)) {
        setProject((prev: any) => prev ? { ...prev, status: data.status } : prev);
      }
    };
    eventSource.onerror = () => {
      console.error('SSE error occurred');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [projects, projectId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Enhanced Grid Background */}
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
        
        {/* Dark mode grid overlay */}
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
        <p className="text-gray-500 dark:text-gray-400">Loading project...</p>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
        {/* Enhanced Grid Background */}
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
        
        {/* Dark mode grid overlay */}
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
        <DashboardHeader />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="text-center py-16">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Project Not Found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 font-mono mb-6">
              The project you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="w-8 h-8 text-green-500" />;
      case 'In Progress':
        return <Clock className="w-8 h-8 text-blue-500" />;
      case 'In Review':
        return <AlertCircle className="w-8 h-8 text-yellow-500" />;
      default:
        return <FileText className="w-8 h-8 text-gray-500" />;
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

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'Completed':
        return 100;
      case 'In Progress':
        return 60;
      case 'In Review':
        return 30;
      default:
        return 0;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const progressSteps = [
    { name: 'Submitted', completed: true },
    { name: 'In Review', completed: project.status === 'In Review' || project.status === 'In Progress' || project.status === 'Completed' },
    { name: 'In Progress', completed: project.status === 'In Progress' || project.status === 'Completed' },
    { name: 'Completed', completed: project.status === 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Enhanced Grid Background */}
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
      
      {/* Dark mode grid overlay */}
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

      {/* Floating Gears Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gear 1 - Top Left */}
        <motion.div 
          className="absolute top-20 left-20"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-32 h-32 text-blue-400/30 dark:text-blue-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 2 - Top Right */}
        <motion.div 
          className="absolute top-32 right-24"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-28 h-28 text-purple-400/30 dark:text-purple-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 3 - Bottom Left */}
        <motion.div 
          className="absolute bottom-32 left-32"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-36 h-36 text-teal-400/30 dark:text-teal-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 4 - Bottom Right */}
        <motion.div 
          className="absolute bottom-20 right-32"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-30 h-30 text-orange-400/30 dark:text-orange-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 5 - Center Top */}
        <motion.div 
          className="absolute top-16 left-1/2 transform -translate-x-1/2"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-24 h-24 text-indigo-400/30 dark:text-indigo-300/20" strokeWidth={1} />
        </motion.div>
        
        {/* Gear 6 - Center Bottom */}
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
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Dashboard
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {project.name}
              </h1>
              <div className="flex items-center space-x-2">
                {getStatusIcon(project.status)}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">{project.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <Calendar className="w-5 h-5" />
                  <span>Submitted: {formatDate(project.submittedDate || project.created_at)}</span>
                </div>
              </div>
              <div>
                <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
                  <FileText className="w-5 h-5" />
                  <span>Type: {project.type}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Progress
            </h2>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                    <motion.div
                      className="bg-blue-600 h-2.5 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(project.status)}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                {progressSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div
                      className={`w-4 h-4 rounded-full mx-auto mb-2 ${
                        step.completed ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    />
                    <span>{step.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectProgressPage;
