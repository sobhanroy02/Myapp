"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function AuthCard() {
  const [mode, setMode] = useState("signup") // 'signup' or 'login'
  const [userType, setUserType] = useState("user") // 'user' or 'admin'
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignup = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const fd = new FormData(e.currentTarget)
    const userData = Object.fromEntries(fd.entries())
    
    // Validate admin ID if user type is admin
    if (userType === "admin" && !userData.adminId) {
      alert("Admin ID is required for admin accounts")
      setIsLoading(false)
      return
    }
    
    // Store user data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', 'demo-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        ward: userData.ward,
        pincode: userData.pincode,
        municipality: userData.municipality,
        userType: userType,
        adminId: userType === "admin" ? userData.adminId : null,
        createdAt: new Date().toISOString(),
        isLoggedIn: true
      }))
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      if (userType === "admin") {
        alert(`Welcome Admin ${userData.fullName}! Admin account created successfully with ID: ${userData.adminId}`)
      } else {
        alert(`Welcome ${userData.fullName}! Account created successfully.`)
      }
      router.push('/home') // Redirect to home page after signup
    }, 1000)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    const fd = new FormData(e.currentTarget)
    const loginData = Object.fromEntries(fd.entries())
    
    // Validate admin ID if user type is admin
    if (userType === "admin" && !loginData.adminId) {
      alert("Admin ID is required for admin login")
      setIsLoading(false)
      return
    }
    
    // For demo purposes, create a user profile for login
    if (typeof window !== 'undefined') {
      localStorage.setItem('authToken', 'demo-token-' + Date.now())
      localStorage.setItem('user', JSON.stringify({
        id: Date.now(),
        fullName: userType === "admin" ? 'Admin User' : 'Demo User',
        email: loginData.emailOrPhone,
        phone: loginData.emailOrPhone.includes('@') ? '' : loginData.emailOrPhone,
        ward: 'Ward 1',
        pincode: '110001',
        municipality: 'Demo City',
        userType: userType,
        adminId: userType === "admin" ? loginData.adminId : null,
        lastLogin: new Date().toISOString(),
        isLoggedIn: true
      }))
    }
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false)
      if (userType === "admin") {
        alert(`Welcome back Admin! Logged in successfully with ID: ${loginData.adminId}`)
      } else {
        alert('Welcome back! Logged in successfully.')
      }
      router.push('/home') // Redirect to home page after login
    }, 1000)
  }

  const SignupForm = (
    <form
      onSubmit={handleSignup}
      className="space-y-4"
    >
      <h3 className="text-xl sm:text-2xl font-bold text-black text-center">Create Account</h3>
      <p className="text-xs sm:text-sm text-gray-600 text-center">Join your community in making a difference</p>

      <div className="grid grid-cols-1 gap-3">
        <input name="fullName" required placeholder="Full name" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        <input name="email" type="email" required placeholder="Email" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        <input name="phone" placeholder="Phone" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <input name="ward" placeholder="Ward no" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
          <input name="pincode" placeholder="Pincode" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        </div>
        <input name="municipality" placeholder="Municipality" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        
        {/* Admin ID field - only shows when admin is selected */}
        {userType === "admin" && (
          <div className="relative">
            <input 
              name="adminId" 
              required 
              placeholder="Admin ID" 
              className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50" 
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-purple-500 text-sm">🛡️</span>
            </div>
            <p className="text-xs text-purple-600 mt-1 ml-1">Required for admin accounts</p>
          </div>
        )}
        
        <input name="password" type="password" required placeholder="Password" className="w-full p-2.5 sm:p-3 text-sm sm:text-base rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-md text-white font-medium bg-gradient-to-r from-sky-400 to-teal-500 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Creating Account...' : 'Create account'}
      </button>

      {/* User Type Selection */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-3">Account Type</p>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setUserType("user")}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              userType === "user" 
                ? "bg-sky-100 text-sky-800 border-2 border-sky-300" 
                : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200"
            }`}
          >
            👤 User
          </button>
          <button
            type="button"
            onClick={() => setUserType("admin")}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              userType === "admin" 
                ? "bg-purple-100 text-purple-800 border-2 border-purple-300" 
                : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200"
            }`}
          >
            🛡️ Admin
          </button>
        </div>
        {userType === "admin" && (
          <div className="mt-2 text-center">
            <p className="text-xs text-purple-600 bg-purple-50 px-3 py-2 rounded-full inline-block">
              ⚠️ Admin accounts require a valid Admin ID
            </p>
          </div>
        )}
      </div>
    </form>
  )

  const LoginForm = (
    <form
      onSubmit={handleLogin}
      className="space-y-4"
    >
      <h3 className="text-2xl font-bold text-black text-center">Welcome back</h3>
      <p className="text-sm text-gray-600 text-center">Sign in to continue your civic journey</p>

      <div className="grid grid-cols-1 gap-3">
        <input name="emailOrPhone" placeholder="Email or phone" className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
        
        {/* Admin ID field - only shows when admin is selected */}
        {userType === "admin" && (
          <div className="relative">
            <input 
              name="adminId" 
              required 
              placeholder="Admin ID" 
              className="w-full p-3 text-sm sm:text-base rounded-md border-2 border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-300 bg-purple-50" 
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <span className="text-purple-500 text-sm">🛡️</span>
            </div>
            <p className="text-xs text-purple-600 mt-1 ml-1">Required for admin access</p>
          </div>
        )}
        
        <input name="password" type="password" placeholder="Password" className="w-full p-3 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-sky-200" />
      </div>

      <button 
        type="submit" 
        disabled={isLoading}
        className="w-full py-2.5 sm:py-3 text-sm sm:text-base rounded-md text-white font-medium bg-gradient-to-r from-sky-400 to-teal-500 shadow disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </button>

      {/* User Type Selection */}
      <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-200">
        <p className="text-xs sm:text-sm text-gray-600 text-center mb-2 sm:mb-3">Account Type</p>
        <div className="flex items-center justify-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setUserType("user")}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              userType === "user" 
                ? "bg-sky-100 text-sky-800 border-2 border-sky-300" 
                : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200"
            }`}
          >
            👤 User
          </button>
          <button
            type="button"
            onClick={() => setUserType("admin")}
            className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
              userType === "admin" 
                ? "bg-purple-100 text-purple-800 border-2 border-purple-300" 
                : "bg-gray-100 text-gray-600 border-2 border-gray-200 hover:bg-gray-200"
            }`}
          >
            🛡️ Admin
          </button>
        </div>
        {userType === "admin" && (
          <div className="mt-2 text-center">
            <p className="text-xs text-purple-600 bg-purple-50 px-3 py-2 rounded-full inline-block">
              🔐 Admin login requires verification
            </p>
          </div>
        )}
      </div>
    </form>
  )

  return (
    <div className="w-full max-w-md lg:max-w-xl">
      <div className="rounded-2xl bg-white/95 border border-gray-100 shadow-lg p-4 sm:p-6 lg:p-8">
        {/* Mobile-friendly tab buttons */}
        <div className="flex items-center justify-center gap-2 sm:gap-4 mb-4 sm:mb-6">
          <button
            onClick={() => setMode("signup")}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
              mode === "signup" ? "bg-sky-100 text-sky-800" : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-pressed={mode === "signup"}
          >
            Sign up
          </button>
          <button
            onClick={() => setMode("login")}
            className={`px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all ${
              mode === "login" ? "bg-sky-100 text-sky-800" : "text-gray-600 hover:bg-gray-100"
            }`}
            aria-pressed={mode === "login"}
          >
            Log in
          </button>
        </div>

        <div>{mode === "signup" ? SignupForm : LoginForm}</div>
      </div>
    </div>
  )
}
