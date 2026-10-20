import React from 'react';
import { MapPin, Phone, Mail, Instagram, Clock, Compass } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <footer className="bg-[#19321E] text-[#FAF7F2] pt-20 pb-12 border-t border-[#24452B]">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand & Purpose */}
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-full bg-[#FAF7F2] text-[#204128] flex items-center justify-center font-serif text-sm font-semibold">
                S
              </span>
              <span className="font-serif text-2xl tracking-tight text-[#FAF7F2]">
                Springbrook Downes
              </span>
            </div>
            <p className="text-sm text-[#FAF7F2]/75 leading-relaxed max-w-sm mb-6">
              A 120-acre organic heritage farm, citrus sanctuary, and animal estate dedicated to
              Highland cattle care, gentle lamb nurturing, and authentic regenerative living.
            </p>
            <div className="text-xs text-[#D4C3A3] font-medium tracking-wider uppercase">
              Heritage Sanctuary & Citrus Estate · Est. 2012
            </div>
          </div>

          {/* Visit & Hours */}
          <div className="lg:col-span-3 text-sm">
            <h4 className="font-serif text-base text-[#FAF7F2] mb-4">Farm Gate & Hours</h4>
            <div className="space-y-3 text-xs text-[#FAF7F2]/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4C3A3] shrink-0 mt-0.5" />
                <span>482 Clover Hill Road, Millbrook, NY 12545</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#D4C3A3] shrink-0 mt-0.5" />
                <div>
                  <div>Thursday – Sunday: 09:00 AM – 05:00 PM</div>
                  <div className="opacity-75">Workshops and dinners by advance reservation</div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4C3A3] shrink-0" />
                <span>(845) 555-0194</span>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 text-sm">
            <h4 className="font-serif text-base text-[#FAF7F2] mb-4">Navigation</h4>
            <ul className="space-y-2.5 text-xs text-[#FAF7F2]/80">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-[#FAF7F2] hover:underline cursor-pointer transition-colors"
                >
                  The Sanctuary
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('animals')}
                  className="hover:text-[#FAF7F2] hover:underline cursor-pointer transition-colors"
                >
                  Meet the Animals
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('workshops')}
                  className="hover:text-[#FAF7F2] hover:underline cursor-pointer transition-colors"
                >
                  Workshops & Tastings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('story')}
                  className="hover:text-[#FAF7F2] hover:underline cursor-pointer transition-colors"
                >
                  Our Fourteen-Year Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#FAF7F2] hover:underline cursor-pointer transition-colors"
                >
                  Photo Chronicle
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter / Seasonal Notes */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-base text-[#FAF7F2] mb-4">Seasonal Gazette</h4>
            <p className="text-xs text-[#FAF7F2]/75 leading-relaxed mb-4">
              Receive quiet seasonal harvest bulletins, workshop releases, and sanctuary updates twice a month.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert('Thank you for subscribing to the Meadowbrook Seasonal Gazette!');
              }}
              className="flex items-center gap-2"
            >
              <input
                type="email"
                required
                placeholder="your.email@valley.com"
                className="bg-white/10 border border-white/20 rounded-full px-4 py-2 text-xs text-[#FAF7F2] placeholder-white/40 focus:outline-hidden focus:border-[#D4C3A3] flex-grow"
              />
              <button
                type="submit"
                className="bg-[#D4C3A3] text-[#19321E] px-4 py-2 rounded-full text-xs font-semibold hover:bg-white transition-colors cursor-pointer shrink-0"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Quiet Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF7F2]/60 gap-4">
          <div>
            © {new Date().getFullYear()} Springbrook Downes Heritage Farm & Sanctuary. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-[#FAF7F2] cursor-pointer">Sanctuary Ethics</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Biosecurity & Animal Safety</span>
            <span className="hover:text-[#FAF7F2] cursor-pointer">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
