import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Settings, Ruler } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Gear rotation animations
  const gearRotateClockwise = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  const gearRotateCounterClockwise = {
    animate: {
      rotate: [360, 0],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }
    }
  };

  // Scale floating animation
  const scaleFloating = {
    animate: {
      y: [-8, 8, -8],
      x: [-3, 3, -3],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Random jiggling animation for vernier caliper
  const jiggleAnimation = {
    animate: {
      x: [-2, 3, -1, 2, -3, 1, -2, 2, -1, 3, -2, 1],
      y: [-1, 2, -3, 1, -2, 3, -1, 2, -3, 1, -2, 3],
      rotate: [-1, 1.5, -0.5, 1, -1.5, 0.5, -1, 1.5, -0.5, 1, -1.5, 0.5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.08, 0.17, 0.25, 0.33, 0.42, 0.5, 0.58, 0.67, 0.75, 0.83, 0.92]
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center grid-bg dark:grid-bg-dark relative overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Background Pattern with Gears, Scale, and XY Axis */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        {/* Gear Set 1 - Large and Medium Interconnected */}
        <motion.div 
          className="absolute top-20 left-32"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-40 h-40 text-blue-400 dark:text-blue-300" strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-32 left-60"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-24 h-24 text-purple-400 dark:text-purple-300" strokeWidth={1} />
        </motion.div>
        
        {/* Pencil Tool - Between Gear and Scale */}
        <motion.div 
          className="absolute bottom-32 left-28"
          variants={scaleFloating}
          animate="animate"
        >
          <div className="relative w-16 h-4 transform rotate-12">
            {/* Pencil Body */}
            <div className="w-12 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-300 dark:to-yellow-400 rounded-full relative">
              {/* Wood texture lines */}
              <div className="absolute top-1 left-2 w-8 h-0.5 bg-yellow-600 dark:bg-yellow-500 rounded-full opacity-30"></div>
              <div className="absolute bottom-1 left-2 w-8 h-0.5 bg-yellow-600 dark:bg-yellow-500 rounded-full opacity-30"></div>
              
              {/* Brand text area */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-xs font-mono text-yellow-800 dark:text-yellow-700 opacity-60">#2</div>
              </div>
            </div>
            
            {/* Metal Ferrule (band that holds eraser) */}
            <div className="absolute right-0 top-0 w-2 h-4 bg-gradient-to-r from-gray-400 to-gray-500 dark:from-gray-300 dark:to-gray-400 rounded-r-full">
              {/* Ferrule ridges */}
              <div className="absolute top-1 left-0 w-full h-0.5 bg-gray-600 dark:bg-gray-500 opacity-40"></div>
              <div className="absolute bottom-1 left-0 w-full h-0.5 bg-gray-600 dark:bg-gray-500 opacity-40"></div>
            </div>
            
            {/* Pink Eraser */}
            <div className="absolute -right-1 top-0.5 w-1.5 h-3 bg-gradient-to-r from-pink-400 to-pink-500 dark:from-pink-300 dark:to-pink-400 rounded-full"></div>
            
            {/* Pencil Tip/Point */}
            <div className="absolute -left-2 top-1/2 transform -translate-y-1/2">
              {/* Wood cone */}
              <div className="w-0 h-0 border-r-2 border-r-orange-400 dark:border-r-orange-300 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              {/* Graphite tip */}
              <div className="absolute -right-0.5 top-1/2 w-1 h-0.5 bg-gray-800 dark:bg-gray-700 rounded-full transform -translate-y-1/2"></div>
            </div>
          </div>
        </motion.div>

        {/* Scale Tool - Replacing Gear Set 2 */}
        <motion.div 
          className="absolute bottom-20 left-20"
          variants={scaleFloating}
          animate="animate"
        >
          <div className="relative">
            {/* Scale/Ruler with measurement marks */}
            <div className="w-32 h-6 bg-gradient-to-r from-orange-400 to-orange-500 dark:from-orange-300 dark:to-orange-400 rounded-sm relative">
              {/* Measurement marks */}
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute top-0 bg-white dark:bg-gray-800 ${
                    i % 4 === 0 ? 'w-0.5 h-6' : i % 2 === 0 ? 'w-0.5 h-4' : 'w-0.5 h-2'
                  }`}
                  style={{ left: `${(i + 1) * 10}%` }}
                />
              ))}
              {/* Numbers */}
              <div className="absolute -bottom-4 left-0 text-xs font-mono text-orange-600 dark:text-orange-300">0</div>
              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-mono text-orange-600 dark:text-orange-300">5</div>
              <div className="absolute -bottom-4 right-0 text-xs font-mono text-orange-600 dark:text-orange-300">10</div>
            </div>
          </div>
        </motion.div>

        {/* Realistic Compass Drawing Tool - Replacing Small Orange Gear */}
        <motion.div 
          className="absolute bottom-40 right-32"
          variants={scaleFloating}
          animate="animate"
        >
          <div className="relative w-20 h-20">
            {/* Compass Body/Hinge */}
            <div className="absolute top-2 left-1/2 w-3 h-3 bg-gray-600 dark:bg-gray-400 rounded-full transform -translate-x-1/2 border-2 border-gray-700 dark:border-gray-300">
              {/* Center screw/pin */}
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            </div>
            
            {/* Left Leg (Needle Point) */}
            <div className="absolute top-5 left-6 w-1 h-12 bg-gradient-to-b from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-300 rounded-full transform rotate-12 origin-top">
              {/* Sharp needle point */}
              <div className="absolute bottom-0 left-1/2 w-0 h-0 border-l-1 border-r-1 border-t-2 border-l-transparent border-r-transparent border-t-gray-800 dark:border-t-gray-200 transform -translate-x-1/2"></div>
            </div>
            
            {/* Right Leg (Pencil/Lead Holder) */}
            <div className="absolute top-5 right-6 w-1.5 h-12 bg-gradient-to-b from-orange-500 to-orange-600 dark:from-orange-400 dark:to-orange-500 rounded-full transform -rotate-12 origin-top">
              {/* Pencil tip */}
              <div className="absolute bottom-0 left-1/2 w-1 h-2 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2"></div>
              {/* Lead point */}
              <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-black dark:bg-gray-900 rounded-full transform -translate-x-1/2 translate-y-1"></div>
            </div>
            
            {/* Adjustment Mechanism */}
            <div className="absolute top-8 left-1/2 w-4 h-1 bg-gray-500 dark:bg-gray-400 rounded-full transform -translate-x-1/2">
              {/* Adjustment screw */}
              <div className="absolute left-1/2 top-1/2 w-1.5 h-1.5 bg-gray-700 dark:bg-gray-300 rounded-sm transform -translate-x-1/2 -translate-y-1/2">
                {/* Screw slot */}
                <div className="absolute top-1/2 left-1/2 w-1 h-0.5 bg-gray-900 dark:bg-gray-100 transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* XY Axis - Replacing Gear Set 3 */}
        <motion.div 
          className="absolute top-60 right-20"
          variants={scaleFloating}
          animate="animate"
        >
          <div className="relative w-24 h-24">
            {/* X Axis */}
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-green-400 dark:bg-green-300 transform -translate-y-1/2">
              {/* Arrow head for X */}
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-2 border-l-green-400 dark:border-l-green-300 border-t-1 border-t-transparent border-b-1 border-b-transparent"></div>
              </div>
            </div>
            {/* Y Axis */}
            <div className="absolute left-1/2 top-0 w-0.5 h-full bg-green-400 dark:bg-green-300 transform -translate-x-1/2">
              {/* Arrow head for Y */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2">
                <div className="w-0 h-0 border-b-2 border-b-green-400 dark:border-b-green-300 border-l-1 border-l-transparent border-r-1 border-r-transparent"></div>
              </div>
            </div>
            {/* Origin point */}
            <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full transform -translate-x-1/2 -translate-y-1/2"></div>
            {/* Axis labels */}
            <div className="absolute -bottom-6 right-0 text-xs font-mono text-green-600 dark:text-green-300">X</div>
            <div className="absolute -right-4 top-0 text-xs font-mono text-green-600 dark:text-green-300">Y</div>
            <div className="absolute -bottom-4 -left-4 text-xs font-mono text-green-600 dark:text-green-300">O</div>
          </div>
        </motion.div>

        {/* Gear Set 4 - Center Top */}
        {/* Technical Pen/Drafting Pen - Left Side Middle */}
        <motion.div 
          className="absolute top-1/2 left-16 transform -translate-y-1/2"
          variants={scaleFloating}
          animate="animate"
        >
          <div className="relative w-6 h-32 transform rotate-12">
            {/* Pen Cap */}
            <div className="absolute top-0 left-0 w-6 h-8 bg-gradient-to-b from-black to-gray-800 dark:from-gray-800 dark:to-gray-900 rounded-t-full">
              {/* Cap clip */}
              <div className="absolute top-1 right-0 w-1 h-4 bg-gradient-to-b from-silver to-gray-400 dark:from-gray-300 dark:to-gray-500 rounded-r-full"></div>
              {/* Brand logo area */}
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-3 h-1 bg-white dark:bg-gray-200 rounded-full opacity-80"></div>
            </div>
            
            {/* Pen Body - Main Barrel */}
            <div className="absolute top-8 left-0 w-6 h-18 bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700 rounded-sm">
              {/* Grip section texture */}
              <div className="absolute bottom-2 left-0 w-full h-6 bg-gradient-to-b from-blue-700 to-blue-900 dark:from-blue-600 dark:to-blue-800">
                {/* Grip ridges */}
                <div className="absolute top-1 left-0 w-full h-0.5 bg-blue-800 dark:bg-blue-700 opacity-60"></div>
                <div className="absolute top-2 left-0 w-full h-0.5 bg-blue-800 dark:bg-blue-700 opacity-60"></div>
                <div className="absolute top-3 left-0 w-full h-0.5 bg-blue-800 dark:bg-blue-700 opacity-60"></div>
                <div className="absolute top-4 left-0 w-full h-0.5 bg-blue-800 dark:bg-blue-700 opacity-60"></div>
              </div>
              
              {/* Brand text area */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-mono text-white dark:text-gray-200 opacity-70 rotate-90">
                0.5mm
              </div>
            </div>
            
            {/* Pen Tip Section */}
            <div className="absolute bottom-6 left-0 w-6 h-6 bg-gradient-to-b from-gray-300 to-gray-500 dark:from-gray-400 dark:to-gray-600 rounded-b-sm">
              {/* Tip threading */}
              <div className="absolute top-1 left-0 w-full h-0.5 bg-gray-500 dark:bg-gray-600 opacity-60"></div>
              <div className="absolute top-2 left-0 w-full h-0.5 bg-gray-500 dark:bg-gray-600 opacity-60"></div>
              <div className="absolute top-3 left-0 w-full h-0.5 bg-gray-500 dark:bg-gray-600 opacity-60"></div>
            </div>
            
            {/* Fine Tip */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-6 bg-gradient-to-b from-gray-600 to-gray-800 dark:from-gray-500 dark:to-gray-700 rounded-full">
                {/* Ultra-fine drawing tip */}
                <div className="absolute bottom-0 left-1/2 w-0.5 h-2 bg-black dark:bg-gray-900 rounded-full transform -translate-x-1/2"></div>
              </div>
            </div>
            
            {/* Pen reflection/highlight */}
            <div className="absolute top-8 left-1 w-1 h-16 bg-gradient-to-b from-white to-transparent opacity-20 rounded-full"></div>
          </div>
        </motion.div>

        <motion.div 
          className="absolute top-10 left-1/2 transform -translate-x-1/2"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-36 h-36 text-teal-400 dark:text-teal-300" strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute top-24 left-1/2 transform translate-x-4"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-22 h-22 text-indigo-400 dark:text-indigo-300" strokeWidth={1} />
        </motion.div>

        {/* Gear Set 5 - Bottom Right */}
        <motion.div 
          className="absolute bottom-10 right-60"
          variants={gearRotateClockwise}
          animate="animate"
        >
          <Settings className="w-30 h-30 text-pink-400 dark:text-pink-300" strokeWidth={1} />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-16 right-80"
          variants={gearRotateCounterClockwise}
          animate="animate"
        >
          <Settings className="w-20 h-20 text-yellow-400 dark:text-yellow-300" strokeWidth={1} />
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-orange-500 dark:text-orange-400" />
              <span className="font-mono text-orange-600 dark:text-orange-400 font-medium">
                From Sketch to Reality
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="block">Bring Your Ideas</span>
              <span className="block text-blue-600 dark:text-blue-400">to Life</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto font-mono">
              From Paper to Prototype — Transform your 2D sketches into 
              professional 3D models and printed prototypes
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <button
              onClick={scrollToServices}
              className="inline-flex items-center gap-3 bg-blue-600 dark:bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-all duration-300 sketch-shadow dark:sketch-shadow-dark group hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started
              <div className="relative w-6 h-6">
                {/* Arrow Icon */}
                <ArrowRight className="absolute inset-0 w-6 h-6 group-hover:opacity-0 group-hover:scale-75 transition-all duration-300" />
                
                {/* Drawing Compass Icon */}
                <svg 
                  className="absolute inset-0 w-6 h-6 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300"
                  viewBox="0 0 18 18" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                >
                  {/* Compass hinge */}
                  <circle cx="9" cy="6" r="1.5" className="group-hover:fill-blue-200 transition-all duration-300" />
                  
                  {/* Left leg (needle) */}
                  <path d="M7.5 7.5L6 16" className="group-hover:stroke-blue-200 group-hover:drop-shadow-sm transition-all duration-300" />
                  <circle cx="6" cy="16" r="0.5" className="group-hover:fill-blue-200 transition-all duration-300" />
                  
                  {/* Right leg (pencil) */}
                  <path d="M10.5 7.5L12 16" className="group-hover:stroke-blue-200 group-hover:drop-shadow-sm transition-all duration-300" />
                  <circle cx="12" cy="16" r="1" className="group-hover:fill-blue-300 transition-all duration-300" />
                  
                  {/* Adjustment mechanism */}
                  <path d="M8 9h2" className="group-hover:stroke-blue-100 transition-all duration-300" />
                </svg>
              </div>
            </button>
          </motion.div>

          {/* Vernier Caliper - Near Get Started Button with Jiggle Effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative"
          >
            {/* Vernier Caliper positioned near Get Started button */}
            <motion.div 
              className="absolute -left-20 top-1/2 transform -translate-y-1/2 opacity-40 dark:opacity-30"
              variants={jiggleAnimation}
              animate="animate"
            >
              <div className="relative w-16 h-16">
                {/* Main Scale/Fixed Jaw */}
                <div className="absolute top-0 left-1 w-12 h-2 bg-gradient-to-r from-gray-600 to-gray-700 dark:from-gray-400 dark:to-gray-500 rounded-sm">
                  {/* Scale markings */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute top-0 bg-gray-800 dark:bg-gray-200 ${
                        i % 3 === 0 ? 'w-0.5 h-2' : 'w-0.5 h-1'
                      }`}
                      style={{ left: `${(i + 1) * 11}%` }}
                    />
                  ))}
                  {/* Numbers on scale */}
                  <div className="absolute -bottom-3 left-0 text-xs font-mono text-gray-600 dark:text-gray-400">0</div>
                  <div className="absolute -bottom-3 right-0 text-xs font-mono text-gray-600 dark:text-gray-400">10</div>
                </div>
                
                {/* Vernier Scale/Moving Jaw */}
                <div className="absolute top-0 left-4 w-8 h-1.5 bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-400 dark:to-blue-500 rounded-sm">
                  {/* Vernier markings */}
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute top-0 w-0.5 h-1.5 bg-blue-800 dark:bg-blue-200"
                      style={{ left: `${(i + 1) * 14}%` }}
                    />
                  ))}
                </div>
                
                {/* Fixed Jaw (Left) */}
                <div className="absolute top-2 left-1 w-1.5 h-10 bg-gradient-to-b from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 rounded-sm">
                  {/* Jaw face */}
                  <div className="absolute right-0 top-0 w-0.5 h-full bg-gray-800 dark:bg-gray-200"></div>
                  {/* Jaw serrations */}
                  <div className="absolute right-0 top-1 w-0.5 h-0.5 bg-gray-900 dark:bg-gray-100"></div>
                  <div className="absolute right-0 top-3 w-0.5 h-0.5 bg-gray-900 dark:bg-gray-100"></div>
                  <div className="absolute right-0 top-5 w-0.5 h-0.5 bg-gray-900 dark:bg-gray-100"></div>
                </div>
                
                {/* Moving Jaw (Right) */}
                <div className="absolute top-2 left-9 w-1.5 h-10 bg-gradient-to-b from-blue-500 to-blue-700 dark:from-blue-400 dark:to-blue-600 rounded-sm">
                  {/* Jaw face */}
                  <div className="absolute left-0 top-0 w-0.5 h-full bg-blue-800 dark:bg-blue-200"></div>
                  {/* Jaw serrations */}
                  <div className="absolute left-0 top-1 w-0.5 h-0.5 bg-blue-900 dark:bg-blue-100"></div>
                  <div className="absolute left-0 top-3 w-0.5 h-0.5 bg-blue-900 dark:bg-blue-100"></div>
                  <div className="absolute left-0 top-5 w-0.5 h-0.5 bg-blue-900 dark:bg-blue-100"></div>
                </div>
                
                {/* Thumb Wheel */}
                <div className="absolute top-0.5 right-1 w-3 h-3 bg-gradient-to-br from-orange-400 to-orange-600 dark:from-orange-300 dark:to-orange-500 rounded-full">
                  {/* Wheel ridges */}
                  <div className="absolute top-0.5 left-0.5 w-2 h-2 border border-orange-700 dark:border-orange-600 rounded-full">
                    {/* Radial lines for grip */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-1 bg-orange-800 dark:bg-orange-700 transform -translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-1/2 w-0.5 h-1 bg-orange-800 dark:bg-orange-700 transform -translate-x-1/2"></div>
                    <div className="absolute left-0 top-1/2 w-1 h-0.5 bg-orange-800 dark:bg-orange-700 transform -translate-y-1/2"></div>
                    <div className="absolute right-0 top-1/2 w-1 h-0.5 bg-orange-800 dark:bg-orange-700 transform -translate-y-1/2"></div>
                  </div>
                </div>
                
                {/* Lock Screw */}
                <div className="absolute top-0.5 right-0 w-1.5 h-1.5 bg-gradient-to-br from-gray-500 to-gray-700 dark:from-gray-400 dark:to-gray-600 rounded-sm">
                  {/* Screw slot */}
                  <div className="absolute top-1/2 left-1/2 w-1 h-0.5 bg-gray-800 dark:bg-gray-200 transform -translate-x-1/2 -translate-y-1/2"></div>
                </div>
                
                {/* Depth Probe */}
                <div className="absolute bottom-0 left-6 w-0.5 h-8 bg-gradient-to-b from-gray-600 to-gray-800 dark:from-gray-400 dark:to-gray-600 rounded-full">
                  {/* Probe tip */}
                  <div className="absolute bottom-0 left-1/2 w-0.5 h-0.5 bg-gray-800 dark:bg-gray-200 rounded-full transform -translate-x-1/2"></div>
                </div>
                
                {/* Brand marking */}
                <div className="absolute top-4 left-3 text-xs font-mono text-gray-700 dark:text-gray-300 opacity-60">
                  mm
                </div>
                
                {/* Precision indicator */}
                <div className="absolute top-6 left-3 text-xs font-mono text-blue-600 dark:text-blue-400 opacity-70">
                  0.02
                </div>
              </div>
            </motion.div>

            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">2D</div>
              <p className="text-gray-600 dark:text-gray-400">Sketch Upload</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-teal-600 dark:text-teal-400 mb-2">3D</div>
              <p className="text-gray-600 dark:text-gray-400">Model Creation</p>
            </div>
            <div className="text-center">
              <div className="font-mono text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">Print</div>
              <p className="text-gray-600 dark:text-gray-400">Physical Prototype</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;