# CollageOverlay Implementation Reference

## Overview
This document captures the CollageOverlay component implementation that creates an interactive overlay with video background, 3D torus, and project showcase functionality.

## Component Structure

### CollageOverlay.tsx
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import CollageSection from '@/components/Collage'
import { FONT_BODY, FONT_DISPLAY } from '@/lib/fonts'

// Dynamically import the torus to avoid SSR issues
const LCTorus = dynamic(() => import('@/components/LCTorus'), {
  ssr: false,
  loading: () => null
})

interface CollageOverlayProps {
  onClose: () => void
}

export default function CollageOverlay({ onClose }: CollageOverlayProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [filledChars, setFilledChars] = useState(0)
  const text = "Immaterial is a laboratory for seamless brand systems, interfaces, and products"

  // Video autoplay effect
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  // Typewriter effect for text
  useEffect(() => {
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setFilledChars(prev => {
          if (prev >= text.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 30)
    }, 500)

    return () => clearTimeout(initialDelay)
  }, [])

  return (
    <div className="fixed inset-0 bg-black z-[100000] overflow-y-auto">
      {/* Close button */}
      <button onClick={onClose} className="fixed top-8 right-8 text-white text-2xl z-[100002] hover:opacity-70 transition-opacity mix-blend-difference">
        ✕
      </button>

      <div className="relative w-full min-h-screen">
        {/* Video Background */}
        <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
          <video ref={videoRef} className="absolute top-1/2 left-1/2 w-[140vw] h-[140vh] min-w-[140vw] min-h-[140vh] max-w-none transform -translate-x-1/2 -translate-y-1/2 object-cover" autoPlay loop muted playsInline>
            <source src="/assets/bg_immaterial.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10">
          {/* 3D Torus */}
          <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] pointer-events-none" style={{zIndex: 1}}>
            <LCTorus />
          </div>

          {/* IMMATERIAL Logo */}
          <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2" style={{zIndex: 9999}}>
            <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-black mix-blend-luminosity">
              IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
            </h1>
          </div>

          {/* Description Text with typewriter effect */}
          <div className="absolute top-[200px] left-[5vw] w-[90vw]" style={{zIndex: 9999}}>
            <p className="text-left cursor-default">
              {text.split('').map((char, index) => (
                <span key={index} style={{
                  color: index < filledChars ? '#0D1EFF' : 'transparent',
                  WebkitTextStroke: index < filledChars ? 'none' : '1px #0D1EFF',
                }}>
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Collage Section with projects */}
          <CollageSection />
        </div>
      </div>
    </div>
  )
}
```

## Features

1. **Full-screen overlay** - Fixed positioning covering entire viewport
2. **Video background** - Autoplay video with oversized dimensions for coverage
3. **3D Torus element** - Centered 3D rotating element
4. **Typewriter text effect** - Animated text reveal with stroke-to-fill animation
5. **Project showcase** - CollageSection with hover effects and carousel functionality
6. **Close functionality** - Button to exit overlay

## Integration in page.tsx

```tsx
const [isCollageOpen, setIsCollageOpen] = useState(false)

// Trigger from Ness click
<NessProgressBar onClick={() => setIsCollageOpen(true)} />

// Render overlay conditionally
{isCollageOpen && (
  <CollageOverlay onClose={() => setIsCollageOpen(false)} />
)}
```

## Key Styling Notes

- Z-index hierarchy:
  - Base overlay: z-[100000]
  - Close button: z-[100002]
  - Content elements: z-[9999]
  - 3D Torus: z-[1]
- Video sizing: 140vw x 140vh for full coverage
- Text effects: WebkitTextStroke for outline, transition to solid fill
- Mix blend modes for visual effects

## Dependencies

- LCTorus component (3D element)
- CollageSection component (project showcase)
- Font imports from lib/fonts
- Video asset at /assets/bg_immaterial.mp4