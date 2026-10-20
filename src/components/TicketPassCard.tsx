import React, { useRef, useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { QrCode, MapPin, Calendar, Clock, Check } from 'lucide-react';

interface TicketPassCardProps {
  referenceNumber: string;
  experienceTitle: string;
  date: string;
  timeSlot: string;
  guestName: string;
  guestCount: number;
  totalPaid: number;
}

export const TicketPassCard: React.FC<TicketPassCardProps> = ({
  referenceNumber,
  experienceTitle,
  date,
  timeSlot,
  guestName,
  guestCount,
  totalPaid,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [sheenPosition, setSheenPosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 300, mass: 0.2 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -10; // max 10 deg
    const rotY = ((x - centerX) / centerX) * 10;

    rotateX.set(rotX);
    rotateY.set(rotY);
    setSheenPosition({ x, y });
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div className="perspective-1000 py-4 flex justify-center">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full max-w-md bg-gradient-to-br from-[#1C3A24] via-[#24482E] to-[#162D1C] text-[#FAF7F2] rounded-3xl p-6 sm:p-7 shadow-2xl border border-white/20 overflow-hidden cursor-pointer select-none group"
      >
        {/* Dynamic Sheen Sweep on Hover */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 220px at ${sheenPosition.x}px ${sheenPosition.y}px, rgba(255,255,255,0.18), transparent 70%)`,
          }}
        />

        {/* Top Header of Ticket */}
        <div className="flex items-center justify-between pb-5 border-b border-white/15">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase text-[#D4C3A3] font-medium block">
              Official Sanctuary Pass
            </span>
            <h4 className="font-serif text-lg font-normal text-[#FAF7F2]">
              Springbrook Downes Heritage Farm
            </h4>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-xs flex items-center justify-center border border-white/20">
            <span className="font-serif text-sm font-bold text-[#D4C3A3]">SBD</span>
          </div>
        </div>

        {/* Experience & Timing Details */}
        <div className="py-5 space-y-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-white/60 block">Experience</span>
            <div className="font-serif text-xl text-[#FAF7F2] leading-snug">{experienceTitle}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-white/60 block mb-0.5">Date & Time</span>
              <div className="font-medium text-[#FAF7F2] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#D4C3A3]" />
                <span>{date}</span>
              </div>
              <div className="font-medium text-white/80 flex items-center gap-1.5 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-[#D4C3A3]" />
                <span>{timeSlot}</span>
              </div>
            </div>

            <div>
              <span className="text-white/60 block mb-0.5">Guest & Passes</span>
              <div className="font-medium text-[#FAF7F2] truncate">{guestName}</div>
              <div className="font-medium text-white/80">{guestCount} {guestCount === 1 ? 'Guest' : 'Guests'} (Paid ${totalPaid})</div>
            </div>
          </div>
        </div>

        {/* Perforated Divider */}
        <div className="relative my-2 -mx-7 flex items-center">
          <div className="w-4 h-8 rounded-r-full bg-[#FAF7F2]" />
          <div className="flex-1 border-b-2 border-dashed border-white/20 mx-2" />
          <div className="w-4 h-8 rounded-l-full bg-[#FAF7F2]" />
        </div>

        {/* QR Code and Reference Footer */}
        <div className="pt-4 flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-white/50 block">Pass Code</span>
            <div className="font-mono text-sm tracking-widest text-[#D4C3A3] font-semibold">
              {referenceNumber}
            </div>
            <span className="text-[10px] text-white/60 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-[#D4C3A3]" /> Hudson Valley, NY
            </span>
          </div>

          {/* Simulated High-Res QR code */}
          <div className="p-2.5 bg-white rounded-xl shadow-md shrink-0 flex items-center justify-center">
            {/* SVG QR Code Pattern */}
            <svg className="w-14 h-14 text-[#1C3A24]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 2h7v7H2V2zm2 2v3h3V4H4zm9-2h7v7h-7V2zm2 2v3h3V4h-3zM2 13h7v7H2v-7zm2 2v3h3v-3H4zm11-2h2v2h-2v-2zm-2 2h2v2h-2v-2zm4 0h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-6-2h2v2h-2v-2zm0-4h2v2h-2v-2zm6-4h2v2h-2V7zm-2 2h2v2h-2V9z" />
            </svg>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
