'use client'

import { useEffect, useState } from 'react'

interface PreloaderProps {
  onLoadComplete?: () => void
}

export default function Preloader({ onLoadComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // List of critical images to preload
  const imagesToPreload = [
    // Main collage images
    '/projects/liquid_calling.png',
    '/projects/liquid_calling2.png',
    '/projects/liquid_calling3.png',
    '/projects/04 moodboard.png',
    '/projects/04moodboard3.png',
    '/projects/carmine3.png',
    '/projects/carmine4.png',
    '/projects/c0c02.png',
    '/projects/03_traysi_hero.png',
    '/projects/redd2.png',
    '/projects/tribute.png',
    // Work images
    '/work/01_liquidcalling/01_lcfront.png',
    '/work/02_carmine/01_carmine.png',
    '/work/03_traysi/00_traysi_frontpage.png',
    '/work/04_moodboard/01_moodboard_hero.png',
    '/work/05_coco/01_c0c0_2.png',
    '/work/06_redd/01_redd.png',
    '/work/07_moca/01_moca2.png',
  ]

  useEffect(() => {
    let loadedCount = 0
    const totalImages = imagesToPreload.length

    const preloadImage = (src: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.onload = () => {
          loadedCount++
          setProgress(Math.round((loadedCount / totalImages) * 100))
          resolve(src)
        }
        img.onerror = () => {
          loadedCount++
          setProgress(Math.round((loadedCount / totalImages) * 100))
          resolve(src) // Still resolve even if error
        }
        img.src = src
      })
    }

    // Preload all images
    Promise.all(imagesToPreload.map(preloadImage)).then(() => {
      // Add a small delay for smooth transition
      setTimeout(() => {
        setIsLoading(false)
        onLoadComplete?.()
      }, 500)
    })

    // Fallback timeout in case images take too long
    const timeout = setTimeout(() => {
      setIsLoading(false)
      onLoadComplete?.()
    }, 10000) // 10 seconds max

    return () => clearTimeout(timeout)
  }, [])

  if (!isLoading) return null

  return (
    <div
      className="fixed inset-0 z-[200000] flex items-center justify-center"
      style={{
        pointerEvents: 'all',
        background: '#0D1EFF',
        transition: 'opacity 0.5s ease-out'
      }}
    >
      <div className="text-center">
        {/* IMMATERIAL text */}
        <h1
          className="text-4xl md:text-5xl font-radice text-transparent mb-8"
          style={{
            WebkitTextStroke: '1px white',
            textStroke: '1px white',
            fontKerning: 'normal',
            fontFeatureSettings: '"kern" 1',
            animation: 'pulse 2s ease-in-out infinite'
          } as any}
        >
          IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
        </h1>

        {/* Progress bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden mx-auto" style={{ background: 'rgba(255, 255, 255, 0.2)' }}>
          <div
            className="h-full bg-white transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}