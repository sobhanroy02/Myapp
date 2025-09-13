import AuthCard from '../../components/AuthCard'

export default function AuthPage() {
  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Mobile-first responsive layout */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          
          {/* Auth Card - Full width on mobile, half on desktop */}
          <div className="w-full lg:flex-1 flex items-center justify-center">
            <AuthCard />
          </div>

          {/* Side content - Hidden on mobile, visible on desktop */}
          <aside className="hidden lg:block lg:flex-1 max-w-lg">
            <h2 className="text-2xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-400">Join CitiZen</h2>
            <p className="mt-4 text-gray-600 leading-relaxed text-sm lg:text-base">Report civic issues, track progress, and help improve your community. Together we can make cities cleaner, safer, and more responsive.</p>
            
            <div className="mt-8 space-y-6">
              <div className="relative">
                <img src="/images/city-modern.svg" alt="Modern city with buildings and blue sky" className="rounded-xl shadow-lg w-full h-32 lg:h-40 object-cover border border-gray-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
              </div>
              <div className="relative">
                <img src="/images/city-skyline.svg" alt="City skyline at sunset" className="rounded-xl shadow-lg w-full h-32 lg:h-40 object-cover border border-gray-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-xl"></div>
              </div>
            </div>
            
            <div className="mt-6 grid grid-cols-3 gap-3 lg:gap-4 text-center">
              <div className="p-2 lg:p-3 bg-sky-50 rounded-lg">
                <div className="text-lg lg:text-2xl font-bold text-sky-600">24/7</div>
                <div className="text-xs text-gray-600">Reporting</div>
              </div>
              <div className="p-2 lg:p-3 bg-teal-50 rounded-lg">
                <div className="text-lg lg:text-2xl font-bold text-teal-600">Fast</div>
                <div className="text-xs text-gray-600">Response</div>
              </div>
              <div className="p-2 lg:p-3 bg-purple-50 rounded-lg">
                <div className="text-lg lg:text-2xl font-bold text-purple-600">Better</div>
                <div className="text-xs text-gray-600">Cities</div>
              </div>
            </div>
          </aside>
        </div>

        {/* Mobile footer with key features */}
        <div className="lg:hidden mt-8 text-center">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Why Choose CitiZen?</h3>
          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
            <div className="p-3 bg-sky-50 rounded-lg">
              <div className="text-lg font-bold text-sky-600">24/7</div>
              <div className="text-xs text-gray-600">Reporting</div>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg">
              <div className="text-lg font-bold text-teal-600">Fast</div>
              <div className="text-xs text-gray-600">Response</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <div className="text-lg font-bold text-purple-600">Better</div>
              <div className="text-xs text-gray-600">Cities</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
