import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Camera } from 'lucide-react';

interface MemoryPhoto {
  id: number;
  title: string;
  description: string;
  image: string;
}

const memories: MemoryPhoto[] = [
  {
    id: 1,
    title: 'Meghalaya Tour',
    description: 'Exploring the breathtaking landscapes of Meghalaya, from the living root bridges to the serene waterfalls.',
    image: 'Assets/Memories/Meghalaya_trip.jpg'
  },
  {
    id: 2,
    title: 'Maa with Mashi',
    description: 'A heartwarming moment captured between Maa and Mashi during a family gathering.',
    image: '../public/Assets/Memories/Maa with Mashi.jpg'
  },
  {
    id: 3,
    title: 'Foreign Tour',
    description: 'It was a unforgettable journey to a new country, experiencing diverse cultures and stunning sights.',
    image: '../public/Assets/Memories/Family.jpg'
  },
  {
    id: 4,
    title: 'Durga Puja 2k22',
    description: 'Celebrating Durga Puja with vibrant pandals, cultural performances, and delicious bhog.',
    image: '../public/Assets/Memories/2k22 Durga Puja.jpg'
  },
  {
    id: 5,
    title: 'Pondicherry Tour',
    description: 'A peaceful retreat in Pondicherry, walking along the French streets and enjoying the beachside cafés.',
    image: '../public/Assets/Memories/Pondicherry Tour.jpg'
  },
  {
    id: 6,
    title: '17-10-2021',
    description: 'A special day filled with cherished memories, laughter, and unforgettable moments.',
    image: '../public/Assets/Memories/17-10-2021.jpg'
  }
];

interface MemoriesGalleryProps {
  isDarkMode?: boolean;
}

const MemoriesGallery: React.FC<MemoriesGalleryProps> = ({ isDarkMode = false }) => {
  const [activeMemory, setActiveMemory] = useState(0);
  const [memoriesRef, inView] = useInView({
    triggerOnce: false,
    threshold: 0.3,
  });
  
  // Auto-rotate through memories
  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveMemory((prev) => (prev + 1) % memories.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [inView, memories.length]);

  return (
    <div className="mb-20 animate-fadeIn" ref={memoriesRef}>
      <h2 className={`text-3xl font-bold ${isDarkMode ? 'text-rose-300' : 'text-teal-800'} mb-10 text-center flex items-center justify-center`}>
        <Camera className="w-10 h-10 mr-4" /> Memories With Mom
      </h2>
      
      <div className="relative overflow-hidden rounded-xl shadow-2xl mx-auto max-w-4xl" style={{height: '500px'}}>
        {memories.map((memory, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${activeMemory === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          >
            <div className="relative w-full h-full">
              <img 
                src={memory.image} 
                alt={memory.title} 
                className="w-full h-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{memory.title}</h3>
                <p className="text-white text-lg">{memory.description}</p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Navigation dots */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2 z-20">
          {memories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveMemory(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${activeMemory === index ? 'bg-white scale-125' : 'bg-white/50'}`}
              aria-label={`View memory ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoriesGallery;
