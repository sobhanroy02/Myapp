import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
  <Link href="/home" className="text-xl font-bold text-sky-600">CitiZen</Link>
        <nav className="space-x-4">
          <Link href="/report" className="text-gray-700 dark:text-gray-200">Report</Link>
          <Link href="/issues" className="text-gray-700 dark:text-gray-200">Issues</Link>
          <Link href="/dashboard" className="text-gray-700 dark:text-gray-200">Dashboard</Link>
        </nav>
      </div>
    </header>
  )
}
