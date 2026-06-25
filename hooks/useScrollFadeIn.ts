'use client'

import { useEffect } from 'react'

export function useScrollFadeIn() {
  useEffect(() => {
    const observerOptions = {
      threshold: 0.05,
      rootMargin: '0px 0px -30px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('visible')) {
          const delay = parseInt(entry.target.getAttribute('data-delay') || '0', 10)
          setTimeout(() => {
            entry.target.classList.add('visible')
          }, delay)
        }
      })
    }, observerOptions)

    // Observe all elements with fade-in class
    const fadeElements = document.querySelectorAll('.fade-in-scroll')
    fadeElements.forEach(el => observer.observe(el))

    return () => {
      observer.disconnect()
    }
  }, [])
}