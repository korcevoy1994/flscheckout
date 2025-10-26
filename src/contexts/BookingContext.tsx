'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

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
  currentStep: number
}

interface BookingContextType {
  bookingState: BookingState
  updatePassenger: (passengerId: number, data: Partial<PassengerData>) => void
  updateContact: (data: ContactData) => void
  updateFlight: (data: FlightData) => void
  setCurrentStep: (step: number) => void
  addPassenger: () => void
  removePassenger: (passengerId: number) => void
  getPassenger: (passengerId: number) => PassengerData | undefined
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

export const BookingProvider: React.FC<BookingProviderProps> = ({ children }) => {
  const [bookingState, setBookingState] = useState<BookingState>({
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
    currentStep: 1
  })

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

  const value: BookingContextType = {
    bookingState,
    updatePassenger,
    updateContact,
    updateFlight,
    setCurrentStep,
    addPassenger,
    removePassenger,
    getPassenger
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  )
}