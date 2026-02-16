

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, CheckCircle, X, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Toast from '../Toast';

const UploadSection: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [projectDetails, setProjectDetails] = useState({
    name: '',
    description: ''
  });
  const [selectedService, setSelectedService] = useState('');
  const [otherServiceDescription, setOtherServiceDescription] = useState('');
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: 'success' as 'success' | 'error', isVisible: false });
  const { uploadFile } = useAuth();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
   
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const maxSize = 45 * 1024 * 1024;
      if (file.size > maxSize) {
        setToast({
          message: `File ${file.name} exceeds 45MB limit`,
          type: 'error',
          isVisible: true
        });
        return false;
      }
      return true;
    });
    setUploadedFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    if (uploadedFiles.length === 0) {
      setToast({
        message: 'Please select files to upload',
        type: 'error',
        isVisible: true
      });
      return;
    }
    if (!projectDetails.name || !projectDetails.description) {
      setToast({
        message: 'Project Name and Description are required.',
        type: 'error',
        isVisible: true
      });
      return;
    }
    if (!selectedService) {
      setToast({
        message: 'Please select a service.',
        type: 'error',
        isVisible: true
      });
      return;
    }
    if (selectedService === 'Other' && !otherServiceDescription.trim()) {
      setToast({
        message: 'Please describe the service you need.',
        type: 'error',
        isVisible: true
      });
      return;
    }

    setIsUploading(true);

    try {
      // Create FormData with ALL fields backend expects
      const formData = new FormData();

      // Append all files (backend supports multiple)
      uploadedFiles.forEach(file => {
        formData.append('file', file);
      });

      // Append required service fields
      formData.append('selected_service', selectedService);
      if (selectedService === 'Other') {
        formData.append('service_description', otherServiceDescription);
      }

      // Append project details (always sent)
      formData.append('project_name', projectDetails.name);
      formData.append('project_description', projectDetails.description);

      // Simulate progress animation (keep your existing code)
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];
        const fileKey = `${file.name}-${i}`;
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress(prev => ({ ...prev, [fileKey]: progress }));
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      }

      // Call upload with FormData
      await uploadFile(formData);

      setToast({
        message: `Successfully uploaded ${uploadedFiles.length} file(s)`,
        type: 'success',
        isVisible: true
      });

      // Reset form
      setUploadedFiles([]);
      setProjectDetails({ name: '', description: '' });
      setSelectedService('');
      setOtherServiceDescription('');
      setUploadProgress({});
    } catch (error) {
      setToast({
        message: 'Upload failed. Please try again.',
        type: 'error',
        isVisible: true
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <>
      <motion.div
        data-section="upload"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <Upload className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Upload Files
          </h2>
        </div>

        {/* Upload Area */}
        <div
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
            dragActive
              ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
              : 'border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Drop files here or click to browse
          </h3>
          <p className="text-gray-500 dark:text-gray-400 font-mono mb-4">
            Supports: Images (PNG, JPG), PDFs, CAD files (STL, OBJ)
          </p>
          <p className="text-m text-gray-400 dark:text-gray-500 font-mono">
            If your file exceeds 45 MB: Please upload it to Google Drive (or any cloud storage) and share the link with us instead.
          </p>

          <div className="relative mt-4">
            <input
              type="file"
              multiple
              accept=".png,.jpg,.jpeg,.pdf,.stl,.obj"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <button className="bg-blue-600 dark:bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors">
              Choose Files
            </button>
          </div>
        </div>

        {/* File List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Selected Files ({uploadedFiles.length})
            </h3>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {uploadedFiles.map((file, index) => {
                const fileKey = `${file.name}-${index}`;
                const progress = uploadProgress[fileKey] || 0;

                return (
                  <div
                    key={fileKey}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {file.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">
                          {formatFileSize(file.size)}
                        </p>

                        {isUploading && progress > 0 && (
                          <div className="mt-2">
                            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                              <div
                                className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              {progress}%
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {!isUploading && (
                      <button
                        onClick={() => removeFile(index)}
                        className="p-1 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}

                    {isUploading && progress === 100 && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="mt-6 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Project Details (Required)
          </h3>

          <div>
            <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectDetails.name}
              onChange={(e) => setProjectDetails({ ...projectDetails, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter project name"
              required
            />
          </div>

          <div>
            <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Project Description
            </label>
            <textarea
              id="projectDescription"
              value={projectDetails.description}
              onChange={(e) => setProjectDetails({ ...projectDetails, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Describe your project requirements"
              required
            />
          </div>

          <div>
            <label htmlFor="serviceSelect" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Select Service
            </label>
            <select
              id="serviceSelect"
              value={selectedService}
              onChange={(e) => {
                setSelectedService(e.target.value);
                if (e.target.value !== 'Other') {
                  setOtherServiceDescription('');
                }
              }}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            >
              <option value="">Choose a service...</option>
              <option value="3D Model Design">3D Model Design</option>
              <option value="3D Printing">3D Printing</option>
              <option value="Simulation">Simulation</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: selectedService === 'Other' ? 1 : 0,
              height: selectedService === 'Other' ? 'auto' : 0
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {selectedService === 'Other' && (
              <div>
                <label htmlFor="otherService" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Describe the service you need
                </label>
                <textarea
                  id="otherService"
                  value={otherServiceDescription}
                  onChange={(e) => setOtherServiceDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 transition-colors font-mono resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Please describe the service you need"
                  required
                />
              </div>
            )}
          </motion.div>
        </div>

        {/* Help Text */}
        <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
            Upload Guidelines:
          </h4>
          <ul className="text-sm text-gray-600 dark:text-gray-400 font-mono space-y-1">
            <li>• For 2D to 3D conversion: Upload clear images or PDF sketches</li>
            <li>• For 3D printing: Upload STL or OBJ files</li>
            <li>• Include dimensions and specifications when possible</li>
            <li>• Multiple files can be uploaded for complex projects</li>
          </ul>
        </div>

        {/* Upload Button */}
        {uploadedFiles.length > 0 && (
          <button
            onClick={uploadFiles}
            disabled={isUploading}
            className="w-full mt-6 flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-green-600 dark:bg-green-500 hover:bg-green-700 dark:hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-green-400 font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
          >
            {isUploading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Uploading Files...
              </>
            ) : (
              <>
                Upload All Files
                <Upload className="w-5 h-5" />
              </>
            )}
          </button>
        )}
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

export default UploadSection;
