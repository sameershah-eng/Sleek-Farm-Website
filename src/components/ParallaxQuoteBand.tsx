import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const ParallaxQuoteBand: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax translation
  const y = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section
      ref={containerRef}
      className="relative h-[480px] md:h-[580px] w-full overflow-hidden flex items-center justify-center my-12 md:my-20"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-[135%] -top-[18%] pointer-events-none"
      >
        <img
          src="/images/parallax-citrus-orchard.jpg"
          alt="Atmospheric blooming citrus grove avenue with fragrant white blossoms at Springbrook Downes"
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover farm-photo-grade object-[center_45%]"
        />
        {/* Soft atmospheric gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142316]/85 via-[#182C1B]/55 to-[#142316]/70" />
      </motion.div>

      {/* Quote Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center text-[#FAF7F2]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs uppercase tracking-[0.28em] text-[#D4C3A3] font-medium block mb-4">
            The Living Rhythm
          </span>

          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal leading-snug tracking-tight text-balance">
            “The land does not belong to us; we are simply its quiet stewards for one brief season of blossom, sun, and rain.”
          </blockquote>

          <div className="mt-6 flex items-center justify-center gap-3 text-xs tracking-wider uppercase text-[#EFE9DE]/80">
            <span>Springbrook Downes</span>
            <span aria-hidden="true">·</span>
            <span>Heritage Highland & Citrus Sanctuary</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
