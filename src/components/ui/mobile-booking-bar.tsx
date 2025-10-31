'use client'

import React from 'react'
import { ArrowUp } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'

interface MobileBookingBarProps {
  onOpenDrawer: () => void
}

const MobileBookingBar: React.FC<MobileBookingBarProps> = ({ onOpenDrawer }) => {
  const { bookingState } = useBooking()

  // Use the same calculations as desktop BookingSummary
  const baseFare = 1245
  const flightProtectionCost = 45
  const total = baseFare + (bookingState.flightProtection ? flightProtectionCost : 0)

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden">
      {/* Ultra-modern backdrop with subtle gradient - dark theme support */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/98 to-white/95 dark:from-gray-900 dark:via-gray-900/98 dark:to-gray-900/95 backdrop-blur-2xl" />
      
      {/* Minimal top border - dark theme support */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-gray-700/60" />
      
      <div className="relative px-6 py-3">
        <button
          onClick={onOpenDrawer}
          className="w-full group relative overflow-hidden bg-gradient-to-r from-[#0ABAB5] to-[#0ABAB5] hover:from-[#0ABAB5]/95 hover:to-[#0ABAB5]/95 text-white rounded-xl transition-all duration-500 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_32px_rgba(10,186,181,0.3)] hover:shadow-[0_12px_40px_rgba(10,186,181,0.4)]"
        >
          {/* Subtle shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
          
          <div className="relative flex items-center justify-between px-5 py-3">
            {/* Left side - Action */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/15 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <ArrowUp className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold tracking-tight">View Summary</div>
                <div className="text-xs text-white/80 font-medium">Booking details</div>
              </div>
            </div>
            
            {/* Right side - Price */}
            <div className="text-right">
              <div className="text-xl font-bold tracking-tight">${total}</div>
              <div className="text-xs text-white/80 font-medium">Total price</div>
            </div>
          </div>
        </button>
      </div>
      
      {/* Safe area for devices with home indicator - dark theme support */}
      <div className="h-safe-area-inset-bottom bg-white dark:bg-gray-900" />
    </div>
  )
}

export default MobileBookingBar