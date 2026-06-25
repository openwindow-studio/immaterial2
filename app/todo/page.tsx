'use client'

import Link from 'next/link'
import Navigation from '@/components/Navigation'
import TodoList from '@/components/TodoList'

export default function TodoPage() {
  return (
    <div className="relative w-full min-h-screen bg-white">

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

      <Navigation />

      {/* IMMATERIAL Logo - Positioned like frontpage */}
      <div className="absolute top-[120px] left-1/2 transform -translate-x-1/2" style={{zIndex: 9999}}>
        <Link href="/">
          <h1 className="text-xl md:text-2xl lg:text-2xl font-radice text-transparent transition-opacity hover:opacity-80"
              style={{
                WebkitTextStroke: '1px black',
                textStroke: '1px black',
                fontKerning: 'normal',
                fontFeatureSettings: '"kern" 1'
              } as any}>
            IMMA<span style={{marginLeft: '-0.24em'}}>T</span>ERIAL
          </h1>
        </Link>
      </div>

      {/* Page Container */}
      <div className="relative w-full pt-[15%] pb-[10%]" style={{maxWidth: '1920px', margin: '0 auto'}}>

        {/* TODO LIST Header */}
        <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-full px-4" style={{zIndex: 999}}>
          <h2
            className="text-center sm:whitespace-nowrap"
            style={{
              fontFamily: 'NeueHaasGroteskMedium, sans-serif',
              fontSize: 'clamp(2.5rem, 6vw, 6rem)',
              lineHeight: '1.1',
              color: '#0D1EFF',
            }}>
            <span className="block sm:inline">TASK</span>
            <span className="hidden sm:inline"> </span>
            <span className="block sm:inline">LIST</span>
          </h2>
        </div>

        {/* Content - Increased margin for mobile */}
        <div className="relative" style={{marginTop: 'clamp(12rem, 20vw, 20rem)'}}>
          <div className="px-4 sm:px-8 lg:px-[12.5%]">
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  )
}