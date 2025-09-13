"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminWorkersPage() {
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

  const workers = [
    { name: 'Anil Kumar', dept: 'Roads', assigned: 4, completed: 23, active: true },
    { name: 'Priya Patel', dept: 'Sanitation', assigned: 2, completed: 31, active: true },
    { name: 'Rahul Gupta', dept: 'Electrical', assigned: 5, completed: 18, active: false },
    { name: 'Sneha Joshi', dept: 'Water', assigned: 3, completed: 27, active: true },
    { name: 'Mohit Jain', dept: 'Traffic', assigned: 1, completed: 15, active: true },
  ]

  const totals = useMemo(() => {
    return {
      active: workers.filter(w => w.active).length,
      assigned: workers.reduce((a,w) => a + w.assigned, 0),
      completed: workers.reduce((a,w) => a + w.completed, 0)
    }
  }, [workers])

  if (userType !== 'admin') return null

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Workers</h1>
          <p className="text-gray-600 mt-1">Manage field workers and their workload</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Active Workers</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.active}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Total Assigned</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.assigned}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Completed</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.completed}</div>
          </div>
        </div>

        {/* Roster */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Department</th>
                  <th className="px-4 py-3 text-center font-semibold">Assigned</th>
                  <th className="px-4 py-3 text-center font-semibold">Completed</th>
                  <th className="px-4 py-3 text-center font-semibold">Status</th>
                  <th className="px-4 py-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {workers.map((w) => (
                  <tr key={w.name} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-gray-900 font-medium">{w.name}</td>
                    <td className="px-4 py-4">{w.dept}</td>
                    <td className="px-4 py-4 text-center">{w.assigned}</td>
                    <td className="px-4 py-4 text-center">{w.completed}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${w.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>{w.active ? 'Active' : 'Offline'}</span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50">Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
