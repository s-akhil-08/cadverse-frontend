import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { supabase } from './lib/supabaseClient'; // Add this
import ProjectShowcase from './components/ProjectShowcase';
import Reviews from './pages/Reviews';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
// import Projects from './components/Projects';
import Feedback from './components/Feedback';
import Services from './components/Services';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import ProjectDetail from './pages/ProjectDetail';
// import FeedbackDetail from './pages/FeedbackDetail';
// import AllFeedbackPage from './pages/AllFeedbackPage';
// import AllProjectsPage from './pages/AllProjectsPage';
import LoginPage from './components/auth/LoginPage';
import SignUpPage from './components/auth/SignUpPage';
import ForgotPasswordPage from './components/auth/ForgotPasswordPage';
import ProjectsListPage from './pages/ProjectsListPage';
import NotificationsPage from './pages/NotificationsPage';
import Dashboard from './components/dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ProjectProgressPage from './pages/ProjectProgressPage';
import FeedbackApprovalNotificationManager from './components/FeedbackApprovalNotificationManager';

const HomePage = () => (
  <>
    <Navigation />
    <Hero />
    <About />
    {/* <Projects /> */}
    <HowItWorks />
    <ProjectShowcase />
    <Services />
    {/* <Feedback /> */}
    <Contact />
  </>
);

// Add AuthCallback component
const AuthCallback: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/dashboard');
      } else {
        navigate('/login');
      }
    });
  }, [navigate]);
  return <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
    <div className="text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-gray-600 dark:text-gray-400 font-mono">Processing login...</p>
    </div>
  </div>;
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <FeedbackApprovalNotificationManager />
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetail />} />
              {/* <Route path="/all-projects" element={<AllProjectsPage />} /> */}
              {/* <Route path="/feedback/:feedbackId" element={<FeedbackDetail />} />
              <Route path="/feedback" element={<AllFeedbackPage />} /> */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/projectprogress/:projectId" element={<ProjectProgressPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/projects-list"
                element={
                  <ProtectedRoute>
                    <ProjectsListPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/project-progress/:projectId"
                element={
                  <ProtectedRoute>
                    <ProjectProgressPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <NotificationsPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/auth/callback" element={<AuthCallback />} /> {/* Add this */}
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;