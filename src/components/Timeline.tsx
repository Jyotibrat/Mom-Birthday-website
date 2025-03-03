import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface MemoryItem {
  id: number;
  year: string;
  title: string;
  description: string;
  imageUrl: string;
}

const memories: MemoryItem[] = [
  {
    id: 1,
    year: '2017',
    title: 'Foreign Tour',
    description: 'An unforgettable adventure exploring new places, making cherished memories, and celebrating life together!',
    imageUrl: 'Assets/Timeline/2017.jpg'
  },
  {
    id: 2,
    year: '2019',
    title: 'Shillong Tour',
    description: 'A magical trip to the hills, filled with laughter, scenic views, and the best birthday celebration ever!',
    imageUrl: 'Assets/Timeline/2019.jpg'
  },
  {
    id: 3,
    year: '2023',
    title: 'Indore Tour',
    description: 'A journey of flavors and fun—trying delicious street food, exploring new places, and celebrating another year of joy!',
    imageUrl: 'Assets/Timeline/2023.jpg'
  },
  {
    id: 4,
    year: '2025',
    title: 'Delhi Tour',
    description: 'A grand birthday getaway to the heart of the country—historic sights, shopping sprees, and a celebration fit for a superstar!',
    imageUrl: 'Assets/Timeline/2025.jpg'
  }
];

const Timeline: React.FC = () => {
  return (
    <div className="relative">
      {/* Center line - hidden on mobile, visible on larger screens */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-pink-300 dark:bg-pink-700 hidden md:block"></div>
      
      <div className="space-y-24">
        {memories.map((memory, index) => (
          <TimelineItem 
            key={memory.id} 
            memory={memory} 
            isEven={index % 2 === 0} 
          />
        ))}
      </div>
    </div>
  );
};

interface TimelineItemProps {
  memory: MemoryItem;
  isEven: boolean;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ memory, isEven }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const variants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  // Mobile layout is always the same, desktop layout alternates
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={`md:flex md:items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
    >
      {/* Content - full width on mobile, half width on desktop */}
      <div className={`w-full md:w-5/12 ${isEven ? 'md:text-right md:pr-8' : 'md:text-left md:pl-8'} mb-4 md:mb-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl`}>
        <div className="mb-2">
          <span className="inline-block px-3 py-1 bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100 rounded-full text-sm font-medium">
            {memory.year}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-2">{memory.title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{memory.description}</p>
      </div>
      
      {/* Center dot - hidden on mobile */}
      <div className="hidden md:block md:w-2/12 md:flex md:justify-center">
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 border-4 border-white dark:border-gray-900 z-10 shadow-lg"></div>
      </div>
      
      {/* Image - full width on mobile, half width on desktop */}
      <div className="w-full md:w-5/12">
        <div className={`${isEven ? 'md:pl-8' : 'md:pr-8'}`}>
          <img 
            src={memory.imageUrl} 
            alt={memory.title} 
            className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Timeline;
