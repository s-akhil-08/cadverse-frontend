import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MessageCircle, User, Phone } from 'lucide-react';
import Toast from '../Toast';
import axios from 'axios';

const MessagesSection: React.FC = () => {
  const [formData, setFormData] = useState({
    message: '',
  });
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    message: '',
    type: 'success' as 'success' | 'error',
    isVisible: false,
  });

  // Fetch user email and name from localStorage or API
  useEffect(() => {
    const cadverseUser = localStorage.getItem('cadverse_user');
    if (cadverseUser) {
      try {
        const user = JSON.parse(cadverseUser);
        setUserEmail(user.email || null);
        setUserName(user.name || null);
      } catch (err) {
        setToast({
          message: 'Failed to load user data. Please log in again.',
          type: 'error',
          isVisible: true,
        });
      }
    } else {
      // Optionally fetch from API if not in localStorage
      const token = localStorage.getItem('token');
      if (token) {
        axios
          .get('https://server-message-1.vercel.app/api/user/', {
            headers: { Authorization: `Token ${token}` },
          })
          .then((response) => {
            setUserEmail(response.data.email || null);
            setUserName(response.data.name || null);
          })
          .catch(() => {
            setToast({
              message: 'Failed to fetch user data. Please log in again.',
              type: 'error',
              isVisible: true,
            });
          });
      }
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const { message } = formData;

    // Validation
    if (!message) {
      setToast({
        message: 'Please fill in the message field',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    if (!userEmail || !userName) {
      setToast({
        message: 'User data not found. Please log in again.',
        type: 'error',
        isVisible: true,
      });
      return;
    }

    // Append "Sent by: [userName]" on a new line after the message
    const messageWithName = `${message}\nSent by: ${userName} From Dashboard`;

    try {
      setIsSubmitting(true);
      const res = await fetch('https://server-message-1.vercel.app/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token') || ''}`,
        },
        body: JSON.stringify({ name: userName, email: userEmail, message: messageWithName }),
      });

      if (res.ok) {
        setToast({
          message: "Message sent successfully! We'll get back to you soon.",
          type: 'success',
          isVisible: true,
        });
        setFormData({ message: '' });
      } else {
        throw new Error('Server error');
      }
    } catch (err) {
      setToast({
        message: 'Failed to send message. Please try again later.',
        type: 'error',
        isVisible: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: User,
      title: 'Mentor',
      value: 'Mr. G. Krishan Teja - Assistant Professor',
      subText: 'M.E, (Ph.D) – Automation & Robotics',
      link: '', // empty → not clickable
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'S AKHIL - 9063098898',
      link: 'tel:+919063098898',
    },
    {
      icon: Phone,
      title: 'Phone',
      value: 'Y AJAY - 9391032771',
      link: 'tel:+919391032771',
    },
    {
      icon: Mail,
      title: 'Mail',
      value: 'cadverse.a@gmail.com',
      link: 'mailto:cadverse.a@gmail.com',
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8"
      >
        <div className="flex items-center gap-3 mb-8">
          <MessageCircle className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Get In Touch
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <form id="tour-messages-form" onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={13}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us about your project..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || !userEmail || !userName}
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center gap-2 ${
                  isSubmitting || !userEmail || !userName
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600'
                } text-white`}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            id="tour-contact-info"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <info.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {info.title}
                      </h4>

                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-mono transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-blue-600 dark:text-blue-400 font-mono">
                          {info.value}
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

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                Quick Response
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                We typically respond to messages within 24 hours during business days.
                For urgent matters, please include "URGENT" in your message subject.
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
};

export default MessagesSection;
