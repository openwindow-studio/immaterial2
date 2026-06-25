'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

interface ProjectCarouselProps {
  projectId: string
  projectName: string
  onClose: () => void
  onNextProject: () => void
  onPrevProject: () => void
}

// Define project assets based on numbered files in each folder
const projectAssets: Record<string, string[]> = {
  'liquid-calling': [
    '/work/01_liquidcalling/01_lcfront.png',
    '/work/01_liquidcalling/02_lcinuse.png',
    '/work/01_liquidcalling/03_sdk.png',
    '/work/01_liquidcalling/04_Frame 30.png',
    '/work/01_liquidcalling/05_logo_white.png',
    '/work/01_liquidcalling/09_socials_liquidcalling_griffin.mp4',
    '/work/01_liquidcalling/12_privacychads1.png',
    '/work/01_liquidcalling/14_privacychads3.png',
    '/work/01_liquidcalling/13_privacychads2.png',
    '/work/01_liquidcalling/17_liquidcallingfire.png',
  ],
  'carmine-finance': [
    '/work/02_carmine/01_carmine.png',
    '/work/02_carmine/02_TradeAdvanced.png',
    '/work/02_carmine/03_carminelogo_black_2.png',
    '/work/02_carmine/05_matrixblack_2.png',
    '/work/02_carmine/06_ribbonblack_2.png',
    '/work/02_carmine/07_trackblack_2.png',
    '/work/02_carmine/08_VolSmileblack_2.png',
  ],
  'traysi': [
    '/work/03_traysi/00_traysi_frontpage.png',
    '/work/03_traysi/traysi_2.png',
    '/work/03_traysi/traysi_3.png',
    '/work/03_traysi/traysi_04.png',
  ],
  'moodboard-tools': [
    '/work/04_moodboard/01_moodboard_hero.png',
    '/work/04_moodboard/02_screencapture-moodboard-tools-2026-06-01-15_09_51.png',
    '/work/04_moodboard/03_moodboard_resources.png',
    '/work/04_moodboard/04_moodboard_article.png',
  ],
  'c0c0-dao': [
    '/work/05_coco/01_c0c0_2.png',
    '/work/05_coco/02_cocologo.png',
    '/work/05_coco/03_cocologo_2.png',
    '/work/05_coco/04_steelregular.png',
    '/work/05_coco/05_browncoco.png',
    '/work/05_coco/06_yellowcoco.png',
    '/work/05_coco/07_greencoco.png',
  ],
  'redd-accounting': [
    '/work/06_redd/01_redd.png',
    '/work/06_redd/02_redd_white_2000.png',
    '/work/06_redd/03_redd_slashlogo.png',
    '/work/06_redd/04_cre_up.png',
    '/work/06_redd/05_redd_phrase.png',
    '/work/06_redd/06_for_esteemed_guest.png',
    '/work/06_redd/08marcokane_IBM_style_super_trendy_tech_image_of_a_hand_putting_a_74421afa-9bd2-4f88-9eb9-49787a8780e2-1 (1).png',
    '/work/06_redd/10_marcokane_stacks_of_coins_getting_progressively_smaller_in_a_su_d2148d5e-ecec-4bf0-9710-f554ce5ad785-copy.png',
  ],
  'moca-los-angeles': [
    '/work/07_moca/01_moca2.png',
    '/work/07_moca/02_mocascreen_2.png',
    '/work/07_moca/03_nts2.png',
    '/work/07_moca/04_lamy_2.png',
    '/work/07_moca/05_bk_2.png',
    '/work/07_moca/06_kruger.png',
    '/work/07_moca/07_ruschasquare_3.jpg',
  ],
}

// Project services and descriptions
const getProjectServices = (projectId: string): string => {
  const services: Record<string, string> = {
    'liquid-calling': 'App Development • Branding • UI • Marketing',
    'carmine-finance': 'Branding • UI • Marketing',
    'c0c0-dao': 'Branding • UI • Custom Typeface',
    'redd-accounting': 'Branding • Marketing • Editorial',
    'moca-los-angeles': 'Branding • Marketing • UI • Editorial',
    'traysi': 'App Development • Branding • UI',
    'moodboard-tools': 'App Development • Branding • UI'
  }
  return services[projectId] || ''
}

