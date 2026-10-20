import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface IntroLoaderProps {
  onDismiss?: () => void;
}

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onDismiss }) => {
  // Listen for keydown anywhere while loader is mounted to immediately skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept refresh / devtools shortcuts
      if (e.key === 'F5' || (e.ctrlKey && e.key === 'r') || (e.metaKey && e.key === 'r')) {
        return;
      }
      onDismiss?.();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onDismiss]);

  return (
    <motion.div
      key="intro"
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '-100%' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onDismiss?.()}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] text-[#204128] cursor-pointer select-none pointer-events-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome intro"
    >
      <div className="flex flex-col items-center text-center p-6 max-w-md mx-auto pointer-events-auto">
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
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
            transition={{ duration: 0.35, delay: 0.15 }}
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
            transition={{ duration: 0.35, delay: 0.2 }}
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
            transition={{ duration: 0.35, delay: 0.2 }}
          />
          {/* Rolling hills */}
          <motion.path
            d="M 12 75 C 32 60, 48 78, 88 64"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.path
            d="M 20 84 C 45 74, 60 88, 85 76"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Sprouting crop stalk */}
          <motion.path
            d="M 50 78 V 44 M 50 56 Q 40 50 38 42 M 50 50 Q 60 44 62 36 M 50 62 Q 60 56 62 48"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>

        {/* Typography reveal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-hidden"
        >
          <span className="font-serif text-2xl md:text-3xl font-normal tracking-tight text-[#204128]">
            Springbrook Downes
          </span>
          <span className="block text-xs uppercase tracking-[0.25em] font-sans text-[#4E6E50] mt-1">
            Heritage Highland & Citrus Sanctuary · Est. 2012
          </span>
        </motion.div>

        {/* Subtle skip affordance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.65 }}
          transition={{ duration: 0.4, delay: 0.7 }}
          className="mt-6 text-[11px] uppercase tracking-wider text-[#68795A] hover:opacity-100 transition-opacity"
        >
          Click or press any key to enter →
        </motion.div>
      </div>
    </motion.div>
  );
};

// Also export as PageLoadIntro for backwards compatibility
export const PageLoadIntro = IntroLoader;
