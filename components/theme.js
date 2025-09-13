"use client"
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light')

  // Initialize from localStorage or system preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem('theme')
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
      const initial = saved || (prefersDark ? 'dark' : 'light')
      setTheme(initial)
      const html = document.documentElement
      html.classList.toggle('dark', initial === 'dark')
      html.setAttribute('data-theme', initial)
    } catch {}
  }, [])

  // Persist and reflect changes
  useEffect(() => {
    try {
      localStorage.setItem('theme', theme)
      const html = document.documentElement
      html.classList.toggle('dark', theme === 'dark')
      html.setAttribute('data-theme', theme)
    } catch {}
  }, [theme])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
