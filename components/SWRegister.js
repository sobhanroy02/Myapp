"use client"
import { useEffect } from 'react'

export default function SWRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      // register on real production or Vercel preview domains so deployed PWA can activate
      const isProduction = process.env.NODE_ENV === 'production'
      const isVercelPreview = typeof location !== 'undefined' && /vercel\.app$/.test(location.host)
      if (isProduction || isVercelPreview) {
        navigator.serviceWorker.register('/sw.js').catch(() => {})
      }
    }
  }, [])
  return null
}
