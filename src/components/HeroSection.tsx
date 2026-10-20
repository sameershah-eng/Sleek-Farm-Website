import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { ArrowDown, Sparkles, Image as ImageIcon } from 'lucide-react';

interface HeroSectionProps {
  onReserve: () => void;
  onExplore: () => void;
  introDone?: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onReserve,
  onExplore,
  introDone = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeHeroPhoto, setActiveHeroPhoto] = useState<number>(0);

  const heroPhotos = [
    {
      src: '/images/hero-farm-entrance.jpg',
      alt: 'Vintage corrugated green heritage farm pavilion with laser-cut Springbrook Downes rusted steel sign, Highland cow logo, and antique luggage trunks',
      label: 'Heritage Pavilion & Gate',
    },
    {
      src: '/images/hero-sunrise-field.jpg',
      alt: 'Misty golden sunrise over rolling green pastures with rustic split-rail wooden fence and wildflowers at Springbrook Downes',
      label: 'Sunrise Pastures',
    },
  ];

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: background moves slower (0 to 180px), text floats and fades
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '24%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Words for word-by-word masked reveal
  const headlineWords = [
    { text: 'Where', italic: false },
    { text: 'heritage', italic: false },
    { text: 'soil', italic: false },
    { text: 'meets', italic: false },
    { text: 'gentle', italic: true },
    { text: 'living.', italic: false },
  ];

  return (
    <section
      ref={containerRef}
      className="relative h-screen min-h-[640px] max-h-[1080px] w-full overflow-hidden flex items-end justify-start pb-16 md:pb-24"
    >
      {/* Hero Image with Ken Burns drift & Parallax */}
      <motion.div
        style={{ y: imageY }}
        className="absolute inset-0 w-full h-[120%] -top-[10%] pointer-events-none"
      >
        <AnimatePresence mode="sync">
          <motion.div
            key={activeHeroPhoto}
            initial={{ opacity: 0, scale: 1.12 }}
            animate={{ opacity: 1, scale: [1.12, 1.0, 1.04] }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.9, ease: 'easeInOut' },
              scale: {
                duration: 22,
                times: [0, 0.1, 1],
                ease: [0.22, 1, 0.36, 1],
                repeat: Infinity,
                repeatType: 'reverse',
              },
            }}
            className="absolute inset-0 w-full h-full"
          >
            <img
              src={heroPhotos[activeHeroPhoto].src}
              alt={heroPhotos[activeHeroPhoto].alt}
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover farm-photo-grade object-[center_45%]"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic gradient scrims ensuring pristine contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#142316]/95 via-[#182B1B]/45 to-black/30" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#142316]/20 to-[#142316]/60" />
      </motion.div>

      {/* Hero Foreground Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 w-full"
      >
        <div className="max-w-3xl">
          {/* Eyebrow kicker */}
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: introDone ? 0 : '100%' }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-2 text-xs md:text-sm uppercase tracking-[0.25em] text-[#EFE9DE]/95 font-medium"
            >
              <span>Springbrook Downes</span>
              <span aria-hidden="true">·</span>
              <span>Heritage Highland Sanctuary</span>
            </motion.div>
          </div>

          {/* Staggered word-by-word masked headline */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#FAF7F2] tracking-tight leading-[1.08] text-balance">
            {headlineWords.map((word, idx) => (
              <span key={idx} className="inline-block overflow-hidden mr-[0.26em] align-top">
                {word.italic ? (
                  <motion.span
                    initial={{ y: '110%', opacity: 0, letterSpacing: '0.08em' }}
                    animate={{
                      y: introDone ? 0 : '110%',
                      opacity: introDone ? 1 : 0,
                      letterSpacing: introDone ? '0em' : '0.08em',
                    }}
                    transition={{
                      duration: 0.9,
                      delay: introDone ? 0.3 + idx * 0.08 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block italic font-light text-[#D4C3A3]"
                  >
                    {word.text}
                  </motion.span>
                ) : (
                  <motion.span
                    initial={{ y: '110%' }}
                    animate={{ y: introDone ? 0 : '110%' }}
                    transition={{
                      duration: 0.8,
                      delay: introDone ? 0.15 + idx * 0.08 : 0,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="inline-block"
                  >
                    {word.text}
                  </motion.span>
                )}
              </span>
            ))}
          </h1>

          {/* Subtitle / body text */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{
              opacity: introDone ? 1 : 0,
              y: introDone ? 0 : 24,
            }}
            transition={{ duration: 0.8, delay: introDone ? 0.65 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-base md:text-lg text-[#EFE9DE]/90 font-normal max-w-xl leading-relaxed"
          >
            Step into 120 acres of rotational pastures, flowering citrus groves, and beloved
            Highland cattle. Walk halter-led calves, bottle-feed lambs, and experience authentic farm life.
          </motion.p>

          {/* CTAs and quick facts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: introDone ? 1 : 0,
              y: introDone ? 0 : 20,
            }}
            transition={{ duration: 0.8, delay: introDone ? 0.85 : 0, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              onClick={onReserve}
              variant="primary"
              className="!bg-[#FAF7F2] !text-[#204128] hover:!bg-[#EFE9DE] !border-[#FAF7F2]"
            >
              <Sparkles className="w-4 h-4 text-[#8C593B]" />
              <span>Book an Experience</span>
            </MagneticButton>

            <MagneticButton
              onClick={onExplore}
              variant="outline"
              className="!text-[#FAF7F2] !border-white/35 hover:!border-white hover:!bg-white/10"
            >
              <span>Meet the Animals</span>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero View Switcher Pill & Scroll Prompt */}
      <div className="absolute bottom-6 right-6 md:right-10 z-20 flex items-center gap-3">
        {/* View Switcher */}
        <div className="flex items-center gap-1 p-1 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-[11px] text-[#FAF7F2]">
          <span className="px-2 py-0.5 text-[#D4C3A3] font-medium flex items-center gap-1">
            <ImageIcon className="w-3 h-3" />
            <span className="hidden sm:inline">View:</span>
          </span>
          {heroPhotos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setActiveHeroPhoto(i)}
              className={`px-2.5 py-1 rounded-full transition-all cursor-pointer font-medium ${
                activeHeroPhoto === i
                  ? 'bg-[#FAF7F2] text-[#204128] shadow-xs'
                  : 'text-[#FAF7F2]/80 hover:text-white'
              }`}
            >
              {i === 0 ? 'Farm Pavilion' : 'Sunrise Meadow'}
            </button>
          ))}
        </div>

        {/* Scroll Down */}
        <motion.button
          onClick={onExplore}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-black/40 backdrop-blur-md rounded-full border border-white/20 text-xs uppercase tracking-wider text-[#FAF7F2] cursor-pointer"
          aria-label="Scroll to content"
        >
          <span>Scroll</span>
          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-3.5 h-3.5" />
          </motion.div>
        </motion.button>
      </div>
    </section>
  );
};