const getProjectDescription = (projectId: string): string => {
  const descriptions: Record<string, string> = {
    'liquid-calling': '100% private, end-to-end encrypted application for private voice chat — built after speaking with a friend about finances while overseas and becoming concerned about both financial privacy and censorship laws. We also built an SDK for integrating private voice chat into enterprise and consumer applications with just 10 lines of code.',
    'carmine-finance': 'TVL and users doubled just after relaunch. We made an emerging Starkware platform feel like a trustworthy classic, building from the visual history of commodities trading to create a hyper-functional product that makes trading options simple, fluid, and easy. This project was particularly interesting as the clients were frontend developers, and brand guidelines were delivered solely through Discord as CSS files for smooth, elegant integration.',
    'c0c0-dao': 'We helped C0C0 DAO put the CC0 license on the map. The work we did aided the DAO in receiving more than $2M in initial investment. Custom typeface, web, and product styling.',
    'redd-accounting': 'Our positioning and branded content helped Redd scale to over 80 employees within its first three months. We also created the Above the Line newsletter for Redd, which garnered an average of 400K monthly impressions that were highly targeted towards executive decision makers.',
    'moca-los-angeles': 'Significant projects include the redesign of moca.org, which looked to the archives and reinterpreted the original 1993 identity from the storied firm Chermayeff & Geismar. The refresh resulted in a 24% increase in sessions YOY and a 19% drop in bounce rate. This was coupled with a digital strategy that resulted in 25% YOY growth across all platforms.',
    'traysi': 'An AI writing tool that removes the distance between the writer and the writing process, creating a more seamless experience for creation. Over one million words written.',
    'moodboard-tools': 'AI image research tool that uses a model to process and contextually search images from various platforms, returning a curated list with contextual information that can be easily downloaded for copy-pasting into a presentation. We also built an editorial engine that posts interesting feature-rich articles through custom built agents that continually research extremely niche, trending micro cultures to hit high value keywords and continually bring new users to the site.'
  }
  return descriptions[projectId] || ''
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ projectId, projectName, onClose, onNextProject, onPrevProject }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const assets = projectAssets[projectId] || []

  // Add a placeholder slide at the end for project details
  const slides = [...assets, 'project-details']

  const handleNext = () => {
    // If we're at the last slide, go to next project
    if (currentIndex === slides.length - 1) {
      onNextProject()
      setCurrentIndex(0) // Reset for next project
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handlePrev = () => {
    // If we're at the first slide, go to previous project
    if (currentIndex === 0) {
      onPrevProject()
      // The parent will handle setting the correct slide
    } else {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  // Reset index when project changes
  useEffect(() => {
    setCurrentIndex(0)
  }, [projectId])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Touch handlers for swipe
  const minSwipeDistance = 50

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      handleNext()
    }
    if (isRightSwipe) {
      handlePrev()
    }
  }

  const isVideo = (src: string) => src.endsWith('.mp4')

  // Determine background color based on project
  const getBgColor = () => {
    if (projectId === 'redd-accounting' || projectId === 'traysi' || projectId === 'moca-los-angeles') {
      return 'bg-white'
    }
    if (projectId === 'c0c0-dao' && currentIndex > 0 && !slides[currentIndex].includes('04_steelregular.png')) {
      return 'bg-white'
    }
    return 'bg-black'
  }

  // Determine if image should fill viewport
  const shouldFillViewport = projectId === 'c0c0-dao' && currentIndex > 0 && !slides[currentIndex].includes('04_steelregular.png')

  return (
    <div
      className={`fixed inset-0 ${getBgColor()} z-[10000] flex items-center justify-center`}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className={`absolute top-8 right-8 ${getBgColor() === 'bg-white' ? 'text-black' : 'text-white'} text-2xl z-50 hover:opacity-70 transition-opacity`}
        aria-label="Close"
      >
        ✕
      </button>

      {/* Content */}
      <div className="w-full h-full flex items-center justify-center relative">
        {currentIndex < assets.length ? (
          // Asset slide
          isVideo(slides[currentIndex] as string) ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <video
                ref={videoRef}
                src={slides[currentIndex] as string}
                className="max-w-[90vw] max-h-[90vh] object-contain"
                autoPlay
                loop
                muted={isMuted}
                playsInline
              />
              {/* Mute/Unmute button */}
              <button
                onClick={() => setIsMuted(!isMuted)}
                className={`absolute bottom-12 right-12 ${getBgColor() === 'bg-white' ? 'text-black' : 'text-white'} hover:opacity-70 transition-opacity z-50`}
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {isMuted ? (
                    // Muted icon
                    <>
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="23" y1="9" x2="17" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <line x1="17" y1="9" x2="23" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  ) : (
                    // Unmuted icon
                    <>
                      <path d="M11 5L6 9H2V15H6L11 19V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M15.54 8.46C16.477 9.398 17.004 10.674 17.004 12C17.004 13.326 16.477 14.602 15.54 15.54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19.07 4.93C20.945 6.805 21.998 9.348 21.998 12C21.998 14.652 20.945 17.195 19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </>
                  )}
                </svg>
              </button>
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={slides[currentIndex] as string}
                alt={`${projectName} - Slide ${currentIndex + 1}`}
                fill
                className={shouldFillViewport ? "object-cover" : "object-contain"}
                sizes="100vw"
                priority
              />
            </div>
          )
        ) : (
          // Project details slide
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
            {/* Background ellipse */}
            <img
              src="/work/UI/SVG/Ellipse 14.svg"
              className="absolute opacity-[0.13]"
              style={{
                width: '1264px',
                height: '1264px',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -75%)',
                borderRadius: '9999px'
              }}
              alt=""
            />

            <div className="relative z-10 w-[80%] max-w-[1536px]" style={{margin: '0 auto', transform: 'translateY(-10%)'}}>
              {/* Title */}
              <div
                className={`text-center mb-8 md:mb-16 ${getBgColor() === 'bg-white' ? 'text-black' : 'text-white'}`}
                style={{
                  fontFamily: 'NeueHaasGroteskMedium, sans-serif',
                  fontSize: 'clamp(2rem, 6vw, 6rem)',
                  lineHeight: '1.1',
                }}
              >
                {projectName.toUpperCase()}
              </div>

              {/* Content Grid - single column on mobile, 2 columns on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 md:gap-x-16 lg:gap-x-20">
                {/* Description */}
                <div>
                  <div className={`border-t-[6px] ${getBgColor() === 'bg-white' ? 'border-black' : 'border-white'} mb-4 md:mb-6`}></div>
                  <p
                    className={`${getBgColor() === 'bg-white' ? 'text-black' : 'text-white'} text-base md:text-xl`}
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                      fontSize: 'clamp(16px, 2vw, 20px)',
                      fontWeight: 500,
                      lineHeight: '1.3',
                      textIndent: '1.5em'
                    }}
                  >
                    {getProjectDescription(projectId)}
                  </p>
                </div>

                {/* Services */}
                <div>
                  <div className={`border-t-[6px] ${getBgColor() === 'bg-white' ? 'border-black' : 'border-white'} mb-4 md:mb-6`}></div>
                  <div
                    className={`${getBgColor() === 'bg-white' ? 'text-black' : 'text-white'} text-base md:text-xl`}
                    style={{
                      fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                      fontSize: 'clamp(16px, 2vw, 20px)',
                      fontWeight: 500,
                      lineHeight: '1.3'
                    }}
                  >
                    {getProjectServices(projectId).split(' • ').map((service, index) => (
                      <div key={index} className="mb-1">
                        <span className="inline-block" style={{width: '2em'}}>{index + 1}.</span> {service}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Navigation arrows */}
      {/* Navigation arrows - hidden on mobile */}
      <button
        onClick={handlePrev}
        className="hidden md:block absolute left-8 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 transition-opacity"
        aria-label="Previous"
      >
        <img
          src="/work/UI/SVG/karat.svg"
          alt="Previous"
          className="w-12 h-12"
          style={{
            filter: getBgColor() === 'bg-white' ? 'brightness(0)' : 'brightness(0) invert(1)',
            transform: 'rotate(180deg)'
          }}
        />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:block absolute right-8 top-1/2 -translate-y-1/2 z-50 hover:opacity-70 transition-opacity"
        aria-label="Next"
      >
        <img
          src="/work/UI/SVG/karat.svg"
          alt="Next"
          className="w-12 h-12"
          style={{
            filter: getBgColor() === 'bg-white' ? 'brightness(0)' : 'brightness(0) invert(1)',
          }}
        />
      </button>

      {/* Slide indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? (getBgColor() === 'bg-white' ? 'bg-black' : 'bg-white')
                : (getBgColor() === 'bg-white' ? 'bg-black/50' : 'bg-white/50')
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectCarousel