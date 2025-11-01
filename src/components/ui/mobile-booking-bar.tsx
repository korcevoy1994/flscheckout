'use client'

import React, { useState } from 'react'
import { ArrowUp, ArrowRight, Receipt } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'
import { useMobileViewport } from '@/hooks/useMobileViewport'
import { Tooltip } from './tooltip'

interface MobileBookingBarProps {
  onOpenDrawer: () => void
  onContinue?: () => void
  showContinue?: boolean
  isFormValid?: boolean
  currentStep?: number
}

const MobileBookingBar: React.FC<MobileBookingBarProps> = ({ 
  onOpenDrawer, 
  onContinue,
  showContinue = true,
  isFormValid = false,
  currentStep = 1
}) => {
  const { bookingState } = useBooking()
  const [showTooltip, setShowTooltip] = useState(false)

  // Use mobile viewport hook for dynamic positioning
  useMobileViewport()

  // Use the same calculations as desktop BookingSummary
  const baseFare = 1245
  const flightProtectionCost = 45
  const total = baseFare + (bookingState.flightProtection ? flightProtectionCost : 0)

  // Determine button text based on step
  const getContinueButtonText = () => {
    if (currentStep === 3) return 'Pay'
    return 'Continue'
  }

  const handleContinueClick = () => {
    if (!isFormValid) {
      setShowTooltip(true)
      // Auto hide tooltip after 3 seconds
      setTimeout(() => setShowTooltip(false), 3000)
      return
    }
    onContinue?.()
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden mobile-bottom-bar">
      {/* Ultra-modern backdrop with subtle gradient - dark theme support */}
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/98 to-white/95 dark:from-gray-900 dark:via-gray-900/98 dark:to-gray-900/95 backdrop-blur-2xl" />
      
      {/* Minimal top border - dark theme support */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200/60 to-transparent dark:via-gray-700/60" />
      
      <div className="relative px-6 py-3">
        <div className="flex gap-3">
          {/* Left button - View Summary */}
          <button
            onClick={onOpenDrawer}
            className="flex-1 h-16 group relative overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-[#0ABAB5] dark:hover:border-[#0ABAB5] text-gray-900 dark:text-white rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-sm hover:shadow-md"
          >
            <div className="relative flex items-center justify-between px-4 py-3 h-full">
              {/* Left side - Icon and Text */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#0ABAB5]/10 rounded-lg flex items-center justify-center">
                  <Receipt className="w-4 h-4 text-[#0ABAB5]" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold tracking-tight">View Summary</div>
                </div>
              </div>
              
              {/* Right side - Price */}
              <div className="text-right">
                <div className="text-lg font-bold tracking-tight text-[#EC5E39]">${total}</div>
              </div>
            </div>
          </button>

          {/* Right button - Continue/Pay */}
          {showContinue && (
            <Tooltip
              content="Please fill in all required fields to continue"
              show={showTooltip}
              position="top"
            >
              <button
                onClick={handleContinueClick}
                disabled={!isFormValid}
                className={`flex-1 h-16 group relative overflow-hidden rounded-xl transition-all duration-500 ease-out transform hover:scale-[1.02] active:scale-[0.98] ${
                  isFormValid 
                    ? 'bg-gradient-to-r from-[#EC5E39] to-[#EC5E39] hover:from-[#EC5E39]/95 hover:to-[#EC5E39]/95 text-white shadow-[0_8px_32px_rgba(236,94,57,0.3)] hover:shadow-[0_12px_40px_rgba(236,94,57,0.4)]'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
                }`}
              >
                {/* Subtle shine effect for active state */}
                {isFormValid && (
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-out" />
                )}
                
                <div className="relative flex items-center justify-center px-4 py-3 h-full">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold tracking-tight">{getContinueButtonText()}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </button>
            </Tooltip>
          )}
        </div>
      </div>
      
      {/* Safe area for devices with home indicator - enhanced for mobile */}
      <div className="bg-white dark:bg-gray-900" style={{ height: 'env(safe-area-inset-bottom, 0px)' }} />
    </div>
  )
}

export default MobileBookingBar