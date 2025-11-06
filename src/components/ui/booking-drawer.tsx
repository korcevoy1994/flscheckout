'use client'

import React from 'react'
import { X, Plane, Users, Shield, Clock, CreditCard, Lock, Phone } from 'lucide-react'
import { Button } from './button'
import { Separator } from './separator'
import { useBooking } from '@/contexts/BookingContext'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from './drawer'

interface BookingDrawerProps {
  isOpen: boolean
  onClose: () => void
}

const BookingDrawer: React.FC<BookingDrawerProps> = ({ isOpen, onClose }) => {
  const { bookingState } = useBooking()

  // Use the same calculations as desktop BookingSummary
  const baseFare = 1245
  const getProtectionCost = () => {
    if (!bookingState.flightProtectionType) return 0
    switch (bookingState.flightProtectionType) {
      case 'luxe': return 485.10
      case 'classic': return 29
      case 'none': return 0
      default: return 0
    }
  }
  const flightProtectionCost = getProtectionCost()
  const total = baseFare + flightProtectionCost

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <DrawerTitle className="flex items-center gap-2 text-xl font-semibold text-gray-900 dark:text-white">
              <Plane className="w-5 h-5" style={{ color: '#0ABAB5' }} />
              Booking Summary
            </DrawerTitle>
            <DrawerClose asChild>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <X className="w-4 h-4" />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Offer ID */}
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Offer ID #243347
          </div>

          {/* Passengers */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
              <Users className="w-4 h-4" style={{ color: '#0ABAB5' }} />
              Passengers
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              2 Adults, 1 Child
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Price Breakdown */}
          <div className="space-y-4">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Price Breakdown
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Base fare (3 passengers)</span>
                <span className="text-gray-900 dark:text-white font-medium">${baseFare}</span>
              </div>
              
              {bookingState.flightProtectionType && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">
                    Flight protection ({bookingState.flightProtectionType === 'luxe' ? 'LUXE' : bookingState.flightProtectionType === 'classic' ? 'CLASSIC' : 'NO PROTECTION'})
                  </span>
                  <span className="text-gray-900 dark:text-white font-medium">
                    {bookingState.flightProtectionType === 'luxe' ? '+$485.10' : bookingState.flightProtectionType === 'classic' ? '$29' : '$0'}
                  </span>
                </div>
              )}
              
              <Separator className="dark:bg-gray-700" />
              
              <div className="flex justify-between text-base font-semibold pt-2">
                <span className="text-gray-900 dark:text-white">Total</span>
                <span style={{ color: '#EC5E39' }}>${total}</span>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Book With Confidence */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Book With Confidence
            </div>
            
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <Shield className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ABAB5' }} />
                <span className="text-gray-600 dark:text-gray-400">Taxes and fees included</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ABAB5' }} />
                <span className="text-gray-600 dark:text-gray-400">Cancel free within 24 hours</span>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ABAB5' }} />
                <span className="text-gray-600 dark:text-gray-400">Multiple charges may apply</span>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Security & Support - Compact */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ABAB5' }} />
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">SSL Secure Connection</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Encrypted and secure</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ABAB5' }} />
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">24/7 Support</div>
                <div className="text-xs font-medium">
                  <a
                    href="tel:+18888307444"
                    className="text-[#0ABAB5] hover:text-[#0ABAB5]/80 transition-colors"
                  >
                    +1 888 830 7444
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default BookingDrawer