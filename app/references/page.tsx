'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navigation from '@/components/Navigation'

interface Book {
  title: string
  isbn?: string
  notes?: string
}

export default function References() {
  const [books, setBooks] = useState<{ common: Book[], rare: Book[] }>({ common: [], rare: [] })
  const [searchTerm, setSearchTerm] = useState('')
  const [bookFilter, setBookFilter] = useState<'all' | 'common' | 'rare'>('all')

  useEffect(() => {
    // Load books data
    fetch('/books-data.json')
      .then(res => res.json())
      .then(data => setBooks(data))
      .catch(err => console.error('Failed to load books:', err))
  }, [])

  // Filter books to remove unwanted entries
  const filterBooks = (bookList: Book[]) => {
    return bookList.filter(book =>
      book.title !== 'Title' &&
      book.title !== '1 copy online $600, 1 is 4k'
    )
  }

  // Get filtered books based on search and filter
  const getFilteredBooks = () => {
    let bookList: Book[] = []

    if (bookFilter === 'all') {
      bookList = [...filterBooks(books.common), ...filterBooks(books.rare)]
    } else if (bookFilter === 'common') {
      bookList = filterBooks(books.common)
    } else if (bookFilter === 'rare') {
      bookList = filterBooks(books.rare)
    }

    if (searchTerm) {
      return bookList.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (book.isbn && book.isbn.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (book.notes && book.notes.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    return bookList
  }

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

      {/* REFERENCES Header */}
      <div className="absolute top-[200px] left-1/2 transform -translate-x-1/2 w-full" style={{zIndex: 999}}>
        <h2
          className="text-center whitespace-nowrap"
          style={{
            fontFamily: 'NeueHaasGroteskMedium, sans-serif',
            fontSize: 'clamp(3rem, 6vw, 6rem)',
            lineHeight: '1.1',
            color: '#0D1EFF',
          }}>
          REFERENCES
        </h2>
      </div>

      {/* Page Container */}
      <div className="relative w-full pt-[300px] pb-[100px]">
        <div className="px-[5%] max-w-7xl mx-auto">

          {/* Reference Library Header */}
          <div className="mb-8 border-b border-black pb-4">
            <h3
              className="text-black"
              style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '24px',
                fontWeight: 500,
                letterSpacing: '0.05em',
                transform: 'scaleY(-1)',
                display: 'inline-block'
              }}>
              REFERENCE LIBRARY
            </h3>
          </div>
              {/* Search bar and filter buttons */}
              <div className="flex gap-6 items-center mb-8">
                {/* Search */}
                <input
                  type="text"
                  placeholder="Search books..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 px-4 py-2 border border-black bg-transparent text-black placeholder-black"
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '16px'
                  }}
                />

                {/* Filter buttons */}
                <button
                  onClick={() => setBookFilter('all')}
                  className={`px-4 py-2 text-black ${
                    bookFilter === 'all' ? 'border-b-2 border-black' : ''
                  }`}
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                  }}>
                  ALL
                </button>

                <button
                  onClick={() => setBookFilter('common')}
                  className={`px-4 py-2 text-black ${
                    bookFilter === 'common' ? 'border-b-2 border-black' : ''
                  }`}
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                  }}>
                  COMMON
                </button>

                <button
                  onClick={() => setBookFilter('rare')}
                  className={`px-4 py-2 text-black ${
                    bookFilter === 'rare' ? 'border-b-2 border-black' : ''
                  }`}
                  style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '16px',
                    fontWeight: 500,
                    letterSpacing: '0.05em'
                  }}>
                  RARE
                </button>
              </div>

              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-4 pb-2 mb-4 border-b-2 border-black">
                <div className="col-span-6">
                  <p className="text-black uppercase" style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    TITLE
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-black uppercase" style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    ISBN
                  </p>
                </div>
                <div className="col-span-3">
                  <p className="text-black uppercase" style={{
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '14px',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}>
                    NOTES
                  </p>
                </div>
              </div>

              {/* Book List */}
              <div className="space-y-1">
                {getFilteredBooks().map((book, index) => (
                  <div key={index} className="grid grid-cols-12 gap-4 py-2 border-b border-black items-start">
                    {/* Title column */}
                    <div className="col-span-6">
                      <p className="text-black" style={{
                        fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                        fontSize: '16px',
                        fontWeight: 500,
                        lineHeight: '20px'
                      }}>
                        {book.title}
                      </p>
                    </div>

                    {/* ISBN column */}
                    <div className="col-span-3">
                      <p className="text-black" style={{
                        fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}>
                        {book.isbn || '—'}
                      </p>
                    </div>

                    {/* Notes column */}
                    <div className="col-span-3">
                      <p className="text-black" style={{
                        fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                        fontSize: '14px',
                        lineHeight: '20px'
                      }}>
                        {book.notes || '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Results count */}
              <p className="mt-8 text-black" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                fontSize: '14px'
              }}>
                Showing {getFilteredBooks().length} of {filterBooks([...books.common, ...books.rare]).length} books
              </p>

        </div>
      </div>
    </div>
  )
}