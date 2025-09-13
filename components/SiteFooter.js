"use client"
import { usePathname } from 'next/navigation'

export default function SiteFooter() {
  const pathname = usePathname()
  // Hide footer on welcome/onboarding screens and auth/login pages
  if (pathname === '/' || pathname === '/welcome' || pathname === '/auth' || pathname === '/login') return null

  return (
    <footer className="mt-12 bg-gradient-to-r from-gray-900 via-primary-800 to-gray-900 text-white">
      <div className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="font-bold text-lg mb-2">CitiZen</h3>
          <p className="text-sm text-gray-300">Bridging Citizens and Governments for Smarter Living</p>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Explore</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/report" className="hover:text-accent-200">Report Issue</a></li>
            <li><a href="/issues" className="hover:text-accent-200">Track Issues</a></li>
            <li><a href="/dashboard" className="hover:text-accent-200">Dashboard</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-2">Support</h4>
          <ul className="space-y-2 text-sm text-gray-300">
            <li><a href="/faq" className="hover:text-accent-200">FAQ</a></li>
            <li><a href="/about" className="hover:text-accent-200">About</a></li>
          </ul>
        </div>
      </div>
  <div className="border-t border-gray-800 text-center py-4 text-sm text-gray-400">© {new Date().getFullYear()} CitiZen</div>
    </footer>
  )
}
