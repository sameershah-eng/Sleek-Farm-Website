import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FARM_IMAGES, FarmImageItem } from '../content/images';
import { SmartImage } from './SmartImage';
import { X, ZoomIn, Eye } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'All' | 'Animals' | 'Events' | 'Workshops' | 'Farm Life'>('All');
  const [selectedPhoto, setSelectedPhoto] = useState<FarmImageItem | null>(null);

  const categories = ['All', 'Animals', 'Events', 'Workshops', 'Farm Life'] as const;

  const filteredImages =
    activeCategory === 'All'
      ? FARM_IMAGES
      : FARM_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold">
            Visual Chronicle
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#204128] tracking-tight mt-1">
            Life at Springbrook Downes
          </h2>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EFE9DF] rounded-full border border-[#204128]/10 overflow-x-auto no-scrollbar">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-4 py-2 text-xs font-medium rounded-full transition-colors whitespace-nowrap cursor-pointer ${
                  isActive ? 'text-[#FAF7F2]' : 'text-[#4A5546] hover:text-[#204128]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-gallery-tab"
                    className="absolute inset-0 bg-[#204128] rounded-full shadow-xs"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Masonry/Grid with Framer Motion layout */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredImages.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              data-cursor="view"
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden border border-[#204128]/15 bg-[#FAF7F2] cursor-pointer shadow-xs hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#ECE6DB]">
                <motion.div
                  layoutId={`gallery-card-${item.id}`}
                  className="w-full h-full group-hover:scale-[1.06] transition-transform duration-700 ease-out"
                >
                  <SmartImage
                    src={item.path}
                    alt={item.alt}
                    objectPosition={item.objectPosition}
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                {/* Hover overlay with label slide up */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#142316]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 w-full flex items-center justify-between text-[#FAF7F2]">
                    <div>
                      <span className="text-[11px] uppercase tracking-widest text-[#D4C3A3] font-medium block">
                        {item.category}
                      </span>
                      <span className="font-serif text-lg leading-tight block">{item.title}</span>
                    </div>
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-xs">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 flex items-center justify-between text-xs text-[#5D6B5A]">
                <span className="font-medium text-[#204128] truncate">{item.title}</span>
                <span className="text-[11px] opacity-75">{item.usedIn.split('(')[0]}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Shared Layout Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-8 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              layoutId={`gallery-card-${selectedPhoto.id}`}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-[#FAF7F2] flex items-center justify-center hover:bg-black/70 transition-colors cursor-pointer"
                aria-label="Close Lightbox"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Full Image */}
              <div className="relative w-full max-h-[68vh] overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={selectedPhoto.path}
                  alt={selectedPhoto.alt}
                  className="max-h-[68vh] w-auto max-w-full object-contain farm-photo-grade"
                />
              </div>

              {/* Lightbox Caption & Details */}
              <div className="p-6 bg-[#FAF7F2] border-t border-[#204128]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#4E6E50] font-semibold mb-1">
                    <span>{selectedPhoto.category}</span>
                    <span>·</span>
                    <span>{selectedPhoto.usedIn}</span>
                  </div>
                  <h3 className="font-serif text-2xl font-normal text-[#204128]">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5546] mt-1 max-w-xl">
                    {selectedPhoto.alt}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs text-[#68795A] block">Meadowbrook Archives</span>
                  <span className="font-serif text-xs text-[#204128]">35mm Natural Light</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
