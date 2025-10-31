"use client"

import React, { useState, useEffect } from 'react'
import { Phone, Sun, Moon } from 'lucide-react'
import { Button } from './button'
import { useTheme } from 'next-themes'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-colors duration-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            {/* Logo for light theme */}
            <Image
              src="/black.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto dark:hidden"
              priority
            />
            {/* Logo for dark theme */}
            <Image
              src="/white.svg"
              alt="Logo"
              width={120}
              height={40}
              className="h-8 w-auto hidden dark:block"
              priority
            />
          </div>

          {/* Right side - Phone button and theme switcher */}
          <div className="flex items-center space-x-4">
            {/* Phone button */}
            <Button
              size="sm"
              className="flex items-center gap-2 bg-[#0ABAB5] text-white hover:bg-[#0ABAB5]/90 transition-colors duration-200"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+1 888 830 7444</span>
            </Button>

            {/* Theme switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {mounted ? (
                theme === 'dark' ? (
                  <Sun className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                )
              ) : (
                <div className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar