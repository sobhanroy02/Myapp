export default function Card({ children, className = '' }) {
  return <div className={`p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${className}`}>{children}</div>
}
