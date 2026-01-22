  // import React, { useState, useRef, useEffect } from 'react';
  // import { motion, AnimatePresence } from 'framer-motion';
  // import { User, LogOut, ChevronDown, Bell, Home } from 'lucide-react';
  // import { Link, useNavigate } from 'react-router-dom';
  // import { useAuth } from '../../contexts/AuthContext';
  // import ThemeToggle from '../ThemeToggle';
  // import NotificationModal from '../NotificationModal';

  // const DashboardHeader: React.FC = () => {
  //   const [isProfileOpen, setIsProfileOpen] = useState(false);
  //   const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  //   const { user, logout } = useAuth();
  //   const navigate = useNavigate();
  //   const dropdownRef = useRef<HTMLDivElement>(null);

  //   useEffect(() => {
  //     const handleClickOutside = (event: MouseEvent) => {
  //       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
  //         setIsProfileOpen(false);
  //       }
  //     };

  //     document.addEventListener('mousedown', handleClickOutside);
  //     return () => document.removeEventListener('mousedown', handleClickOutside);
  //   }, []);

  //   const handleLogout = () => {
  //     logout();
  //     navigate('/');
  //   };

  //   const handleEditProfile = () => {
  //     setIsProfileOpen(false);
  //     // Scroll to profile section and highlight it
  //     setTimeout(() => {
  //       const profileSection = document.querySelector('[data-section="profile"]');
  //       if (profileSection) {
  //         profileSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  //         // Add highlight effect
  //         profileSection.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
  //         setTimeout(() => {
  //           profileSection.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
  //         }, 3000);
  //       }
  //     }, 100);
  //   };
  //   if (!user) return null;

  //   return (
  //     <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
  //       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //         <div className="flex items-center justify-between h-16">
  //           {/* Logo and Navigation */}
  //           <div className="flex items-center gap-8">
  //             <Link to="/" className="flex items-center gap-2">
  //               <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">
  //                 CADverse
  //               </span>
  //             </Link>
              
  //             <nav className="hidden md:flex items-center gap-6">
  //               <Link
  //                 to="/"
  //                 className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
  //               >
  //                 <Home className="w-4 h-4" />
  //                 Home
  //               </Link>
  //             </nav>
  //           </div>

  //           {/* Right Side */}
  //           <div className="flex items-center gap-4">
  //             {/* Theme Toggle */}
  //             <ThemeToggle />

  //             {/* Notifications */}
  //             {/* <button 
  //               onClick={() => setIsNotificationOpen(true)}
  //               className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
  //             >
  //               <Bell className="w-5 h-5" />
  //               <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
  //             </button> */}

  //             {/* Profile Dropdown */}
  //             <div className="relative" ref={dropdownRef}>
  //               <button
  //                 onClick={() => setIsProfileOpen(!isProfileOpen)}
  //                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  //               >
  //                 <div className="flex items-center gap-3">
  //                   <img
  //                     src={user.profilePicture || '/Profile.jpg'}
  //                     alt={user.name}
  //                     className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
  //                   />
  //                   <div className="hidden md:block text-left">
  //                     <p className="text-sm font-medium text-gray-900 dark:text-white">
  //                       {user.name}
  //                     </p>
  //                     <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
  //                       {user.email}
  //                     </p>
  //                   </div>
  //                 </div>
  //                 <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
  //               </button>

  //               {/* Dropdown Menu */}
  //               <AnimatePresence>
  //                 {isProfileOpen && (
  //                   <motion.div
  //                     initial={{ opacity: 0, y: -10, scale: 0.95 }}
  //                     animate={{ opacity: 1, y: 0, scale: 1 }}
  //                     exit={{ opacity: 0, y: -10, scale: 0.95 }}
  //                     transition={{ duration: 0.2 }}
  //                     className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
  //                   >
  //                     {/* User Info */}
  //                     <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
  //                       <div className="flex items-center gap-3">
  //                         <img
  //                           src={user.profilePicture || '/Profile.jpg'}
  //                           alt={user.name}
  //                           className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
  //                         />
  //                         <div>
  //                           <p className="font-medium text-gray-900 dark:text-white">
  //                             {user.name}
  //                           </p>
  //                           <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
  //                             {user.email}
  //                           </p>
  //                           <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
  //                             {user.mobile}
  //                           </p>
  //                         </div>
  //                       </div>
  //                     </div>

  //                     {/* Menu Items */}
  //                     {/* <div className="py-2">
  //                       <button
  //                         onClick={handleEditProfile}
  //                         className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
  //                       >
  //                         <User className="w-4 h-4" />
  //                         Edit Details
  //                       </button>
  //                     </div> */}

  //                     {/* Logout */}
  //                     <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
  //                       <button
  //                         onClick={handleLogout}
  //                         className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
  //                       >
  //                         <LogOut className="w-4 h-4" />
  //                         Sign Out
  //                       </button>
  //                     </div>
  //                   </motion.div>
  //                 )}
  //               </AnimatePresence>
  //             </div>
  //           </div>
  //         </div>

  //         {/* Notification Modal */}
  //         <NotificationModal 
  //           isOpen={isNotificationOpen} 
  //           onClose={() => setIsNotificationOpen(false)} 
  //         />
  //       </div>
  //     </header>
  //   );
  // };

  // export default DashboardHeader;






import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, LogOut, ChevronDown, Bell, Home } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ThemeToggle from '../ThemeToggle';
import NotificationModal from '../NotificationModal';

const DashboardHeader: React.FC = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleEditProfile = () => {
    setIsProfileOpen(false);
    // Scroll to profile section and highlight it
    setTimeout(() => {
      const profileSection = document.querySelector('[data-section="profile"]');
      if (profileSection) {
        profileSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Add highlight effect
        profileSection.classList.add('ring-2', 'ring-blue-500', 'ring-opacity-50');
        setTimeout(() => {
          profileSection.classList.remove('ring-2', 'ring-blue-500', 'ring-opacity-50');
        }, 3000);
      }
    }, 100);
  };
  if (!user) return null;

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">
                CADverse
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link
                to="/"
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </nav>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Notifications */}
            {/* <button
              onClick={() => setIsNotificationOpen(true)}
              className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
            </button> */}

            {/* Profile Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={user.profilePicture || '/Profile.jpg'}
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                  />
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                      {user.email}
                    </p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-max min-w-[240px] whitespace-nowrap bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50"
                  >
                    {/* User Info */}
                    <div className="pl-6 pr-10 py-3 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.profilePicture || '/Profile.jpg'}
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-600"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
                            {user.email}
                          </p>
                          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
                            {user.mobile}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    {/* <div className="py-2">
                      <button
                        onClick={handleEditProfile}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Edit Details
                      </button>
                    </div> */}

                    {/* Logout */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Notification Modal */}
        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
        />
      </div>
    </header>
  );
};

export default DashboardHeader;
