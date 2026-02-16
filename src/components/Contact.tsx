import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, User, Phone } from 'lucide-react';
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
      subText: 'M.E, (Ph.D) – Automation & Robotics',
      link: 'tel:+91 9182689778',
    },
    {
      icon: Phone,
      title: 'Phone',
      mainText: 'S AKHIL - 9063098898',
      link: 'tel:+91 9063098898',
    },
    {
      icon: Phone,
      title: 'Phone',
      mainText: 'Y AJAY - 9391032771',
      link: 'tel:+91 9391032771',
    },
    {
      icon: Mail,
      title: 'Mail',
      mainText: 'cadverse.a@gmail.com',
      link: 'mailto:cadverse.a@gmail.com',
    },
    {
      icon: MapPin,
      title: 'Address',
      mainText:
        'CIE, 1st floor Cabin number-1, Vardhman college of Engineering, Shamshabad, Hyderabad',
      link: 'https://vardhaman.org/',
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-mono">
            Ready to bring your ideas to life? Contact us today and let's discuss
            how we can help you turn your sketches into reality.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Contact Information
            </h3>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center gap-4">
                  {/* Icon - vertically centered */}
                  <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                    <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h4>

                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-mono transition-colors block"
                      >
                        {info.mainText}
                      </a>
                    ) : (
                      <p className="text-gray-900 dark:text-white font-mono block">
                        {info.mainText}
                      </p>
                    )}

                    {info.subText && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1 font-mono">
                        {info.subText}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </section>
  );
};

export default Contact;
