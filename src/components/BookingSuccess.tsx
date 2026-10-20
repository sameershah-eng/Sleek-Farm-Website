import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TicketPassCard } from './TicketPassCard';
import { Copy, Check, Download, CalendarPlus, ArrowLeft } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface BookingSuccessProps {
  bookingData: {
    referenceNumber: string;
    experienceTitle: string;
    date: string;
    timeSlot: string;
    guestName: string;
    email: string;
    adultTickets: number;
    childTickets: number;
    totalPaid: number;
  };
  onReset: () => void;
}

export const BookingSuccess: React.FC<BookingSuccessProps> = ({ bookingData, onReset }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingData.referenceNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Generate 16 leaf burst particles
  const leaves = Array.from({ length: 16 }).map((_, i) => {
    const angle = (i / 16) * 360;
    const distance = 80 + Math.random() * 80;
    const x = Math.cos((angle * Math.PI) / 180) * distance;
    const y = Math.sin((angle * Math.PI) / 180) * distance - 40; // float slightly upwards
    const scale = 0.6 + Math.random() * 0.7;
    const rotation = Math.random() * 360;

    return { id: i, x, y, scale, rotation };
  });

  return (
    <div className="relative py-8 px-4 sm:px-6 max-w-2xl mx-auto text-center">
      {/* Central Checkmark Drawing Itself */}
      <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
        {/* Floating leaf particles burst */}
        {leaves.map((leaf) => (
          <motion.div
            key={leaf.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
            animate={{
              x: leaf.x,
              y: leaf.y,
              opacity: [0, 1, 0],
              scale: leaf.scale,
              rotate: leaf.rotation + 180,
            }}
            transition={{
              duration: 1.6,
              delay: 0.4 + (leaf.id % 4) * 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute pointer-events-none text-[#4E6E50]"
          >
            {/* Small stylized leaf shape */}
            <svg className="w-5 h-5 fill-current opacity-85" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
          </motion.div>
        ))}

        {/* Outer Circle Ring */}
        <svg className="w-24 h-24 text-[#204128]" viewBox="0 0 100 100">
          <motion.circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* Animated Stroke Checkmark */}
          <motion.path
            d="M 30 52 L 44 65 L 72 35"
            fill="none"
            stroke="currentColor"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
      </div>

      {/* Confirmation Heading */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        <span className="text-xs uppercase tracking-[0.25em] text-[#4E6E50] font-semibold block mb-1">
          Sanctuary Visit Confirmed
        </span>
        <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#204128] tracking-tight">
          We can’t wait to welcome you.
        </h3>
        <p className="text-sm text-[#4A5546] mt-2 max-w-md mx-auto">
          A confirmation receipt with directions and farm guidelines has been sent to{' '}
          <span className="font-medium text-[#204128]">{bookingData.email}</span>.
        </p>

        {/* Booking Reference Box with Copy Button */}
        <div className="mt-6 inline-flex items-center gap-3 bg-[#EFE9DF] border border-[#204128]/15 px-4 py-2.5 rounded-full">
          <span className="text-xs text-[#5D6B5A]">Reference No:</span>
          <span className="font-mono text-sm font-bold text-[#204128] tracking-wider">
            {bookingData.referenceNumber}
          </span>
          <button
            onClick={handleCopy}
            className="p-1.5 rounded-full hover:bg-white/60 text-[#204128] transition-colors cursor-pointer"
            aria-label="Copy booking reference"
          >
            {copied ? (
              <span className="flex items-center gap-1 text-[11px] text-[#204128] font-medium">
                <Check className="w-3.5 h-3.5 text-emerald-700" /> Copied
              </span>
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </motion.div>

      {/* 3D Tilt Ticket Pass Card */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.9 }}
        className="mt-6"
      >
        <TicketPassCard
          referenceNumber={bookingData.referenceNumber}
          experienceTitle={bookingData.experienceTitle}
          date={bookingData.date}
          timeSlot={bookingData.timeSlot}
          guestName={bookingData.guestName}
          guestCount={bookingData.adultTickets + bookingData.childTickets}
          totalPaid={bookingData.totalPaid}
        />
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="mt-8 flex flex-wrap items-center justify-center gap-4"
      >
        <MagneticButton
          variant="outline"
          onClick={() => {
            const icsData = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${bookingData.experienceTitle} - Springbrook Downes\nDESCRIPTION:Sanctuary pass #${bookingData.referenceNumber}\nLOCATION:Springbrook Downes Heritage Farm\nEND:VEVENT\nEND:VCALENDAR`;
            const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `springbrook-${bookingData.referenceNumber}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
          className="!text-xs sm:!text-sm"
        >
          <CalendarPlus className="w-4 h-4" />
          <span>Add to Calendar (.ics)</span>
        </MagneticButton>

        <MagneticButton variant="primary" onClick={onReset} className="!text-xs sm:!text-sm">
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Farm Overview</span>
        </MagneticButton>
      </motion.div>
    </div>
  );
};
