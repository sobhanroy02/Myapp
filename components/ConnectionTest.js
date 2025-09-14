"use client"

import { useState, useEffect } from 'react'
import { auth, db } from '../lib/firebase'
import { getIssues } from '../lib/api'

export default function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState({
    frontend: 'checking',
    firebase: 'checking',
    database: 'checking',
    backend: 'checking',
    ml: 'checking'
  })
  
  const [logs, setLogs] = useState([])
  
  const addLog = (message, type = 'info') => {
    setLogs(prev => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }])
  }

  useEffect(() => {
    testConnections()
  }, [])

  const testConnections = async () => {
    addLog('Starting connection tests...', 'info')
    
    // Test 1: Frontend deployment
    setConnectionStatus(prev => ({ ...prev, frontend: 'testing' }))
    try {
      addLog('✅ Frontend deployed successfully')
      setConnectionStatus(prev => ({ ...prev, frontend: 'success' }))
    } catch (error) {
      addLog(`❌ Frontend error: ${error.message}`, 'error')
      setConnectionStatus(prev => ({ ...prev, frontend: 'error' }))
    }

    // Test 2: Firebase Configuration
    setConnectionStatus(prev => ({ ...prev, firebase: 'testing' }))
    try {
      if (auth && db) {
        addLog('✅ Firebase SDK initialized successfully')
        setConnectionStatus(prev => ({ ...prev, firebase: 'success' }))
      } else {
        throw new Error('Firebase not initialized')
      }
    } catch (error) {
      addLog(`❌ Firebase error: ${error.message}`, 'error')
      setConnectionStatus(prev => ({ ...prev, firebase: 'error' }))
    }

    // Test 3: Database Connection
    setConnectionStatus(prev => ({ ...prev, database: 'testing' }))
    try {
      // Test Firestore connection by attempting to read
      const testDoc = await db.collection('test').limit(1).get()
      addLog('✅ Firestore database connection successful')
      setConnectionStatus(prev => ({ ...prev, database: 'success' }))
    } catch (error) {
      addLog(`❌ Database error: ${error.message}`, 'error')
      setConnectionStatus(prev => ({ ...prev, database: 'error' }))
    }

    // Test 4: Backend API
    setConnectionStatus(prev => ({ ...prev, backend: 'testing' }))
    try {
      const issues = await getIssues()
      addLog(`✅ Backend API connected successfully. Found ${issues.length || 0} issues`)
      setConnectionStatus(prev => ({ ...prev, backend: 'success' }))
    } catch (error) {
      addLog(`❌ Backend API error: ${error.message}`, 'error')
      setConnectionStatus(prev => ({ ...prev, backend: 'error' }))
    }

    // Test 5: Environment Variables
    const envVars = {
      API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
      ML_API_URL: process.env.NEXT_PUBLIC_ML_API_URL,
      FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    }
    
    addLog('Environment Variables Check:')
    Object.entries(envVars).forEach(([key, value]) => {
      if (value && !value.includes('YOUR_') && !value.includes('your-unique-hash')) {
        addLog(`✅ ${key}: Configured`)
      } else {
        addLog(`❌ ${key}: Missing or placeholder value`, 'error')
      }
    })

    addLog('Connection test completed!', 'info')
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'success': return 'text-green-600 bg-green-50'
      case 'error': return 'text-red-600 bg-red-50'
      case 'testing': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success': return '✅'
      case 'error': return '❌'
      case 'testing': return '🔄'
      default: return '⏳'
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">🔗 Connection Status</h1>
      
      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {Object.entries(connectionStatus).map(([service, status]) => (
          <div key={service} className={`p-4 rounded-lg border ${getStatusColor(status)}`}>
            <div className="flex items-center justify-between">
              <h3 className="font-semibold capitalize">{service}</h3>
              <span className="text-2xl">{getStatusIcon(status)}</span>
            </div>
            <p className="text-sm mt-1 capitalize">{status}</p>
          </div>
        ))}
      </div>

      {/* Test Button */}
      <button 
        onClick={testConnections}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors mb-6"
      >
        🔄 Re-test Connections
      </button>

      {/* Logs */}
      <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
        <h3 className="text-white font-semibold mb-2">Connection Logs:</h3>
        {logs.map((log, index) => (
          <div key={index} className={`${log.type === 'error' ? 'text-red-400' : 'text-green-400'}`}>
            <span className="text-gray-500">[{log.timestamp}]</span> {log.message}
          </div>
        ))}
      </div>
    </div>
  )
}