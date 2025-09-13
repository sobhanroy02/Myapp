export default function Footer() {
  return (
    <footer className="bg-white dark:bg-slate-900 border-t mt-8">
      <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600 dark:text-gray-400">
  © {new Date().getFullYear()} CitiZen. Every Report Counts. Every Voice Matters.
      </div>
    </footer>
  )
}
