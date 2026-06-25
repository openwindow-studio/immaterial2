'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import CollageOverlay from '@/components/CollageOverlay'
import SchedulingModal from '@/components/SchedulingModal'
import Navigation from '@/components/Navigation'
import NessProgressBar from '@/components/NessProgressBar'
import ProjectCarousel from '@/components/ProjectCarousel'
import { FONT_BODY, FONT_DISPLAY } from '@/lib/fonts'

// Dynamically import the torus to avoid SSR issues
const LCTorus = dynamic(() => import('@/components/LCTorus'), {
  ssr: false,
  loading: () => null
})

const projects = [
  {
    id: 'liquid-calling',
    title: 'LIQUID CALLING',
    image: '/work/01_liquidcalling/01_lcfront.png',
    type: 'ᗜ Zero-knowledge voice chat app'
  },
  {
    id: 'carmine-finance',
    title: 'CARMINE FINANCE',
    image: '/work/02_carmine/01_carmine.png',
    type: '◞ DeFi Options Trading Platform'
  },
  {
    id: 'traysi',
    title: 'TRAYSI',
    image: '/work/03_traysi/00_traysi_frontpage.png',
    type: '﹏ AI Writing Application'
  },
  {
    id: 'moodboard-tools',
    title: 'MOODBOARD.TOOLS',
    image: '/work/04_moodboard/01_moodboard_hero.png',
    type: '▽ Visual Research Tool'
  },
  {
    id: 'c0c0-dao',
    title: 'C0C0 DAO',
    image: '/work/05_coco/01_c0c0_2.png',
    type: 'ᗣ CC0 NFT Investment Collective'
  },
  {
    id: 'redd-accounting',
    title: 'REDD ACCOUNTING',
    image: '/work/06_redd/01_redd.png',
    type: '◡ Financial Services'
  },
  {
    id: 'moca-los-angeles',
    title: 'MOCA LOS ANGELES',
    image: '/work/07_moca/01_moca2.png',
    type: 'ᴈ Art Museum*'
  }
]

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [scale, setScale] = useState(1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isCollageOpen, setIsCollageOpen] = useState(false)
  const [nessPosition, setNessPosition] = useState(0)
  const [filledChars, setFilledChars] = useState(0)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)
  const text = "Immaterial is a laboratory for seamless brand systems, interfaces, and products"

  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play()
    }
  }, [])

  useEffect(() => {
    // Start typewriter effect after 0.5 second delay
    const initialDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setFilledChars(prev => {
          if (prev >= text.length) {
            clearInterval(interval)
            return prev
          }
          return prev + 1
        })
      }, 30) // Adjust speed here (30ms per character for terminal feel)
    }, 500)

    return () => clearTimeout(initialDelay)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth / 1920)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full bg-white" style={{minHeight: '100vh'}}>
      {/* Background SVG */}
      <div
        className="absolute inset-0 z-0 opacity-[0.26]"
        style={{
          backgroundImage: 'url("/untitled folder/work_bg.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'top left'
        }}
      />
      {/* Elements overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage: 'url("/untitled folder/work_bg_elements.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto',
          backgroundPosition: 'top left'
        }}
      />

      {/* Background Images for hover effect */}
      <div className="fixed inset-0 z-10 pointer-events-none">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              hoveredProject === project.id ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      <Navigation />

      {/* IMMATERIAL Logo at top */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2" style={{zIndex: 9999}}>
        <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-black mix-blend-luminosity"
            style={{
              WebkitTextStroke: '1px #EFE5E4',
              textStroke: '1px #EFE5E4',
              fontKerning: 'normal',
              fontFeatureSettings: '"kern" 1'
            } as any}>
          IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
        </h1>
      </div>

          {/* Description Text */}
          <div className="relative pt-[200px] px-[5vw] w-full" style={{zIndex: 9999}}>
            <p
              className="text-left cursor-default"
              style={{
                fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                fontSize: 'clamp(3.5rem, 8vw, 8rem)',
                lineHeight: '1.1',
                position: 'relative',
              }}>
              {text.split('').map((char, index) => (
                <span
                  key={index}
                  className="transition-all duration-75"
                  style={{
                    color: index < filledChars ? '#0D1EFF' : 'transparent',
                    WebkitTextStroke: index < filledChars ? 'none' : '1px #0D1EFF',
                    textStroke: index < filledChars ? 'none' : '1px #0D1EFF',
                    transition: 'all 0.1s ease',
                  } as any}
                  onMouseEnter={(e) => {
                    if (index < filledChars) {
                      e.currentTarget.style.opacity = '0.8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}>
                  {char}
                </span>
              ))}
            </p>
          </div>


      {/* Frontpage Content */}
      <div className="relative w-full" style={{paddingTop: '60px', paddingBottom: '40px'}}>
        {/* Studio Description */}
        <div className="relative w-full z-30 px-[5vw]">
          <div className="max-w-4xl">
            <p
              className="text-black mb-12"
              style={{
                fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                lineHeight: '1.2',
                fontWeight: 500
              }}>
              Immaterial is the studio of Marco Braunschweiler. I've previously worked with established companies like Acura, Sonos, The Los Angeles Times, The New York Times, and The Museum of Contemporary Art Los Angeles.
            </p>
          </div>
        </div>

        {/* Selected Projects Header */}
        <div className="relative w-full z-30 px-[5vw] mt-12">
          <h3
            className="text-blue-600 mb-8"
            style={{
              fontFamily: 'NeueHaasGroteskMedium, sans-serif',
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              fontWeight: 500,
              color: '#0D1EFF'
            }}>
            Selected Projects
          </h3>
        </div>

        {/* Project List */}
        <div className="relative w-full z-30 px-[5vw]">
          <div className="w-full max-w-7xl">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="cursor-pointer"
                onClick={() => setSelectedProjectIndex(index)}
              >
                <h2
                  className={`text-transparent mix-blend-lighten transition-all duration-75 inline-block ${
                    hoveredProject === project.id ? 'hover:text-[#0D1EFF]' : ''
                  }`}
                  style={{
                    fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                    fontSize: 'clamp(3rem, 6vw, 5rem)',
                    lineHeight: '1.1',
                    WebkitTextStroke: hoveredProject === project.id ? '1px #0D1EFF' : '1px black',
                    textStroke: hoveredProject === project.id ? '1px #0D1EFF' : '1px black',
                  } as any}
                  onMouseEnter={(e) => {
                    setHoveredProject(project.id);
                    e.currentTarget.style.webkitTextStroke = 'none';
                    (e.currentTarget.style as any).textStroke = 'none';
                    e.currentTarget.style.color = '#0D1EFF';
                  }}
                  onMouseLeave={(e) => {
                    setHoveredProject(null);
                    e.currentTarget.style.webkitTextStroke = '1px black';
                    (e.currentTarget.style as any).textStroke = '1px black';
                    e.currentTarget.style.color = 'transparent';
                  }}
                >
                  {project.title}
                </h2>
                <p className="text-gray-600 text-sm mt-2 mb-8" style={{
                  fontFamily: 'NeueHaasGroteskText, sans-serif',
                  paddingLeft: '0.5rem'
                }}>
                  {project.type}
                </p>
              </div>
            ))}

            {/* Project Descriptions */}
            <div className="mt-16 max-w-4xl">
              <p
                className="text-black mb-12"
                style={{
                  fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  lineHeight: '1.2',
                  fontWeight: 500
                }}>
                We combine deep research, elegant typography, and strong systems thinking to create experiences that actually feel good to use — like a nice tool watch, they're evocative and functional.
                <br /><br />
                Projects typically take 6–12 weeks depending on scope and complexity. If you're excited about what you're building and want thoughtful design that feels like a true partnership, I'm probably a good fit.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Schedule a Meeting Button - Absolutely positioned over everything */}
        <button
          onClick={() => {
            console.log('Button clicked!')
            setIsModalOpen(true)
          }}
          className="fixed px-8 py-2 text-xs md:text-sm font-normal hover:bg-[#0D1EFF] hover:text-white transition-all duration-700 cursor-pointer"
          style={{
            borderRadius: '100px',
            fontFamily: FONT_DISPLAY,
            bottom: '80px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 999999,
            pointerEvents: 'auto',
            background: 'rgba(13, 30, 255, 0.1)',
            border: '1.2px solid #0D1EFF',
            color: '#0D1EFF'
          }}>
          Schedule a Meeting
        </button>

      {/* Scheduling Modal */}
      <SchedulingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Ness Progress Bar */}
      <NessProgressBar onClick={(position) => {
        setNessPosition(position || 0)
        setIsCollageOpen(true)
      }} />

      {/* Collage Overlay */}
      {isCollageOpen && (
        <CollageOverlay onClose={() => setIsCollageOpen(false)} nessPosition={nessPosition} />
      )}

      {/* Project Carousel Overlay */}
      {selectedProject && selectedProjectIndex !== null && (
        <ProjectCarousel
          projectId={selectedProject.id}
          projectName={selectedProject.title}
          onClose={() => setSelectedProjectIndex(null)}
          onNextProject={() => {
            setSelectedProjectIndex((prev) =>
              prev !== null ? (prev + 1) % projects.length : 0
            )
          }}
          onPrevProject={() => {
            setSelectedProjectIndex((prev) =>
              prev !== null ? (prev - 1 + projects.length) % projects.length : 0
            )
          }}
        />
      )}
    </div>
  )
}