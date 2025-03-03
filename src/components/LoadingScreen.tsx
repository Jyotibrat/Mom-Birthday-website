import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  const cakeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const flameVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [1, 1.2, 1],
      opacity: 1,
      transition: { 
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-pink-400 to-purple-600 flex flex-col items-center justify-center z-50">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cakeVariants}
        className="mb-8"
      >
        <div className="relative">
          {/* Cake */}
          <div className="w-32 h-16 bg-yellow-200 rounded-b-lg relative">
            <div className="absolute bottom-0 left-0 w-full h-1/3 bg-yellow-300 rounded-b-lg"></div>
          </div>
          
          {/* Frosting */}
          <div className="w-36 h-4 bg-pink-300 rounded-full absolute -top-2 -left-2"></div>
          
          {/* Candle */}
          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
            <div className="w-2 h-8 bg-blue-400"></div>
            <motion.div
              variants={flameVariants}
              className="w-4 h-6 bg-gradient-to-t from-yellow-400 to-red-500 rounded-full absolute -top-5 left-1/2 transform -translate-x-1/2"
            ></motion.div>
          </div>
        </div>
      </motion.div>
      
      <h2 className="text-white text-2xl font-bold mb-6">Preparing Your Birthday Surprise</h2>
      
      <div className="w-64 h-3 bg-white bg-opacity-30 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-white rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        ></motion.div>
      </div>
      
      <p className="text-white mt-4">{progress}%</p>
    </div>
  );
};

export default LoadingScreen;