"use client"
import Link from 'next/link'
import { useTheme } from './theme'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function SiteHeader() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const [userType, setUserType] = useState('user')

  const close = () => setOpen(false)
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userData = localStorage.getItem('user')
      if (userData) {
        try {
          const parsed = JSON.parse(userData)
          if (parsed.userType) {
            console.log('User type detected:', parsed.userType)
            setUserType(parsed.userType)
          }
        } catch {}
      }
    }
  }, [])
  
  const handleLogout = () => {
    // Clear any stored auth data (localStorage, cookies, etc.)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('authToken')
      localStorage.removeItem('user')
      // You can add more cleanup here as needed
    }
    
    // Show confirmation
    alert('Logged out successfully!')
    
    // Redirect to auth page
    window.location.href = '/auth'
  }

  const pathname = usePathname()
  // Hide header on welcome/onboarding screens and auth/login pages
  if (pathname === '/' || pathname === '/welcome' || pathname === '/auth' || pathname === '/login') return null

  // Admin Navigation Items
  const adminNavItems = [
    { href: '/home', label: 'Overview', icon: '📊' },
    { href: '/admin/issues', label: 'Issue Management', icon: '📝' },
    { href: '/admin/departments', label: 'Departments', icon: '🏢' },
    { href: '/admin/workers', label: 'Workers', icon: '👥' },
    { href: '/admin/analytics', label: 'Analytics', icon: '📈' },
    { href: '/admin/notifications', label: 'Notifications', icon: '🔔' }
  ]

  // User Navigation Items (ordered: Home, Report, Issues, Profile, Help)
  const userNavItems = [
    { href: '/home', label: 'Home', icon: '🏠' },
    { href: '/report', label: 'Report', icon: '�' },
    { href: '/issues', label: 'Issues', icon: '📋' },
    { href: '/profile', label: 'Profile', icon: '👤' },
    { href: '/faq', label: 'Help', icon: '❓' }
  ]

  const navItems = userType === 'admin' ? adminNavItems : userNavItems
  console.log('Current userType:', userType, 'Nav items:', navItems.map(item => item.label))

  return (
    <header className={`${userType === 'admin' ? 'bg-gradient-to-r from-slate-800 via-gray-800 to-slate-900' : 'bg-gradient-to-r from-primary-600 via-primary-500 to-accent-500'} shadow-soft-lg relative`}>
      <div className={`container mx-auto px-4 py-4 flex items-center ${userType === 'admin' ? 'justify-start' : 'justify-between'}`}>
        <Link href="/home" className={`flex items-center gap-0 text-white ${userType === 'admin' ? 'mr-8' : 'mr-8'}`} onClick={close}>
          <img src="/icons/icon-192x192.png" alt="CitiZen logo" className="h-12 w-12 rounded -mr-1" />
          <div className="flex flex-col">
            <span className="font-bold text-xl">CitiZen</span>
            <span className="text-xs text-white/80 -mt-1">
              {userType === 'admin' ? 'Admin Dashboard' : 'Your Voice, Your City, Your Impact'}
            </span>
          </div>
        </Link>

  <nav className={`hidden md:flex items-center ${userType === 'admin' ? 'gap-6 flex-1 justify-center' : 'gap-10 lg:gap-12 flex-1 justify-center'}`}>
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              href={item.href} 
      className="text-white hover:text-warning-200 flex items-center gap-2 transition-colors"
            >
              <span className="text-sm">{item.icon}</span>
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className={`hidden md:flex items-center gap-3 ${userType === 'admin' ? '' : 'ml-auto'}`}>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 bg-white/20 text-white rounded-full"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={handleLogout}
            className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
            aria-label="Logout"
            title="Logout"
          >
            {/* Logout icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>

        <div className={`md:hidden flex items-center gap-3 ${userType === 'admin' ? 'ml-auto' : ''}`}>
          <button
            onClick={() => setOpen((v) => !v)}
            className="p-2 bg-white/20 text-white rounded-md"
            aria-label="Open menu"
            aria-expanded={open}
          >
            {/* Hamburger icon */}
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>

          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 bg-white/20 text-white rounded-md" aria-label="Toggle theme">{theme === 'dark' ? '☀️' : '🌙'}</button>
          
          <button
            onClick={handleLogout}
            className="p-2 bg-white/20 text-white rounded-md hover:bg-white/30 transition-colors"
            aria-label="Logout"
            title="Logout"
          >
            {/* Logout icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16,17 21,12 16,7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-slate-900 shadow-md absolute left-0 right-0 top-full z-50">
          <div className="flex flex-col p-4 gap-3">
            {navItems.map((item, index) => (
              <Link 
                key={index} 
                href={item.href} 
                className="text-gray-800 dark:text-gray-100 flex items-center gap-2" 
                onClick={close}
              >
                <span className="text-sm">{item.icon}</span>
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => { close(); handleLogout(); }}
              className="flex items-center gap-2 text-gray-800 dark:text-gray-100 hover:text-red-600 dark:hover:text-red-400 text-left"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
