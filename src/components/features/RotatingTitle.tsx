import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RotatingTitleProps {
  titles: string[];
  intervalMs?: number;
  className?: string;
}

export const RotatingTitle: React.FC<RotatingTitleProps> = ({
  titles,
  intervalMs = 5000,
  className = '',
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!titles || titles.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % titles.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [titles, intervalMs]);

  if (!titles || titles.length === 0) return null;

  const safeIndex = currentIndex % titles.length;
  const currentTitle = titles[safeIndex] || '';
  const words = currentTitle.split(' ');

  let globalCharCount = 0;

  const letterVariants = {
    initial: {
      rotateY: -90,
      opacity: 0,
      scale: 0.95,
    },
    animate: (i: number) => ({
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.025,
        duration: 0.35,
        ease: [0.25, 1, 0.5, 1],
      },
    }),
    exit: (i: number) => ({
      rotateY: 90,
      opacity: 0,
      scale: 0.95,
      transition: {
        delay: i * 0.018,
        duration: 0.25,
        ease: [0.5, 0, 0.75, 0],
      },
    }),
  };

  return (
    <span
      className={`inline-flex flex-wrap items-center ${className}`}
      style={{ perspective: 1000 }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={`${safeIndex}-${currentTitle}`}
          className="inline-flex flex-wrap items-center"
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ perspective: 1000 }}
        >
          {words.map((word, wordIndex) => {
            const wordChars = word.split('');
            return (
              <span
                key={`w-${wordIndex}`}
                className="inline-block whitespace-nowrap"
              >
                {wordChars.map((char, charIndex) => {
                  const charGlobalIndex = globalCharCount++;
                  return (
                    <motion.span
                      key={`c-${charIndex}`}
                      custom={charGlobalIndex}
                      variants={letterVariants}
                      className="inline-block transform-gpu origin-center"
                      style={{
                        transformStyle: 'preserve-3d',
                        backfaceVisibility: 'hidden',
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
                {wordIndex < words.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            );
          })}
        </motion.span>
      </AnimatePresence>
    </span>
  );
};

export default RotatingTitle;
