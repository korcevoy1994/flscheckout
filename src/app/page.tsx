"use client"

import React, { useState, useEffect } from 'react'
import CheckoutSteps from "@/components/ui/checkout-steps"
import BookingSummary from "@/components/ui/booking-summary"
import BookingDrawer from "@/components/ui/booking-drawer"
import MobileBookingBar from "@/components/ui/mobile-booking-bar"
import { FlightDetails } from "@/components/ui/flight-details"
import PassengerDetails from "@/components/ui/passenger-details"
import { ContactInformation } from "@/components/ui/contact-information"
import { FlightProtection } from "@/components/ui/flight-protection"
import { Payment } from "@/components/ui/payment"
import { Button } from "@/components/ui/button"
import { ChevronRight, ChevronLeft } from "lucide-react"
import { useBooking } from "@/contexts/BookingContext"

export default function Home() {
  // Get booking context
  const { bookingState, setCurrentStep: setContextCurrentStep } = useBooking()
  
  // Use currentStep from context, with fallback to local state for initial load
  const [localCurrentStep, setLocalCurrentStep] = useState(1)
  const currentStep = bookingState.currentStep || localCurrentStep
  
  // Sync local step with context step on mount
  useEffect(() => {
    if (bookingState.currentStep && bookingState.currentStep !== localCurrentStep) {
      setLocalCurrentStep(bookingState.currentStep)
    }
  }, [bookingState.currentStep, localCurrentStep])
  
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedProtection, setSelectedProtection] = useState<string>('')
  const [isFormValid, setIsFormValid] = useState(false)

  // Validate form based on current step
  useEffect(() => {
    const validateForm = (): boolean => {
      switch (currentStep) {
        case 1:
          // Check if contact info and passenger details are filled
          const hasContactInfo = !!(bookingState.contact?.email && bookingState.contact?.phone)
          const hasPassengerData = bookingState.passengers.length > 0 && 
            bookingState.passengers.every(p => p.firstName && p.lastName && p.birthDay && p.birthMonth && p.birthYear)
          return hasContactInfo && hasPassengerData
        case 2:
          // Check if protection option is selected
          return !!selectedProtection
        case 3:
          // Check if billing and payment info is filled
          const hasBillingInfo = bookingState.billing &&
            bookingState.billing.streetAddress &&
            bookingState.billing.country &&
            bookingState.billing.stateRegion &&
            bookingState.billing.city &&
            bookingState.billing.zipCode
          
          const hasCardInfo = bookingState.card &&
            bookingState.card.number &&
            bookingState.card.expiry &&
            bookingState.card.cvc &&
            bookingState.card.name
          
          return !!(hasBillingInfo && hasCardInfo)
        default:
          return false
      }
    }
    
    setIsFormValid(validateForm())
  }, [currentStep, bookingState, selectedProtection])

  // Scroll to top when step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [currentStep])

  const handleContinueToProtection = () => {
    setContextCurrentStep(2)
    setLocalCurrentStep(2)
  }

  const handleBackToDetails = () => {
    setContextCurrentStep(1)
    setLocalCurrentStep(1)
  }

  const handleBackToProtection = () => {
    setContextCurrentStep(2)
    setLocalCurrentStep(2)
  }

  const handleContinueToPayment = () => {
    if (selectedProtection) {
      setContextCurrentStep(3)
      setLocalCurrentStep(3)
    }
  }

  const handleProtectionSelection = (option: string) => {
    setSelectedProtection(option)
  }

  const handleEditFlight = () => {
    setContextCurrentStep(1)
    setLocalCurrentStep(1)
  }

  const handleEditContact = () => {
    setContextCurrentStep(1)
    setLocalCurrentStep(1)
  }

  const handleEditPassenger = () => {
    setContextCurrentStep(1)
    setLocalCurrentStep(1)
  }

  const handleMobileContinue = () => {
    if (!isFormValid) return
    
    switch (currentStep) {
      case 1:
        handleContinueToProtection()
        break
      case 2:
        handleContinueToPayment()
        break
      case 3:
        // Handle payment submission
        console.log('Processing payment...')
        break
    }
  }

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-200 pt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pb-24 lg:pb-0">
          {/* Left column - CheckoutSteps and current step content */}
          <div className="lg:col-span-3 space-y-6">
            <CheckoutSteps currentStep={currentStep} />
            
            {/* Mobile Navigation Buttons - Top of page */}
            <div className="lg:hidden">
              {/* Step 2: Show Back to Details */}
              {currentStep === 2 && (
                <div className="mb-4">
                  <Button
                    onClick={handleBackToDetails}
                    variant="outline"
                    size="sm"
                    className="flex items-center px-4 py-2 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Details
                  </Button>
                </div>
              )}
              
              {/* Step 3: Show Back to Protection */}
              {currentStep === 3 && (
                <div className="mb-4">
                  <Button
                    onClick={handleBackToProtection}
                    variant="outline"
                    size="sm"
                    className="flex items-center px-4 py-2 text-sm"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Protection
                  </Button>
                </div>
              )}
            </div>
            
            {/* Step 1: Flight Details */}
            {currentStep === 1 && (
              <>
                <FlightDetails />
                
                {/* Contact Information section */}
                <ContactInformation className="mb-8" />
                
                {/* Who's travelling section */}
                <div>
                  <div className="mb-3">
                    <h2 className="text-xl font-bold text-gray-600 dark:text-white uppercase tracking-wide">
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
                    
                    {/* Continue button - Desktop only */}
                    <div className="hidden lg:block">
                      <Button 
                        onClick={handleContinueToProtection}
                        className="w-full bg-[#EC5E39] hover:bg-[#d54e2a] text-white py-6 px-8 text-lg font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group min-h-[60px]"
                      >
                        Continue to Flight Protection
                        <ChevronRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Button>
                    </div>
                    
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
                
                {/* Navigation buttons - Desktop only */}
                <div className="hidden lg:flex justify-between items-center pt-6">
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
                
                {/* Navigation buttons - Desktop only */}
                <div className="hidden lg:flex justify-between items-center pt-6">
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
          
          {/* Right column - BookingSummary (Desktop only) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <BookingSummary />
            </div>
          </div>
        </div>
        
        {/* Mobile Bottom Bar */}
        <MobileBookingBar 
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onContinue={handleMobileContinue}
          showContinue={true}
          isFormValid={isFormValid}
          currentStep={currentStep}
        />
        
        {/* Mobile Drawer */}
        <BookingDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
        />
      </div>
    </main>
  )
}
