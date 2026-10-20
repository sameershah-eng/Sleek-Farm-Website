import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { MagneticButton } from './MagneticButton';
import { Calendar, Menu, X } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onNavigate,
  onOpenBooking,
}) => {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Turn into frosted white bar after hero (approx 350px)
    if (latest > 120) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    // Hide on scroll down, reappear on scroll up
    if (latest > 300 && diff > 10) {
      setIsHidden(true);
      setMobileMenuOpen(false);
    } else if (diff < -10 || latest <= 200) {
      setIsHidden(false);
    }
  });

  const navLinks = [
    { id: 'home', label: 'The Sanctuary' },
    { id: 'animals', label: 'Animals' },
    { id: 'workshops', label: 'Workshops' },
    { id: 'story', label: 'Our Story' },
    { id: 'gallery', label: 'Gallery' },
  ];

  return (
    <>
      <motion.header
        animate={{
          y: isHidden ? '-100%' : '0%',
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-400 ${
          isScrolled
            ? 'bg-[#FAF7F2]/85 backdrop-blur-md border-b border-[#204128]/10 shadow-xs py-3.5'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between gap-8">
          {/* Zone 1: Brand wordmark in Fraunces display face */}
          <button
            onClick={() => {
              onNavigate('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-left group cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="w-8 h-8 rounded-full bg-[#204128] text-[#FAF7F2] flex items-center justify-center font-serif text-sm font-semibold group-hover:scale-105 transition-transform">
              S
            </span>
            <span
              className={`font-serif text-xl md:text-2xl tracking-tight transition-colors ${
                isScrolled ? 'text-[#204128]' : 'text-[#FAF7F2] drop-shadow-sm'
              }`}
            >
              Springbrook Downes
            </span>
          </button>

          {/* Zone 2: 4-5 single-line clean navigation links with draw-from-left underline */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`relative py-1 text-sm font-medium tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isScrolled
                      ? isActive
                        ? 'text-[#204128] font-semibold'
                        : 'text-[#4A5546] hover:text-[#204128]'
                      : isActive
                      ? 'text-[#FAF7F2] font-semibold'
                      : 'text-[#FAF7F2]/80 hover:text-[#FAF7F2]'
                  }`}
                >
                  {link.label}
                  {/* Underline draws from left on hover / active */}
                  <span
                    className={`absolute bottom-0 left-0 h-[2px] transition-all duration-300 ease-out ${
                      isActive
                        ? `w-full ${isScrolled ? 'bg-[#204128]' : 'bg-[#FAF7F2]'}`
                        : `w-0 group-hover:w-full ${isScrolled ? 'bg-[#204128]' : 'bg-[#FAF7F2]'}`
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 Primary Action button */}
          <div className="flex items-center gap-3 shrink-0">
            <MagneticButton
              onClick={onOpenBooking}
              variant={isScrolled ? 'primary' : 'secondary'}
              className="!py-2.5 !px-5 !text-xs md:!text-sm"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Reserve a Visit</span>
            </MagneticButton>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className={`md:hidden p-2 rounded-full cursor-pointer ${
                isScrolled ? 'text-[#204128] hover:bg-[#204128]/10' : 'text-[#FAF7F2] hover:bg-white/10'
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#FAF7F2] border-b border-[#204128]/10 px-6 py-6 shadow-xl"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onNavigate(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left text-base font-serif py-1.5 transition-colors ${
                    activeTab === link.id ? 'text-[#204128] font-bold' : 'text-[#4A5546]'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-2">
                <MagneticButton
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenBooking();
                  }}
                  variant="primary"
                  className="w-full !py-3"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Reserve a Visit</span>
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>
    </>
  );
};
