# Visual Collage Overlay Implementation

## Overview
This document captures the Visual Collage Overlay implementation that displays the artistic collage with overlapping images, blend modes, and navigation elements.

## Component Structure

### CollageOverlay.tsx
```tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import VisualCollage from '@/components/VisualCollage'
import Navigation from '@/components/Navigation'

interface CollageOverlayProps {
  onClose: () => void
}

export default function CollageOverlay({ onClose }: CollageOverlayProps) {

  return (
    <div className="fixed inset-0 bg-black z-[100000] overflow-y-auto">
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
    </div>
  )
}
```

## Features

1. **Full-screen overlay** - Fixed positioning with black background
2. **Navigation integration** - Full navigation menu at the top
3. **IMMATERIAL logo** - Centered, clickable to return home
4. **Close button** - Glass-morphism effect with blur
5. **Visual Collage** - Full artistic collage with:
   - Red dot and ribbon elements
   - Multiple project images with blend modes
   - 3D Torus element
   - Precise positioning and scaling

## Key Visual Elements in VisualCollage.tsx

- **Top elements**: Red dot, black ribbon with mix-blend-difference
- **Project images**: MOCA, Carmine, Redd, C0C0 assets
- **Blend modes**: mix-blend-difference, mix-blend-soft-light, mix-blend-plus-darker
- **3D Torus**: Interactive 3D element positioned midway
- **Height calculation**: `${13172 * scale + viewportHeight}px`

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

## Styling Details

- **Z-index hierarchy**:
  - Base overlay: z-[100000]
  - Visual elements: various z-indexes
  - Navigation/Logo: z-[100003]
  - Close button: z-[100004]

- **Mix blend modes**: Used throughout for artistic effect
- **Glass-morphism close button**: Semi-transparent with backdrop blur

## Assets Required

Located in `/public/assets/immaterialsite/`:
- ribbonblack_2.png
- reddot.png
- Various project images (greencoco.png, moca2.png, etc.)
- Untitled-3-2.png, Untitled-4.png
- Additional assets in `/public/assets/add/`

## Notes

- The overlay provides a full-page experience rather than a popup feel
- Logo and navigation make it feel integrated with the site
- Scrollable content allows viewing the entire collage
- Multiple ways to close: logo click, close button, or potentially ESC key