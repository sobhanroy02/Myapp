"use client"
import { ThemeProvider } from './theme'

export default function Providers({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>
}
