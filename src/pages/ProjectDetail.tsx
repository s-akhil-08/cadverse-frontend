import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ExternalLink, 
  Calendar, 
  Tag, 
  Quote, 
  ChevronLeft, 
  ChevronRight, 
  Github,
  Star,
  Zap
} from 'lucide-react';
import { projects } from '../data/projects';
import Navigation from '../components/Navigation';

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  const project = projects.find(p => p.slug === slug);

  useEffect(() => {
    // Simulate loading state
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to projects section when navigating back
    const handleBackNavigation = () => {
      navigate('/', { replace: true });
      setTimeout(() => {
        const element = document.getElementById('projects');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    };

    // Store the function for cleanup
    window.handleBackNavigation = handleBackNavigation;
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 dark:border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-mono">Loading project details...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.gallery.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.gallery.length) % project.gallery.length);
  };

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
      {/* Fixed Navigation */}
      <Navigation />

      {/* Sticky Project Navigation */}
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
              Back to Projects
            </button>
            
            <div className="flex items-center gap-3">
              <span className="bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full text-sm font-medium">
                {project.category}
              </span>
              <div className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                Project Details
              </div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                {project.category}
              </span>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm font-mono">
                <Calendar className="w-4 h-4" />
                {project.date}
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              {project.title}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto font-mono leading-relaxed">
              {project.shortDescription}
            </p>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
          >
            <img
              src={project.featuredImage}
              alt={project.title}
              className="w-full h-96 md:h-[600px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Project Overview */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <Star className="w-8 h-8 text-yellow-500" />
                  Project Overview
                </h2>
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {project.fullDescription.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-600 dark:text-gray-400 font-mono mb-6 leading-relaxed text-lg">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Image Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3">
                  <Zap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  Project Gallery
                </h3>
                
                {/* Main Gallery Image */}
                <div className="relative rounded-xl overflow-hidden shadow-2xl mb-6">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={currentImageIndex}
                      src={project.gallery[currentImageIndex]}
                      alt={`${project.title} gallery ${currentImageIndex + 1}`}
                      className="w-full h-96 md:h-[500px] object-cover"
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                    />
                  </AnimatePresence>
                  
                  {/* Navigation Buttons */}
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                  </button>

                  {/* Image Counter */}
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                    {currentImageIndex + 1} / {project.gallery.length}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                <div className="grid grid-cols-4 md:grid-cols-6 gap-3">
                  {project.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-lg overflow-hidden aspect-square ${
                        index === currentImageIndex 
                          ? 'ring-3 ring-blue-500 dark:ring-blue-400' 
                          : 'hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600'
                      } transition-all duration-200`}
                    >
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {index === currentImageIndex && (
                        <div className="absolute inset-0 bg-blue-500/20" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-8 sticky top-32"
              >
                {/* Technologies */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                    <Tag className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    Technologies Used
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-2 rounded-lg text-sm font-medium border border-gray-200 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-colors"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Project Links */}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Explore More Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300 font-mono max-w-2xl mx-auto">
              Discover other innovative projects that showcase our expertise across different industries
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 3)
              .map((relatedProject, index) => (
                <motion.div
                  key={relatedProject.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group transform hover:-translate-y-2"
                  onClick={() => navigate(`/projects/${relatedProject.slug}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={relatedProject.thumbnail}
                      alt={relatedProject.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-blue-600/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
                        {relatedProject.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {relatedProject.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm font-mono line-clamp-2">
                      {relatedProject.shortDescription}
                    </p>
                  </div>
                </motion.div>
              ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-16"
          >
            <button
              onClick={handleBackToHome}
              className="bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 dark:hover:from-blue-600 dark:hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              View All Projects
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProjectDetail;



