import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PageTransitionOverlayProps {
  isTransitioning: boolean;
  onCovered?: () => void;
  onComplete?: () => void;
}

export const PageTransitionOverlay: React.FC<PageTransitionOverlayProps> = ({
  isTransitioning,
  onCovered,
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="transition-panel"
          initial={{ y: '100%' }}
          animate={{ y: ['100%', '0%', '-100%'] }}
          transition={{
            duration: 0.82,
            times: [0, 0.45, 1],
            ease: [0.22, 1, 0.36, 1],
          }}
          onUpdate={(latest) => {
            // When covered near 0%, trigger scroll reset
            if (typeof latest.y === 'string' && latest.y === '0%') {
              onCovered?.();
            }
          }}
          onAnimationComplete={() => {
            onComplete?.();
          }}
          className="fixed inset-0 z-[9990] pointer-events-none bg-gradient-to-b from-[#18341F] via-[#204128] to-[#3B543A] shadow-2xl flex items-center justify-center"
        >
          <div className="flex items-center gap-3 text-[#FAF7F2]/80 font-serif text-lg tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2]/60" />
            <span>Meadowbrook</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2]/60" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
