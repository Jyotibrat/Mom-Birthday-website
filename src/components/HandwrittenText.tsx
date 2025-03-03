import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface HandwrittenTextProps {
  text: string;
  className?: string;
}

const HandwrittenText: React.FC<HandwrittenTextProps> = ({ text, className = '' }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (inView && !hasAnimated.current) {
      controls.start('visible');
      hasAnimated.current = true;
    }
  }, [controls, inView]);

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <motion.h1 
      ref={ref}
      className={`font-handwriting ${className}`}
      initial="hidden"
      animate={controls}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          custom={index}
          variants={letterVariants}
          className="inline-block"
          style={{
            transform: char === ' ' ? 'translateX(0.25em)' : 'none',
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
};

export default HandwrittenText;