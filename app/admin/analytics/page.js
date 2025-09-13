"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState('user')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw = localStorage.getItem('user')
      try {
        const parsed = raw ? JSON.parse(raw) : null
        setUserType(parsed?.userType || 'user')
        if (parsed?.userType !== 'admin') {
          router.replace('/home')
        }
      } catch {
        router.replace('/home')
      }
    }
  }, [router])

  if (userType !== 'admin') return null

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Analytics</h1>
          <p className="text-gray-600 mt-1">Deep dive into performance and trends</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPIs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Median Resolution (hrs)', value: '42', color: 'from-indigo-500 to-violet-500' },
            { label: 'Backlog (30d)', value: '58', color: 'from-rose-500 to-orange-500' },
            { label: 'Citizen Satisfaction', value: '4.3/5', color: 'from-emerald-500 to-teal-500' },
            { label: 'Repeat Reports', value: '7%', color: 'from-sky-500 to-cyan-500' },
          ].map((k) => (
            <div key={k.label} className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="text-sm text-gray-500">{k.label}</div>
              <div className="text-2xl font-bold text-gray-900 mt-1">{k.value}</div>
              <div className={`h-1.5 mt-3 bg-gray-100 rounded-full overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${k.color}`} style={{ width: '66%' }} />
              </div>
            </div>
          ))}
        </div>

        {/* Trend placeholders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Issues Trend (90 days)</h3>
              <span className="text-sm text-gray-500">Mock</span>
            </div>
            <div className="h-64 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
              Line/Area chart placeholder
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Resolution Time Distribution</h3>
              <span className="text-sm text-gray-500">Mock</span>
            </div>
            <div className="h-64 bg-gradient-to-b from-gray-50 to-white rounded-lg border border-dashed border-gray-200 flex items-center justify-center text-gray-400">
              Histogram/Box plot placeholder
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
