'use client'

import { useState, useEffect } from 'react'

interface CalendarProps {
  onDateSelect: (date: Date) => void
  isOpen: boolean
}

const Calendar = ({ onDateSelect, isOpen }: CalendarProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState('12:00')
  const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const [selectedTimezone, setSelectedTimezone] = useState(userTimezone)
  const [showTimezoneModal, setShowTimezoneModal] = useState(false)

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    setSelectedDate(newDate)
    // Don't call onDateSelect here - wait for confirm button
  }

  const confirmSelection = () => {
    if (selectedDate) {
      // Combine date with time
      const [hours, minutes] = selectedTime.split(':')
      selectedDate.setHours(parseInt(hours), parseInt(minutes))
      // Attach timezone info to the date object
      ;(selectedDate as any).timezone = selectedTimezone
      onDateSelect(selectedDate)
    }
  }

  const changeMonth = (increment: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + increment, 1))
  }

  const renderCalendarDays = () => {
    const totalDays = daysInMonth(currentMonth)
    const startingDayOfWeek = firstDayOfMonth(currentMonth)
    const days = []

    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="w-7 h-7" />)
    }

    // Days of the month
    for (let day = 1; day <= totalDays; day++) {
      const isToday = new Date().toDateString() ===
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()
      const isSelected = selectedDate?.toDateString() ===
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day).toDateString()

      days.push(
        <button
          key={day}
          type="button"
          onClick={() => handleDateClick(day)}
          className="w-7 h-7 text-xs hover:bg-white hover:bg-opacity-20 transition-colors rounded-full"
          style={{
            fontFamily: "'Neue Haas Grotesk Display', sans-serif",
            color: 'white',
            backgroundColor: isSelected ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            border: isToday ? '1px solid white' : 'none',
            fontSize: '11px'
          }}
        >
          {day}
        </button>
      )
    }

    return days
  }

  if (!isOpen) return null

  return (
    <>
      {/* Full modal blur overlay - extreme blur, no dark tint */}
      <div
        className="fixed inset-0 z-[100]"
        style={{
          backdropFilter: 'blur(100px) brightness(1.1)',
          WebkitBackdropFilter: 'blur(100px) brightness(1.1)',
          pointerEvents: 'none'
        }}
      />
      {/* Compact calendar with opacity and blur */}
      <div
        className="fixed left-1/2 z-[101] p-4 rounded-[20px]"
        style={{
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'rgba(13, 30, 255, 0.95)',
          border: '1px solid #0D1EFF',
          backdropFilter: 'blur(30px)',
          WebkitBackdropFilter: 'blur(30px)',
          minWidth: '320px',
          maxWidth: '360px',
          height: '420px',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          type="button"
          onClick={() => changeMonth(-1)}
          className="hover:opacity-70"
          style={{
            color: 'white',
            fontFamily: "'Neue Haas Grotesk Display', sans-serif"
          }}
        >
          ←
        </button>
        <h3
          className="text-lg"
          style={{
            color: 'white',
            fontFamily: "'Neue Haas Grotesk Display', sans-serif"
          }}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        <button
          type="button"
          onClick={() => changeMonth(1)}
          className="hover:opacity-70"
          style={{
            color: 'white',
            fontFamily: "'Neue Haas Grotesk Display', sans-serif"
          }}
        >
          →
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day) => (
          <div
            key={day}
            className="w-7 h-7 flex items-center justify-center"
            style={{
              color: 'white',
              fontFamily: "'Neue Haas Grotesk Display', sans-serif",
              opacity: 0.7,
              fontSize: '10px'
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar days */}
      <div className="grid grid-cols-7 gap-1 mb-4">
        {renderCalendarDays()}
      </div>

      {/* Time selector - Custom styled */}
      <div className="pt-3 border-t border-white/30">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <select
            value={selectedTime.split(':')[0]}
            onChange={(e) => {
              const [, minutes] = selectedTime.split(':')
              setSelectedTime(`${e.target.value}:${minutes}`)
            }}
            className="bg-white/10 px-3 py-1 rounded-full text-sm appearance-none cursor-pointer text-center"
            style={{
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Neue Haas Grotesk Display', sans-serif"
            }}
          >
            {[...Array(24)].map((_, i) => {
              const hour = i.toString().padStart(2, '0')
              const displayHour = i === 0 ? '12 AM' : i < 12 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`
              return <option key={i} value={hour}>{displayHour}</option>
            })}
          </select>
          <select
            value={selectedTime.split(':')[1]}
            onChange={(e) => {
              const [hours] = selectedTime.split(':')
              setSelectedTime(`${hours}:${e.target.value}`)
            }}
            className="bg-white/10 px-3 py-1 rounded-full text-sm appearance-none cursor-pointer text-center"
            style={{
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              fontFamily: "'Neue Haas Grotesk Display', sans-serif"
            }}
          >
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>

        {/* Timezone selector button */}
        <button
          type="button"
          onClick={() => setShowTimezoneModal(true)}
          className="w-full bg-white/10 px-3 py-1 rounded-full text-sm cursor-pointer text-center mb-3 hover:bg-white/20 transition-colors"
          style={{
            color: 'white',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontFamily: "'Neue Haas Grotesk Display', sans-serif",
            fontSize: '12px'
          }}
        >
          {selectedTimezone.split('/').pop()?.replace(/_/g, ' ')}
        </button>

        {/* Confirm button */}
        <button
          type="button"
          onClick={confirmSelection}
          disabled={!selectedDate}
          className="w-full py-2 rounded-full transition-all hover:bg-white hover:text-[#0D1EFF] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid white',
            color: 'white',
            fontFamily: "'Neue Haas Grotesk Display', sans-serif",
            fontSize: '14px'
          }}
        >
          Confirm Date & Time
        </button>
      </div>
      </div>

      {/* Custom Timezone Modal - Matches calendar dimensions exactly */}
      {showTimezoneModal && (
        <div className="fixed inset-0 z-[102] flex items-center justify-center">
          <div
            className="absolute inset-0"
            onClick={() => setShowTimezoneModal(false)}
          />
          <div
            className="fixed left-1/2 z-[102] p-4 rounded-[20px]"
            style={{
              top: '50%',
              transform: 'translate(-50%, -50%)',
              background: 'rgba(13, 30, 255, 0.95)',
              border: '1px solid #0D1EFF',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
              minWidth: '320px',
              maxWidth: '360px',
              height: '420px',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-white text-sm font-medium" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif"
              }}>
                Select Timezone
              </h3>
              <button
                onClick={() => setShowTimezoneModal(false)}
                className="text-white hover:opacity-70"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto timezone-scroll flex-1" style={{
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255, 255, 255, 0.3) transparent'
            }}>
              {/* Current timezone */}
              <button
                onClick={() => {
                  setSelectedTimezone(userTimezone)
                  setShowTimezoneModal(false)
                }}
                className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                  selectedTimezone === userTimezone ? 'bg-white/20' : 'hover:bg-white/10'
                }`}
                style={{
                  color: 'white',
                  fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                  fontSize: '13px'
                }}
              >
                ✓ {userTimezone.split('/').pop()?.replace(/_/g, ' ')} (Your timezone)
              </button>

              <div className="border-t border-white/20 my-2" />

              {/* Americas */}
              <div className="text-white text-xs opacity-60 mt-2 mb-1" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif"
              }}>Americas</div>
              {[
                { value: 'America/Los_Angeles', label: 'Los Angeles', gmt: 'GMT-8' },
                { value: 'America/Vancouver', label: 'Vancouver', gmt: 'GMT-8' },
                { value: 'America/Denver', label: 'Denver', gmt: 'GMT-7' },
                { value: 'America/Phoenix', label: 'Phoenix', gmt: 'GMT-7' },
                { value: 'America/Chicago', label: 'Chicago', gmt: 'GMT-6' },
                { value: 'America/Mexico_City', label: 'Mexico City', gmt: 'GMT-6' },
                { value: 'America/New_York', label: 'New York', gmt: 'GMT-5' },
                { value: 'America/Toronto', label: 'Toronto', gmt: 'GMT-5' },
                { value: 'America/Miami', label: 'Miami', gmt: 'GMT-5' },
                { value: 'America/Bogota', label: 'Bogotá', gmt: 'GMT-5' },
                { value: 'America/Caracas', label: 'Caracas', gmt: 'GMT-4' },
                { value: 'America/Santiago', label: 'Santiago', gmt: 'GMT-3' },
                { value: 'America/Sao_Paulo', label: 'São Paulo', gmt: 'GMT-3' },
                { value: 'America/Buenos_Aires', label: 'Buenos Aires', gmt: 'GMT-3' },
              ].map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    setSelectedTimezone(tz.value)
                    setShowTimezoneModal(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                    selectedTimezone === tz.value ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                  style={{
                    color: 'white',
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '13px'
                  }}
                >
                  <span>{tz.label}</span>
                  <span className="opacity-60 ml-2">{tz.gmt}</span>
                </button>
              ))}

              {/* Europe */}
              <div className="text-white text-xs opacity-60 mt-3 mb-1" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif"
              }}>Europe</div>
              {[
                { value: 'Europe/London', label: 'London', gmt: 'GMT+0' },
                { value: 'Europe/Dublin', label: 'Dublin', gmt: 'GMT+0' },
                { value: 'Europe/Lisbon', label: 'Lisbon', gmt: 'GMT+0' },
                { value: 'Europe/Paris', label: 'Paris', gmt: 'GMT+1' },
                { value: 'Europe/Madrid', label: 'Madrid', gmt: 'GMT+1' },
                { value: 'Europe/Barcelona', label: 'Barcelona', gmt: 'GMT+1' },
                { value: 'Europe/Rome', label: 'Rome', gmt: 'GMT+1' },
                { value: 'Europe/Milan', label: 'Milan', gmt: 'GMT+1' },
                { value: 'Europe/Berlin', label: 'Berlin', gmt: 'GMT+1' },
                { value: 'Europe/Amsterdam', label: 'Amsterdam', gmt: 'GMT+1' },
                { value: 'Europe/Brussels', label: 'Brussels', gmt: 'GMT+1' },
                { value: 'Europe/Vienna', label: 'Vienna', gmt: 'GMT+1' },
                { value: 'Europe/Zurich', label: 'Zurich', gmt: 'GMT+1' },
                { value: 'Europe/Stockholm', label: 'Stockholm', gmt: 'GMT+1' },
                { value: 'Europe/Copenhagen', label: 'Copenhagen', gmt: 'GMT+1' },
                { value: 'Europe/Prague', label: 'Prague', gmt: 'GMT+1' },
                { value: 'Europe/Warsaw', label: 'Warsaw', gmt: 'GMT+1' },
                { value: 'Europe/Athens', label: 'Athens', gmt: 'GMT+2' },
                { value: 'Europe/Helsinki', label: 'Helsinki', gmt: 'GMT+2' },
                { value: 'Europe/Bucharest', label: 'Bucharest', gmt: 'GMT+2' },
                { value: 'Europe/Istanbul', label: 'Istanbul', gmt: 'GMT+3' },
                { value: 'Europe/Moscow', label: 'Moscow', gmt: 'GMT+3' },
              ].map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    setSelectedTimezone(tz.value)
                    setShowTimezoneModal(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                    selectedTimezone === tz.value ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                  style={{
                    color: 'white',
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '13px'
                  }}
                >
                  <span>{tz.label}</span>
                  <span className="opacity-60 ml-2">{tz.gmt}</span>
                </button>
              ))}

              {/* Asia Pacific */}
              <div className="text-white text-xs opacity-60 mt-3 mb-1" style={{
                fontFamily: "'Neue Haas Grotesk Display', sans-serif"
              }}>Asia Pacific</div>
              {[
                { value: 'Asia/Dubai', label: 'Dubai', gmt: 'GMT+4' },
                { value: 'Asia/Kolkata', label: 'Delhi', gmt: 'GMT+5:30' },
                { value: 'Asia/Mumbai', label: 'Mumbai', gmt: 'GMT+5:30' },
                { value: 'Asia/Bangkok', label: 'Bangkok', gmt: 'GMT+7' },
                { value: 'Asia/Jakarta', label: 'Jakarta', gmt: 'GMT+7' },
                { value: 'Asia/Singapore', label: 'Singapore', gmt: 'GMT+8' },
                { value: 'Asia/Hong_Kong', label: 'Hong Kong', gmt: 'GMT+8' },
                { value: 'Asia/Shanghai', label: 'Shanghai', gmt: 'GMT+8' },
                { value: 'Asia/Beijing', label: 'Beijing', gmt: 'GMT+8' },
                { value: 'Asia/Taipei', label: 'Taipei', gmt: 'GMT+8' },
                { value: 'Asia/Seoul', label: 'Seoul', gmt: 'GMT+9' },
                { value: 'Asia/Tokyo', label: 'Tokyo', gmt: 'GMT+9' },
                { value: 'Australia/Sydney', label: 'Sydney', gmt: 'GMT+10' },
                { value: 'Australia/Melbourne', label: 'Melbourne', gmt: 'GMT+10' },
                { value: 'Pacific/Auckland', label: 'Auckland', gmt: 'GMT+12' }
              ].map((tz) => (
                <button
                  key={tz.value}
                  onClick={() => {
                    setSelectedTimezone(tz.value)
                    setShowTimezoneModal(false)
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                    selectedTimezone === tz.value ? 'bg-white/20' : 'hover:bg-white/10'
                  }`}
                  style={{
                    color: 'white',
                    fontFamily: "'Neue Haas Grotesk Display', sans-serif",
                    fontSize: '13px'
                  }}
                >
                  <span>{tz.label}</span>
                  <span className="opacity-60 ml-2">{tz.gmt}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Calendar