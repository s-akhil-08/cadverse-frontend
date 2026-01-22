// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeft, ChevronRight, FileText, Printer, BarChart3 } from 'lucide-react';
// import ServiceCard from './ServiceCard';
// import Toast from './Toast';

// const Services: React.FC = () => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });

//   const services = [
//     {
//       id: 1,
//       title: '2D Rough Sketch to 3D Modeling',
//       description: 'Transform your hand-drawn sketches into precise 3D models with professional accuracy and attention to detail.',
//       icon: <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
//       hasUpload: true,
//       acceptedFiles: '.png,.jpg,.jpeg,.pdf',
//       hasContactButton: false,
//     },
//     {
//       id: 2,
//       title: '3D Printing Service',
//       description: 'High-quality 3D printing services for rapid prototyping and production-ready parts using advanced materials.',
//       icon: <Printer className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
//       hasUpload: true,
//       acceptedFiles: '.stl,.obj',
//       hasContactButton: false,
//     },
//     {
//       id: 3,
//       title: '3D Modeling & Simulation Report',
//       description: 'Comprehensive analysis and simulation reports with detailed visualizations and performance metrics.',
//       icon: <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" />,
//       hasUpload: false,
//       hasContactButton: true,
//     },
//   ];

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % services.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);
//   };

//   const handleFileUpload = async (file: File, serviceTitle: string) => {
//     const userEmail = prompt("Please enter your email before submitting the file:");

//     if (!userEmail || !file) {
//       setToast({
//         message: "Upload cancelled. Email or file missing.",
//         type: "error",
//         isVisible: true,
//       });
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("file", file);
//       formData.append("email", userEmail);
//       formData.append("service", serviceTitle);

//       const response = await fetch("https://server-hiew.onrender.com/upload", {
//         method: "POST",
//         body: formData,
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Upload failed");
//       }

//       setToast({
//         message: `Successfully uploaded: ${data.filename}`,
//         type: "success",
//         isVisible: true,
//       });
//     } catch (error: any) {
//       setToast({
//         message: error.message || "Upload failed",
//         type: "error",
//         isVisible: true,
//       });
//     }
//   };

//   return (
//     <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 50 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.8 }}
//           viewport={{ once: true }}
//           className="text-center mb-16"
//         >
//           <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
//             Our Services
//           </h2>
//           <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
//             From concept to creation, we offer comprehensive services to bring 
//             your ideas to life with precision and innovation.
//           </p>
//         </motion.div>

//         {/* Desktop View */}
//         <div className="hidden md:grid md:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <ServiceCard
//               key={service.id}
//               title={service.title}
//               description={service.description}
//               icon={service.icon}
//               hasUpload={service.hasUpload}
//               acceptedFiles={service.acceptedFiles}
//               onFileUpload={(file) => handleFileUpload(file, service.title)}
//               isActive={false}
//               hasContactButton={service.hasContactButton}
//             />
//           ))}
//         </div>

//         {/* Mobile Carousel */}
//         <div className="md:hidden relative">
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-300 ease-in-out"
//               style={{ transform: `translateX(-${currentSlide * 100}%)` }}
//             >
//               {services.map((service, index) => (
//                 <div key={service.id} className="w-full flex-shrink-0 px-4">
//                   <ServiceCard
//                     title={service.title}
//                     description={service.description}
//                     icon={service.icon}
//                     hasUpload={service.hasUpload}
//                     acceptedFiles={service.acceptedFiles}
//                     onFileUpload={(file) => handleFileUpload(file, service.title)}
//                     isActive={index === currentSlide}
//                     hasContactButton={service.hasContactButton}
//                   />
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Navigation Buttons */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
//           >
//             <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
//           </button>
//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow"
//           >
//             <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
//           </button>

//           {/* Dots Indicator */}
//           <div className="flex justify-center mt-8 gap-2">
//             {services.map((_, index) => (
//               <button
//                 key={index}
//                 onClick={() => setCurrentSlide(index)}
//                 className={`w-3 h-3 rounded-full transition-colors ${
//                   index === currentSlide ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'
//                 }`}
//               />
//             ))}
//           </div>
//         </div>
//       </div>

//       <Toast
//         message={toast.message}
//         type={toast.type}
//         isVisible={toast.isVisible}
//         onClose={() => setToast({ ...toast, isVisible: false })}
//       />
//     </section>
//   );
// };

// export default Services;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, Printer, BarChart3, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import Toast from './Toast';

