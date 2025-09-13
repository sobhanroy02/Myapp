"use client"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken')
      const userData = localStorage.getItem('user')
      
      if (authToken && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setIsLoggedIn(true)
        } catch (error) {
          console.error('Error parsing user data:', error)
        }
      }
    }
  }, [])

  return (
    <main className="w-full">
      <section className="overflow-hidden shadow-lg">
        <div className="relative">
          <img
            src="https://image2url.com/images/1757417250729-ad06b117-8a3c-47ff-99a5-4ae4dabfe894.jpg"
            alt="CitiZen banner"
            className="w-full h-[720px] md:h-[820px] object-cover"
          />

          {/* Enhanced dark overlay for better text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30" />

          {/* Redesigned text overlay with better hierarchy */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl px-6 md:px-12">
              {/* Personal greeting if logged in */}
              {isLoggedIn && user && (
                <div className="mb-6 flex justify-center">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white drop-shadow-2xl tracking-wide">
                    Hi! <span className="bg-gradient-to-r from-sky-300 to-teal-300 bg-clip-text text-transparent">{user.fullName ? user.fullName.split(' ')[0] : 'User'}</span> 👋
                  </h1>
                </div>
              )}

              {/* Main headline with enhanced styling and icon */}
              <div className="mb-6">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <img 
                    src="/icons/icon-192x192.png" 
                    alt="CitiZen icon" 
                    className="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl"
                    onError={(e) => { e.currentTarget.src = 'https://image2url.com/images/1757429176094-8f302b24-6aa3-47eb-834a-a9ccac56385c.png'; }}
                  />
                  <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight drop-shadow-2xl">
                    CitiZen
                  </h1>
                </div>
              </div>

              {/* Tagline */}
              <h2 className="text-xl md:text-3xl font-bold text-white/95 mb-6 drop-shadow-lg">
                Your Voice. Your City. Your Impact.
              </h2>

              {/* Description with better readability */}
              <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8 drop-shadow">
                Report civic issues instantly, track real-time progress, and collaborate with your community 
                to create positive change in your neighborhood.
              </p>

              {/* Call-to-action buttons with enhanced design */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                <a
                  href="/report"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-sky-700 text-lg font-semibold rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                  aria-label="Report an issue"
                >
                  🚨 Report an Issue
                </a>

                <a
                  href="/issues"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 hover:scale-105 transition-all duration-300"
                  aria-label="View reported issues"
                >
                  👀 View Issues
                </a>
              </div>

              {/* Bottom text with subtle styling */}
              <p className="text-base md:text-lg text-white/75 font-medium">
                ✨ Fast reporting tools • 📊 Transparent tracking • 🤝 Community insights
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modern Feature Cards Section */}
      <section className="w-full px-4 py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Empower Your Community
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join thousands of citizens making a real difference in their neighborhoods through technology
            </p>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Fast Reporting Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">⚡</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  Fast Reporting
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Upload photos, add location, and submit in seconds — we route it to the right department instantly.
                </p>
                <div className="text-sm text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Start reporting →
                </div>
              </div>
            </div>

            {/* Transparent Tracking Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-green-200">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">📊</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                  Transparent Tracking
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Track the status of your reports and receive real-time notifications when updates occur.
                </p>
                <div className="text-sm text-green-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  View progress →
                </div>
              </div>
            </div>

            {/* Community Insights Card */}
            <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-purple-200">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl text-white">🤝</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                  Community Insights
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Discover neighbourhood trends and collaborate with others to prioritize fixes that matter most.
                </p>
                <div className="text-sm text-purple-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Join community →
                </div>
              </div>
            </div>
          </div>

          {/* Call-to-Action Section */}
          <div className="text-center mt-16">
            <div className="inline-flex items-center gap-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="text-lg font-semibold">Get Started Today</span>
              <span className="text-xl">🚀</span>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}
