'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Plane, Users, CreditCard, Clock, Lock, Phone, CheckCircle } from 'lucide-react'
import { useBooking } from '@/contexts/BookingContext'

export default function BookingSummary() {
  const { bookingState } = useBooking()
  
  // Calculate total based on flight protection
  const baseFare = 1245
  const flightProtectionCost = 45
  const total = baseFare + (bookingState.flightProtection ? flightProtectionCost : 0)

  return (
    <div className="w-full max-w-xs">
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Plane className="w-5 h-5" style={{ color: '#0ebab5' }} />
            Booking Summary
          </CardTitle>
          {/* Offer ID */}
          <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            Offer ID #243347
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Passengers */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
              <Users className="w-4 h-4" style={{ color: '#0ebab5' }} />
              Passengers
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              2 Adults, 1 Child
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Price Breakdown */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Price Breakdown
            </div>
            
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Base fare (3 passengers)</span>
                <span className="text-gray-900 dark:text-white">${baseFare}</span>
              </div>
              {/* Flight protection shown only when selected */}
              {bookingState.flightProtection && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Flight protection</span>
                  <span className="text-gray-900 dark:text-white">${flightProtectionCost}</span>
                </div>
              )}
            </div>

            <Separator className="dark:bg-gray-700" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-xl font-bold text-[#EC5E39]">${total}</span>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Book With Confidence - Compact */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Book With Confidence
            </div>
            
            <div className="space-y-1.5 text-xs">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ebab5' }} />
                <span className="text-gray-600 dark:text-gray-400">Taxes and fees included</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ebab5' }} />
                <span className="text-gray-600 dark:text-gray-400">Cancel free within 24 hours</span>
              </div>
              <div className="flex items-start gap-2">
                <CreditCard className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ebab5' }} />
                <span className="text-gray-600 dark:text-gray-400">Multiple charges may apply</span>
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Security & Support - Compact */}
          <div className="space-y-1.5">
            <div className="flex items-start gap-2">
              <Lock className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ebab5' }} />
              <div>
                <div className="text-xs font-medium text-gray-900 dark:text-white">SSL Secure Connection</div>
                <div className="text-xs text-gray-600 dark:text-gray-400">Encrypted and secure</div>
              </div>
            </div>
            
            <div className="flex items-start gap-2">
              <Phone className="w-3 h-3 mt-0.5 flex-shrink-0" style={{ color: '#0ebab5' }} />
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
        </CardContent>
      </Card>
    </div>
  )
}