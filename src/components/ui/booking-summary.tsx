'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Plane, Calendar, Clock, Users } from 'lucide-react'

export default function BookingSummary() {
  return (
    <div className="w-full max-w-sm">
      <Card className="shadow-lg border-gray-200 dark:border-gray-700">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#0ABAB5]" />
            Booking Summary
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Flight Route */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600 dark:text-gray-400">From</div>
              <Badge variant="outline" className="text-xs">Outbound</Badge>
            </div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              Moscow (SVO) → Dubai (DXB)
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Dec 15, 2024
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                14:30
              </div>
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Passengers */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-white">
              <Users className="w-4 h-4" />
              Passengers
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              2 Adults, 1 Child
            </div>
          </div>

          <Separator className="dark:bg-gray-700" />

          {/* Price Breakdown */}
          <div className="space-y-3">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              Price Breakdown
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Base fare (3 passengers)</span>
                <span className="text-gray-900 dark:text-white">$1,245</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Taxes & fees</span>
                <span className="text-gray-900 dark:text-white">$187</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Flight protection</span>
                <span className="text-gray-900 dark:text-white">$45</span>
              </div>
            </div>

            <Separator className="dark:bg-gray-700" />

            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Total</span>
              <span className="text-xl font-bold text-[#EC5E39]">$1,477</span>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 text-xs text-gray-600 dark:text-gray-400">
            <div className="font-medium mb-1">Important:</div>
            <div>Prices are subject to change until payment is completed. Please review all details before proceeding.</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}