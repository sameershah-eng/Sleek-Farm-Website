import React, { useState } from 'react';
import { useLenisSmoothScroll } from './hooks/useLenisSmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { PageLoadIntro } from './components/PageLoadIntro';
import { PageTransitionOverlay } from './components/PageTransitionOverlay';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { MarqueeBand } from './components/MarqueeBand';
import { MeetTheAnimals } from './components/MeetTheAnimals';
import { ParallaxQuoteBand } from './components/ParallaxQuoteBand';
import { OurStory } from './components/OurStory';
import { WorkshopsSection } from './components/WorkshopsSection';
import { GallerySection } from './components/GallerySection';
import { BookingModal } from './components/BookingModal';
import { Footer } from './components/Footer';

export default function App() {
  // Initialize Lenis smooth scroll
  useLenisSmoothScroll(true);

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'animals' | 'workshops' | 'story' | 'gallery'>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingTab, setPendingTab] = useState<string | null>(null);

  // Booking Modal State
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedExperienceId, setSelectedExperienceId] = useState<string>('highland-walk');

  const handleNavigate = (tabId: string) => {
    if (tabId === activeTab) {
      const el = document.getElementById(tabId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    // Trigger full sweep page transition
    setPendingTab(tabId);
    setIsTransitioning(true);
  };

  const handleTransitionCovered = () => {
    if (pendingTab) {
      setActiveTab(pendingTab as any);
      window.scrollTo(0, 0);
      const el = document.getElementById(pendingTab);
      if (el) {
        el.scrollIntoView({ behavior: 'instant' as ScrollBehavior });
      }
    }
  };

  const handleTransitionComplete = () => {
    setIsTransitioning(false);
    setPendingTab(null);
  };

  const handleOpenBooking = (experienceId?: string) => {
    if (experienceId) {
      setSelectedExperienceId(experienceId);
    }
    setIsBookingOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#1F251E] selection:bg-[#204128] selection:text-[#FAF7F2]">
      {/* First visit page load intro curtain */}
      <PageLoadIntro />

      {/* Lagging ring custom cursor with hover labels */}
      <CustomCursor />

      {/* Route sweep transition panel */}
      <PageTransitionOverlay
        isTransitioning={isTransitioning}
        onCovered={handleTransitionCovered}
        onComplete={handleTransitionComplete}
      />

      {/* Top Bar Contract Navigation */}
      <Header
        activeTab={activeTab}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Main Content Area */}
      <main id="main-content">
        {/* Full Screen Cinematic Hero */}
        <HeroSection
          onReserve={() => handleOpenBooking('highland-walk')}
          onExplore={() => {
            const el = document.getElementById('animals');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Text Marquee Band in Outlined Fraunces */}
        <MarqueeBand />

        {/* Meet the Animals (Desktop Pinned Scroll / Mobile Native Swipe) */}
        <MeetTheAnimals />

        {/* Workshops & Experiences Grid */}
        <WorkshopsSection onSelectExperience={(id) => handleOpenBooking(id)} />

        {/* Atmospheric Dusk Parallax Band with Quote */}
        <ParallaxQuoteBand />

        {/* Our Story with Dual Parallax Overlapping Photos & Animated Stats */}
        <OurStory />

        {/* Photo Gallery with Animated Tabs & Shared Layout Lightbox */}
        <GallerySection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
      />

      {/* Interactive Booking Drawer / Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        initialExperienceId={selectedExperienceId}
      />
    </div>
  );
}
