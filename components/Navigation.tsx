'use client'

import Link from 'next/link'
import { FONT_DISPLAY } from '@/lib/fonts'

const Navigation = () => {
  const navItems = [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'References', href: '/references' }
  ]

  return (
    <nav
      className="absolute top-8 left-1/2 transform -translate-x-1/2"
      style={{zIndex: 99999}}
    >
      {/* Navigation Buttons */}
      <div className="flex gap-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-8 py-2 text-xs md:text-sm font-normal hover:bg-[#0D1EFF] hover:text-white transition-all duration-700 cursor-pointer"
            style={{
              borderRadius: '100px',
              fontFamily: FONT_DISPLAY,
              background: 'rgba(13, 30, 255, 0.1)',
              border: '1.2px solid #0D1EFF',
              color: '#0D1EFF'
            }}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navigation