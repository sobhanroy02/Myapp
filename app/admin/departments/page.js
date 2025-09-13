"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminDepartmentsPage() {
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

  const departments = [
    { name: 'Roads', manager: 'R. Iyer', open: 12, inProgress: 8, resolved: 34, sla: 86, avgTime: '2.4d' },
    { name: 'Sanitation', manager: 'S. Khan', open: 6, inProgress: 4, resolved: 28, sla: 91, avgTime: '1.9d' },
    { name: 'Water', manager: 'P. Nair', open: 9, inProgress: 6, resolved: 21, sla: 78, avgTime: '3.1d' },
    { name: 'Electrical', manager: 'A. Das', open: 5, inProgress: 7, resolved: 40, sla: 94, avgTime: '1.6d' },
    { name: 'Traffic', manager: 'V. Rao', open: 3, inProgress: 2, resolved: 18, sla: 88, avgTime: '2.1d' },
  ]

  const totals = useMemo(() => {
    return departments.reduce((acc, d) => {
      acc.open += d.open
      acc.inProgress += d.inProgress
      acc.resolved += d.resolved
      return acc
    }, { open: 0, inProgress: 0, resolved: 0 })
  }, [departments])

  if (userType !== 'admin') return null

  return (
    <main className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Departments</h1>
          <p className="text-gray-600 mt-1">Monitor department performance and workloads</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Open</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.open}</div>
            <div className="h-1.5 mt-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1.5 bg-amber-500" style={{ width: `${Math.min(100, (totals.open/ (totals.open+totals.inProgress+totals.resolved)) * 100)}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">In Progress</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.inProgress}</div>
            <div className="h-1.5 mt-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1.5 bg-blue-500" style={{ width: `${Math.min(100, (totals.inProgress/ (totals.open+totals.inProgress+totals.resolved)) * 100)}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">Resolved</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{totals.resolved}</div>
            <div className="h-1.5 mt-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1.5 bg-emerald-500" style={{ width: `${Math.min(100, (totals.resolved/ (totals.open+totals.inProgress+totals.resolved)) * 100)}%` }} />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="text-sm text-gray-500">SLA Compliance</div>
            <div className="text-2xl font-bold text-gray-900 mt-1">{Math.round(departments.reduce((a,d)=>a+d.sla,0)/departments.length)}%</div>
            <div className="h-1.5 mt-3 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-1.5 bg-indigo-500" style={{ width: `${Math.round(departments.reduce((a,d)=>a+d.sla,0)/departments.length)}%` }} />
            </div>
          </div>
        </div>

        {/* Departments table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Department</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Manager</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">Open</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">In Progress</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">Resolved</th>
                  <th className="px-4 py-3 text-center font-semibold whitespace-nowrap">SLA</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Avg Resolve Time</th>
                  <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {departments.map((d) => (
                  <tr key={d.name} className="hover:bg-gray-50">
                    <td className="px-4 py-4 text-gray-900 font-medium">{d.name}</td>
                    <td className="px-4 py-4">{d.manager}</td>
                    <td className="px-4 py-4 text-center">{d.open}</td>
                    <td className="px-4 py-4 text-center">{d.inProgress}</td>
                    <td className="px-4 py-4 text-center">{d.resolved}</td>
                    <td className="px-4 py-4 text-center">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${d.sla >= 90 ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : d.sla >= 80 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-red-50 text-red-700 border-red-200'}`}>{d.sla}%</span>
                    </td>
                    <td className="px-4 py-4">{d.avgTime}</td>
                    <td className="px-4 py-4 text-right">
                      <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50">View</button>
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
