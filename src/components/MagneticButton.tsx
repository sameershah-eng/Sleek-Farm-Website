import React, { useRef, useState, useEffect } from 'react';
import { motion, useSpring, HTMLMotionProps } from 'motion/react';

interface MagneticButtonProps extends HTMLMotionProps<'button'> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  magnetic?: boolean;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  variant = 'primary',
  className = '',
  magnetic = true,
  onClick,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [isTouch, setIsTouch] = useState(true);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    setIsTouch('ontouchstart' in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || !magnetic || !ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.28);
    y.set(middleY * 0.28);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-gradient-to-r from-[#204128] via-[#2F5233] to-[#1B3621] hover:from-[#1A3822] hover:via-[#26482B] hover:to-[#142A1A] text-[#FAF7F2] shadow-md hover:shadow-xl shadow-[#204128]/20 border border-[#2F5233]/40';
      case 'secondary':
        return 'bg-[#EFE9DE] hover:bg-[#E5DFC8] text-[#204128] border border-[#204128]/15 shadow-xs';
      case 'outline':
        return 'bg-transparent text-[#204128] border border-[#204128]/35 hover:border-[#204128] hover:bg-[#204128]/5';
      case 'ghost':
        return 'bg-transparent text-[#204128] hover:bg-[#204128]/8';
      default:
        return '';
    }
  };

  return (
    <motion.button
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileTap={{ scale: 0.98 }}
      className={`group relative inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 cursor-pointer select-none whitespace-nowrap shrink-0 overflow-hidden ${getVariantStyles()} ${className}`}
      {...props}
    >
      {/* Subtle shine sweep gradient on hover */}
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-1000 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none transition-transform ease-out" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};
