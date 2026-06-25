'use client'

import { useEffect, useState, useRef } from 'react'

interface NessProgressBarProps {
  onClick?: (position?: number) => void
  isStationary?: boolean
  initialPosition?: number
}

export default function NessProgressBar({ onClick, isStationary = false, initialPosition = 50 }: NessProgressBarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [animFrame, setAnimFrame] = useState(0)
  const [isGoingRight, setIsGoingRight] = useState(true)
  const [isScrolling, setIsScrolling] = useState(false)
  const [manualTest, setManualTest] = useState(false)
  const [hasJumped, setHasJumped] = useState(false)
  const [isJumping, setIsJumping] = useState(false)
  const lastScrollRef = useRef(0)
  const animIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let animationTimer: NodeJS.Timeout | null = null

    const handleScroll = (event?: Event) => {
      // Try to find the actual scrolling element
      const scrollElement = event?.target as HTMLElement || document.scrollingElement || document.documentElement || document.body

      // Get scroll position - try multiple methods
      const winScroll = window.pageYOffset ||
                        window.scrollY ||
                        scrollElement.scrollTop ||
                        document.documentElement.scrollTop ||
                        document.body.scrollTop ||
                        0

      // Get the total scrollable height - be thorough
      const body = document.body
      const html = document.documentElement

      // Try getting height from the actual content
      const collageHeight = document.querySelector('[style*="height"]')?.scrollHeight || 0

      const documentHeight = Math.max(
        body.scrollHeight || 0,
        body.offsetHeight || 0,
        body.clientHeight || 0,
        html.scrollHeight || 0,
        html.offsetHeight || 0,
        html.clientHeight || 0,
        collageHeight
      )

      const windowHeight = window.innerHeight || html.clientHeight || body.clientHeight
      const height = documentHeight - windowHeight

      if (height <= 0) {
        setScrollProgress(0)
        return
      }

      const scrolled = Math.min(100, Math.max(0, (winScroll / height) * 100))

      setScrollProgress(scrolled)

      // Check if we're at the center and haven't jumped yet
      if (scrolled >= 49 && scrolled <= 51 && !hasJumped && !isJumping) {
        setIsJumping(true)
        setHasJumped(true)
        // Reset jump after animation completes
        setTimeout(() => {
          setIsJumping(false)
        }, 300)
      }

      // Reset hasJumped flag when away from center
      if (scrolled < 48 || scrolled > 52) {
        setHasJumped(false)
      }

      // Determine direction and movement
      if (Math.abs(scrolled - lastScrollRef.current) > 0.01) {
        // We're scrolling
        setIsScrolling(true)

        if (scrolled > lastScrollRef.current) {
          setIsGoingRight(true)
        } else {
          setIsGoingRight(false)
        }
        lastScrollRef.current = scrolled

        // Clear any existing stop timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }

        // Start animating if not already
        if (!animIntervalRef.current) {
          animIntervalRef.current = setInterval(() => {
            setAnimFrame((prev) => (prev + 1) % 2)
          }, 150)
        }

        // Set timeout to stop animation when scrolling stops
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
          if (animIntervalRef.current) {
            clearInterval(animIntervalRef.current)
            animIntervalRef.current = null
          }
          setAnimFrame(0) // Reset to standing position
        }, 200)
      }
    }

    // Initial call
    setTimeout(handleScroll, 100)

    // Add listeners to multiple potential scroll sources
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    document.addEventListener('scroll', handleScroll, { passive: true })
    document.body.addEventListener('scroll', handleScroll, { passive: true })
    document.documentElement.addEventListener('scroll', handleScroll, { passive: true })

    // Also try with a longer delay
    setTimeout(handleScroll, 500)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
      document.removeEventListener('scroll', handleScroll)
      document.body.removeEventListener('scroll', handleScroll)
      document.documentElement.removeEventListener('scroll', handleScroll)
      if (animIntervalRef.current) {
        clearInterval(animIntervalRef.current)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])


  // Determine which sprite to show
  const getSpriteUrl = () => {
    // If stationary mode, show peace sprite
    if (isStationary) {
      return '/progressbar/nesspeace.png'
    }

    // If not scrolling, show standing sprite
    if (!isScrolling && !manualTest) {
      return isGoingRight
        ? '/progressbar/final/nessspriteanim1_cut.png'
        : '/progressbar/final/nessspriteanim3_cut.png'
    }

    // Show walking animation when scrolling
    if (isGoingRight) {
      return animFrame === 0
        ? '/progressbar/final/nessspriteanim1_cut.png'
        : '/progressbar/final/nessspriteanim2_cut.png'
    } else {
      return animFrame === 0
        ? '/progressbar/final/nessspriteanim3_cut.png'
        : '/progressbar/final/nessspriteanim4_cut.png'
    }
  }

  // Manual test animation
  useEffect(() => {
    if (manualTest) {
      let progress = 0
      const testInterval = setInterval(() => {
        progress += 2
        if (progress > 100) {
          progress = 0
        }
        setScrollProgress(progress)
      }, 50)

      return () => clearInterval(testInterval)
    }
  }, [manualTest])

  return (
    <div
      className="fixed bottom-0 left-0 w-full h-[60px]"
      style={{
        background: 'transparent',
        zIndex: 10000,
        pointerEvents: 'none'
      }}
    >
      {/* Ness sprite at 60% size */}
      <div
        className="absolute bottom-2 cursor-pointer group"
        onClick={() => onClick?.(scrollProgress)}
        style={{
          // If stationary, use initial position, otherwise map scroll position with more padding
          left: isStationary ? `${5 + (initialPosition * 0.88)}%` : `${5 + (scrollProgress * 0.88)}%`,
          transform: `translateX(-11px) ${!isStationary && isJumping ? 'translateY(-20px)' : 'translateY(0)'}`,
          transition: isStationary ? 'none' : `left 0.1s linear${isJumping ? ', transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : ', transform 0.15s cubic-bezier(0.55, 0.055, 0.675, 0.19)'}`,
          pointerEvents: 'auto'
        }}
      >
        <img
          src={getSpriteUrl()}
          alt=""
          className="hover:brightness-110"
          style={{
            width: 'auto',
            height: '32px',
            imageRendering: 'pixelated',
          }}
        />
        {/* Question mark hover tooltip */}
        <img
          src="/questionmark/questionmark.png"
          alt="Click me!"
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{
            width: '24px',
            height: '24px',
            imageRendering: 'pixelated',
          }}
        />
      </div>
    </div>
  )
}