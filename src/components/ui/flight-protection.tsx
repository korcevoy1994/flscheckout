"use client"

import React, { useState } from 'react'
import { Check, Shield, Star, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useBooking } from '@/contexts/BookingContext'

interface ProtectionOption {
  id: string
  name: string
  type: 'luxe' | 'classic' | 'none'
  price: string
  description: string
  features: string[]
  excludedFeatures?: string[]
  popular?: boolean
  recommended?: boolean
}

const protectionOptions: ProtectionOption[] = [
  {
    id: 'luxe',
    name: 'LUXE',
    type: 'luxe',
    price: '+$485.10',
    description: 'Complex protection',
    popular: true,
    features: [
      'Lost or mishandled baggage',
      'Missed Connection',
      'Compensation for Flight Delays',
      'Hospitalization (prohibiting travel)',
      'Health Issues (prohibiting travel)',
      'Free seat assignment',
      '24/7 Concierge Support',
      'Price drop Guarantee',
      'Refund as a Credit Voucher',
      'Priority on Upgrade Waitlist with Fare Difference'
    ]
  },
  {
      id: 'classic',
      name: 'CLASSIC',
      type: 'classic',
      price: '$29',
      description: 'Essential protection for your journey',
      features: [
        'Lost or mishandled baggage',
        'Missed Connection',
        'Compensation for Flight Delays',
        'Hospitalization (prohibiting travel)',
        'Health Issues (prohibiting travel)',
        'Free seat assignment',
        '24/7 Concierge Support',
        'Price drop Guarantee',
        'Refund as a Credit Voucher',
        'Priority on Upgrade Waitlist with Fare Difference'
      ],
      excludedFeatures: [
        'Free seat assignment',
        '24/7 Concierge Support',
        'Price drop Guarantee',
        'Refund as a Credit Voucher',
        'Priority on Upgrade Waitlist with Fare Difference'
      ]
    },
  {
    id: 'none',
    name: 'NO PROTECTION',
    type: 'none',
    price: '$0',
    description: 'Continue without protection',
    features: [
      'Lost or mishandled baggage',
      'Missed Connection',
      'Compensation for Flight Delays',
      'Hospitalization (prohibiting travel)',
      'Health Issues (prohibiting travel)',
      'Free seat assignment',
      '24/7 Concierge Support',
      'Price drop Guarantee',
      'Refund as a Credit Voucher',
      'Priority on Upgrade Waitlist with Fare Difference'
    ],
    excludedFeatures: [
      'Lost or mishandled baggage',
      'Missed Connection',
      'Compensation for Flight Delays',
      'Hospitalization (prohibiting travel)',
      'Health Issues (prohibiting travel)',
      'Free seat assignment',
      '24/7 Concierge Support',
      'Price drop Guarantee',
      'Refund as a Credit Voucher',
      'Priority on Upgrade Waitlist with Fare Difference'
    ]
  }
]

interface FlightProtectionProps {
  onSelectionChange?: (selectedOption: string) => void
}

export function FlightProtection({ onSelectionChange }: FlightProtectionProps) {
  const { setFlightProtection } = useBooking()
  const [selectedOption, setSelectedOption] = useState<string>('')

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId)
    onSelectionChange?.(optionId)
    // Set flight protection flag based on selected option
    setFlightProtection(optionId !== 'none')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-[#EC5E39] mr-3" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Flight Protection
          </h2>
        </div>
        <p className="text-gray-600 dark:text-gray-300">
          Choose the protection level that best suits your travel needs
        </p>
      </div>

      {/* Protection Options */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {protectionOptions.map((option) => (
          <div
            key={option.id}
            className={cn(
              "relative bg-white dark:bg-card rounded-xl shadow-md border-2 transition-all duration-300 cursor-pointer hover:shadow-lg hover:scale-[1.02]",
              selectedOption === option.id
                ? "border-[#EC5E39] ring-2 ring-[#EC5E39]/20"
                : "border-gray-200 dark:border-gray-700 hover:border-[#EC5E39]/50"
            )}
            onClick={() => handleOptionSelect(option.id)}
          >
            {/* Popular Badge */}
            {option.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-gradient-to-r from-[#EC5E39] to-[#FF6B47] text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center shadow-md">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Most Popular
                </div>
              </div>
            )}



            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-6">
                <h3 className={cn(
                  "text-xl font-bold mb-2",
                  option.type === 'luxe' && "text-gray-900 dark:text-white",
                  option.type === 'classic' && "text-gray-900 dark:text-white",
                  option.type === 'none' && "text-gray-700 dark:text-gray-300"
                )}>
                  {option.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {option.description}
                </p>
                <div className="text-center">
                  <span className={cn(
                    "text-2xl font-bold",
                    option.type === 'luxe' && "text-gray-900 dark:text-white",
                    option.type === 'classic' && "text-gray-900 dark:text-white",
                    option.type === 'none' && "text-gray-900 dark:text-white"
                  )}>
                    {option.price}
                  </span>
                  <span className="text-gray-500 dark:text-gray-400 text-xs block">
                    /traveler
                  </span>
                </div>
              </div>

              {/* Features */}
              {option.features.length > 0 ? (
                <div className="space-y-2 mb-6">
                  {option.features.map((feature, index) => {
                    const isExcluded = option.excludedFeatures?.includes(feature)
                    return (
                      <div key={index} className="flex items-start">
                        {isExcluded ? (
                          <X className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-red-500" />
                        ) : (
                          <Check className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0 text-gray-600 dark:text-gray-400" />
                        )}
                        <span className={cn(
                          "text-xs",
                          isExcluded 
                            ? "text-gray-400 dark:text-gray-500 line-through" 
                            : "text-gray-700 dark:text-gray-300"
                        )}>
                          {feature}
                        </span>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6">
                  <X className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No additional protection features
                  </p>
                </div>
              )}

              {/* Select Button */}
              <button
                  className={cn(
                    "w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 text-sm flex items-center justify-center",
                    selectedOption === option.id
                      ? option.type === 'luxe'
                        ? "bg-gradient-to-r from-[#EC5E39] to-[#FF6B47] hover:from-[#EC5E39]/90 hover:to-[#FF6B47]/90 text-white"
                        : option.type === 'classic'
                         ? "bg-gradient-to-r from-[#EC5E39] to-[#FF6B47] hover:from-[#EC5E39]/90 hover:to-[#FF6B47]/90 text-white"
                         : "bg-gray-600 hover:bg-gray-700 text-white"
                      : "bg-[#0abab5] hover:bg-[#0abab5]/90 text-white"
                  )}
                  onClick={() => handleOptionSelect(option.id)}
                >
                  {selectedOption === option.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Selected
                    </>
                  ) : (
                    'Select'
                  )}
                </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}