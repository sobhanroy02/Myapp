"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createIssue, analyzeImageWithAI } from '../../lib/api';

const CATEGORIES = [
  { name: 'Pothole', icon: '🛠️', bgColor: 'bg-orange-50', textColor: 'text-orange-600', borderColor: 'border-orange-200' },
  { name: 'Streetlight', icon: '💡', bgColor: 'bg-yellow-50', textColor: 'text-yellow-600', borderColor: 'border-yellow-200' },
  { name: 'Garbage', icon: '🗑️', bgColor: 'bg-green-50', textColor: 'text-green-600', borderColor: 'border-green-200' },
  { name: 'Water Issue', icon: '💧', bgColor: 'bg-blue-50', textColor: 'text-blue-600', borderColor: 'border-blue-200' },
  { name: 'Graffiti', icon: '🎨', bgColor: 'bg-purple-50', textColor: 'text-purple-600', borderColor: 'border-purple-200' },
  { name: 'Road Damage', icon: '🚧', bgColor: 'bg-red-50', textColor: 'text-red-600', borderColor: 'border-red-200' },
]

export default function ReportPage() {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState('')
  const [description, setDescription] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [location, setLocation] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Inside your existing component's handleSubmit function
const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
        // NEW WAY: A clean, simple function call.
        const aiResults = await analyzeImageWithAI(uploadedFile);

        const issueData = {
            title: title,
            description: description,
            category: aiResults.detections[0]?.class_name || selectedCategory || 'Uncategorized',
            location: location,
            imageUrl: "http://example.com/image.jpg", // This will be updated later
        };

        // ANOTHER NEW WAY: A second clean, simple function call.
        await createIssue(issueData);
        
        router.push('/'); // Redirect on success

    } catch (err) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
};

  return (
    <main className="min-h-screen bg-white text-gray-800">
      {/* Mobile-first responsive layout */}
      <div className="container mx-auto px-4 py-8 lg:py-16">
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-12">
          
          {/* Report Form - Full width on mobile, main content on desktop */}
          <div className="w-full lg:flex-1 max-w-2xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-teal-400 mb-4">
                Report an Issue
              </h1>
              <p className="text-gray-600 leading-relaxed text-sm lg:text-base">
                Help improve your community by reporting civic issues. Your reports help local authorities respond faster and more effectively.
              </p>
            </div>

            {/* Main Form Card */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Category Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Issue Category</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {CATEGORIES.map((category) => (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => setSelectedCategory(category.name)}
                        className={`p-3 sm:p-4 rounded-xl border-2 transition-all text-left ${
                          selectedCategory === category.name 
                            ? `${category.bgColor} ${category.borderColor} ${category.textColor} shadow-md` 
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                      >
                        <div className="flex flex-col items-center text-center">
                          <span className="text-xl sm:text-2xl mb-2">{category.icon}</span>
                          <span className="text-xs sm:text-sm font-medium">{category.name}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Photo Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Photo Evidence</label>
                  <div className="relative">
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                      onChange={(e) => setUploadedFile(e.target.files[0])} 
                    />
                    <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
                      uploadedFile ? 'border-green-300 bg-green-50' : 'border-gray-300 hover:border-sky-300 bg-gray-50'
                    }`}>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl mb-2">{uploadedFile ? '✅' : '📷'}</span>
                        <p className="text-sm font-medium text-gray-700">
                          {uploadedFile ? `Selected: ${uploadedFile.name}` : 'Click to upload a photo'}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">JPG, PNG up to 10MB</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Location</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button 
                      type="button" 
                      className="p-3 bg-gradient-to-r from-sky-50 to-blue-50 border border-sky-200 rounded-xl text-sky-700 font-medium text-sm hover:shadow-md transition-all"
                    >
                      📍 Use Current Location
                    </button>
                    <input 
                      type="text" 
                      placeholder="Enter address or landmark"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent text-sm"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the issue in detail. Include landmarks, severity, and any other relevant information..."
                    rows={4}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent resize-none text-sm"
                  />
                  <div className="text-xs text-gray-400 mt-1">{description.length}/500 characters</div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-sky-400 to-teal-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all text-sm sm:text-base"
                >
                  Submit Report
                </button>
              </form>
            </div>
          </div>

          {/* Side content - Hidden on mobile, visible on desktop */}
          <aside className="hidden lg:block lg:flex-1 max-w-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Quick Guide</h2>
            <p className="text-gray-600 text-sm mb-6">Follow these steps to submit an effective report that gets results.</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3 p-4 bg-sky-50 rounded-xl border border-sky-200">
                <span className="text-xl">📷</span>
                <div>
                  <h3 className="font-semibold text-sky-800 text-sm">Take a Clear Photo</h3>
                  <p className="text-xs text-sky-600">A good photo helps authorities understand and prioritize the issue</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-teal-50 rounded-xl border border-teal-200">
                <span className="text-xl">📍</span>
                <div>
                  <h3 className="font-semibold text-teal-800 text-sm">Be Specific About Location</h3>
                  <p className="text-xs text-teal-600">Include nearby landmarks or exact addresses for faster response</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-xl border border-purple-200">
                <span className="text-xl">✍️</span>
                <div>
                  <h3 className="font-semibold text-purple-800 text-sm">Describe the Impact</h3>
                  <p className="text-xs text-purple-600">Explain how the issue affects the community or poses safety risks</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-200 text-center">
                <div className="text-2xl font-bold text-orange-600">2,847</div>
                <div className="text-xs text-orange-700">Issues Resolved</div>
              </div>
              <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 text-center">
                <div className="text-2xl font-bold text-green-600">72h</div>
                <div className="text-xs text-green-700">Avg Response Time</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200">
              <h3 className="font-semibold text-gray-800 text-sm mb-2">Need Urgent Help?</h3>
              <p className="text-xs text-gray-600 mb-2">For emergencies, contact:</p>
              <div className="text-sm font-semibold text-gray-800">📞 +1 (555) 123-4567</div>
              <div className="text-xs text-gray-500 mt-1">Available 24/7</div>
            </div>
          </aside>
        </div>

        {/* Mobile footer with key info */}
        <div className="lg:hidden mt-8">
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="p-3 bg-sky-50 rounded-lg text-center border border-sky-200">
              <div className="text-lg font-bold text-sky-600">Fast</div>
              <div className="text-xs text-sky-700">Response</div>
            </div>
            <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
              <div className="text-lg font-bold text-teal-600">Track</div>
              <div className="text-xs text-teal-700">Progress</div>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg text-center border border-purple-200">
              <div className="text-lg font-bold text-purple-600">24/7</div>
              <div className="text-xs text-purple-700">Support</div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
