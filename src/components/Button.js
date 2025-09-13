export default function Button({ children, variant = 'primary', ...props }) {
  const base = 'inline-flex items-center px-4 py-2 rounded-md font-medium shadow-sm focus:outline-none'
  const variants = {
    primary: 'bg-gradient-to-r from-sky-500 to-teal-400 text-white hover:opacity-95',
    ghost: 'bg-transparent text-sky-600 hover:bg-sky-50 dark:hover:bg-slate-700',
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary}`} {...props}>
      {children}
    </button>
  )
}
