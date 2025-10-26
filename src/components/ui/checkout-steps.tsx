"use client"

import React, { useState, useEffect } from 'react'
import { Check, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './button'

interface Step {
  id: number
  title: string
  description: string
  completed: boolean
}

interface CheckoutStepsProps {
  className?: string
  currentStep?: number
}

const CheckoutSteps: React.FC<CheckoutStepsProps> = ({ className, currentStep: propCurrentStep }) => {
  const [currentStep, setCurrentStep] = useState(propCurrentStep || 1)
  useEffect(() => {
    if (propCurrentStep !== undefined) {
      setCurrentStep(propCurrentStep)
      setSteps(prevSteps => 
        prevSteps.map(step => ({
          ...step,
          completed: step.id < propCurrentStep
        }))
      )
    }
  }, [propCurrentStep])

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Flight Details', description: 'Flight information and passengers', completed: false },
    { id: 2, title: 'Flight Protection', description: 'Choose your protection plan', completed: false },
    { id: 3, title: 'Payment', description: 'Complete your booking', completed: false },
  ])

  const handleStepClick = (stepId: number) => {
    if (stepId <= currentStep) {
      setCurrentStep(stepId)
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length) {
      setSteps(prev => prev.map(step => 
        step.id === currentStep ? { ...step, completed: true } : step
      ))
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={cn(
                "flex flex-col items-center cursor-pointer transition-all duration-200",
                step.id <= currentStep ? "opacity-100" : "opacity-50"
              )}
              onClick={() => handleStepClick(step.id)}
            >
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold mb-2 transition-all duration-200",
                step.completed 
                  ? "bg-[#0ABAB5]" 
                  : step.id === currentStep 
                    ? "bg-[#EC5E39]" 
                    : "bg-gray-300"
              )}>
                {step.completed ? (
                  <Check className="w-6 h-6" />
                ) : (
                  step.id
                )}
              </div>
              <div className="text-center">
                <h3 className={cn(
                  "font-medium text-sm",
                  step.id === currentStep ? "text-[#EC5E39]" : "text-gray-600 dark:text-gray-400"
                )}>
                  {step.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 max-w-32">
                  {step.description}
                </p>
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mx-4 transition-all duration-200",
                step.completed ? "bg-[#0ABAB5]" : "bg-gray-300 dark:bg-gray-600"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>
      

    </div>
  )
}

export default CheckoutSteps