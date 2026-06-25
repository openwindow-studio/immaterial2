'use client'

import Link from 'next/link'
import { useState } from 'react'
import Navigation from '@/components/Navigation'
import ProjectCarousel from '@/components/ProjectCarousel'

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

export default function WorkPage() {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null)
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null)

  const selectedProject = selectedProjectIndex !== null ? projects[selectedProjectIndex] : null

  return (
    <div className="min-h-screen relative bg-white">
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
      <div className="fixed inset-0 z-10">
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

      <Navigation />

      {/* IMMATERIAL Logo */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2" style={{zIndex: 9999}}>
        <Link href="/">
          <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-transparent transition-opacity hover:opacity-80"
              style={{
                WebkitTextStroke: hoveredProject ? '1px #0D1EFF' : '1px black',
                textStroke: hoveredProject ? '1px #0D1EFF' : '1px black',
                fontKerning: 'normal',
                fontFeatureSettings: '"kern" 1',
                transition: 'all 0.5s'
              } as any}>
            IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
          </h1>
        </Link>
      </div>

      {/* SELECTED PROJECTS Header */}
      <div className={`absolute top-[200px] left-1/2 transform -translate-x-1/2 w-full px-4 transition-opacity duration-500 ${hoveredProject ? 'opacity-0' : 'opacity-100'}`} style={{zIndex: 999}}>
        <h2
          className="text-center sm:whitespace-nowrap"
          style={{
            fontFamily: 'NeueHaasGroteskMedium, sans-serif',
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            lineHeight: '1.1',
            color: '#0D1EFF',
          }}>
          <span className="block sm:inline">SELECTED</span>
          <span className="hidden sm:inline"> </span>
          <span className="block sm:inline">PROJECTS</span>
        </h2>
      </div>

      {/* Project List */}
      <div className="relative z-20 w-full min-h-screen flex flex-col items-center pt-[350px] px-[5%] pb-[100px]">
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
                  fontSize: 'clamp(4rem, 8vw, 8rem)',
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