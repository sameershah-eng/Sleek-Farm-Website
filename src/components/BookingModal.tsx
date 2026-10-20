import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { EXPERIENCES_DATA } from '../content/images';
import { SmartImage } from './SmartImage';
import { Odometer } from './OdometerDigit';
import { BookingSuccess } from './BookingSuccess';
import { X, Calendar, Clock, Plus, Minus, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { MagneticButton } from './MagneticButton';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialExperienceId?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialExperienceId = 'highland-walk',
}) => {
  const [selectedExperienceId, setSelectedExperienceId] = useState(initialExperienceId);
  const [selectedDate, setSelectedDate] = useState('Saturday, Nov 1');
  const [selectedTime, setSelectedTime] = useState('');
  const [adultCount, setAdultCount] = useState(2);
  const [childCount, setChildCount] = useState(1);
  const [step, setStep] = useState<'customize' | 'details' | 'success'>('customize');

  // Contact form fields
  const [formData, setFormData] = useState({
    name: 'Eleanor Vance',
    email: 'eleanor.vance@example.com',
    phone: '(555) 382-9102',
    notes: 'Excited to walk the Highland calf and meet the sheep in the citrus orchard!',
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<any>(null);

  // Sync initial experience
  useEffect(() => {
    if (initialExperienceId) {
      setSelectedExperienceId(initialExperienceId);
    }
  }, [initialExperienceId]);

  const experience =
    EXPERIENCES_DATA.find((e) => e.id === selectedExperienceId) || EXPERIENCES_DATA[0];

  // Set default time slot
  useEffect(() => {
    if (experience && experience.timeSlots.length > 0) {
      setSelectedTime(experience.timeSlots[0]);
    }
  }, [experience]);

  const childPrice = Math.round(experience.price * 0.6); // children 40% off
  const subtotal = adultCount * experience.price + childCount * childPrice;
  const conservationFee = 8;
  const total = subtotal + conservationFee;

  const dates = [
    'Saturday, Nov 1',
    'Sunday, Nov 2',
    'Saturday, Nov 8',
    'Sunday, Nov 9',
    'Friday, Nov 14',
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const reference = `SBD-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingConfirmed({
      referenceNumber: reference,
      experienceTitle: experience.title,
      date: selectedDate,
      timeSlot: selectedTime,
      guestName: formData.name,
      email: formData.email,
      adultTickets: adultCount,
      childTickets: childCount,
      totalPaid: total,
    });
    setStep('success');
  };

  const handleReset = () => {
    setStep('customize');
    setBookingConfirmed(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-4xl bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#204128]/20 my-auto"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-[#EFE9DF] text-[#204128] flex items-center justify-center hover:bg-[#E5DFC8] transition-colors cursor-pointer"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'success' && bookingConfirmed ? (
          <BookingSuccess bookingData={bookingConfirmed} onReset={handleReset} />
        ) : (
          <div className="grid lg:grid-cols-12 min-h-[580px]">
            {/* Left Column: Experience Preview & Summary */}
            <div className="lg:col-span-5 bg-[#F4EFE6] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#204128]/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-[0.25em] text-[#4E6E50] font-semibold block mb-2">
                  Selected Sanctuary Gathering
                </span>

                {/* Experience selector dropdown / tabs */}
                <select
                  value={selectedExperienceId}
                  onChange={(e) => setSelectedExperienceId(e.target.value)}
                  className="w-full bg-[#FAF7F2] border border-[#204128]/20 rounded-xl px-3.5 py-2.5 text-sm font-medium text-[#204128] mb-4 focus:outline-hidden focus:border-[#204128] cursor-pointer"
                >
                  {EXPERIENCES_DATA.map((exp) => (
                    <option key={exp.id} value={exp.id}>
                      {exp.title} (${exp.price})
                    </option>
                  ))}
                </select>

                {/* Experience Photo with SmartImage */}
                <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-[#204128]/15 mb-4 shadow-xs">
                  <SmartImage
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-xs text-[#204128] text-[11px] font-semibold px-2.5 py-0.5 rounded-full">
                    {experience.type}
                  </div>
                </div>

                <h3 className="font-serif text-xl text-[#204128] font-normal leading-snug">
                  {experience.title}
                </h3>
                <p className="text-xs text-[#5D6B5A] mt-1.5 leading-relaxed">
                  {experience.description}
                </p>
              </div>

              {/* Running Total with Animated Odometer */}
              <div className="mt-6 pt-5 border-t border-[#204128]/15">
                <div className="space-y-1.5 text-xs text-[#5D6B5A] mb-3">
                  <div className="flex justify-between">
                    <span>
                      Adults ({adultCount} × ${experience.price})
                    </span>
                    <span className="font-medium tabular-nums text-[#204128]">
                      ${adultCount * experience.price}
                    </span>
                  </div>
                  {childCount > 0 && (
                    <div className="flex justify-between">
                      <span>
                        Children ({childCount} × ${childPrice})
                      </span>
                      <span className="font-medium tabular-nums text-[#204128]">
                        ${childCount * childPrice}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Soil & Wildlife Stewardship Fund</span>
                    <span className="font-medium tabular-nums text-[#204128]">
                      ${conservationFee}
                    </span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between pt-3 border-t border-[#204128]/10">
                  <span className="font-serif text-base text-[#204128]">Total Due</span>
                  <div className="flex items-baseline text-[#204128]">
                    <span className="font-serif text-2xl font-normal mr-0.5">$</span>
                    <Odometer value={total} className="text-2xl font-normal text-[#204128]" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Customization or Details Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
              {step === 'customize' ? (
                <div>
                  <div className="mb-6">
                    <span className="text-[11px] uppercase tracking-[0.25em] text-[#4E6E50] font-semibold block mb-1">
                      Step 1 of 2
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#204128] font-normal">
                      Date & Guest Selection
                    </h3>
                  </div>

                  {/* Date Selector */}
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-wider text-[#5D6B5A] font-semibold block mb-2.5">
                      Available Valley Dates
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {dates.map((date) => {
                        const isSelected = selectedDate === date;
                        return (
                          <button
                            key={date}
                            type="button"
                            onClick={() => setSelectedDate(date)}
                            className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#204128] text-[#FAF7F2] border-[#204128] shadow-md'
                                : 'bg-white border-[#204128]/15 text-[#204128] hover:border-[#204128]/40'
                            }`}
                          >
                            <Calendar className="w-3.5 h-3.5 mb-1.5 opacity-80" />
                            <div className="text-xs font-semibold">{date.split(',')[0]}</div>
                            <div className="text-[11px] opacity-80">{date.split(',')[1]}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Time Slots */}
                  <div className="mb-6">
                    <label className="text-xs uppercase tracking-wider text-[#5D6B5A] font-semibold block mb-2.5">
                      Select Session Slot
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {experience.timeSlots.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedTime(slot)}
                          className={`px-4 py-2 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                            selectedTime === slot
                              ? 'bg-[#204128] text-[#FAF7F2] border-[#204128] shadow-xs'
                              : 'bg-white border-[#204128]/15 text-[#204128] hover:border-[#204128]/40'
                          }`}
                        >
                          <Clock className="w-3.5 h-3.5 opacity-80" />
                          <span>{slot}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Guest Steppers with Rolling Odometers */}
                  <div className="space-y-4 pt-4 border-t border-[#204128]/10 mb-8">
                    {/* Adult Stepper */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#204128]/10">
                      <div>
                        <div className="text-sm font-semibold text-[#204128]">Adult Pass</div>
                        <div className="text-xs text-[#5D6B5A]">Ages 13+ · ${experience.price} each</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                          className="w-8 h-8 rounded-full border border-[#204128]/20 flex items-center justify-center text-[#204128] hover:bg-[#FAF7F2] cursor-pointer"
                          aria-label="Decrease adults"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <Odometer value={adultCount} className="text-base font-bold text-[#204128] w-6 text-center" />
                        <button
                          type="button"
                          onClick={() => setAdultCount(adultCount + 1)}
                          className="w-8 h-8 rounded-full border border-[#204128]/20 flex items-center justify-center text-[#204128] hover:bg-[#FAF7F2] cursor-pointer"
                          aria-label="Increase adults"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Child Stepper */}
                    <div className="flex items-center justify-between p-3.5 bg-white rounded-2xl border border-[#204128]/10">
                      <div>
                        <div className="text-sm font-semibold text-[#204128]">Children & Toddlers</div>
                        <div className="text-xs text-[#5D6B5A]">Ages 3–12 (Under 3 free) · ${childPrice} each</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => setChildCount(Math.max(0, childCount - 1))}
                          className="w-8 h-8 rounded-full border border-[#204128]/20 flex items-center justify-center text-[#204128] hover:bg-[#FAF7F2] cursor-pointer"
                          aria-label="Decrease children"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <Odometer value={childCount} className="text-base font-bold text-[#204128] w-6 text-center" />
                        <button
                          type="button"
                          onClick={() => setChildCount(childCount + 1)}
                          className="w-8 h-8 rounded-full border border-[#204128]/20 flex items-center justify-center text-[#204128] hover:bg-[#FAF7F2] cursor-pointer"
                          aria-label="Increase children"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <MagneticButton
                      onClick={() => setStep('details')}
                      variant="primary"
                      className="w-full sm:w-auto"
                    >
                      <span>Continue to Guest Details</span>
                      <ArrowRight className="w-4 h-4" />
                    </MagneticButton>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleConfirmBooking} className="flex flex-col justify-between h-full">
                  <div>
                    <div className="mb-6 flex items-center justify-between">
                      <div>
                        <span className="text-[11px] uppercase tracking-[0.25em] text-[#4E6E50] font-semibold block mb-1">
                          Step 2 of 2
                        </span>
                        <h3 className="font-serif text-2xl sm:text-3xl text-[#204128] font-normal">
                          Guest & Confirmation Details
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={() => setStep('customize')}
                        className="text-xs font-semibold text-[#204128] hover:underline cursor-pointer"
                      >
                        ← Back to passes
                      </button>
                    </div>

                    {/* Floating label form fields */}
                    <div className="space-y-4">
                      {/* Full Name */}
                      <div className="relative">
                        <input
                          id="guest-name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-white border border-[#204128]/20 rounded-xl px-4 pt-5 pb-2 text-sm text-[#204128] focus:outline-hidden focus:border-[#204128] focus:ring-1 focus:ring-[#204128] transition-colors"
                        />
                        <label
                          htmlFor="guest-name"
                          className="absolute left-4 top-1.5 text-[11px] font-medium text-[#5D6B5A] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5D6B5A]/70 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#204128] transition-all"
                        >
                          Lead Guest Name
                        </label>
                      </div>

                      {/* Email */}
                      <div className="relative">
                        <input
                          id="guest-email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-white border border-[#204128]/20 rounded-xl px-4 pt-5 pb-2 text-sm text-[#204128] focus:outline-hidden focus:border-[#204128] focus:ring-1 focus:ring-[#204128] transition-colors"
                        />
                        <label
                          htmlFor="guest-email"
                          className="absolute left-4 top-1.5 text-[11px] font-medium text-[#5D6B5A] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5D6B5A]/70 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#204128] transition-all"
                        >
                          Email Address (for pass barcode)
                        </label>
                      </div>

                      {/* Phone */}
                      <div className="relative">
                        <input
                          id="guest-phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-white border border-[#204128]/20 rounded-xl px-4 pt-5 pb-2 text-sm text-[#204128] focus:outline-hidden focus:border-[#204128] focus:ring-1 focus:ring-[#204128] transition-colors"
                        />
                        <label
                          htmlFor="guest-phone"
                          className="absolute left-4 top-1.5 text-[11px] font-medium text-[#5D6B5A] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5D6B5A]/70 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#204128] transition-all"
                        >
                          Mobile Number
                        </label>
                      </div>

                      {/* Special dietary or accessibility requests */}
                      <div className="relative">
                        <textarea
                          id="guest-notes"
                          rows={2}
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                          placeholder=" "
                          className="peer w-full bg-white border border-[#204128]/20 rounded-xl px-4 pt-5 pb-2 text-sm text-[#204128] focus:outline-hidden focus:border-[#204128] focus:ring-1 focus:ring-[#204128] transition-colors resize-none"
                        />
                        <label
                          htmlFor="guest-notes"
                          className="absolute left-4 top-1.5 text-[11px] font-medium text-[#5D6B5A] pointer-events-none peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-placeholder-shown:text-[#5D6B5A]/70 peer-focus:top-1.5 peer-focus:text-[11px] peer-focus:text-[#204128] transition-all"
                        >
                          Dietary Preferences or Special Requests (Optional)
                        </label>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center gap-2 text-xs text-[#5D6B5A]">
                      <ShieldCheck className="w-4 h-4 text-[#204128] shrink-0" />
                      <span>Free cancellation up to 48 hours prior to your scheduled visit.</span>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-[#204128]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="text-xs text-[#5D6B5A] text-left">
                      Total charged today:{' '}
                      <span className="font-semibold text-sm text-[#204128] tabular-nums">
                        ${total}
                      </span>
                    </div>

                    <MagneticButton type="submit" variant="primary" className="w-full sm:w-auto">
                      <Sparkles className="w-4 h-4" />
                      <span>Confirm & Generate Sanctuary Pass</span>
                    </MagneticButton>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
