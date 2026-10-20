import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageLoadIntroProps {
  onComplete?: () => void;
}

export const PageLoadIntro: React.FC<PageLoadIntroProps> = ({ onComplete }) => {
  const [shouldShow, setShouldShow] = useState<boolean | null>(null);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('meadowbrook_intro_viewed');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      setShouldShow(false);
      onComplete?.();
    } else {
      setShouldShow(true);
      sessionStorage.setItem('meadowbrook_intro_viewed', 'true');
    }
  }, [onComplete]);

  if (shouldShow === false || shouldShow === null) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        exit={{ y: '-100%' }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        onAnimationComplete={() => onComplete?.()}
        className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#FAF7F2] text-[#204128]"
      >
        <div className="flex flex-col items-center text-center p-6">
          {/* Farm logo mark drawing itself via SVG stroke */}
          <svg
            className="w-24 h-24 mb-4 text-[#204128]"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Sun arc */}
            <motion.path
              d="M 25 50 A 25 25 0 0 1 75 50"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Sun rays */}
            <motion.line
              x1="50"
              y1="15"
              x2="50"
              y2="22"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            />
            <motion.line
              x1="26"
              y1="26"
              x2="32"
              y2="32"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
            <motion.line
              x1="74"
              y1="26"
              x2="68"
              y2="32"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            />
            {/* Rolling hills */}
            <motion.path
              d="M 12 75 C 32 60, 48 78, 88 64"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.path
              d="M 20 84 C 45 74, 60 88, 85 76"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
            {/* Sprouting wheat stalk */}
            <motion.path
              d="M 50 78 V 44 M 50 56 Q 40 50 38 42 M 50 50 Q 60 44 62 36 M 50 62 Q 60 56 62 48"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.85, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </svg>

          {/* Typography reveal */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="overflow-hidden"
          >
            <span className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#204128]">
              Springbrook Downes
            </span>
            <span className="block text-xs uppercase tracking-[0.25em] font-sans text-[#4E6E50] mt-1">
              Heritage Highland & Citrus Sanctuary · Est. 2012
            </span>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
