import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
} from 'motion/react';

interface MarqueeBandProps {
  text?: string;
  className?: string;
}

export const MarqueeBand: React.FC<MarqueeBandProps> = ({
  text = 'Farm Visits · Workshops · Heritage Animals · Seasonal Harvests · Wood-Fired Feasts · Valley Pastures ·',
  className = '',
}) => {
  const baseX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  useAnimationFrame((_, delta) => {
    // Normal drift speed + slight reaction to scroll velocity
    let moveBy = 0.045 * delta;
    if (velocityFactor.get()) {
      moveBy += velocityFactor.get() * 0.05;
    }
    baseX.set(baseX.get() - moveBy);
  });

  // Wrap at -50%
  const x = useTransform(baseX, (v) => `${(v % 50)}%`);

  return (
    <div
      ref={containerRef}
      className={`py-6 md:py-8 overflow-hidden select-none border-y border-[#204128]/10 bg-[#F4EFE6]/70 ${className}`}
    >
      <motion.div
        style={{ x }}
        className="flex whitespace-nowrap will-change-transform font-serif font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase tracking-wider text-stroke-fraunces"
      >
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
        <span className="mr-8">{text}</span>
      </motion.div>
    </div>
  );
};
