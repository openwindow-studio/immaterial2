'use client'

import { useState, useRef } from 'react'
import Calendar from './Calendar'

interface SchedulingModalProps {
  isOpen: boolean
  onClose: () => void
}

const SchedulingModal = ({ isOpen, onClose }: SchedulingModalProps) => {
  const [email, setEmail] = useState('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [topic, setTopic] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState('')
  const [showCalendar, setShowCalendar] = useState(false)

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date)
    setShowCalendar(false)
  }

  const formatSelectedDateTime = () => {
    if (!selectedDate) return ''
    const formattedDate = selectedDate.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    const formattedTime = selectedDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
      timeZone: (selectedDate as any).timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    })
    const timezone = (selectedDate as any).timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
    // Show friendly timezone name
    const tzDisplay = timezone.split('/').pop()?.replace(/_/g, ' ')
    return `${formattedDate} at ${formattedTime} (${tzDisplay})`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage('')

    if (!selectedDate) {
      setMessage('Please select a date and time')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          dateTime: selectedDate.toISOString(),
          timezone: (selectedDate as any).timezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
          topic
        })
      })

      const data = await response.json()

      if (response.ok) {
        setMessage("Request sent, I'll be in touch")
        setEmail('')
        setSelectedDate(null)
        setTopic('')
        setTimeout(() => onClose(), 2000)
      } else {
        setMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (error) {
      setMessage('Failed to schedule meeting. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-[100000] px-4 sm:px-6"
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      <div
        className="relative max-w-lg w-full p-6 sm:p-8 rounded-[20px] my-auto max-h-[90vh] overflow-y-auto"
        style={{
          background: 'rgba(13, 30, 255, 0.03)',
          border: '1px solid #0D1EFF',
          fontFamily: "'Neue Haas Grotesk Display', sans-serif"
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 hover:text-white text-2xl"
          style={{color: '#0D1EFF'}}
        >
          ×
        </button>

        {/* Header */}
        <h3 className="text-xl sm:text-2xl mb-6 text-center" style={{color: '#0D1EFF'}}>
          Schedule a Meeting
        </h3>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email input */}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent px-4 py-2 rounded-[50px] focus:outline-none focus:ring-0 placeholder-[#0D1EFF] placeholder-opacity-70"
            style={{
              border: '1px solid #0D1EFF',
              color: '#0D1EFF',
              fontFamily: "'Neue Haas Grotesk Display', sans-serif"
            }}
            placeholder="you@example.com"
          />

          {/* Combined Topic and Date/Time selector */}
          <div className="relative">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full bg-transparent px-4 py-2 pr-12 rounded-[50px] focus:outline-none focus:ring-0 placeholder-[#0D1EFF] placeholder-opacity-70"
              style={{
                border: '1px solid #0D1EFF',
                color: '#0D1EFF',
                fontFamily: "'Neue Haas Grotesk Display', sans-serif"
              }}
              placeholder="What are we speaking on?"
            />
            {/* Calendar icon button */}
            <button
              type="button"
              onClick={() => setShowCalendar(!showCalendar)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:opacity-70 transition-opacity"
              style={{ color: '#0D1EFF' }}
              title={formatSelectedDateTime() || 'Select date and time'}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </button>
            {/* Custom Calendar */}
            {showCalendar && (
              <div
                className="fixed inset-0 z-[99]"
                onClick={() => setShowCalendar(false)}
              />
            )}
            <Calendar
              isOpen={showCalendar}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* Selected date display */}
          {selectedDate && (
            <div className="text-center text-sm" style={{
              color: '#0D1EFF',
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              opacity: 0.8
            }}>
              {formatSelectedDateTime()}
            </div>
          )}

          {/* Submit button - same width as the schedule meeting button */}
          <div className="flex justify-center" style={{ isolation: 'isolate' }}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-8 sm:px-12 py-2 text-sm sm:text-base border-1 transition-all duration-700 rounded-[50px] disabled:opacity-50 relative"
              style={{
                border: '1px solid #0D1EFF',
                fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                color: '#0D1EFF',
                background: 'transparent'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0D1EFF';
                e.currentTarget.style.color = 'white';
                e.currentTarget.style.mixBlendMode = 'screen';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#0D1EFF';
                e.currentTarget.style.mixBlendMode = 'normal';
              }}
            >
              {isSubmitting ? 'Sending invite...' : 'Send Calendar Invite'}
            </button>
          </div>
        </form>

        {/* Message */}
        {message && (
          <p className={`text-center mt-4 text-sm ${
            message.includes('sent') ? 'text-green-400' : 'text-red-400'
          }`}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default SchedulingModal