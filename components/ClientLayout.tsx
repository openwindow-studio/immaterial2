'use client'

import { useState, useEffect } from 'react'
import Preloader from './Preloader'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Check if this is a first visit or refresh
    const hasVisited = sessionStorage.getItem('hasVisited')

    if (hasVisited) {
      // Skip preloader on navigation
      setIsLoading(false)
      setShowContent(true)
    } else {
      sessionStorage.setItem('hasVisited', 'true')
    }
  }, [])

  const handleLoadComplete = () => {
    setIsLoading(false)
    // Small delay for fade transition
    setTimeout(() => {
      setShowContent(true)
    }, 300)
  }

  return (
    <>
      {isLoading && <Preloader onLoadComplete={handleLoadComplete} />}
      <div
        style={{
          opacity: showContent ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out',
          visibility: showContent ? 'visible' : 'hidden'
        }}
      >
        {children}
      </div>
    </>
  )
}