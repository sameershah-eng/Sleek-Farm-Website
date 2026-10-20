import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorType, setCursorType] = useState<'default' | 'view' | 'book' | 'hover'>('default');
  const [isTouch, setIsTouch] = useState(true);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging spring physics for outer ring
  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check touch and reduced motion
    const touchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (touchDevice || reducedMotion) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorType('view');
          setCursorText('View');
          return;
        } else if (type === 'book') {
          setCursorType('book');
          setCursorText('Book');
          return;
        } else if (type === 'drag') {
          setCursorType('hover');
          setCursorText('Drag');
          return;
        }
      }

      const isClickable = target.closest('button, a, input, select, textarea, [role="button"]');
      if (isClickable) {
        setCursorType('hover');
        setCursorText('');
      } else {
        setCursorType('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorType === 'view' || cursorType === 'book';

  return (
    <>
      {/* Center sharp forest-green dot */}
      <motion.div
        aria-hidden="true"
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[#204128]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: isExpanded ? 0 : cursorType === 'hover' ? 10 : 6,
          height: isExpanded ? 0 : cursorType === 'hover' ? 10 : 6,
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 400 }}
      />

      {/* Lagging outer responsive ring */}
      <motion.div
        aria-hidden="true"
        className={`fixed top-0 left-0 pointer-events-none z-[9998] rounded-full flex items-center justify-center font-serif text-[11px] font-semibold tracking-wider transition-colors duration-200 ${
          isExpanded
            ? 'bg-[#204128]/90 text-[#FAF7F2] shadow-xl backdrop-blur-xs'
            : cursorType === 'hover'
            ? 'border-[1.5px] border-[#204128]/80 bg-[#204128]/10'
            : 'border-[1.5px] border-[#204128]/40'
        }`}
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: isExpanded ? 64 : cursorType === 'hover' ? 44 : 28,
          height: isExpanded ? 64 : cursorType === 'hover' ? 44 : 28,
        }}
      >
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="uppercase select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
