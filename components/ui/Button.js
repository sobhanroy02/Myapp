"use client"
export default function Button({ children, className = '', ...props }) {
  return (
    <button className={`px-4 py-2 rounded-md bg-primary-500 text-white shadow ${className}`} {...props}>{children}</button>
  )
}
