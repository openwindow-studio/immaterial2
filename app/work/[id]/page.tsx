'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'
import { useParams } from 'next/navigation'
import { FONT_BODY, FONT_DISPLAY } from '@/lib/fonts'

interface ProjectData {
  id: string
  title: string
  category: string
  year: string
  description: string
  link?: string
  images: string[]
}

const projectsData: Record<string, ProjectData> = {
  'liquid-calling': {
    id: 'liquid-calling',
    title: 'Liquid Calling',
    category: 'Brand, Product',
    year: '2024',
    description: '100% private, end-to-end encrypted application for private voice chat — built after speaking with a friend about finances while overseas and becoming concerned about both financial privacy and censorship laws. We also built an SDK for integrating private voice chat into enterprise and consumer applications with just 10 lines of code.',
    images: [
      '/img/traysi/Screenshot-2025-06-20-at-10.11.46-PM.png',
      '/img/traysi/Screenshot-2025-06-20-at-10.12.04-PM.png',
      '/img/traysi/Screenshot-2025-06-20-at-10.12.38-PM.png',
      '/img/traysi/Screenshot-2025-06-20-at-10.13.06-PM.png'
    ]
  },
  'carmine-finance': {
    id: 'carmine-finance',
    title: 'Carmine Finance',
    category: 'Brand, Product',
    year: '2023',
    description: 'TVL and users doubled just after relaunch. We made an emerging Starkware platform feel like a trustworthy classic, building from the visual history of commodities trading to create a hyper-functional product that makes trading options simple, fluid, and easy. This project was particularly interesting as the clients were frontend developers, and brand guidelines were delivered solely through Discord as CSS files for smooth, elegant integration.',
    images: [
      '/img/carmine/carmine.png',
      '/img/carmine/01_TradeAdvanced.png',
      '/img/carmine/trackblack.png',
      '/img/carmine/VolSmileblack.png',
      '/img/carmine/matrixblack.png',
      '/img/carmine/ribbonblack.png'
    ]
  },
  'traysi': {
    id: 'traysi',
    title: 'Traysi',
    category: 'Brand, Product',
    year: '2024',
    description: 'AI writing application that helps users create content with advanced language models.',
    images: [
      '/work/03_traysi/00_traysi_frontpage.png'
    ]
  },
  'moodboard-tools': {
    id: 'moodboard-tools',
    title: 'Moodboard.Tools',
    category: 'Brand, Product',
    year: '2024',
    description: 'AI image research tool that uses a model to process and contextually search images from various platforms, returning a curated list with contextual information that can be easily downloaded for copy-pasting into a presentation. We also built an editorial engine that posts interesting feature-rich articles through custom built agents that continually research extremely niche, trending micro cultures to hit high value keywords and continually bring new users to the site.',
    images: [
      '/work/04_moodboard/01_moodboard_hero.png'
    ]
  },
  'c0c0-dao': {
    id: 'c0c0-dao',
    title: 'C0C0 DAO',
    category: 'Brand, Type, Product',
    year: '2023',
    description: 'Helping C0C0 DAO put the CC0 license on the map. The work we did aided the DAO in receiving more than $2M in initial investment.',
    link: 'http://c0c0dao.xyz',
    images: [
      '/img/coco/c0c0_2.png',
      '/img/coco/cocologo.png',
      '/img/coco/greencoco.png',
      '/img/coco/yellowcoco.png',
      '/img/coco/blackcoco.png',
      '/img/coco/browncoco.png'
    ]
  },
  'redd-accounting': {
    id: 'redd-accounting',
    title: 'Redd Accounting',
    category: 'Brand, Content',
    year: '2023',
    description: 'Our positioning and branded content helped Redd scale to over 80 employees within its first three months. We also created the Above the Line newsletter for Redd, which garnered an average of 400K monthly impressions that were highly targeted towards executive decision makers.',
    link: 'https://reddaccounting.com',
    images: [
      '/img/redd/redd.png',
      '/img/redd/redd_slashlogo.png',
      '/img/redd/redd_phrase.png',
      '/img/redd/redd_illustration.png',
      '/img/redd/redd_white_2000.png'
    ]
  },
  'moca-los-angeles': {
    id: 'moca-los-angeles',
    title: 'MOCA Los Angeles',
    category: 'Site, Content, Social',
    year: '2018–2023',
    description: 'Significant projects include the redesign of moca.org, which looked to the archives and reinterpreted the original 1993 identity from the storied firm Chermayeff & Geismar. The refresh resulted in a 24% increase in sessions YOY and a 19% drop in bounce rate, coupled with a digital strategy that resulted in 25% YOY growth across all platforms.',
    link: 'http://moca.org',
    images: [
      '/img/moca/moca2.png',
      '/img/moca/mocascreen_2.png',
      '/img/moca/kruger.png',
      '/img/moca/lamy_2.png',
      '/img/moca/ruschasquare_2.png',
      '/img/moca/bk_2.png'
    ]
  }
}

export default function ProjectPage() {
  const params = useParams()
  const projectId = params.id as string
  const project = projectsData[projectId]
  const [imageLoaded, setImageLoaded] = useState<Record<number, boolean>>({})

  if (!project) {
    return (
      <div className="relative w-full min-h-screen bg-black flex items-center justify-center">
        <Navigation />
        <div className="text-immaterial-yellow">Project not found</div>
      </div>
    )
  }

  return (
    <div className="relative w-full min-h-screen bg-white">
      <Navigation />

      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center justify-center px-[5%]">
        <div className="w-full max-w-7xl">
          <div className="mb-8">
            <span className="text-black/50 text-lg"
                  style={{fontFamily: FONT_BODY}}>
              {project.year}
            </span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-black mb-8"
              style={{
                fontKerning: 'normal',
                fontFeatureSettings: '"kern" 1',
                letterSpacing: '-0.02em',
                lineHeight: '0.9'
              }}>
            {project.title}
          </h1>
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
            <p className="text-xl md:text-2xl text-black/70 max-w-3xl"
               style={{lineHeight: '1.4'}}>
              {project.description}
            </p>
            <div className="mt-8 md:mt-0">
              <span className="text-black/50 text-lg"
                    style={{fontFamily: FONT_BODY}}>
                {project.category}
              </span>
              {project.link && (
                <a href={project.link}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="block mt-4 text-black underline hover:opacity-60 transition-opacity"
                   style={{fontFamily: FONT_BODY}}>
                  Visit Site →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Images Section */}
      <div className="w-full px-[5%] pb-[10%]">
        <div className="w-full max-w-7xl mx-auto space-y-8">
          {project.images.map((image, index) => (
            <div key={index} className="relative w-full">
              <img
                src={image}
                alt={`${project.title} - ${index + 1}`}
                className="w-full h-auto rounded-lg"
                onLoad={() => setImageLoaded(prev => ({ ...prev, [index]: true }))}
                style={{
                  backgroundColor: '#f5f5f5',
                  opacity: imageLoaded[index] ? 1 : 0,
                  transition: 'opacity 0.5s ease'
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <Link href="/work">
          <span className="text-black/50 hover:text-black transition-colors"
                style={{fontFamily: FONT_BODY}}>
            ← Back to Work
          </span>
        </Link>
      </div>
    </div>
  )
}