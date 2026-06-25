# LC Torus Component

A reusable 3D torus animation component with glass-like refractive effects.

## Installation

```bash
npm install @react-three/fiber @react-three/drei three uuid
```

## Usage

```jsx
import LCTorus from './LCTorus'

// Basic usage
<LCTorus />

// With custom props
<LCTorus
  size={1.5}  // Scale the torus (default: 1)
  background="linear-gradient(0deg, #000, #222)"  // Custom background
  enableOrbitControls={true}  // Enable mouse rotation (default: true)
  cameraPosition={[4, -2, 7]}  // Camera position
  style={{ borderRadius: '8px' }}  // Additional container styles
/>
```

## Props

- `size`: Number - Scale factor for the torus (default: 1)
- `background`: String - CSS background (default: gradient from #0a0a0a to #1a1a1a)
- `enableOrbitControls`: Boolean - Enable mouse rotation (default: true)
- `cameraPosition`: Array - Camera [x, y, z] position (default: [4, -2, 7])
- `style`: Object - Additional styles for the container div
- `canvasStyle`: Object - Additional styles for the canvas element

## Features

- Glass-like refractive shader effects
- Animated bending/warping motion
- Interactive mouse controls for rotation
- Colorful background icosahedrons visible through the glass
- Fully customizable size and appearance