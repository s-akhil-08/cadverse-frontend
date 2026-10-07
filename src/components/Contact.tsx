import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, User, Phone, Heart } from 'lucide-react';
import Toast from './Toast';

const Contact: React.FC = () => {
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false,
  });

  const contactInfo = [
    {
      icon: User,
      title: 'Mentor',
      mainText: 'Mr. G. Krishan Teja - 9182689778',
      subText: 'M.E, (Ph.D) – Automation & Robotics, Vardhaman College of Engineering',
      link: 'tel:+919182689778',
    },
    {
      icon: Phone,
      title: 'Lead Engineer',
      mainText: 'S AKHIL - 9063098898',
      subText: 'CAD Modeling & Simulation Lead',
      link: 'tel:+919063098898',
    },
    {
      icon: Phone,
      title: 'Design Engineer',
      mainText: 'Y AJAY - 9391032771',
      subText: 'Mechanical & Analysis Specialist',
      link: 'tel:+919391032771',
    },
    {
      icon: Mail,
      title: 'Official Email',
      mainText: 'cadverse.a@gmail.com',
      link: 'mailto:cadverse.a@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Campus & Innovation Hub',
      mainText:
        'CIE (Centre for Innovation & Entrepreneurship), 1st Floor, Cabin No. 1, Vardhaman College of Engineering, Shamshabad, Hyderabad, Telangana - 501218, India',
      link: 'https://vardhaman.org/',
    },
  ];

  return (
    <footer
      id="contact"
      className="pt-20 pb-10 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 dark:text-blue-400 font-mono text-sm tracking-wider uppercase font-semibold">
            Contact & Location
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            Ready to bring your engineering ideas to life? Reach out to our team in Hyderabad, India to turn your design concepts into precision 3D CAD reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-800/80 rounded-2xl p-8 sm:p-10 shadow-lg border border-gray-200 dark:border-gray-700/60 mb-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            Contact & Headquarters
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center">
                  <info.icon className="w-6 h-6" />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-base mb-1">
                    {info.title}
                  </h4>

                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith('http') ? '_blank' : undefined}
                      rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-mono text-sm sm:text-base transition-colors block break-words"
                    >
                      {info.mainText}
                    </a>
                  ) : (
                    <p className="text-gray-800 dark:text-gray-200 font-mono text-sm sm:text-base block break-words">
                      {info.mainText}
                    </p>
                  )}

                  {info.subText && (
                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1 font-mono">
                      {info.subText}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-gray-200 dark:border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xl font-bold text-blue-600 dark:text-blue-400">
              CADverse
            </span>
            <span className="text-gray-400 dark:text-gray-600">|</span>
            <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">
              Engineering Design & Prototyping
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 font-mono flex items-center justify-center gap-1">
            © {new Date().getFullYear()} CADverse. Designed & Crafted with <Heart className="w-3.5 h-3.5 text-red-500 inline fill-red-500" /> in Hyderabad, India.
          </p>
        </div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </footer>
  );
};

export default Contact;
