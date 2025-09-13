"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState(null)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editFormData, setEditFormData] = useState({})
  const [showReportDetails, setShowReportDetails] = useState(false)
  const [selectedReport, setSelectedReport] = useState(null)
  const [isEditingReport, setIsEditingReport] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authToken = localStorage.getItem('authToken')
      const userData = localStorage.getItem('user')
      const savedPhoto = localStorage.getItem('userProfilePhoto')
      
      if (authToken && userData) {
        try {
          const parsedUser = JSON.parse(userData)
          setUser(parsedUser)
          setEditFormData({
            fullName: parsedUser.fullName || '',
            email: parsedUser.email || '',
            phone: parsedUser.phone || '',
            ward: parsedUser.ward || '',
            pincode: parsedUser.pincode || '',
            municipality: parsedUser.municipality || ''
          })
          setIsLoggedIn(true)
          if (savedPhoto) {
            setProfilePhoto(savedPhoto)
          }
        } catch (error) {
          console.error('Error parsing user data:', error)
          router.push('/auth')
        }
      } else {
        router.push('/auth')
      }
    }
  }, [router])

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file')
        return
      }

      setIsUploadingPhoto(true)
      const reader = new FileReader()
      
      reader.onload = (e) => {
        const photoData = e.target.result
        setProfilePhoto(photoData)
        // Save to localStorage
        localStorage.setItem('userProfilePhoto', photoData)
        setIsUploadingPhoto(false)
      }
      
      reader.onerror = () => {
        alert('Error reading file')
        setIsUploadingPhoto(false)
      }
      
      reader.readAsDataURL(file)
    }
  }

  const removeProfilePhoto = () => {
    setProfilePhoto(null)
    localStorage.removeItem('userProfilePhoto')
  }

  const handleEditProfile = () => {
    setShowEditModal(true)
  }

  const handleSaveProfile = () => {
    const updatedUser = { ...user, ...editFormData }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
    setShowEditModal(false)
  }

  const handleFormChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleViewReport = (report) => {
    setSelectedReport(report)
    setIsEditingReport(false)
    setShowReportDetails(true)
  }

  const handleEditReport = (report) => {
    setSelectedReport(report)
    setIsEditingReport(true)
    setShowReportDetails(true)
  }

  const handleCloseReportModal = () => {
    setShowReportDetails(false)
    setSelectedReport(null)
    setIsEditingReport(false)
  }

  const handleSaveReport = () => {
    // Here you would typically save the edited report to the backend
    console.log('Saving report:', selectedReport)
    setShowReportDetails(false)
    setIsEditingReport(false)
  }

  if (!isLoggedIn || !user) {
    return (
      <main className="min-h-screen bg-white text-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-2 border-sky-200 border-t-sky-500 mx-auto" />
          <p className="mt-4 text-sm text-gray-600">Loading your profile…</p>
        </div>
      </main>
    )
  }

  const userStats = {
    reportsSubmitted: 27,
    issuesResolved: 19,
    communityRank: 'Gold Contributor',
    totalUpvotes: 156,
    streakDays: 12,
    badgesEarned: 8
  }

  const recentReports = [
    { 
      id: 1, 
      title: 'Broken Streetlight on Oak Ave', 
      status: 'resolved', 
      date: '2024-03-20', 
      upvotes: 23, 
      category: 'Public Safety',
      description: 'The streetlight at the intersection of Oak Avenue and 5th Street has been flickering for several days and is now completely dark. This creates a safety hazard for pedestrians and drivers, especially during evening hours.',
      location: {
        address: '1234 Oak Avenue, Downtown',
        coordinates: '40.7128, -74.0060',
        landmark: 'Near City Hall'
      },
      timing: {
        submitted: '2024-03-20 08:30 AM',
        lastUpdate: '2024-03-22 02:15 PM',
        resolved: '2024-03-22 02:15 PM'
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
          caption: 'Broken streetlight during evening'
        },
        {
          type: 'image', 
          url: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400',
          caption: 'Intersection view showing safety concern'
        }
      ],
      priority: 'High',
      department: 'Public Works'
    },
    { 
      id: 2, 
      title: 'Pothole on Main Street', 
      status: 'in-progress', 
      date: '2024-03-18', 
      upvotes: 15, 
      category: 'Infrastructure',
      description: 'Large pothole developing on Main Street causing vehicle damage and creating traffic hazards. The hole is approximately 3 feet wide and 8 inches deep.',
      location: {
        address: '2856 Main Street, Midtown',
        coordinates: '40.7614, -73.9776',
        landmark: 'Between Metro Bank and Coffee Shop'
      },
      timing: {
        submitted: '2024-03-18 02:45 PM',
        lastUpdate: '2024-03-20 10:30 AM',
        resolved: null
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
          caption: 'Pothole causing traffic issues'
        },
        {
          type: 'video',
          url: '/videos/pothole-traffic.mp4',
          caption: 'Traffic navigating around pothole'
        }
      ],
      priority: 'Medium',
      department: 'Road Maintenance'
    },
    { 
      id: 3, 
      title: 'Graffiti in Central Park', 
      status: 'pending', 
      date: '2024-03-15', 
      upvotes: 8, 
      category: 'Parks',
      description: 'Vandalism on the main pavilion wall in Central Park. Multiple graffiti tags covering approximately 20 square feet of public property.',
      location: {
        address: 'Central Park Pavilion, Park District',
        coordinates: '40.7829, -73.9654',
        landmark: 'Main pavilion near playground'
      },
      timing: {
        submitted: '2024-03-15 11:20 AM',
        lastUpdate: '2024-03-15 11:20 AM',
        resolved: null
      },
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400',
          caption: 'Graffiti on pavilion wall'
        }
      ],
      priority: 'Low',
      department: 'Parks & Recreation'
    },
  ]

  const achievements = [
    { 
      name: 'First Report', 
      icon: '🎯', 
      earned: true, 
      description: 'Successfully submitted your first civic issue',
      category: 'Starter',
      color: 'from-blue-400 to-indigo-500',
      bgColor: 'from-blue-50 to-indigo-100',
      textColor: 'text-blue-800',
      progress: 100,
      requirement: 'Submit 1 report'
    },
    { 
      name: 'Community Hero', 
      icon: '⭐', 
      earned: true, 
      description: 'Made a significant impact by resolving multiple issues',
      category: 'Impact',
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'from-yellow-50 to-orange-100',
      textColor: 'text-orange-800',
      progress: 100,
      requirement: 'Help resolve 10+ issues'
    },
    { 
      name: 'Streak Master', 
      icon: '🔥', 
      earned: true, 
      description: 'Maintained consistent civic engagement',
      category: 'Consistency',
      color: 'from-red-400 to-pink-500',
      bgColor: 'from-red-50 to-pink-100',
      textColor: 'text-red-800',
      progress: 100,
      requirement: 'Active for 7 consecutive days'
    },
    { 
      name: 'Photo Pro', 
      icon: '📷', 
      earned: true, 
      description: 'Enhanced reports with visual documentation',
      category: 'Quality',
      color: 'from-purple-400 to-violet-500',
      bgColor: 'from-purple-50 to-violet-100',
      textColor: 'text-purple-800',
      progress: 100,
      requirement: 'Add photos to 5+ reports'
    },
    { 
      name: 'Vote Champion', 
      icon: '👍', 
      earned: false, 
      description: 'Gained widespread community support',
      category: 'Popular',
      color: 'from-green-400 to-emerald-500',
      bgColor: 'from-green-50 to-emerald-100',
      textColor: 'text-green-800',
      progress: 56,
      requirement: 'Receive 100+ upvotes'
    },
    { 
      name: 'Night Owl', 
      icon: '🌙', 
      earned: false, 
      description: 'Dedication beyond regular hours',
      category: 'Special',
      color: 'from-slate-400 to-gray-500',
      bgColor: 'from-slate-50 to-gray-100',
      textColor: 'text-slate-800',
      progress: 0,
      requirement: 'Submit report after midnight'
    },
  ]

  // Leaderboard Data
  const leaderboardData = [
    {
      rank: 1,
      name: "Sarah Chen",
      avatar: "👩‍💼",
      score: 2840,
      reportsSubmitted: 47,
      reportsResolved: 43,
      badgeColor: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-100",
      textColor: "text-yellow-800",
      title: "Champion Reporter"
    },
    {
      rank: 2,
      name: "Michael Johnson",
      avatar: "👨‍🔧",
      score: 2650,
      reportsSubmitted: 39,
      reportsResolved: 38,
      badgeColor: "from-gray-400 to-gray-600",
      bgColor: "from-gray-50 to-slate-100",
      textColor: "text-gray-800",
      title: "Elite Contributor"
    },
    {
      rank: 3,
      name: "Alex Kumar",
      avatar: "👨‍💻",
      score: 2420,
      reportsSubmitted: 34,
      reportsResolved: 31,
      badgeColor: "from-amber-600 to-orange-700",
      bgColor: "from-amber-50 to-orange-100",
      textColor: "text-amber-800",
      title: "Community Leader"
    },
    {
      rank: 4,
      name: "Emily Rodriguez",
      avatar: "👩‍🎓",
      score: 2180,
      reportsSubmitted: 28,
      reportsResolved: 26,
      badgeColor: "from-blue-500 to-indigo-600",
      bgColor: "from-blue-50 to-indigo-100",
      textColor: "text-blue-800",
      title: "Rising Star"
    },
    {
      rank: 5,
      name: "David Park",
      avatar: "👨‍🏫",
      score: 1950,
      reportsSubmitted: 23,
      reportsResolved: 22,
      badgeColor: "from-green-500 to-teal-600",
      bgColor: "from-green-50 to-teal-100",
      textColor: "text-green-800",
      title: "Dedicated Helper"
    },
    {
      rank: 6,
      name: "You",
      avatar: "👤",
      score: 1250,
      reportsSubmitted: 15,
      reportsResolved: 12,
      badgeColor: "from-purple-500 to-pink-600",
      bgColor: "from-purple-50 to-pink-100",
      textColor: "text-purple-800",
      title: "Active Citizen",
      isCurrentUser: true
    }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'resolved': return 'bg-emerald-50 text-emerald-800'
      case 'in-progress': return 'bg-sky-50 text-sky-800'
      case 'pending': return 'bg-amber-50 text-amber-800'
      default: return 'bg-gray-50 text-gray-800'
    }
  }

  return (
    <main className="min-h-screen bg-white text-gray-800">
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="w-full max-w-6xl mx-auto">
          
          {/* Enhanced Header Card */}
          <div className="bg-gradient-to-br from-sky-50 via-white to-teal-50 border-2 border-sky-200 rounded-xl shadow-lg p-8 mb-6 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 left-0 w-32 h-32 bg-sky-300 rounded-full -translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 right-0 w-24 h-24 bg-teal-300 rounded-full translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                
                {/* Left Section - Profile Info */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      {/* Profile Photo Circle */}
                      <div className="w-20 h-20 rounded-full bg-white border-4 border-sky-200 flex items-center justify-center overflow-hidden shadow-md">
                        {profilePhoto ? (
                          <img 
                            src={profilePhoto} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-3xl">👤</span>
                        )}
                      </div>
                      
                      {/* Pen Icon Button */}
                      <button
                        onClick={handleEditProfile}
                        className="absolute -bottom-1 -right-1 w-8 h-8 bg-sky-500 hover:bg-sky-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
                        title="Edit profile"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* User Details */}
                    <div className="space-y-1">
                      <h1 className="text-2xl font-bold text-gray-900">{user.fullName || 'CitiZen User'}</h1>
                      <div className="flex items-center gap-2 text-gray-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="text-sm">{user.municipality || 'Unknown'}, Ward {user.ward || 'N/A'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200">
                          ⭐ {userStats.communityRank}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 border border-emerald-200">
                          🔥 {userStats.streakDays} Day Streak
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Section - Quick Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 text-center border border-sky-100 shadow-sm">
                    <div className="text-2xl font-bold text-sky-600">{userStats.reportsSubmitted}</div>
                    <div className="text-xs text-gray-600 mt-1">Reports</div>
                  </div>
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 text-center border border-emerald-100 shadow-sm">
                    <div className="text-2xl font-bold text-emerald-600">{userStats.issuesResolved}</div>
                    <div className="text-xs text-gray-600 mt-1">Resolved</div>
                  </div>
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 text-center border border-purple-100 shadow-sm">
                    <div className="text-2xl font-bold text-purple-600">{userStats.totalUpvotes}</div>
                    <div className="text-xs text-gray-600 mt-1">Upvotes</div>
                  </div>
                  <div className="bg-white bg-opacity-80 backdrop-blur-sm rounded-lg p-4 text-center border border-orange-100 shadow-sm">
                    <div className="text-2xl font-bold text-orange-600">{userStats.badgesEarned}</div>
                    <div className="text-xs text-gray-600 mt-1">Badges</div>
                  </div>
                </div>
              </div>

              {/* Bottom Section - Additional Info */}
              <div className="mt-6 pt-6 border-t border-sky-200">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Verified Citizen</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Member since {new Date().getFullYear() - 1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span>Impact Score: {Math.floor(userStats.totalUpvotes * 1.5)}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-sm text-gray-500">
                      Last active: <span className="text-gray-700 font-medium">Today</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Tab Navigation */}
          <div className="bg-gradient-to-r from-white via-sky-50 to-white border-2 border-sky-200 rounded-2xl shadow-lg p-2 mb-8 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-20 h-20 bg-sky-300 rounded-full -translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 right-0 w-16 h-16 bg-indigo-300 rounded-full translate-x-8 translate-y-8"></div>
            </div>
            
            <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { id: 'overview', label: 'Overview', icon: '📊', color: 'from-blue-500 to-cyan-600', bgColor: 'from-blue-50 to-cyan-100' },
                { id: 'reports', label: 'My Reports', icon: '📝', color: 'from-green-500 to-emerald-600', bgColor: 'from-green-50 to-emerald-100' },
                { id: 'achievements', label: 'Achievements', icon: '🏆', color: 'from-yellow-500 to-orange-600', bgColor: 'from-yellow-50 to-orange-100' },
                { id: 'leaderboard', label: 'Leaderboard', icon: '👑', color: 'from-purple-500 to-pink-600', bgColor: 'from-purple-50 to-pink-100' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`group relative px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-300 transform hover:scale-105 ${
                    activeTab === tab.id
                      ? `bg-gradient-to-br ${tab.bgColor} text-gray-800 shadow-lg border-2 border-white`
                      : 'text-gray-600 hover:text-gray-800 hover:bg-white hover:shadow-md border-2 border-transparent'
                  }`}
                >
                  {/* Active Tab Indicator */}
                  {activeTab === tab.id && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-10 rounded-xl`}></div>
                  )}
                  
                  {/* Tab Content */}
                  <div className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`text-2xl transition-transform duration-300 ${
                      activeTab === tab.id ? 'scale-110' : 'group-hover:scale-105'
                    }`}>
                      {tab.icon}
                    </div>
                    <span className="text-xs md:text-sm font-medium">
                      {tab.label}
                    </span>
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-sky-200 to-indigo-200 opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Overview */}
            {activeTab === 'overview' && (
              <>
                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Reports Box */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-500 bg-opacity-20 rounded-full">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-blue-700 mb-1">Reports</div>
                    <div className="text-3xl font-bold text-blue-800">{userStats.reportsSubmitted}</div>
                    <div className="text-xs text-blue-600 mt-1">Submitted</div>
                  </div>

                  {/* Resolved Box */}
                  <div className="bg-gradient-to-br from-emerald-50 to-green-100 border border-emerald-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-emerald-500 bg-opacity-20 rounded-full">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-emerald-700 mb-1">Resolved</div>
                    <div className="text-3xl font-bold text-emerald-800">{userStats.issuesResolved}</div>
                    <div className="text-xs text-emerald-600 mt-1">Issues Fixed</div>
                  </div>

                  {/* Upvotes Box */}
                  <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-purple-500 bg-opacity-20 rounded-full">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-purple-700 mb-1">Upvotes</div>
                    <div className="text-3xl font-bold text-purple-800">{userStats.totalUpvotes}</div>
                    <div className="text-xs text-purple-600 mt-1">Community Support</div>
                  </div>

                  {/* Streak Box */}
                  <div className="bg-gradient-to-br from-orange-50 to-amber-100 border border-orange-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-orange-500 bg-opacity-20 rounded-full">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
                        </svg>
                      </div>
                    </div>
                    <div className="text-sm font-medium text-orange-700 mb-1">Streak</div>
                    <div className="text-3xl font-bold text-orange-800">{userStats.streakDays}d</div>
                    <div className="text-xs text-orange-600 mt-1">Active Days</div>
                  </div>
                </div>

                {/* Enhanced Recent Reports Card */}
                <div className="bg-gradient-to-br from-slate-50 to-gray-100 border-2 border-slate-200 rounded-xl shadow-lg overflow-hidden">
                  {/* Header Section */}
                  <div className="bg-gradient-to-r from-slate-600 to-gray-700 p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <h2 className="text-xl font-bold">Recent Reports</h2>
                      </div>
                      <button className="px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2">
                        <span>View all</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Mobile-Optimized Reports List */}
                  <div className="p-1 sm:p-2">
                    {recentReports.map((report, index) => (
                      <div key={report.id} className="bg-white border border-gray-200 rounded-lg p-3 sm:p-6 mb-2 sm:mb-3 last:mb-0 shadow-sm hover:shadow-md transition-all duration-300 hover:border-slate-300">
                        
                        {/* Mobile: Stack Layout, Desktop: Side by Side */}
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                          
                          {/* Main Content Area */}
                          <div className="flex-1 min-w-0">
                            {/* Title with Icon */}
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className={`flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full mt-0.5 sm:mt-1 flex-shrink-0 ${
                                report.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' :
                                report.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-amber-100 text-amber-600'
                              }`}>
                                {report.status === 'resolved' ? (
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : report.status === 'in-progress' ? (
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                ) : (
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </div>
                              
                              <div className="flex-1 min-w-0">
                                <h3 className="text-sm sm:text-lg font-semibold text-gray-900 hover:text-slate-700 cursor-pointer transition-colors leading-tight">{report.title}</h3>
                                
                                {/* Mobile-Optimized Metadata */}
                                <div className="mt-1.5 sm:mt-2 flex flex-wrap items-center gap-1.5 sm:gap-3 text-xs sm:text-sm">
                                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-100 rounded-full">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-slate-600 font-medium text-xs sm:text-sm">{report.category}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-slate-100 rounded-full">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-slate-600 text-xs sm:text-sm">{report.date}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1 px-2 py-0.5 sm:px-3 sm:py-1 bg-purple-50 rounded-full">
                                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                    <span className="text-purple-600 font-medium text-xs sm:text-sm">{report.upvotes} upvotes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Mobile: Full Width Actions, Desktop: Right Aligned */}
                          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-3 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                            {/* Minimalist Status Badge */}
                            <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium border ${
                              report.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              report.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                                report.status === 'resolved' ? 'bg-emerald-500' :
                                report.status === 'in-progress' ? 'bg-blue-500' :
                                'bg-amber-500'
                              }`}></span>
                              <span className="hidden sm:inline">{report.status.replace('-', ' ')}</span>
                              <span className="sm:hidden">{report.status === 'in-progress' ? 'Progress' : report.status}</span>
                            </span>
                            
                            {/* Sharp Action Button */}
                            <button className="inline-flex items-center px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md text-xs font-medium transition-colors duration-150 border border-gray-200 hover:border-gray-300">
                              <svg className="w-3 h-3 sm:mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              <span className="hidden sm:inline ml-1">View</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* Enhanced My Reports Section */}
            {activeTab === 'reports' && (
              <div className="space-y-4">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl p-4 sm:p-6 text-white mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">My Reports</h2>
                      <p className="text-sm text-gray-200 mt-1">Track all your submitted civic reports</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Reports Grid */}
                <div className="grid grid-cols-1 gap-3 sm:gap-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                      
                      {/* Mobile-Optimized Layout */}
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
                          
                          {/* Main Content with Icon */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start gap-3">
                              {/* Status Icon */}
                              <div className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full mt-0.5 flex-shrink-0 ${
                                report.status === 'resolved' ? 'bg-emerald-100 text-emerald-600' :
                                report.status === 'in-progress' ? 'bg-blue-100 text-blue-600' :
                                'bg-amber-100 text-amber-600'
                              }`}>
                                {report.status === 'resolved' ? (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                ) : report.status === 'in-progress' ? (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                ) : (
                                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                )}
                              </div>
                              
                              {/* Report Details */}
                              <div className="flex-1 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-slate-700 cursor-pointer transition-colors leading-tight mb-2">{report.title}</h3>
                                
                                {/* Enhanced Metadata Tags */}
                                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-slate-50 to-gray-100 rounded-full border border-slate-200">
                                    <svg className="w-3 h-3 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-slate-700 font-medium">{report.category}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-full border border-blue-200">
                                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-blue-700 font-medium">{report.date}</span>
                                  </div>
                                  
                                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-gradient-to-r from-purple-50 to-violet-100 rounded-full border border-purple-200">
                                    <svg className="w-3 h-3 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                                    </svg>
                                    <span className="text-purple-700 font-medium">{report.upvotes} upvotes</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Action Section - Mobile Optimized */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                            {/* Enhanced Status Badge */}
                            <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border-2 shadow-sm ${
                              report.status === 'resolved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                              report.status === 'in-progress' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                              'bg-amber-50 text-amber-700 border-amber-200'
                            }`}>
                              <span className={`w-2 h-2 rounded-full mr-2 ${
                                report.status === 'resolved' ? 'bg-emerald-500' :
                                report.status === 'in-progress' ? 'bg-blue-500' :
                                'bg-amber-500'
                              }`}></span>
                              <span className="hidden sm:inline">{report.status.replace('-', ' ')}</span>
                              <span className="sm:hidden">{report.status === 'in-progress' ? 'Progress' : report.status}</span>
                            </span>
                            
                            {/* Enhanced Action Buttons */}
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => handleViewReport(report)}
                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white rounded-lg text-xs font-medium shadow-sm hover:shadow-md transition-all duration-200"
                              >
                                <svg className="w-3 h-3 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                <span className="hidden sm:inline">View Details</span>
                              </button>
                              
                              <button 
                                onClick={() => handleEditReport(report)}
                                className="inline-flex items-center px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-xs font-medium transition-colors duration-150 border border-gray-200 hover:border-gray-300"
                              >
                                <svg className="w-3 h-3 sm:mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span className="hidden sm:inline">Edit</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Empty State (if no reports) */}
                {recentReports.length === 0 && (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No reports yet</h3>
                    <p className="text-gray-500 mb-4">Start making a difference in your community by submitting your first report.</p>
                    <button className="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-lg font-medium hover:shadow-md transition-shadow">
                      Submit Report
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Achievements Section */}
            {activeTab === 'achievements' && (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-slate-600 to-gray-700 rounded-xl p-4 sm:p-6 text-white mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Achievements & Badges</h2>
                      <p className="text-sm text-gray-200 mt-1">Your civic engagement milestones</p>
                    </div>
                  </div>
                </div>

                {/* Achievements Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {achievements.map((achievement, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                        achievement.earned ? 'bg-gradient-to-br ' + achievement.bgColor : 'bg-gradient-to-br from-gray-50 to-slate-100'
                      } border-2 ${
                        achievement.earned ? 'border-white border-opacity-50' : 'border-gray-200'
                      }`}
                    >
                      {/* Decorative Background Pattern */}
                      <div className="absolute top-0 right-0 w-20 h-20 opacity-10">
                        <div className="w-full h-full rounded-full bg-white transform translate-x-6 -translate-y-6"></div>
                      </div>
                      
                      {/* Card Content */}
                      <div className="relative p-6">
                        {/* Header with Icon and Category */}
                        <div className="flex items-start justify-between mb-4">
                          <div className={`flex items-center justify-center w-14 h-14 rounded-xl shadow-md ${
                            achievement.earned 
                              ? 'bg-gradient-to-br ' + achievement.color + ' text-white' 
                              : 'bg-gray-200 text-gray-500'
                          }`}>
                            <span className="text-2xl">{achievement.icon}</span>
                          </div>
                          
                          <div className="text-right">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                              achievement.earned 
                                ? achievement.textColor + ' bg-white bg-opacity-60' 
                                : 'text-gray-600 bg-gray-200'
                            }`}>
                              {achievement.category}
                            </span>
                          </div>
                        </div>

                        {/* Achievement Title */}
                        <h3 className={`text-lg font-bold mb-2 ${
                          achievement.earned ? achievement.textColor : 'text-gray-600'
                        }`}>
                          {achievement.name}
                        </h3>

                        {/* Description */}
                        <p className={`text-sm mb-4 leading-relaxed ${
                          achievement.earned ? achievement.textColor + ' opacity-80' : 'text-gray-500'
                        }`}>
                          {achievement.description}
                        </p>

                        {/* Requirement */}
                        <div className="mb-4">
                          <p className={`text-xs font-medium mb-2 ${
                            achievement.earned ? achievement.textColor : 'text-gray-500'
                          }`}>
                            Requirement: {achievement.requirement}
                          </p>
                          
                          {/* Progress Bar */}
                          <div className="w-full bg-white bg-opacity-50 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                achievement.earned 
                                  ? 'bg-gradient-to-r ' + achievement.color 
                                  : 'bg-gray-400'
                              }`}
                              style={{ width: `${achievement.progress}%` }}
                            ></div>
                          </div>
                          <p className={`text-xs mt-1 text-right ${
                            achievement.earned ? achievement.textColor : 'text-gray-500'
                          }`}>
                            {achievement.progress}%
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex items-center justify-between">
                          {achievement.earned ? (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-white rounded-full shadow-sm">
                                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className={`text-sm font-semibold ${achievement.textColor}`}>
                                Earned!
                              </span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <div className="flex items-center justify-center w-6 h-6 bg-gray-300 rounded-full">
                                <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-gray-600">
                                Locked
                              </span>
                            </div>
                          )}
                          
                          {/* Achievement Date (for earned achievements) */}
                          {achievement.earned && (
                            <span className={`text-xs ${achievement.textColor} opacity-70`}>
                              Earned
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Special Effects for Earned Achievements */}
                      {achievement.earned && (
                        <div className="absolute top-2 right-2">
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse shadow-lg"></div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Summary Stats */}
                <div className="bg-gradient-to-r from-indigo-50 to-purple-100 rounded-xl p-6 border border-indigo-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-indigo-900">Achievement Progress</h3>
                      <p className="text-sm text-indigo-700 mt-1">
                        You've earned {achievements.filter(a => a.earned).length} out of {achievements.length} achievements
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-indigo-800">
                        {Math.round((achievements.filter(a => a.earned).length / achievements.length) * 100)}%
                      </div>
                      <p className="text-sm text-indigo-600">Complete</p>
                    </div>
                  </div>
                  
                  {/* Overall Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-white bg-opacity-50 rounded-full h-3">
                      <div 
                        className="h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-1000"
                        style={{ width: `${(achievements.filter(a => a.earned).length / achievements.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Leaderboard Section */}
            {activeTab === 'leaderboard' && (
              <div className="space-y-6">
                {/* Section Header */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-700 rounded-xl p-4 sm:p-6 text-white mb-6">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-white bg-opacity-20 rounded-full">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold">Community Leaderboard</h2>
                      <p className="text-sm text-purple-100 mt-1">Top contributors in our community</p>
                    </div>
                  </div>
                </div>

                {/* Leaderboard List */}
                <div className="space-y-4">
                  {leaderboardData.map((user, index) => (
                    <div 
                      key={index} 
                      className={`relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                        user.isCurrentUser 
                          ? 'bg-gradient-to-br from-purple-50 to-pink-100 border-2 border-purple-300 ring-2 ring-purple-200' 
                          : `bg-gradient-to-br ${user.bgColor} border-2 border-white border-opacity-50`
                      }`}
                    >
                      {/* Rank Badge */}
                      <div className="absolute top-4 left-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm shadow-md ${
                          user.rank === 1 ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white' :
                          user.rank === 2 ? 'bg-gradient-to-r from-gray-300 to-gray-500 text-white' :
                          user.rank === 3 ? 'bg-gradient-to-r from-amber-400 to-amber-600 text-white' :
                          'bg-gradient-to-r from-blue-400 to-blue-600 text-white'
                        }`}>
                          {user.rank}
                        </div>
                      </div>

                      {/* Crown for #1 */}
                      {user.rank === 1 && (
                        <div className="absolute top-2 right-4">
                          <span className="text-2xl animate-pulse">👑</span>
                        </div>
                      )}

                      {/* Current User Badge */}
                      {user.isCurrentUser && (
                        <div className="absolute top-2 right-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold bg-purple-500 text-white">
                            You
                          </span>
                        </div>
                      )}

                      {/* Card Content */}
                      <div className="p-6">
                        <div className="flex items-center gap-4">
                          {/* Avatar */}
                          <div className={`flex items-center justify-center w-16 h-16 rounded-full shadow-lg ${
                            user.isCurrentUser 
                              ? 'bg-gradient-to-br from-purple-500 to-pink-600 text-white' 
                              : `bg-gradient-to-br ${user.badgeColor} text-white`
                          }`}>
                            <span className="text-2xl">{user.avatar}</span>
                          </div>

                          {/* User Info */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className={`text-lg font-bold ${user.textColor}`}>
                                {user.name}
                              </h3>
                              <div className="text-right">
                                <div className={`text-2xl font-bold ${user.textColor}`}>
                                  {user.score.toLocaleString()}
                                </div>
                                <p className={`text-xs ${user.textColor} opacity-70`}>
                                  points
                                </p>
                              </div>
                            </div>

                            {/* Title */}
                            <div className="mb-3">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                                user.isCurrentUser 
                                  ? 'bg-purple-500 text-white' 
                                  : `${user.textColor} bg-white bg-opacity-60`
                              }`}>
                                {user.title}
                              </span>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4">
                              <div className={`text-center p-3 rounded-lg ${
                                user.isCurrentUser ? 'bg-white bg-opacity-40' : 'bg-white bg-opacity-50'
                              }`}>
                                <div className={`text-lg font-bold ${user.textColor}`}>
                                  {user.reportsSubmitted}
                                </div>
                                <p className={`text-xs ${user.textColor} opacity-70`}>
                                  Reports Submitted
                                </p>
                              </div>
                              <div className={`text-center p-3 rounded-lg ${
                                user.isCurrentUser ? 'bg-white bg-opacity-40' : 'bg-white bg-opacity-50'
                              }`}>
                                <div className={`text-lg font-bold ${user.textColor}`}>
                                  {user.reportsResolved}
                                </div>
                                <p className={`text-xs ${user.textColor} opacity-70`}>
                                  Reports Resolved
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Decorative Background Pattern */}
                      <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                        <div className="w-full h-full rounded-full bg-white transform translate-x-8 -translate-y-8"></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Your Progress Summary */}
                <div className="bg-gradient-to-r from-purple-50 to-pink-100 rounded-xl p-6 border border-purple-200">
                  <div className="text-center">
                    <h3 className="text-lg font-semibold text-purple-900 mb-2">Your Progress</h3>
                    <p className="text-purple-700 mb-4">
                      You're currently ranked #{leaderboardData.find(u => u.isCurrentUser)?.rank} out of {leaderboardData.length} active contributors
                    </p>
                    
                    <div className="flex items-center justify-center gap-6 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-800">
                          {leaderboardData.find(u => u.isCurrentUser)?.score.toLocaleString()}
                        </div>
                        <p className="text-purple-600">Total Points</p>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-800">
                          {Math.round((leaderboardData.find(u => u.isCurrentUser)?.reportsResolved / leaderboardData.find(u => u.isCurrentUser)?.reportsSubmitted) * 100)}%
                        </div>
                        <p className="text-purple-600">Success Rate</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Edit Profile</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Profile Photo Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-24 h-24 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden mx-auto">
                    {profilePhoto ? (
                      <img 
                        src={profilePhoto} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl">👤</span>
                    )}
                  </div>
                  
                  {/* Loading Overlay */}
                  {isUploadingPhoto && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                    </div>
                  )}
                </div>
                
                <div className="mt-4 flex gap-3 justify-center">
                  <label
                    htmlFor="modal-photo-upload"
                    className="px-4 py-2 bg-sky-500 hover:bg-sky-600 text-white rounded-md text-sm font-medium cursor-pointer transition-colors disabled:opacity-50"
                  >
                    {profilePhoto ? 'Change Photo' : 'Upload Photo'}
                  </label>
                  
                  {profilePhoto && (
                    <button
                      onClick={removeProfilePhoto}
                      className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      Remove Photo
                    </button>
                  )}
                  
                  <input
                    id="modal-photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploadingPhoto}
                  />
                </div>
              </div>

              {/* Profile Details Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editFormData.fullName}
                    onChange={(e) => handleFormChange('fullName', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={editFormData.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={editFormData.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ward</label>
                  <input
                    type="text"
                    value={editFormData.ward}
                    onChange={(e) => handleFormChange('ward', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your ward"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={editFormData.pincode}
                    onChange={(e) => handleFormChange('pincode', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your pincode"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Municipality</label>
                  <input
                    type="text"
                    value={editFormData.municipality}
                    onChange={(e) => handleFormChange('municipality', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    placeholder="Enter your municipality"
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProfile}
                className="px-4 py-2 text-white bg-gradient-to-r from-sky-400 to-teal-500 hover:shadow-md rounded-md text-sm font-medium transition-shadow"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Report Details Modal */}
      {showReportDetails && selectedReport && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-slate-600 to-gray-700 text-white rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  selectedReport.status === 'resolved' ? 'bg-emerald-500 bg-opacity-20' :
                  selectedReport.status === 'in-progress' ? 'bg-blue-500 bg-opacity-20' :
                  'bg-amber-500 bg-opacity-20'
                }`}>
                  {selectedReport.status === 'resolved' ? (
                    <svg className="w-5 h-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : selectedReport.status === 'in-progress' ? (
                    <svg className="w-5 h-5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{isEditingReport ? 'Edit Report' : 'Report Details'}</h2>
                  <p className="text-sm text-gray-200">Report ID: #{selectedReport.id}</p>
                </div>
              </div>
              <button
                onClick={handleCloseReportModal}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              
              {/* Report Title and Status */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Report Title</label>
                    {isEditingReport ? (
                      <input
                        type="text"
                        value={selectedReport.title}
                        onChange={(e) => setSelectedReport({...selectedReport, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <h3 className="text-xl font-semibold text-gray-900">{selectedReport.title}</h3>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    {isEditingReport ? (
                      <textarea
                        value={selectedReport.description}
                        onChange={(e) => setSelectedReport({...selectedReport, description: e.target.value})}
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                      />
                    ) : (
                      <p className="text-gray-700 leading-relaxed">{selectedReport.description}</p>
                    )}
                  </div>
                </div>

                {/* Status and Metadata */}
                <div className="space-y-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Status & Info</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Status</span>
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          selectedReport.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' :
                          selectedReport.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {selectedReport.status.replace('-', ' ').toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Category</span>
                        <span className="text-sm font-medium text-gray-900">{selectedReport.category}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Priority</span>
                        <span className={`text-xs font-medium px-2 py-1 rounded ${
                          selectedReport.priority === 'High' ? 'bg-red-100 text-red-700' :
                          selectedReport.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {selectedReport.priority}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Department</span>
                        <span className="text-sm font-medium text-gray-900">{selectedReport.department}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Upvotes</span>
                        <span className="text-sm font-medium text-purple-600">{selectedReport.upvotes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Location Information */}
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Location Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-sm text-gray-900">{selectedReport.location.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Landmark</label>
                    <p className="text-sm text-gray-900">{selectedReport.location.landmark}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coordinates</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedReport.location.coordinates}</p>
                  </div>
                </div>
              </div>

              {/* Timing Information */}
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Timeline
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Submitted</label>
                    <p className="text-sm text-gray-900">{selectedReport.timing.submitted}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Update</label>
                    <p className="text-sm text-gray-900">{selectedReport.timing.lastUpdate}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resolved</label>
                    <p className="text-sm text-gray-900">{selectedReport.timing.resolved || 'Not yet resolved'}</p>
                  </div>
                </div>
              </div>

              {/* Media Gallery */}
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Media Files ({selectedReport.media.length})
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedReport.media.map((item, index) => (
                    <div key={index} className="bg-white rounded-lg p-3 border border-purple-200">
                      {item.type === 'image' ? (
                        <div className="space-y-2">
                          <img 
                            src={item.url} 
                            alt={item.caption}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <p className="text-xs text-gray-600">{item.caption}</p>
                        </div>
                      ) : (
                        <div className="space-y-2">
                          <div className="w-full h-32 bg-gray-100 rounded-md flex items-center justify-center">
                            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          </div>
                          <p className="text-xs text-gray-600">{item.caption}</p>
                          <button className="text-xs text-blue-600 hover:text-blue-800">Play Video</button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseReportModal}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                {isEditingReport ? 'Cancel' : 'Close'}
              </button>
              {isEditingReport && (
                <button
                  onClick={handleSaveReport}
                  className="px-4 py-2 text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-md rounded-md text-sm font-medium transition-shadow"
                >
                  Save Changes
                </button>
              )}
              {!isEditingReport && (
                <button
                  onClick={() => setIsEditingReport(true)}
                  className="px-4 py-2 text-white bg-gradient-to-r from-orange-500 to-red-600 hover:shadow-md rounded-md text-sm font-medium transition-shadow"
                >
                  Edit Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
