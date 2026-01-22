// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Upload, FileText, Printer, BarChart3, CheckCircle, MessageCircle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';
// import AuthModal from './AuthModal';

// interface ServiceCardProps {
//   title: string;
//   description: string;
//   icon: React.ReactNode;
//   hasUpload?: boolean;
//   acceptedFiles?: string;
//   onFileUpload?: (file: File) => void;
//   isActive: boolean;
//   hasContactButton?: boolean;
// }

// const ServiceCard: React.FC<ServiceCardProps> = ({
//   title,
//   description,
//   icon,
//   hasUpload,
//   acceptedFiles,
//   onFileUpload,
//   isActive,
//   hasContactButton,
// }) => {
//   const [dragActive, setDragActive] = useState(false);
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [uploadSuccess, setUploadSuccess] = useState(false);
//   const [userName, setUserName] = useState('');
//   const [uploadProgress, setUploadProgress] = useState(0);
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const navigate = useNavigate();
//   const { isAuthenticated } = useAuth();

//   // Check if this service requires authentication (first two services)
//   const requiresAuth = title === '2D Rough Sketch to 3D Modeling' || title === '3D Printing Service';

//   const handleDrag = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === 'dragenter' || e.type === 'dragover') {
//       setDragActive(true);
//     } else if (e.type === 'dragleave') {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
    
//     const files = Array.from(e.dataTransfer.files);
//     if (files.length > 0) {
//       processSelectedFile(files[0]);
//     }
//   };

//   const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length > 0) {
//       processSelectedFile(files[0]);
//     }
//   };

//   const handleUploadClick = (e: React.MouseEvent) => {
//     if (requiresAuth && !isAuthenticated) {
//       e.preventDefault();
//       setShowAuthModal(true);
//       return;
//     } else if (requiresAuth && isAuthenticated) {
//       e.preventDefault();
//       // Navigate to dashboard and switch to upload section
//       navigate('/dashboard');
//       // Trigger the upload tab switch after navigation
//       setTimeout(() => {
//         const event = new CustomEvent('switchToUpload');
//         window.dispatchEvent(event);
//       }, 100);
//       return;
//     }
//   };
//   const handleSubmit = () => {
//     if (!uploadedFile || isSubmitting) return;
    
//     // Check if name is provided
//     if (!userName.trim()) {
//       alert('Please enter your name before submitting.');
//       return;
//     }
    
//     // Simulate file submission (frontend-only)
//     simulateFileSubmission(uploadedFile);
//   };

//   // Simulate file submission without backend
//   const simulateFileSubmission = async (file: File) => {
//     if (!file) return;
    
//     setIsSubmitting(true);
//     setUploadProgress(0);
    
//     // Simulate progressive upload with realistic progress updates
//     const progressSteps = [10, 25, 45, 60, 75, 85, 95, 100];
    
//     for (let i = 0; i < progressSteps.length; i++) {
//       await new Promise(resolve => setTimeout(resolve, 250)); // 250ms per step = 2s total
//       setUploadProgress(progressSteps[i]);
//     }
    
//     // Log file details for development purposes
//     console.log('📁 File submitted (frontend-only):', {
//       name: file.name,
//       size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
//       type: file.type,
//       service: title,
//       userName: userName.trim(),
//       timestamp: new Date().toISOString()
//     });
    
//     // Simulate successful upload
//     setUploadSuccess(true);
//     setUploadProgress(0);
    
//     // Notify parent component if available
//     if (onFileUpload) {
//       onFileUpload(file);
//     }
    
//     setIsSubmitting(false);
//   };

//   // Handle file selection and basic validation (frontend-only)
//   const processSelectedFile = (file: File) => {
//     // Reset previous states
//     setUploadSuccess(false);
//     setUserName('');
    
//     // File size validation - 10MB limit
//     const maxSize = 10 * 1024 * 1024; // 10MB
//     if (file.size > maxSize) {
//       if (onFileUpload) {
//         const errorFile = new File([''], 'error', { type: 'error' });
//         (errorFile as any).error = `File size (${(file.size / 1024 / 1024).toFixed(2)}MB) exceeds the 10MB limit`;
//         onFileUpload(errorFile);
//       }
//       return;
//     }
    
