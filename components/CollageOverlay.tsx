'use client'

import { useEffect, useRef, useState } from 'react'
import VisualCollage from '@/components/VisualCollage'
import Navigation from '@/components/Navigation'
import NessProgressBar from '@/components/NessProgressBar'

interface CollageOverlayProps {
  onClose: () => void
  nessPosition?: number
}

export default function CollageOverlay({ onClose, nessPosition = 50 }: CollageOverlayProps) {

  return (
    <div className="fixed inset-0 bg-black z-[100000] overflow-y-auto overflow-x-hidden w-full max-w-full min-h-screen">
      {/* Navigation - same as main page */}
      <div className="fixed top-0 left-0 right-0 z-[100003]">
        <Navigation />
      </div>

      {/* IMMATERIAL Logo at top center - clickable to close */}
      <div
        className="fixed top-[120px] left-1/2 transform -translate-x-1/2 z-[100003] cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onClose}
      >
        <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-white mix-blend-difference"
            style={{
              WebkitTextStroke: '1px #EFE5E4',
              textStroke: '1px #EFE5E4',
              fontKerning: 'normal',
              fontFeatureSettings: '"kern" 1'
            } as any}>
          IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
        </h1>
      </div>

      {/* Close button - moved to top right corner */}
      <button
        onClick={onClose}
        className="fixed top-8 right-8 text-white text-2xl z-[100004] hover:opacity-70 transition-opacity mix-blend-difference"
        aria-label="Close"
        style={{
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        ✕
      </button>

      {/* Visual Collage */}
      <VisualCollage />

      {/* Ness as stationary toggle button at same position */}
      <NessProgressBar onClick={onClose} isStationary={true} initialPosition={nessPosition} />
    </div>
  )
}