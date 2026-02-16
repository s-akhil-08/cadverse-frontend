// import React, { useState, useEffect, useRef } from 'react';
// import { X } from 'lucide-react';
// import { motion } from 'framer-motion';

// interface OTPSpamNoticeProps {
//   inputFieldRef: React.RefObject<HTMLInputElement>;
// }

// const OTPSpamNotice: React.FC<OTPSpamNoticeProps> = ({ inputFieldRef }) => {
//   const [isVisible, setIsVisible] = useState(true);
//   const [position, setPosition] = useState({ x: 0, y: 0 });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
//   const [isHovered, setIsHovered] = useState(false);
//   const noticeRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     if (inputFieldRef.current && noticeRef.current) {
//       const inputRect = inputFieldRef.current.getBoundingClientRect();
//       const noticeRect = noticeRef.current.getBoundingClientRect();

//       setPosition({
//         x: inputRect.left + (inputRect.width - noticeRect.width) / 2,
//         y: inputRect.top - noticeRect.height - 10
//       });
//     }

//     const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
//     const oscillator = audioContext.createOscillator();
//     const gainNode = audioContext.createGain();

//     oscillator.connect(gainNode);
//     gainNode.connect(audioContext.destination);

//     oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
//     oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
//     oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);

//     gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//     gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

//     oscillator.start(audioContext.currentTime);
//     oscillator.stop(audioContext.currentTime + 0.3);

//     return () => {
//       audioContext.close();
//     };
//   }, [inputFieldRef]);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     if ((e.target as HTMLElement).closest('button')) return;

//     setIsDragging(true);
//     setDragOffset({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (isDragging) {
//       setPosition({
//         x: e.clientX - dragOffset.x,
//         y: e.clientY - dragOffset.y
//       });
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       window.addEventListener('mousemove', handleMouseMove);
//       window.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         window.removeEventListener('mousemove', handleMouseMove);
//         window.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging, dragOffset]);

//   if (!isVisible) return null;

//   return (
//     <motion.div
//       ref={noticeRef}
//       initial={{ opacity: 0, scale: 0.8 }}
//       animate={{
//         opacity: 1,
//         scale: 1,
//         y: isHovered ? -5 : 0
//       }}
//       exit={{ opacity: 0, scale: 0.8 }}
//       transition={{ duration: 0.3 }}
//       className="fixed z-50 cursor-move"
//       style={{
//         left: `${position.x}px`,
//         top: `${position.y}px`,
//         userSelect: isDragging ? 'none' : 'auto',
//         width: '280px',
//         height: '280px'
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <div
//         className={`w-full h-full bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-lg shadow-2xl p-6 flex items-center justify-center transition-all duration-300 ${
//           isHovered
//             ? 'brightness-110 dark:brightness-125 shadow-blue-500/50 dark:shadow-blue-400/50'
//             : ''
//         }`}
//         style={{
//           boxShadow: isHovered
//             ? '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
//             : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//         }}
//       >
//         <button
//           onClick={() => setIsVisible(false)}
//           className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:scale-110 transform"
//           aria-label="Close notification"
//         >
//           <X className="w-6 h-6" />
//         </button>

//         <div className="pr-6">
//           <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
//               Sometimes <span className="font-semibold">OTP 🔢</span> hides in the <span className="font-semibold">Spam Folder 🕵️‍♂️</span>.  
//               Go rescue it before it gets too comfy there!
//           </p>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default OTPSpamNotice;




import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

interface OTPSpamNoticeProps {
  inputFieldRef: React.RefObject<HTMLInputElement>;
}

const OTPSpamNotice: React.FC<OTPSpamNoticeProps> = ({ inputFieldRef }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const noticeRef = useRef<HTMLDivElement>(null);

  // Initial positioning + sound effect
  useEffect(() => {
    const updatePosition = () => {
      if (inputFieldRef.current && noticeRef.current) {
        const inputRect = inputFieldRef.current.getBoundingClientRect();
        const noticeRect = noticeRef.current!.getBoundingClientRect();
        setPosition({
          x: inputRect.left + (inputRect.width - noticeRect.width) / 2,
          y: inputRect.top - noticeRect.height - 10,
        });
      }
    };

    updatePosition();

    // Play sound
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);

    const handleResize = () => updatePosition();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      audioContext.close().catch(() => {});
    };
  }, [inputFieldRef]);

  // Unified drag start (mouse or touch)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    // Prevent drag if clicking the close button
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    setDragOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });

    // Prevent text selection / scrolling during drag
    e.preventDefault();
  };

  // Unified drag move
  const handleDragMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    setPosition({
      x: clientX - dragOffset.x,
      y: clientY - dragOffset.y,
    });
  };

  // Unified drag end
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // Attach global listeners for mouse & touch
  useEffect(() => {
    if (isDragging) {
      const moveHandler = (e: MouseEvent | TouchEvent) => handleDragMove(e);
      const endHandler = () => handleDragEnd();

      // Mouse events
      window.addEventListener('mousemove', moveHandler as EventListener);
      window.addEventListener('mouseup', endHandler);

      // Touch events
      window.addEventListener('touchmove', moveHandler as EventListener, { passive: false });
      window.addEventListener('touchend', endHandler);
      window.addEventListener('touchcancel', endHandler);

      return () => {
        window.removeEventListener('mousemove', moveHandler as EventListener);
        window.removeEventListener('mouseup', endHandler);
        window.removeEventListener('touchmove', moveHandler as EventListener);
        window.removeEventListener('touchend', endHandler);
        window.removeEventListener('touchcancel', endHandler);
      };
    }
  }, [isDragging, dragOffset]);

  if (!isVisible) return null;

  return (
    <motion.div
      ref={noticeRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: isHovered ? -5 : 0,
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed z-50 select-none"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: '280px',
        height: '280px',
        touchAction: 'none', // Critical for touch dragging
      }}
      // Touch events
      onTouchStart={handleDragStart}
      // Mouse events
      onMouseDown={handleDragStart}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`w-full h-full bg-white dark:bg-gray-800 border-2 border-blue-500 dark:border-blue-400 rounded-lg shadow-2xl p-6 flex items-center justify-center transition-all duration-300 ${
          isHovered
            ? 'brightness-110 dark:brightness-125 shadow-blue-500/50 dark:shadow-blue-400/50'
            : ''
        }`}
        style={{
          boxShadow: isHovered
            ? '0 25px 50px -12px rgba(59, 130, 246, 0.5)'
            : '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
      >
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors hover:scale-110 transform z-10"
          aria-label="Close notification"
        >
          <X className="w-6 h-6" />
        </button>
        <div className="pr-6 text-center">
          <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">
            Sometimes <span className="font-semibold">OTP 🔢</span> hides in the{' '}
            <span className="font-semibold">Spam Folder 🕵️‍♂️</span>.
            <br />
            Go rescue it before it gets too comfy there!
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default OTPSpamNotice;