//     // Validate file type based on service
//     const allowedTypes = {
//       '2D Rough Sketch to 3D Modeling': ['.png', '.jpg', '.jpeg', '.pdf'],
//       '3D Printing Service': ['.stl', '.obj']
//     };
    
//     const serviceTypes = allowedTypes[title as keyof typeof allowedTypes];
//     if (serviceTypes) {
//       const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
//       if (!serviceTypes.includes(fileExtension)) {
//         if (onFileUpload) {
//           const errorFile = new File([''], 'error', { type: 'error' });
//           (errorFile as any).error = `Invalid file type. Accepted: ${serviceTypes.join(', ')}`;
//           onFileUpload(errorFile);
//         }
//         return;
//       }
//     }
    
//     // File is valid, set it for upload
//     setUploadedFile(file);
//   };
  
//   const scrollToContact = () => {
//     const element = document.getElementById('contact');
//     if (element) {
//       element.scrollIntoView({ behavior: 'smooth' });
//     }
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       transition={{ duration: 0.5 }}
//       className={`bg-white dark:bg-gray-900 rounded-lg p-8 sketch-shadow dark:sketch-shadow-dark hover:shadow-lg dark:hover:shadow-2xl transition-all duration-300 min-h-[400px] flex flex-col ${
//         isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''
//       }`}
//     >
//       <div className="text-center mb-6">
//         <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-lg mb-4">
//           {icon}
//         </div>
//         <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{title}</h3>
//         <p className="text-gray-600 dark:text-gray-400 font-mono">{description}</p>
//       </div>

//       <div className="flex-grow">
//         {hasUpload && (
//           <div className="space-y-4">
//             <div
//               className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
//                 dragActive
//                   ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
//                   : uploadSuccess
//                   ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
//                   : uploadedFile
//                   ? 'border-green-500 dark:border-green-400 bg-green-50 dark:bg-green-900/20'
//                   : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
//               }`}
//               onDragEnter={handleDrag}
//               onDragLeave={handleDrag}
//               onDragOver={handleDrag}
//               onDrop={handleDrop}
//             >
//               {uploadSuccess ? (
//                 <div className="space-y-2">
//                   <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto" />
//                   <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                     File uploaded successfully!
//                   </p>
//                   <p className="text-xs text-green-600 dark:text-green-400">
//                     {uploadedFile?.name}
//                   </p>
//                 </div>
//               ) : uploadedFile ? (
//                 <div className="space-y-2">
//                   <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400 mx-auto" />
//                   <p className="text-sm font-medium text-green-800 dark:text-green-300">
//                     {uploadedFile.name}
//                   </p>
//                   <p className="text-xs text-green-600 dark:text-green-400">
//                     {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
//                   </p>
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   <Upload className="w-8 h-8 text-gray-400 dark:text-gray-500 mx-auto" />
//                   <p className="text-sm text-gray-600 dark:text-gray-400">
//                     Drag and drop your files here, or click to browse
//                   </p>
//                   <p className="text-xs text-gray-500 dark:text-gray-500">
//                     Supports: {acceptedFiles}
//                   </p>
//                 </div>
//               )}
//             </div>

