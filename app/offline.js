export default function Offline() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <div className="max-w-md text-center p-6 bg-white dark:bg-slate-800 rounded-lg shadow">
        <h2 className="text-xl font-semibold">SmartCivic works offline</h2>
        <p className="mt-3 text-gray-600 dark:text-gray-300">Issues are queued and auto-uploaded when you regain connection.</p>
      </div>
    </div>
  )
}
