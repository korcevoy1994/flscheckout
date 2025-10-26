"use client"

import React, { useState } from 'react'
import { Card, CardContent } from './card'
import { Button } from './button'
import { Badge } from './badge'
import { Plane, Clock, MapPin, ChevronRight, X, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface FlightDetailsProps {
  className?: string
}

export function FlightDetails({ className }: FlightDetailsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const flightData = {
    route: "Dubai to London",
    date: "Mon, 27 Oct 2025",
    departure: {
      time: "05:20 AM",
      city: "Dubai",
      airport: "Dubai International Airport (DXB)"
    },
    layover: {
      duration: "1h 15m",
      flight: "QR1003 - Boeing 787-9",
      operator: "Operated by Qatar Airways"
    },
    arrival: {
      time: "05:35 AM",
      city: "Doha",
      airport: "Hamad International Airport (DOH)"
    },
    transit: {
      duration: "2h 5m transit in Doha",
      airport: "Hamad International Airport",
      description: "More than just an airport. Get ready to experience the best in shopping, dining and lounges."
    }
  }

  return (
    <>
      {/* Section title */}
      <div className="mb-3">
        <h2 className="text-base font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
          ITINERARY
        </h2>
      </div>
      
      {/* Compact card */}
      <Card 
        className={cn(
          "cursor-pointer hover:shadow-md transition-all duration-200 border-l-4 border-l-[#EC5E39]",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Plane className="w-4 h-4 text-[#EC5E39]" />
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {flightData.route}
                </h3>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{flightData.departure.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  <span>{flightData.date}</span>
                </div>
              </div>
              
              <Badge variant="secondary" className="mt-2 text-xs">
                1 stop • {flightData.layover.duration}
              </Badge>
            </div>
            
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </div>
        </CardContent>
      </Card>

      {/* Bottom Sheet Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />
          
          {/* Modal Content */}
          <div className={cn(
            "relative w-full max-w-2xl bg-white dark:bg-gray-900 rounded-t-2xl shadow-2xl",
            "animate-in slide-in-from-bottom-full duration-300 ease-out",
            "max-h-[85vh] overflow-y-auto"
          )}>
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Flight Details
                </h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                  className="h-8 w-8 p-0"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Drag indicator */}
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Route Header */}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {flightData.route}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {flightData.date}
                </p>
              </div>

              {/* Flight Timeline */}
              <div className="space-y-6">
                {/* Departure */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#EC5E39] rounded-full" />
                    <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {flightData.departure.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Departure
                      </Badge>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {flightData.departure.city}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {flightData.departure.airport}
                    </p>
                  </div>
                </div>

                {/* Flight Info */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <Plane className="w-4 h-4 text-[#EC5E39]" />
                    <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {flightData.layover.duration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {flightData.layover.flight}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                      {flightData.layover.operator}
                    </p>
                  </div>
                </div>

                {/* Arrival */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 bg-[#0ABAB5] rounded-full" />
                    <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {flightData.arrival.time}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        Arrival
                      </Badge>
                    </div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {flightData.arrival.city}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {flightData.arrival.airport}
                    </p>
                  </div>
                </div>

                {/* Transit Info */}
                <div className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <Info className="w-4 h-4 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {flightData.transit.duration}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                      {flightData.transit.airport}
                    </p>
                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
                      <p className="text-sm text-blue-800 dark:text-blue-200">
                        {flightData.transit.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}