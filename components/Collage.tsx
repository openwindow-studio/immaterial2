'use client'

import { useEffect, useState } from 'react'
import ProjectCarousel from './ProjectCarousel'
import Link from 'next/link'

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

const CollageSection = () => {
  const [scale, setScale] = useState(1)
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null

  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth
      const designWidth = 1920
      setScale(viewportWidth / designWidth)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="relative w-full" style={{paddingTop: '0px', paddingBottom: '200px'}}>
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

      {/* Studio Description */}
      <div className="absolute w-full z-30 px-[5vw]" style={{top: `850px`}}>
        <div className="max-w-4xl">
          <p
            className="text-black mb-12"
            style={{
              fontFamily: 'NeueHaasGroteskMedium, sans-serif',
              fontSize: '30px',
              lineHeight: '1.2',
              fontWeight: 500
            }}>
            Immaterial is the studio of Marco Braunschweiler. I've previously worked with established companies like Acura, Sonos, The Los Angeles Times, The New York Times, and The Museum of Contemporary Art Los Angeles.
          </p>
        </div>
      </div>

      {/* Selected Projects Header */}
      <div className="absolute w-full z-30 px-[5vw]" style={{top: `1090px`}}>
        <h3
          className="text-blue-600 mb-8"
          style={{
            fontFamily: 'NeueHaasGroteskMedium, sans-serif',
            fontSize: '40px',
            lineHeight: '1.2',
            fontWeight: 500,
            color: '#0D1EFF'
          }}>
          Selected Projects
        </h3>
      </div>

      {/* Project List */}
      <div className="absolute w-full z-30 px-[5vw]" style={{top: `1190px`}}>
        <div className="w-full max-w-7xl">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="cursor-pointer"
              onClick={() => setSelectedProjectIndex(index)}
            >
              <h2
                className={`text-transparent mix-blend-lighten transition-all duration-75 cursor-pointer inline-block ${
                  hoveredProject === project.id
                    ? 'hover:text-[#0D1EFF]'
                    : ''
                }`}
                style={{
                  fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                  fontSize: '80px',
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
              className="text-black mb-6"
              style={{
                fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                fontSize: '30px',
                lineHeight: '1.2',
                fontWeight: 500
              }}>
              Now I primarily work with teams building in AI, finance, crypto, and frontier technologies. Because these landscapes move so fast, there's usually a gap in design: the product and ambition have evolved, but the visual language and interfaces haven't caught up yet.
            </p>
            <p
              className="text-black mb-12"
              style={{
                fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                fontSize: '30px',
                lineHeight: '1.2',
                fontWeight: 500
              }}>
              We combine deep research, elegant typography, and strong systems thinking to create experiences that actually feel good to use — like a nice tool watch, they're evocative and functional. Projects typically take 6–12 weeks depending on scope and complexity. If you're excited about what you're building and want thoughtful design that feels like a true partnership, I'm probably a good fit.
            </p>
          </div>
        </div>
      </div>


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

export default CollageSection