import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCES_DATA } from '../content/images';
import { SmartImage } from './SmartImage';
import { Clock, Users, ArrowUpRight } from 'lucide-react';

interface WorkshopsSectionProps {
  onSelectExperience: (experienceId: string) => void;
}

export const WorkshopsSection: React.FC<WorkshopsSectionProps> = ({ onSelectExperience }) => {
  return (
    <section id="workshops" className="py-20 md:py-28 px-6 md:px-10 max-w-7xl mx-auto">
      {/* Eyebrow & Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold"
          >
            Gather & Learn
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#204128] tracking-tight mt-1"
          >
            Workshops & Seasonal Gatherings
          </motion.h2>
        </div>
        <p className="text-sm text-[#4E5B4B] max-w-md leading-relaxed">
          Small-group immersive sessions led by our head bakers, apiarists, and shepherds. All
          materials, harvests, and farm refreshments provided.
        </p>
      </div>

      {/* Grid of Experiences */}
      <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
        {EXPERIENCES_DATA.map((exp, index) => {
          const isAlmostFull = exp.badge === 'Almost Full';

          return (
            <motion.div
              key={exp.id}
              data-cursor="book"
              onClick={() => onSelectExperience(exp.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="group relative bg-[#FAF7F2] border border-[#204128]/15 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between"
            >
              {/* Media Frame with 1.06 hover scale */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#ECE6DB]">
                <div className="w-full h-full group-hover:scale-[1.06] transition-transform duration-700 ease-out">
                  <SmartImage
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Gradient overlay & Reserve label sliding up on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#142316]/85 via-[#142316]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <span className="text-xs font-semibold uppercase tracking-widest text-[#FAF7F2] flex items-center gap-2 translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <span>Reserve Your Spot</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="bg-[#FAF7F2]/90 backdrop-blur-xs text-[#204128] text-xs font-medium px-3 py-1 rounded-full shadow-xs">
                    {exp.type}
                  </span>
                  {isAlmostFull && (
                    <span className="relative flex items-center gap-1.5 bg-[#8C593B]/90 text-[#FAF7F2] text-xs font-medium px-2.5 py-1 rounded-full shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FAF7F2] animate-pulse" />
                      Almost Full
                    </span>
                  )}
                </div>

                {/* Price pill */}
                <div className="absolute top-4 right-4 bg-[#204128] text-[#FAF7F2] font-serif text-sm px-3.5 py-1 rounded-full shadow-md">
                  ${exp.price} <span className="text-[11px] font-sans font-light opacity-80">/ person</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-7 flex flex-col flex-grow justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs text-[#5D6B5A] mb-2 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#204128]" />
                      {exp.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-[#204128]" />
                      {exp.groupSize}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-normal text-[#204128] group-hover:text-[#2F5233] transition-colors leading-snug">
                    {exp.title}
                  </h3>

                  <p className="text-sm text-[#455243] mt-2 leading-relaxed line-clamp-2">
                    {exp.description}
                  </p>
                </div>

                {/* Highlights list */}
                <div className="mt-6 pt-5 border-t border-[#204128]/10">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#4A5546]">
                    {exp.highlights.slice(0, 2).map((item, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-[#204128]" />
                        <span className="truncate">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-4 flex items-center justify-between text-xs pt-2">
                    <span className="text-[#68795A] font-medium">Next available dates this weekend</span>
                    <span className="font-semibold text-[#204128] group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Select Date & Book →
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