const Services: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false,
  });
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [currentToolIndex, setCurrentToolIndex] = useState(0); // 0=ruler, 1=pencil, 2=compass
  const navigate = useNavigate();

  const services = [
    { id: 1, title: '2D Rough Sketch to 3D Modeling', icon: <FileText className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
    { id: 2, title: '3D Printing Service', icon: <Printer className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
    { id: 3, title: '3D Modeling & Simulation Report', icon: <BarChart3 className="w-8 h-8 text-blue-600 dark:text-blue-400" /> },
  ];

  const descriptions = [
    'Transform your hand-drawn sketches into precise 3D models with professional accuracy and attention to detail.',
    'High-quality 3D printing services for rapid prototyping and production-ready parts using advanced materials.',
    'Comprehensive analysis and simulation reports with detailed visualizations and performance metrics.',
  ];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % services.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + services.length) % services.length);

  const handleStartProject = () => navigate('/login');

  const handleButtonHoverStart = () => {
    setIsButtonHovered(true);
    setCurrentToolIndex((prev) => (prev + 1) % 3); // Cycle to next tool
  };

  const handleButtonHoverEnd = () => {
    setIsButtonHovered(false);
  };

  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            From concept to creation, we offer comprehensive services to bring your ideas to life with precision and innovation.
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={descriptions[index]}
              icon={service.icon}
              isActive={false}
              onIconClick={handleStartProject}
            />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden relative mb-12">
          <div className="overflow-hidden">
            <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
              {services.map((service, index) => (
                <div key={service.id} className="w-full flex-shrink-0 px-4">
                  <ServiceCard
                    title={service.title}
                    description={descriptions[index]}
                    icon={service.icon}
                    isActive={index === currentSlide}
                    onIconClick={handleStartProject}
                  />
                </div>
              ))}
            </div>
          </div>

          <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
            <ChevronLeft className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow">
            <ChevronRight className="w-6 h-6 text-gray-600 dark:text-gray-300" />
          </button>

          <div className="flex justify-center mt-8 gap-2">
            {services.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? 'bg-blue-600 dark:bg-blue-400' : 'bg-gray-300 dark:bg-gray-600'}`}
              />
            ))}
          </div>
        </div>

        {/* Fixed Button - All Effects + Cycle Guaranteed */}
        <div className="text-center">
          <button
            onClick={handleStartProject}
            onMouseEnter={handleButtonHoverStart}
            onMouseLeave={handleButtonHoverEnd}
            onTouchStart={handleButtonHoverStart}
            onTouchEnd={handleButtonHoverEnd}
            className={`relative inline-flex items-center justify-center overflow-hidden rounded-lg 
                       px-10 py-5 text-lg font-semibold text-white shadow-xl 
                       transition-all duration-500 ${
                         isButtonHovered
                           ? 'bg-gradient-to-r from-blue-700 to-blue-800 dark:from-blue-600 dark:to-blue-700 -translate-y-2 scale-105 shadow-2xl'
                           : 'bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-500 dark:to-blue-600'
                       } active:scale-95`}
          >
            <span className="relative z-10 flex items-center gap-4">
              Start Your Project
              <div className="relative w-7 h-7">
                {/* Arrow */}
                <ArrowRight className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${!isButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`} />

                {/* Ruler */}
                <svg className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${currentToolIndex === 0 && isButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="10" width="18" height="4" rx="1" className="fill-orange-200 animate-pulse" />
                  <path d="M6 10v4M9 10v2M12 10v4M15 10v2M18 10v4" className="stroke-orange-100" />
                </svg>

                {/* Pencil */}
                <svg className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${currentToolIndex === 1 && isButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" className="fill-yellow-200 drop-shadow-sm" />
                  <path d="m15 5 4 4" className="stroke-yellow-100 animate-pulse" />
                </svg>

                {/* Improved Drafting Compass */}
                <svg className={`absolute inset-0 w-7 h-7 transition-all duration-500 ${currentToolIndex === 2 && isButtonHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-125'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 3v6" strokeLinecap="round" />
                  <path d="m8 9 4 4 4-4" strokeLinecap="round" />
                  <path d="M4 21h16" strokeLinecap="round" />
                  <circle cx="12" cy="14" r="6" className="stroke-purple-300 fill-purple-200/50 animate-pulse" strokeDasharray="4 4" />
                </svg>
              </div>
            </span>

            {/* Shine sweep */}
            {isButtonHovered && (
              <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12" />
            )}
          </button>

          <p className="mt-4 text-gray-600 dark:text-gray-400 font-mono">
            Click here to discuss your project requirements
          </p>
        </div>
      </div>

      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={() => setToast({ ...toast, isVisible: false })} />
    </section>
  );
};

export default Services;
