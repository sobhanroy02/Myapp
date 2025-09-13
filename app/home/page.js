"use client"
import { useEffect, useState } from 'react'

export const dynamic = 'force-dynamic'

export default function HomeAppPage(){
  const [firstName, setFirstName] = useState('Citizen')
  const [userType, setUserType] = useState('user')
  const [adminId, setAdminId] = useState('')
  
  useEffect(()=>{
    const raw = typeof window !== 'undefined' && localStorage.getItem('user')
    if (raw) { 
      try { 
        const parsed = JSON.parse(raw)
        if (parsed.fullName) setFirstName(parsed.fullName.split(' ')[0])
        if (parsed.userType) setUserType(parsed.userType)
        if (parsed.adminId) setAdminId(parsed.adminId)
      } catch {} 
    }
  },[])

  // Admin Dashboard Component
  const AdminDashboard = () => (
    <main className="min-h-screen w-full bg-gray-50">
      {/* Admin Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-black">Dashboard Overview</h1>
          <p className="text-gray-600 mt-2">Welcome back, Admin {firstName} | ID: {adminId}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Issues Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Issues</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,247</p>
                <p className="text-sm text-green-600 mt-1">↗ +12% from last month</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Resolved Issues Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Resolved Issues</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">1,084</p>
                <p className="text-sm text-green-600 mt-1">87% resolution rate</p>
              </div>
              <div className="bg-green-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Avg Resolution Time Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Resolution Time</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">3.2</p>
                <p className="text-sm text-green-600 mt-1">Days (↓ 0.8 days)</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Citizens Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Citizens</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2,856</p>
                <p className="text-sm text-green-600 mt-1">↗ +156 this month</p>
              </div>
              <div className="bg-purple-50 p-3 rounded-full">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Issues Created vs Resolved Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Issues Created vs Resolved</h3>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 3 months</option>
              </select>
            </div>
            
            {/* Simple Bar Chart Visualization */}
            <div className="space-y-4">
              {[
                { day: 'Mon', created: 45, resolved: 38 },
                { day: 'Tue', created: 52, resolved: 41 },
                { day: 'Wed', created: 38, resolved: 45 },
                { day: 'Thu', created: 61, resolved: 52 },
                { day: 'Fri', created: 48, resolved: 55 },
                { day: 'Sat', created: 35, resolved: 33 },
                { day: 'Sun', created: 28, resolved: 31 }
              ].map((data, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-12 text-sm font-medium text-gray-600">{data.day}</div>
                  <div className="flex-1 flex gap-2">
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className="bg-blue-500 h-4 rounded-sm" 
                        style={{ width: `${(data.created / 70) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 w-8">{data.created}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <div 
                        className="bg-green-500 h-4 rounded-sm" 
                        style={{ width: `${(data.resolved / 70) * 100}%` }}
                      ></div>
                      <span className="text-xs text-gray-500 w-8">{data.resolved}</span>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Legend */}
              <div className="flex items-center gap-6 mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-sm text-gray-600">Issues Created</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-sm text-gray-600">Issues Resolved</span>
                </div>
              </div>
            </div>
          </div>

          {/* Issues by Department Pie Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Issues by Department</h3>
              <div className="text-sm text-gray-500">Total: 1,247 issues</div>
            </div>
            
            {/* Pie Chart Visualization */}
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                {/* SVG Pie Chart */}
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Road Infrastructure - 35% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth="20"
                    strokeDasharray="87.96 251.32"
                    strokeDashoffset="0"
                  />
                  {/* Water & Sanitation - 25% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="20"
                    strokeDasharray="62.83 251.32"
                    strokeDashoffset="-87.96"
                  />
                  {/* Public Safety - 20% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="20"
                    strokeDasharray="50.26 251.32"
                    strokeDashoffset="-150.79"
                  />
                  {/* Waste Management - 15% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#EF4444"
                    strokeWidth="20"
                    strokeDasharray="37.70 251.32"
                    strokeDashoffset="-201.05"
                  />
                  {/* Others - 5% */}
                  <circle
                    cx="50" cy="50" r="40"
                    fill="none"
                    stroke="#8B5CF6"
                    strokeWidth="20"
                    strokeDasharray="12.57 251.32"
                    strokeDashoffset="-238.75"
                  />
                </svg>
              </div>
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {[
                { name: 'Road Infrastructure', count: 437, percentage: 35, color: 'bg-blue-500' },
                { name: 'Water & Sanitation', count: 312, percentage: 25, color: 'bg-green-500' },
                { name: 'Public Safety', count: 249, percentage: 20, color: 'bg-yellow-500' },
                { name: 'Waste Management', count: 187, percentage: 15, color: 'bg-red-500' },
                { name: 'Others', count: 62, percentage: 5, color: 'bg-purple-500' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                    <span className="text-sm text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{item.count}</div>
                    <div className="text-xs text-gray-500">{item.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )

  // Regular User Dashboard (existing content)
  const UserDashboard = () => (
    <main className="min-h-screen w-full bg-gradient-to-b from-white via-emerald-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-32 -left-20 w-[520px] h-[520px] bg-gradient-to-br from-teal-200 via-sky-100 to-transparent rounded-full blur-3xl opacity-60" />
          <div className="absolute top-40 -right-32 w-[560px] h-[560px] bg-gradient-to-br from-sky-200 via-emerald-100 to-transparent rounded-full blur-3xl opacity-50" />
        </div>
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Hi {firstName},
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-sky-500 via-cyan-500 to-teal-600">Let's improve your city today.</span>
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-xl leading-relaxed">
              Report issues, track resolutions and collaborate—everything you need to make local impact is here.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/report" className="group relative inline-flex items-center justify-center px-8 py-4 rounded-2xl font-semibold text-white overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300 shadow-lg shadow-teal-600/30 active:scale-[0.97] transition">
                <span className="absolute inset-0 bg-gradient-to-r from-teal-500 via-cyan-500 to-sky-600" />
                <span className="relative flex items-center gap-2">Report an Issue <span className="opacity-80 group-hover:translate-x-1 transition">→</span></span>
              </a>
              <a href="/issues" className="px-8 py-4 rounded-2xl font-semibold bg-white border border-teal-500/30 text-teal-700 shadow-sm hover:shadow-md hover:bg-teal-50 transition">Browse Issues</a>
              <a href="/profile" className="px-8 py-4 rounded-2xl font-semibold bg-white border border-sky-500/30 text-sky-700 shadow-sm hover:shadow-md hover:bg-sky-50 transition">Your Profile</a>
            </div>
            <div className="mt-6 flex items-center gap-4 text-sm text-teal-700/70">
              <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-500 animate-ping" /> Live Platform</span>
              <span>Transparent • Fast • Community-driven</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label:'Active Issues', value:'1,247', color:'from-teal-500 to-sky-500' },
            { label:'Resolved', value:'87%', color:'from-emerald-500 to-teal-500' },
            { label:'Avg Resolve Time', value:'3d', color:'from-cyan-500 to-sky-500' },
            { label:'Communities', value:'56', color:'from-sky-500 to-indigo-500' },
          ].map(card => (
            <div key={card.label} className="relative overflow-hidden rounded-2xl border border-teal-500/15 bg-white/70 backdrop-blur-xl p-6 shadow-sm hover:shadow-md transition">
              <div className={`absolute -top-8 -right-8 w-28 h-28 rounded-full bg-gradient-to-br ${card.color} opacity-20 blur-2xl`} />
              <div className="relative">
                <p className="text-xs uppercase tracking-wide text-teal-600/70 font-semibold">{card.label}</p>
                <p className="mt-3 text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-600">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it works</h2>
            <p className="mt-4 text-gray-600">Three simple steps to make your surroundings better.</p>
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              { step:'1', title:'Capture & Report', copy:'Snap a photo, mark location, add a short description.' },
              { step:'2', title:'Track & Engage', copy:'Follow progress, add updates and upvote priorities.' },
              { step:'3', title:'See Impact', copy:'Get notified when it is fixed - transparent and fast.' }
            ].map(item => (
              <div key={item.step} className="relative p-8 rounded-2xl border border-teal-500/15 bg-white/70 backdrop-blur-xl shadow-sm hover:shadow-md transition flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-sky-500 text-white font-bold shadow ring-1 ring-white/40">{item.step}</span>
                  <h3 className="text-lg font-semibold tracking-tight">{item.title}</h3>
                </div>
                <p className="text-sm text-gray-600 leading-relaxed flex-1">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="relative overflow-hidden rounded-3xl p-12 md:p-20 bg-gradient-to-r from-teal-600 via-cyan-500 to-sky-600 text-white shadow-[0_8px_40px_-8px_rgba(16,185,129,0.35)]">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.45),transparent_60%)]" />
            <h2 className="relative text-3xl md:text-4xl font-extrabold tracking-tight">Ready to make a difference?</h2>
            <p className="relative mt-4 text-base md:text-lg max-w-2xl mx-auto text-white/90">Start reporting issues now and help your community move forward with transparency and speed.</p>
            <div className="relative mt-8 flex flex-wrap gap-4 justify-center">
              <a href="/report" className="px-8 py-4 rounded-2xl font-semibold bg-white text-teal-700 shadow-lg hover:shadow-xl hover:scale-105 transition">Report Now</a>
              <a href="/issues" className="px-8 py-4 rounded-2xl font-semibold bg-white/10 border border-white/40 text-white backdrop-blur-xl hover:bg-white/20 hover:scale-105 transition">Explore Issues</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )

  // Conditional rendering based on user type
  return userType === 'admin' ? <AdminDashboard /> : <UserDashboard />
}
