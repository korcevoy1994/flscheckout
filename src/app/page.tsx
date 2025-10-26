"use client"

import React, { useState } from 'react'
import CheckoutSteps from "@/components/ui/checkout-steps"
import BookingSummary from "@/components/ui/booking-summary"
import { FlightDetails } from "@/components/ui/flight-details"
import PassengerDetails from "@/components/ui/passenger-details"
import { ContactInformation } from "@/components/ui/contact-information"
import { FlightProtection } from "@/components/ui/flight-protection"
import { Payment } from "@/components/ui/payment"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useBooking } from "@/contexts/BookingContext"

export default function Home() {
  const { bookingState, setCurrentStep } = useBooking()
  const { currentStep } = bookingState
  const [selectedProtection, setSelectedProtection] = useState<string>('')

  const handleContinueToProtection = () => {
    setCurrentStep(2)
  }

  const handleBackToDetails = () => {
    setCurrentStep(1)
  }

  const handleBackToProtection = () => {
    setCurrentStep(2)
  }

  const handleContinueToPayment = () => {
    if (selectedProtection) {
      setCurrentStep(3)
    }
  }

  const handleProtectionSelection = (option: string) => {
    setSelectedProtection(option)
  }

  const handleEditFlight = () => {
    setCurrentStep(1)
  }

  const handleEditContact = () => {
    setCurrentStep(1)
  }

  const handleEditPassenger = () => {
    setCurrentStep(1)
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - CheckoutSteps and current step content */}
          <div className="lg:col-span-2 space-y-6">
            <CheckoutSteps currentStep={currentStep} />
            
            {/* Step 1: Flight Details */}
            {currentStep === 1 && (
              <>
                <FlightDetails />
                
                {/* Contact Information section */}
                <ContactInformation className="mb-8" />
                
                {/* Who's travelling section */}
                <div>
                  <div className="mb-3">
                    <h2 className="text-base font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                      WHO'S TRAVELLING?
                    </h2>
                  </div>
                  
                  {/* Passengers grid */}
                  <div className="space-y-4">
                    <PassengerDetails passengerNumber={1} />
                    <PassengerDetails passengerNumber={2} />
                  </div>
                  
                  {/* Information text */}
                  <div className="mt-4">
                    <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                      Check your passenger details
                    </h3>
                    <p className="text-sm text-gray-900 dark:text-white mb-6">
                      If you need to change the passenger details later, you will have to choose your flight(s) again.
                    </p>
                    
                    {/* Continue button */}
                    <Button 
                      onClick={handleContinueToProtection}
                      className="w-full bg-[#EC5E39] hover:bg-[#d54e2a] text-white py-6 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group min-h-[60px]"
                    >
                      Continue to Flight Protection
                      <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                    
                    {/* Privacy notice */}
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-3 text-center">
                      The information provided above will be processed according to LuxeSkies Group Privacy Notice
                    </p>
                  </div>
                </div>
              </>
            )}

            {/* Step 2: Flight Protection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <FlightProtection onSelectionChange={handleProtectionSelection} />
                
                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-6">
                  <Button
                    onClick={handleBackToDetails}
                    variant="outline"
                    size="lg"
                    className="flex items-center px-6 py-3"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to Details
                  </Button>

                  <Button
                    onClick={handleContinueToPayment}
                    size="lg"
                    disabled={!selectedProtection}
                    className="flex items-center px-6 py-3 bg-[#EC5E39] hover:bg-[#d54e2a] text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                  >
                    Continue to Payment
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Payment 
                  onEditFlight={handleEditFlight}
                  onEditContact={handleEditContact}
                  onEditPassenger={handleEditPassenger}
                />
                
                {/* Navigation buttons */}
                <div className="flex justify-between items-center pt-6">
                  <Button
                    onClick={handleBackToProtection}
                    variant="outline"
                    size="lg"
                    className="flex items-center px-6 py-3"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Back to Protection
                  </Button>
                </div>
              </div>
            )}
          </div>
          
          {/* Right column - BookingSummary */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingSummary />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
