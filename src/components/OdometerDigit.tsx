import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface OdometerProps {
  value: number;
  className?: string;
}

export const Odometer: React.FC<OdometerProps> = ({ value, className = '' }) => {
  return (
    <div className={`relative inline-flex items-center overflow-hidden font-serif ${className}`}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: 24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -24, opacity: 0 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block tabular-nums"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};
