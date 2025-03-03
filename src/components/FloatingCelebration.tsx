import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
  PartyPopper, 
  Gift, 
  Cake, 
  Star,
  Trophy,
  Sparkles
} from 'lucide-react';

interface CelebrationItem {
  id: number;
  x: number;
  delay: number;
  scale: number;
  duration: number;
  type: 'partyPopper' | 'gift' | 'cake' | 'star' | 'trophy' | 'sparkles';
  color: string;
}

const FloatingCelebration: React.FC = () => {
  const [items, setItems] = useState<CelebrationItem[]>([]);
  
  const colors = [
    'text-pink-500',
    'text-blue-500',
    'text-yellow-500',
    'text-green-500',
    'text-purple-500',
    'text-red-500'
  ];
  
  const getRandomType = (): 'partyPopper' | 'gift' | 'cake' | 'star' | 'trophy' | 'sparkles' => {
    const types = ['partyPopper', 'gift', 'cake', 'star', 'trophy', 'sparkles'];
    return types[Math.floor(Math.random() * types.length)] as any;
  };
  
  const getRandomColor = (): string => {
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  useEffect(() => {
    // Generate initial celebration items
    const initialItems = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100 - 50, // Random x position between -50 and 50
      delay: Math.random() * 10,
      scale: 0.5 + Math.random() * 1.5, // Random scale between 0.5 and 2
      duration: 10 + Math.random() * 15, // Random duration between 10 and 25 seconds
      type: getRandomType(),
      color: getRandomColor()
    }));
    
    setItems(initialItems);
    
    // Add new items periodically
    const interval = setInterval(() => {
      setItems(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100 - 50,
          delay: 0,
          scale: 0.5 + Math.random() * 1.5,
          duration: 10 + Math.random() * 15,
          type: getRandomType(),
          color: getRandomColor()
        }
      ]);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map(item => (
        <CelebrationFloat 
          key={item.id}
          x={item.x}
          delay={item.delay}
          scale={item.scale}
          duration={item.duration}
          type={item.type}
          color={item.color}
        />
      ))}
    </div>
  );
};

interface CelebrationFloatProps {
  x: number;
  delay: number;
  scale: number;
  duration: number;
  type: 'partyPopper' | 'gift' | 'cake' | 'star' | 'trophy' | 'sparkles';
  color: string;
}

const CelebrationFloat: React.FC<CelebrationFloatProps> = ({ 
  x, delay, scale, duration, type, color 
}) => {
  const controls = useAnimation();
  
  useEffect(() => {
    controls.start({
      y: -1000,
      opacity: [0, 1, 1, 0],
      transition: {
        y: {
          duration: duration,
          ease: "linear",
        },
        opacity: {
          duration: duration,
          times: [0, 0.1, 0.8, 1],
        },
        delay: delay,
      }
    });
    
    // Remove this item after animation completes
    const timeout = setTimeout(() => {
      controls.set({ y: "100vh", opacity: 0 });
    }, (delay + duration) * 1000);
    
    return () => clearTimeout(timeout);
  }, [controls, delay, duration]);
  
  const renderIcon = () => {
    const props = { size: 24, className: `${color} fill-current opacity-70` };
    
    switch (type) {
      case 'partyPopper':
        return <PartyPopper {...props} />;
      case 'gift':
        return <Gift {...props} />;
      case 'cake':
        return <Cake {...props} />;
      case 'star':
        return <Star {...props} />;
      case 'trophy':
        return <Trophy {...props} />;
      case 'sparkles':
        return <Sparkles {...props} />;
      default:
        return <PartyPopper {...props} />;
    }
  };
  
  return (
    <motion.div
      className="absolute bottom-0 left-1/2"
      style={{ x: `${x}%` }}
      animate={controls}
      initial={{ y: "100vh", opacity: 0 }}
    >
      <motion.div
        animate={{
          rotate: [0, 10, -10, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }
        }}
        style={{ scale }}
      >
        {renderIcon()}
      </motion.div>
    </motion.div>
  );
};

export default FloatingCelebration;