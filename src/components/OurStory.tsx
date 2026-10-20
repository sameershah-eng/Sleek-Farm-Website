import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { SmartImage } from './SmartImage';

interface StatProps {
  end: number;
  suffix?: string;
  label: string;
}

const AnimatedStat: React.FC<StatProps> = ({ end, suffix = '', label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const frameRate = 1000 / 60;
    const totalFrames = Math.round(duration / frameRate);
    let frame = 0;

    const timer = setInterval(() => {
      frame++;
      // easeOutExpo
      const progress = 1 - Math.pow(2, -10 * (frame / totalFrames));
      const current = Math.floor(progress * end);
      setCount(current);

      if (frame >= totalFrames) {
        setCount(end);
        clearInterval(timer);
      }
    }, frameRate);

    return () => clearInterval(timer);
  }, [isInView, end]);

  return (
    <div ref={ref} className="text-left">
      <div className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#204128] tabular-nums tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-xs uppercase tracking-wider text-[#5D6B5A] font-medium mt-1">
        {label}
      </div>
    </div>
  );
};

export const OurStory: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Overlapping photo pair moves at TWO different parallax speeds for physical depth
  const primaryY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const secondaryY = useTransform(scrollYProgress, [0, 1], ['8%', '-12%']);

  return (
    <section id="story" ref={sectionRef} className="py-20 md:py-32 px-6 md:px-10 max-w-7xl mx-auto overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Overlapping Parallax Photos */}
        <div className="lg:col-span-6 relative min-h-[480px] sm:min-h-[580px] flex items-center justify-center">
          {/* Primary Photo: Founders in Citrus Grove with Buggy & Sheep */}
          <motion.div
            style={{ y: primaryY }}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.8 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-[78%] sm:w-[72%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border border-[#204128]/15 z-10"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <SmartImage
                src="/images/founders-polaris-orchard.jpg"
                alt="Springbrook Downes caretakers smiling beside red Polaris farm buggy and pet sheep in citrus grove"
                className="w-full h-full object-cover"
                objectPosition="center 40%"
              />
            </motion.div>
          </motion.div>

          {/* Secondary Overlapping Photo: Farmer walking baby Highland Calf Bramble at sunset */}
          <motion.div
            style={{ y: secondaryY }}
            initial={{ clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.8 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-6 -right-2 sm:right-4 w-[54%] sm:w-[50%] aspect-square rounded-2xl overflow-hidden shadow-xl border-4 border-[#FAF7F2] z-20"
          >
            <motion.div
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full"
            >
              <SmartImage
                src="/images/highland-calf-walk.jpg"
                alt="Springbrook Downes caretaker leading ginger baby Highland calf on turquoise halter across meadow"
                className="w-full h-full object-cover"
                objectPosition="center 30%"
              />
            </motion.div>
          </motion.div>

          {/* Quiet stamp */}
          <div className="absolute -top-4 -left-2 z-20 bg-[#204128] text-[#FAF7F2] px-4 py-2 rounded-full font-serif text-xs tracking-wider shadow-lg">
            Springbrook Downes · Est. 2012
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Animated Counters */}
        <div className="lg:col-span-6">
          <div className="overflow-hidden mb-2">
            <motion.span
              initial={{ y: '100%' }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold block"
            >
              Generations of Stewardship
            </motion.span>
          </div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#204128] tracking-tight leading-tight text-balance"
          >
            A family commitment to gentle living and heritage breeds.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 space-y-4 text-base text-[#3A4538] leading-relaxed"
          >
            <p>
              At Springbrook Downes, farming is a quiet art of patience and care. Across 120 rolling
              acres of native gum trees, clover pastures, and flowering citrus groves, our family has
              nurtured a sanctuary where animals are respected family and visitors reconnect with the soil.
            </p>
            <p>
              From walking our ginger Highland calf Bramble on halter at golden hour, to touring
              fragrant orange rows in our red farm buggy with our friendly flock sheep, every moment here
              invites you to slow down, breathe deeply, and share the pure joy of farm life.
            </p>
          </motion.div>

          {/* Stats count up when entering view */}
          <div className="mt-10 pt-8 border-t border-[#204128]/15 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <AnimatedStat end={120} suffix=" Ac" label="Pasture & Grove" />
            <AnimatedStat end={48} label="Heritage Animals" />
            <AnimatedStat end={14} suffix=" Yrs" label="Regenerative Soil" />
            <AnimatedStat end={100} suffix="%" label="Caretaker Love" />
          </div>
        </div>
      </div>
    </section>
  );
};
