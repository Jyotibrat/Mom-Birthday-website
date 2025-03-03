import React, { useMemo, useEffect, useState } from 'react';
import { motion, useAnimation, useTransform, useSpring } from 'framer-motion';

interface BalloonsProps {
  scrollY: number;
}

interface Balloon {
  id: number;
  color: string;
  size: number;
  left: string;
  delay: number;
  floatDuration: number;
  floatDistance: number;
  rotationDirection: number;
}

// More vibrant and festive balloon colors
const colors = [
  'bg-red-400',
  'bg-blue-400',
  'bg-green-400',
  'bg-yellow-300',
  'bg-purple-400',
  'bg-pink-400',
  'bg-indigo-400',
  'bg-teal-400',
  'bg-orange-400',
  'bg-cyan-400',
];

const Balloons: React.FC<BalloonsProps> = ({ scrollY }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Make balloons visible after a delay for better page load experience
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);

  // Generate random balloons with more varied and interesting properties
  const balloons = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 35 + Math.random() * 45, // Random size between 35 and 80
      left: `${5 + Math.random() * 90}%`, // Keep away from extreme edges
      delay: Math.random() * 2, // More spread out delays
      floatDuration: 3 + Math.random() * 7, // Random float duration 
      floatDistance: 10 + Math.random() * 30, // Random float distance
      rotationDirection: Math.random() > 0.5 ? 1 : -1, // Random rotation direction
    }));
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {balloons.map((balloon) => (
        <Balloon 
          key={balloon.id} 
          balloon={balloon} 
          scrollY={scrollY} 
        />
      ))}
    </div>
  );
};

interface BalloonProps {
  balloon: Balloon;
  scrollY: number;
}

const Balloon: React.FC<BalloonProps> = ({ balloon, scrollY }) => {
  const controls = useAnimation();
  
  // Transform scroll position to balloon position
  // Start showing balloons after scrolling begins
  const y = useTransform(
    useSpring({ from: 0, to: scrollY, stiffness: 50, damping: 30 }), 
    [100, 1500], 
    ['110vh', `-${balloon.size * 2}px`]
  );
  
  // Add slight rotation based on scroll
  const rotate = useTransform(
    useSpring({ from: 0, to: scrollY, stiffness: 30, damping: 20 }), 
    [100, 1500], 
    [0, balloon.rotationDirection * (5 + Math.random() * 15)]
  );

  // Start floating animation when balloon enters viewport
  useEffect(() => {
    // Continuous floating animation
    const startFloating = async () => {
      controls.start({
        x: [0, balloon.floatDistance * -0.5, balloon.floatDistance * 0.5, 0],
        transition: {
          duration: balloon.floatDuration,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }
      });
    };

    startFloating();
  }, [controls, balloon]);

  return (
    <motion.div
      className="absolute"
      style={{
        left: balloon.left,
        y,
        rotate,
        x: 0, // Initial position for the float animation
      }}
      animate={controls}
      transition={{
        delay: balloon.delay,
        type: "spring",
      }}
    >
      {/* Balloon */}
      <div 
        className={`${balloon.color} rounded-full w-full relative`}
        style={{
          height: balloon.size,
          width: balloon.size * 0.85,
          boxShadow: 'inset -5px -5px 10px rgba(0, 0, 0, 0.15), inset 5px 5px 10px rgba(255, 255, 255, 0.3)',
          filter: 'drop-shadow(2px 3px 5px rgba(0, 0, 0, 0.2))'
        }}
      >
        {/* Balloon highlight - better light reflection */}
        <div className="absolute top-1/4 left-1/4 w-1/3 h-1/3 bg-white rounded-full opacity-40"></div>
        
        {/* Balloon tie at bottom */}
        <div className="absolute -bottom-1 left-1/2 w-3 h-3 bg-gray-600 rounded-full transform -translate-x-1/2"></div>
      </div>
      
      {/* String - curved and more realistic */}
      <motion.div 
        className="w-px mx-auto bg-gray-400"
        style={{
          height: balloon.size * 1.2,
          marginTop: '2px',
          transformOrigin: 'top',
        }}
        animate={{
          scaleY: [1, 0.94, 1.06, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        {/* Add some depth to the string with multiple elements */}
        <div className="absolute w-0.5 h-full left-0 bg-gray-300 opacity-50 transform -translate-x-0.5"></div>
      </motion.div>
    </motion.div>
  );
};

export default Balloons;