"use client"
import { useEffect, useState } from 'react'

export default function Providers({ children }) {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const saved = typeof window !== 'undefined' && localStorage.getItem('theme')
    if (saved) setTheme(saved)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
  )
}

import React from 'react'
export const ThemeContext = React.createContext({ theme: 'light', setTheme: () => {} })
