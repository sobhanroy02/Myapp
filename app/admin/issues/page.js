"use client"
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

export const dynamic = 'force-dynamic'

export default function AdminIssuesPage() {
  const router = useRouter()
  const [userType, setUserType] = useState('user')

  // Gate: Only admins can access
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

  // Demo data
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [deptFilter, setDeptFilter] = useState('all')
  const [sortBy, setSortBy] = useState('date')

  const issues = [
    { id: 'ISS-1247', title: 'Potholes on MG Road', reporter: 'Aarav Sharma', department: 'Roads', status: 'Open', priority: 'High', createdAt: '2025-09-02' },
    { id: 'ISS-1246', title: 'Broken streetlight near park', reporter: 'Neha Verma', department: 'Electrical', status: 'In Progress', priority: 'Medium', createdAt: '2025-09-03' },
    { id: 'ISS-1245', title: 'Overflowing garbage bins', reporter: 'Ravi Kumar', department: 'Sanitation', status: 'Resolved', priority: 'High', createdAt: '2025-09-01' },
    { id: 'ISS-1244', title: 'Water leakage in Sector 12', reporter: 'Priya Singh', department: 'Water', status: 'Open', priority: 'Critical', createdAt: '2025-09-05' },
    { id: 'ISS-1243', title: 'Illegal parking on main road', reporter: 'Vikram Rao', department: 'Traffic', status: 'In Progress', priority: 'Low', createdAt: '2025-09-04' },
    { id: 'ISS-1242', title: 'Open manhole outside school', reporter: 'Simran Kaur', department: 'Sanitation', status: 'Resolved', priority: 'Critical', createdAt: '2025-08-31' },
  ]

  const filtered = useMemo(() => {
    let rows = issues
    if (query.trim()) {
      const q = query.toLowerCase()
      rows = rows.filter(r =>
        r.title.toLowerCase().includes(q) ||
        r.reporter.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    }
    if (statusFilter !== 'all') rows = rows.filter(r => r.status.toLowerCase() === statusFilter)
    if (deptFilter !== 'all') rows = rows.filter(r => r.department.toLowerCase() === deptFilter)

    rows = [...rows].sort((a,b) => {
      if (sortBy === 'date') return new Date(b.createdAt) - new Date(a.createdAt)
      if (sortBy === 'priority') {
        const order = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 }
        return (order[b.priority]||0) - (order[a.priority]||0)
      }
      return a.id < b.id ? 1 : -1
    })
    return rows
  }, [issues, query, statusFilter, deptFilter, sortBy])

  const statCounts = useMemo(() => {
    return {
      open: issues.filter(i => i.status === 'Open').length,
      inProgress: issues.filter(i => i.status === 'In Progress').length,
      resolved: issues.filter(i => i.status === 'Resolved').length,
    }
  }, [issues])

  const deptBreakdown = useMemo(() => {
    const map = new Map()
    issues.forEach(i => {
      map.set(i.department, (map.get(i.department)||0)+1)
    })
    return Array.from(map.entries()).map(([name,count]) => ({ name, count }))
  }, [issues])

  if (userType !== 'admin') return null

  return (
    <main className="min-h-screen w-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-black">Issue Management</h1>
          <p className="text-gray-600 mt-1">Track, prioritize, and resolve civic issues efficiently</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Filters & Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
            <div className="flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by issue, reporter, department or ID..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex items-center gap-2">
              <select value={statusFilter} onChange={(e)=>setStatusFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in progress">In Progress</option>
                <option value="resolved">Resolved</option>
              </select>
              <select value={deptFilter} onChange={(e)=>setDeptFilter(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
                <option value="all">All Departments</option>
                {Array.from(new Set(issues.map(i => i.department))).map(d => (
                  <option key={d} value={d.toLowerCase()}>{d}</option>
                ))}
              </select>
              <select value={sortBy} onChange={(e)=>setSortBy(e.target.value)} className="rounded-lg border border-gray-300 px-3 py-2">
                <option value="date">Sort by Date</option>
                <option value="priority">Sort by Priority</option>
                <option value="id">Sort by ID</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Issue</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Reporter</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Department</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Status</th>
                  <th className="px-4 py-3 text-left font-semibold whitespace-nowrap">Priority</th>
                  <th className="px-4 py-3 text-right font-semibold whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((row) => (
                  <tr key={row.id} className="hover:bg-gray-50">
                    <td className="px-4 py-4 align-top">
                      <div className="font-medium text-gray-900">{row.title}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{row.id} · {new Date(row.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <div className="text-gray-900">{row.reporter}</div>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">{row.department}</span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                        row.status === 'Open' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                        row.status === 'In Progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        'bg-emerald-50 text-emerald-700 border-emerald-200'
                      }`}>{row.status}</span>
                    </td>
                    <td className="px-4 py-4 align-top">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${
                        row.priority === 'Critical' ? 'bg-red-50 text-red-700 border-red-200' :
                        row.priority === 'High' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                        row.priority === 'Medium' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-gray-50 text-gray-700 border-gray-200'
                      }`}>{row.priority}</span>
                    </td>
                    <td className="px-4 py-4 align-top text-right">
                      <div className="inline-flex gap-2">
                        <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-white border border-gray-200 hover:bg-gray-50">View</button>
                        <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700">Assign</button>
                        <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-emerald-600 text-white hover:bg-emerald-700">Resolve</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-gray-500">No issues found. Try adjusting filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Issues Created vs Resolved (simple bars by status) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Issues by Status</h3>
              <span className="text-sm text-gray-500">Total: {issues.length}</span>
            </div>
            <div className="space-y-4">
              {[{label:'Open', value: statCounts.open, color:'bg-amber-500'}, {label:'In Progress', value: statCounts.inProgress, color:'bg-blue-500'}, {label:'Resolved', value: statCounts.resolved, color:'bg-emerald-500'}].map(s => (
                <div key={s.label}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-gray-700">{s.label}</span>
                    <span className="text-gray-900 font-semibold">{s.value}</span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`${s.color} h-3 rounded-full`} style={{ width: `${Math.max(8, (s.value / issues.length) * 100)}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Issues by Department Pie (SVG) */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Issues by Department</h3>
              <span className="text-sm text-gray-500">{deptBreakdown.length} departments</span>
            </div>
            <div className="flex items-center gap-6">
              <div className="relative w-48 h-48">
                {/* Build pie via conic-gradient for simplicity */}
                <div
                  className="w-48 h-48 rounded-full"
                  style={{
                    background: `conic-gradient(${deptBreakdown.map((d, i) => {
                      const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4']
                      const total = deptBreakdown.reduce((a,b)=>a + b.count, 0)
                      const pct = Math.round((d.count/total)*360)
                      const start = deptBreakdown.slice(0, i).reduce((a,b)=>a + Math.round((b.count/total)*360), 0)
                      return `${colors[i % colors.length]} ${start}deg ${start + pct}deg`
                    }).join(', ')})`
                  }}
                />
              </div>
              <div className="flex-1 space-y-3">
                {deptBreakdown.map((d, i) => (
                  <div key={d.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'][i % 6] }} />
                      <span className="text-sm text-gray-700">{d.name}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-gray-900">{d.count}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
