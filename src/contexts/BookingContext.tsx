'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

// Storage key for localStorage
const BOOKING_STORAGE_KEY = 'luxeskies_booking_data'

// Типы данных
export interface PassengerData {
  id: number
  title: string
  gender: string
  firstName: string
  lastName: string
  birthDay: string
  birthMonth: string
  birthYear: string
  nationality: string
  passportNumber: string
  expiryDay: string
  expiryMonth: string
  expiryYear: string
  frequentFlyerNumber?: string
}

export interface ContactData {
  email: string
  phone: string
  countryCode: string
}

export interface BillingData {
  streetAddress: string
  country: string
  stateRegion: string
  city: string
  zipCode: string
}

export interface CardData {
  number: string
  expiry: string
  cvc: string
  name: string
}

export interface FlightData {
  from: string
  to: string
  date: string
  departure: string
  arrival: string
  duration: string
  stops: number
  layover?: {
    city: string
    duration: string
  }
}

export interface BookingState {
  passengers: PassengerData[]
  contact: ContactData | null
  flight: FlightData | null
  billing: BillingData | null
  card: CardData | null
  currentStep: number
  flightProtection: boolean
}

interface BookingContextType {
  bookingState: BookingState
  updatePassenger: (passengerId: number, data: Partial<PassengerData>) => void
  updateContact: (data: ContactData) => void
  updateFlight: (data: FlightData) => void
  updateBilling: (data: BillingData) => void
  updateCard: (data: CardData) => void
  setCurrentStep: (step: number) => void
  addPassenger: () => void
  removePassenger: (passengerId: number) => void
  getPassenger: (passengerId: number) => PassengerData | undefined
  setFlightProtection: (enabled: boolean) => void
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export const useBooking = () => {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}

interface BookingProviderProps {
  children: ReactNode
}

// Default booking state
const getDefaultBookingState = (): BookingState => ({
  passengers: [
    {
      id: 1,
      title: '',
      gender: '',
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      nationality: '',
      passportNumber: '',
      expiryDay: '',
      expiryMonth: '',
      expiryYear: '',
      frequentFlyerNumber: '',
    },
    {
      id: 2,
      title: '',
      gender: '',
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      nationality: '',
      passportNumber: '',
      expiryDay: '',
      expiryMonth: '',
      expiryYear: '',
      frequentFlyerNumber: '',
    }
  ],
  contact: null,
  flight: {
    from: 'London',
    to: 'New York',
    date: 'Wed, 15 Jan',
    departure: '14:25',
    arrival: '18:30',
    duration: '8h 5m',
    stops: 1,
    layover: {
      city: 'Amsterdam',
      duration: '1h 25m'
    }
  },
  billing: null,
  card: null,
  currentStep: 1,
  flightProtection: false
})

// Load booking state from localStorage
const loadBookingState = (): BookingState => {
  if (typeof window === 'undefined') {
    return getDefaultBookingState()
  }
  
  try {
    const stored = localStorage.getItem(BOOKING_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      // Merge with default state to ensure all fields exist
      return { ...getDefaultBookingState(), ...parsed }
    }
  } catch (error) {
    console.warn('Failed to load booking state from localStorage:', error)
  }
  
  return getDefaultBookingState()
}

// Save booking state to localStorage
const saveBookingState = (state: BookingState) => {
  if (typeof window === 'undefined') return
  
  try {
    localStorage.setItem(BOOKING_STORAGE_KEY, JSON.stringify(state))
  } catch (error) {
    console.warn('Failed to save booking state to localStorage:', error)
  }
}

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>(getDefaultBookingState)

  // Load state from localStorage on mount
  useEffect(() => {
    const loadedState = loadBookingState()
    setBookingState(loadedState)
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveBookingState(bookingState)
  }, [bookingState])

  const updatePassenger = (passengerId: number, data: Partial<PassengerData>) => {
    setBookingState(prev => ({
      ...prev,
      passengers: prev.passengers.map(passenger =>
        passenger.id === passengerId
          ? { ...passenger, ...data }
          : passenger
      )
    }))
  }

  const updateContact = (data: ContactData) => {
    setBookingState(prev => ({
      ...prev,
      contact: data
    }))
  }

  const updateFlight = (data: FlightData) => {
    setBookingState(prev => ({
      ...prev,
      flight: data
    }))
  }

  const updateBilling = (data: BillingData) => {
    setBookingState(prev => ({
      ...prev,
      billing: data
    }))
  }

  const updateCard = (data: CardData) => {
    setBookingState(prev => ({
      ...prev,
      card: data
    }))
  }

  const setCurrentStep = (step: number) => {
    setBookingState(prev => ({
      ...prev,
      currentStep: step
    }))
  }

  const addPassenger = () => {
    const newId = Math.max(...bookingState.passengers.map(p => p.id)) + 1
    const newPassenger: PassengerData = {
      id: newId,
      title: '',
      gender: '',
      firstName: '',
      lastName: '',
      birthDay: '',
      birthMonth: '',
      birthYear: '',
      nationality: '',
      passportNumber: '',
      expiryDay: '',
      expiryMonth: '',
      expiryYear: '',
      frequentFlyerNumber: '',
    }
    
    setBookingState(prev => ({
      ...prev,
      passengers: [...prev.passengers, newPassenger]
    }))
  }

  const removePassenger = (passengerId: number) => {
    setBookingState(prev => ({
      ...prev,
      passengers: prev.passengers.filter(p => p.id !== passengerId)
    }))
  }

  const getPassenger = (passengerId: number) => {
    return bookingState.passengers.find(p => p.id === passengerId)
  }

  const setFlightProtection = (enabled: boolean) => {
    setBookingState(prev => ({
      ...prev,
      flightProtection: enabled
    }))
  }

  const value: BookingContextType = {
    bookingState,
    updatePassenger,
    updateContact,
    updateFlight,
    updateBilling,
    updateCard,
    setCurrentStep,
    addPassenger,
    removePassenger,
    getPassenger,
    setFlightProtection
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}