'use client'

import { useEffect } from 'react'

export const useMobileViewport = () => {
  useEffect(() => {
    const setViewportHeight = () => {
      // Get the actual viewport height
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
      
      // Simple check to ensure mobile bottom bar is visible
      const mobileBottomBar = document.querySelector('.mobile-bottom-bar') as HTMLElement
      if (mobileBottomBar) {
        // Just ensure it's visible, don't override CSS
        mobileBottomBar.style.display = 'block'
        mobileBottomBar.style.visibility = 'visible'
      }
    }

    // Set initial viewport height
    setViewportHeight()

    // Update on resize and orientation change
    const handleResize = () => {
      // Debounce to avoid excessive calls
      setTimeout(setViewportHeight, 100)
    }

    const handleOrientationChange = () => {
      // Delay to ensure orientation change is complete
      setTimeout(setViewportHeight, 300)
    }

    // Add event listeners
    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)
    
    // Also listen for visual viewport changes (iOS Safari)
    if ('visualViewport' in window) {
      window.visualViewport?.addEventListener('resize', handleResize)
    }

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
      
      if ('visualViewport' in window) {
        window.visualViewport?.removeEventListener('resize', handleResize)
      }
    }
  }, [])
}