//             {/* Name Input Field - Only show when file is uploaded but not yet submitted */}
//             {uploadedFile && !uploadSuccess && (
//               <div className="space-y-2">
//                 <label htmlFor={`name-${title}`} className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Email
//                 </label>
//                 <input
//                   type="text"
//                   id={`name-${title}`}
//                   value={userName}
//                   onChange={(e) => setUserName(e.target.value)}
//                   className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
//                   placeholder=" your@email.com"
//                 />
//               </div>
//             )}
//             {uploadSuccess ? (
//               <div className="space-y-3">
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept={acceptedFiles}
//                     onChange={handleFileInput}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
//                     Upload Another File
//                   </button>
//                 </div>
//               </div>
//             ) : uploadedFile ? (
//               <div className="space-y-3">
//                 <div className="relative">
//                   <input
//                     type="file"
//                     accept={acceptedFiles}
//                     onChange={handleFileInput}
//                     className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
//                   />
//                   <button className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
//                     Upload Another File
//                   </button>
//                 </div>
//                 <button 
//                   onClick={handleSubmit}
//                   disabled={isSubmitting || !userName.trim()}
//                   className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
//                     isSubmitting || !userName.trim()
//                       ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
//                       : 'bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600'
//                   } text-white`}
//                 >
//                   {isSubmitting ? (
//                     <div className="flex items-center gap-3">
//                       {/* Circular Progress Bar */}
//                       <div className="relative w-16 h-16">
//                         <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 64 64">
//                           {/* Background circle */}
//                           <circle
//                             cx="32"
//                             cy="32"
//                             r="24"
//                             stroke="rgba(255,255,255,0.3)"
//                             strokeWidth="4"
//                             fill="none"
//                           />
//                           {/* Progress circle */}
//                           <circle
//                             cx="32"
//                             cy="32"
//                             r="24"
//                             stroke="white"
//                             strokeWidth="4"
//                             fill="none"
//                             strokeLinecap="round"
//                             strokeDasharray={`${2 * Math.PI * 24}`}
//                             strokeDashoffset={`${2 * Math.PI * 24 * (1 - uploadProgress / 100)}`}
//                             className="transition-all duration-300 ease-out"
//                           />
//                         </svg>
//                         {/* Percentage text */}
//                         <div className="absolute inset-0 flex items-center justify-center">
//                           <span className="text-base font-bold text-white">
//                             {uploadProgress}%
//                           </span>
//                         </div>
//                       </div>
//                       <span>Uploading...</span>
//                     </div>
//                   ) : (
//                     'Submit'
//                   )}
//                 </button>
//               </div>
//             ) : (
//               <div className="relative">
//                 <input
//                   type="file"
//                   accept={acceptedFiles}
//                   onChange={handleFileInput}
//                   className={`absolute inset-0 w-full h-full opacity-0 ${requiresAuth ? 'cursor-not-allowed' : 'cursor-pointer'}`}
//                   onClick={handleUploadClick}
//                 />
//                 <button 
//                   className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
//                   onClick={handleUploadClick}
//                 >
//                   Choose Files
//                 </button>
//               </div>
//             )}
//           </div>
//         )}

//       </div>

//       {hasContactButton && (
//         <div className="mt-6">
//           <button
//             onClick={scrollToContact}
//             className="w-full bg-blue-600 dark:bg-blue-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
//           >
//             <MessageCircle className="w-5 h-5" />
//             Contact Us
//           </button>
//         </div>
//       )}

//       {/* Auth Modal */}
//       <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
//     </motion.div>
//   );
// };

// export default ServiceCard;
import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  isActive: boolean;
  onIconClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  icon,
  isActive,
  onIconClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`bg-white dark:bg-gray-900 rounded-lg p-8 sketch-shadow dark:sketch-shadow-dark 
                 transition-all duration-500 min-h-[400px] flex flex-col 
                 ${isActive ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''} 
                 ${isHovered ? 'shadow-2xl -translate-y-1' : ''}`}
    >
      <div className="text-center mb-6">
        <div
          onClick={onIconClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onIconClick?.()}
          className={`relative inline-flex items-center justify-center w-16 h-16 rounded-lg mb-4 cursor-pointer 
                     transition-all duration-500 
                     ${isHovered ? '-translate-y-3 scale-110 shadow-2xl bg-blue-200/50 dark:bg-blue-900/50' : 'bg-blue-100 dark:bg-blue-900/30'}`}
          aria-label={`Start your project with ${title}`}
        >
          <div className="relative z-10">{icon}</div>

          {/* Strong multi-glow on hover */}
          {isHovered && (
            <>
              <div className="absolute inset-0 rounded-lg blur-2xl bg-blue-500/60 scale-150 animate-pulse" />
              <div className="absolute inset-0 rounded-lg blur-xl bg-cyan-400/40 scale-140" />
              <div className="absolute inset-0 rounded-lg blur-lg bg-purple-400/30 scale-130" />
            </>
          )}
        </div>

        <h3 className={`text-2xl font-semibold mb-3 transition-colors duration-300 ${isHovered ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'}`}>
          {title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 font-mono">{description}</p>
      </div>

      <div className="flex-grow" />
    </motion.div>
  );
};

export default ServiceCard;
