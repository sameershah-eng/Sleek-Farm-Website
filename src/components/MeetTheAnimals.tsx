import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ANIMALS_DATA } from '../content/images';
import { SmartImage } from './SmartImage';
import { Sparkles, Heart, X, Info } from 'lucide-react';

export const MeetTheAnimals: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedAnimal, setSelectedAnimal] = useState<(typeof ANIMALS_DATA)[0] | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Moves sideways on desktop scroll
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-56%']);

  return (
    <section id="animals" className="relative bg-[#FAF7F2] py-16 md:py-0">
      {/* Desktop pinned horizontal scroll container */}
      <div ref={containerRef} className="hidden md:block relative h-[280vh]">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden px-10 lg:px-16">
          {/* Section Header */}
          <div className="max-w-7xl mx-auto w-full mb-8">
            <div className="flex items-end justify-between">
              <div>
                <motion.span
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold"
                >
                  Pasture Companions
                </motion.span>
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ delay: 0.1 }}
                  className="font-serif text-3xl md:text-5xl font-normal text-[#204128] tracking-tight mt-1"
                >
                  Meet the Animals
                </motion.h2>
              </div>
              <p className="text-xs text-[#5D6B5A] tracking-wider uppercase font-medium">
                Scroll to stroll through the pastures →
              </p>
            </div>
          </div>

          {/* Cards Track */}
          <motion.div style={{ x }} className="flex gap-8 will-change-transform max-w-none pl-2">
            {ANIMALS_DATA.map((animal) => (
              <div
                key={animal.id}
                data-cursor="view"
                onClick={() => setSelectedAnimal(animal)}
                className="group relative w-[360px] lg:w-[420px] shrink-0 bg-[#FAF7F2] border border-[#204128]/15 rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-500"
              >
                {/* Image Container with 1.06 scale on hover */}
                <div className="relative h-[340px] w-full overflow-hidden bg-[#EFE9DF]">
                  <div className="w-full h-full group-hover:scale-[1.06] transition-transform duration-700 ease-out">
                    <SmartImage
                      src={animal.image}
                      alt={`${animal.name} - ${animal.breed}`}
                      aspectRatio="4/3"
                      objectPosition={animal.objectPosition}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Gradient overlay & slide-up label on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A3320]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] flex items-center gap-1.5 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                      <span>View Story & Habits</span>
                      <span>→</span>
                    </span>
                  </div>

                  {/* Gentle age badge */}
                  <div className="absolute top-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#204128] text-xs font-medium px-3 py-1 rounded-full shadow-xs">
                    {animal.age}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-serif text-2xl font-normal text-[#204128] group-hover:text-[#2F5233] transition-colors">
                      {animal.name}
                    </h3>
                    <span className="text-xs text-[#68795A] font-medium">{animal.role}</span>
                  </div>

                  <p className="text-xs text-[#4A5546] font-medium mb-3">{animal.breed}</p>

                  <p className="text-sm text-[#384236] line-clamp-2 leading-relaxed">
                    {animal.bio}
                  </p>

                  <div className="mt-4 pt-4 border-t border-[#204128]/10 flex items-center justify-between text-xs text-[#5D6B5A]">
                    <span className="truncate max-w-[240px]">Fav: {animal.favoriteTreat}</span>
                    <Heart className="w-3.5 h-3.5 text-[#8C593B]/70 group-hover:text-[#8C593B] group-hover:scale-110 transition-all" />
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile Native Swipe Carousel */}
      <div className="md:hidden px-6">
        <div className="mb-6">
          <span className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold">
            Pasture Companions
          </span>
          <h2 className="font-serif text-3xl font-normal text-[#204128] tracking-tight mt-1">
            Meet the Animals
          </h2>
          <p className="text-xs text-[#68795A] mt-1">Swipe horizontally to meet everyone</p>
        </div>

        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-6 -mx-6 px-6">
          {ANIMALS_DATA.map((animal) => (
            <div
              key={animal.id}
              onClick={() => setSelectedAnimal(animal)}
              className="snap-center w-[82vw] shrink-0 bg-[#FAF7F2] border border-[#204128]/15 rounded-2xl overflow-hidden shadow-sm"
            >
              <div className="relative h-[240px] w-full overflow-hidden bg-[#EFE9DF]">
                <SmartImage
                  src={animal.image}
                  alt={`${animal.name} - ${animal.breed}`}
                  aspectRatio="4/3"
                  objectPosition={animal.objectPosition}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#204128] text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {animal.age}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-baseline justify-between mb-1">
                  <h3 className="font-serif text-xl font-normal text-[#204128]">{animal.name}</h3>
                  <span className="text-xs text-[#68795A] font-medium">{animal.role}</span>
                </div>
                <p className="text-xs text-[#4A5546] font-medium mb-2">{animal.breed}</p>
                <p className="text-xs text-[#384236] leading-relaxed line-clamp-2">{animal.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal for Selected Animal */}
      <AnimatePresence>
        {selectedAnimal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl bg-[#FAF7F2] rounded-3xl overflow-hidden border border-[#204128]/15 shadow-2xl"
            >
              <button
                onClick={() => setSelectedAnimal(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 text-[#FAF7F2] flex items-center justify-center hover:bg-black/60 transition-colors cursor-pointer"
                aria-label="Close animal modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-full relative bg-[#EFE9DF]">
                  <SmartImage
                    src={selectedAnimal.image}
                    alt={selectedAnimal.name}
                    objectPosition={selectedAnimal.objectPosition}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-[#4E6E50] font-semibold uppercase tracking-wider mb-1">
                      <span>{selectedAnimal.role}</span>
                      <span>·</span>
                      <span>{selectedAnimal.age}</span>
                    </div>

                    <h3 className="font-serif text-3xl text-[#204128] font-normal mb-1">
                      {selectedAnimal.name}
                    </h3>
                    <p className="text-xs text-[#68795A] font-medium mb-4">
                      {selectedAnimal.breed}
                    </p>

                    <p className="text-sm text-[#384236] leading-relaxed mb-4">
                      {selectedAnimal.bio}
                    </p>

                    <div className="space-y-2 py-3 border-t border-[#204128]/10 text-xs">
                      <div>
                        <span className="font-semibold text-[#204128]">Personality: </span>
                        <span className="text-[#4A5546]">{selectedAnimal.personality}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-[#204128]">Favorite treat: </span>
                        <span className="text-[#4A5546]">{selectedAnimal.favoriteTreat}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#204128]/10 flex items-center justify-between">
                    <span className="text-xs text-[#5D6B5A] flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-[#204128]" />
                      Included in Family Barn Walks
                    </span>
                    <button
                      onClick={() => setSelectedAnimal(null)}
                      className="text-xs font-semibold uppercase tracking-wider text-[#204128] hover:underline cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
