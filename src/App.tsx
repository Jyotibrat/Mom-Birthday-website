import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useSpring, animated } from 'react-spring';
import { isBefore, isAfter } from 'date-fns';
import confetti from 'canvas-confetti';
import Balloons from './components/Balloons';
import { 
  Sun, 
  Moon, 
  PartyPopper, 
  Gift, 
  Flower, 
  ShoppingBag, 
  Users, 
  Plane,
  Heart,
} from 'lucide-react';

import LoadingScreen from './components/LoadingScreen';
import HandwrittenText from './components/HandwrittenText';
import Timeline from './components/Timeline';
import FloatingHearts from './components/FloatingCelebration';
import MemoriesGallery from './components/MemoriesGallery';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showGiftMessage, setShowGiftMessage] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isHeartAnimating, setIsHeartAnimating] = useState(false);

const handleHeartClick = () => {
  setIsHeartAnimating(true);
  triggerParty(); // Reuse the existing confetti function
  setTimeout(() => setIsHeartAnimating(false), 1000);
};
  
  const today = new Date();
  const birthdayDate = new Date(2025, 2, 2); // March 2, 2025
  const isBelated = isAfter(today, birthdayDate);
  const isAdvanced = isBefore(today, birthdayDate);
  
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const fadeIn = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    delay: 500,
  });

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const triggerParty = () => {
    // Confetti explosion
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const toggleGiftMessage = () => {
    setShowGiftMessage(!showGiftMessage);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-200 to-teal-200 transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-rose-100 via-pink-100 to-violet-200 text-gray-800'
    }`}>
      {/* Header with theme toggle */}
      <header className="fixed top-0 w-full z-50 p-4 flex justify-end items-center bg-opacity-100 backdrop-blur-sm">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full hover:bg-opacity-20 hover:bg-gray-200 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 pt-20 pb-32">
        {/* Conditional greeting based on date */}
        {isAdvanced && (
          <div className="text-center mb-4 py-2 bg-blue-100 text-blue-800 rounded-lg dark:bg-blue-900 dark:text-blue-200">
            Advanced Birthday Wishes! {birthdayDate.toLocaleDateString()} is coming soon!
          </div>
        )}
        
        {isBelated && (
          <div className="text-center mb-4 py-2 bg-amber-100 text-amber-800 rounded-lg dark:bg-amber-900 dark:text-amber-200">
            Belated Birthday Wishes! Hope you had a wonderful day on {birthdayDate.toLocaleDateString()}!
          </div>
        )}

        {/* Hero section with handwritten text */}
        <animated.section style={fadeIn} className="text-center py-16 relative overflow-hidden">
          <div className={`absolute inset-0 -z-10 ${darkMode ? 'opacity-10' : 'opacity-20'}`}>
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1527481138388-31827a7c94d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60')] bg-no-repeat bg-cover bg-center blur-sm"></div>
          </div>
          
          <div className={`relative z-10 p-8 rounded-xl ${darkMode ? 'bg-gray-900/30' : 'bg-white/30'} backdrop-blur-sm`}>
            <HandwrittenText 
              text="Happy Birthday Mom!" 
              className="text-5xl md:text-7xl font-bold mb-6"
            />
            
            <div className="mb-8 flex justify-center animate-fadeIn">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-white shadow-xl hover:scale-105 transition-transform duration-300">
                <img 
                  src="./public/Assets/Main/Mom_Picture.png" 
                  alt="Celebrating Mom" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/30 to-transparent"></div>
                <div 
                  className={`absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black/30 ${isHeartAnimating ? 'heart-pulse' : ''}`}
                  onClick={handleHeartClick}
                >
                  <PartyPopper className="w-16 h-16 text-white" fill="#fff" />
                </div>
              </div>
            </div>
            
            <p className="text-xl md:text-2xl max-w-2xl mx-auto opacity-90 mb-12">
              Thank you for being the most amazing mom in the world. Your love, strength, and wisdom inspire me every day.
            </p>
            
            <div className="flex justify-center">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={triggerParty}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-10 py-4 rounded-full shadow-lg transition-all"
              >
                <PartyPopper  className="w-6 h-6 fill-current" />
                <span className="text-lg font-medium">Let's Party</span>
              </motion.button>
            </div>
          </div>
          
          <FloatingHearts />
        </animated.section>

        {/* Timeline of memories */}
        <section ref={ref} className="py-16">
          <div className={`p-6 rounded-xl mb-12 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Our Beautiful Memories
            </h2>
          </div>
          
          <Timeline />
        </section>

        {/* Memories Gallery */}
        <section className="py-16">
          <div className={`p-6 rounded-xl mb-12 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Memories With Mom
            </h2>
          </div>
          
          <MemoriesGallery isDarkMode={darkMode} />
        </section>

        {/* Mom's favorite things */}
        <section className="py-16">
          <div className={`p-6 rounded-xl mb-12 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Your Favorite Things
            </h2>
          </div>
          
          {/* Updated to center the cards */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {/* Gardening */}
              <div className={`rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="./public/Assets/Favorite Things/Gardening.jpg" 
                    alt="Gardening" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Flower className="w-5 h-5 mr-2 text-green-500" />
                    <h3 className="font-bold text-xl">Gardening</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Your garden is your happy place, where you nurture life and find peace.</p>
                </div>
              </div>
              
              {/* Family */}
              <div className={`rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="./public/Assets/Favorite Things/Family.jpg" 
                    alt="Family" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Users className="w-5 h-5 mr-2 text-blue-500" />
                    <h3 className="font-bold text-xl">Family</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Family gatherings and quality time with loved ones mean everything to you.</p>
                </div>
              </div>
              
              {/* Travel */}
              <div className={`rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 ${darkMode ? 'bg-gray-800/70' : 'bg-white/70'} backdrop-blur-sm`}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src="./public/Assets/Favorite Things/travel.jpg" 
                    alt="Travel" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <Plane className="w-5 h-5 mr-2 text-teal-500" />
                    <h3 className="font-bold text-xl">Travel</h3>
                  </div>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Exploring new places and experiencing different cultures fills your heart with adventure.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gift section */}
        <section className="py-16 text-center">
          <div className={`p-6 rounded-xl mb-12 ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <h2 className="text-3xl md:text-4xl font-bold">
              A Special Gift For You
            </h2>
          </div>
          
          <div className="relative inline-block">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="cursor-pointer"
              onClick={toggleGiftMessage}
            >
              <Gift className="w-24 h-24 mx-auto text-red-500 stroke-2" />
              <p className="mt-4 text-lg">Click to open your gift</p>
            </motion.div>
            
            <AnimatePresence>
              {showGiftMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                  onClick={toggleGiftMessage}
                >
                  <motion.div
                    onClick={(e) => e.stopPropagation()}
                    className={`rounded-xl shadow-xl max-w-md p-8 m-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                  >
                    <h2 className="text-3xl mb-4 justify-center font-bold">Happy Birthday, Maa! 🥰</h2>
                    <p className="text-lg mb-4">
                      Maa, no words can truly capture how much you mean to me. From my very first steps to every milestone in my life, you have been my biggest supporter, my protector, and my guiding light. Your love, sacrifices, and endless care have shaped me into who I am today, and for that, I will always be grateful.

                      Even if, for any reason, I ever forget your birthday, please know that my love for you will never fade. You are and always will be the most important person in my life. No date on a calendar can ever define the immense gratitude and love I hold for you every single day.

                      May this year bring you endless happiness, good health, and all the love you so selflessly give to everyone around you. You deserve the world and more, Maa!
                    </p>
                    <h2 className="text-3xl justify-center font-bold">🎂Pope Mama!🎉</h2>
                    <button
                      onClick={toggleGiftMessage}
                      className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Signature */}
        <section className="py-16 text-center">
          <div className={`p-8 rounded-xl mx-auto max-w-md ${darkMode ? 'bg-gray-800/50' : 'bg-white/50'} backdrop-blur-sm`}>
            <HandwrittenText 
              text="With all my love," 
              className="text-2xl mb-2"
            />
            <HandwrittenText 
              text="BJyotibrat" 
              className="text-3xl font-bold"
            />
          </div>
        </section>
      </main>
      <Balloons scrollY={scrollY} />
    </div>
  );
};

export default App;