"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminNotificationsPage() {
  const router = useRouter()
  const [userType, setUserType] = useState('user')
  const [filter, setFilter] = useState('all')

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

  const notifications = [
    { id: 1, type: 'Issue', title: 'New report: Water leakage in Sector 12', time: 'Just now' },
    { id: 2, type: 'System', title: 'Weekly summary is ready', time: '1h ago' },
    { id: 3, type: 'Assignment', title: 'ISS-1247 assigned to Rahul Gupta', time: '3h ago' },
    { id: 4, type: 'Issue', title: 'Streetlight fixed near park', time: '6h ago' },
  ]

  const filtered = notifications.filter(n => filter === 'all' || n.type.toLowerCase() === filter)

  if (userType !== 'admin') return null

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Notifications</h1>
          <p className="text-gray-600 mt-1">Keep track of important updates</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center gap-3">
          <label className="text-sm text-gray-600">Filter:</label>
          <select value={filter} onChange={(e)=>setFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
            <option value="all">All</option>
            <option value="issue">Issue</option>
            <option value="assignment">Assignment</option>
            <option value="system">System</option>
          </select>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y">
          {filtered.map(n => (
            <div key={n.id} className="p-4 flex items-start gap-3 hover:bg-gray-50">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                n.type === 'Issue' ? 'bg-blue-500' : n.type === 'Assignment' ? 'bg-emerald-500' : 'bg-indigo-500'
              }`}>
                {n.type[0]}
              </div>
              <div className="flex-1">
                <div className="text-gray-900 font-medium">{n.title}</div>
                <div className="text-xs text-gray-500 mt-0.5">{n.type} • {n.time}</div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700">View</button>
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="p-8 text-center text-gray-500">No notifications</div>
          )}
        </div>
      </div>
    </main>
  )
}
