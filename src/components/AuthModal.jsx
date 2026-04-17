import React, { useState } from 'react'
import { login } from '../api'
import useStore from '../store'

const AUTH_PRESETS = {
  superadmin: {
    email: 'superadmin@example.com',
    password: 'Admin@123456',
    name: 'Super Admin',
    isAdmin: true,
  },
  admin: {
    email: 'admin@example.com',
    password: 'Admin@123456',
    name: 'Admin',
    isAdmin: true,
  },
  doctor: {
    email: 'hassan@example.com',
    password: 'Doctor@123456',
    name: 'Doctor',
    isAdmin: false,
  },
}

const AuthModal = ({ onClose }) => {
  const [email, setEmail] = useState('superadmin@example.com')
  const [password, setPassword] = useState('Admin@123456')
  const [isAdmin, setIsAdmin] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [showCustom, setShowCustom] = useState(false)
  const setUser = useStore((state) => state.setUser)

  const handleLogin = async (e, customEmail = null, customPassword = null, customIsAdmin = null) => {
    if (e) e.preventDefault()
    setError('')
    setIsLoading(true)

    const loginEmail = customEmail || email
    const loginPassword = customPassword || password
    const loginIsAdmin = customIsAdmin !== null ? customIsAdmin : isAdmin

    try {
      console.log('🔐 Attempting login with:', { email: loginEmail, isAdmin: loginIsAdmin })
      const response = await login(loginEmail, loginPassword, loginIsAdmin)
      
      console.log('📋 Login response:', { success: response.success, message: response.message })

      // Wait a moment for store to update
      await new Promise(resolve => setTimeout(resolve, 100))
      
      const currentToken = useStore.getState().accessToken
      const currentIsLoggedIn = useStore.getState().isLoggedIn

      console.log('🔍 Store state after login:', { 
        isLoggedIn: currentIsLoggedIn, 
        hasToken: !!currentToken 
      })
      
      if (response.success && currentToken && currentIsLoggedIn) {
        console.log('✅ Login successful! Closing modal...')
        // Modal will close automatically when App detects isLoggedIn changed
      } else {
        const errorMsg = response.message || response.data?.message || 'Login failed. Please check your credentials.'
        console.error('❌ Login failed:', errorMsg)
        setError(errorMsg)
      }
    } catch (err) {
      console.error('💥 Login error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">ARU API Tester</h1>
          <p className="text-gray-600 text-sm mt-1">Interactive API Testing Interface</p>
        </div>

        {!showCustom ? (
          <>
            {/* Quick Login Presets */}
            <div className="space-y-3 mb-8">
              <p className="text-sm font-semibold text-gray-700 mb-3">Quick Login:</p>
              {Object.entries(AUTH_PRESETS).map(([key, preset]) => (
                <button
                  key={key}
                  onClick={(e) => handleLogin(e, preset.email, preset.password, preset.isAdmin)}
                  disabled={isLoading}
                  className="w-full p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <p className="font-semibold text-gray-800">{preset.name}</p>
                  <p className="text-xs text-gray-600 mt-1">{preset.email}</p>
                </button>
              ))}
            </div>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm mb-4">{error}</div>
            )}

            <button
              onClick={() => setShowCustom(true)}
              className="w-full py-2 px-4 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-gray-400 transition font-medium"
            >
              Use Custom Credentials
            </button>
          </>
        ) : (
          <>
            {/* Custom Login Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-4 p-3 bg-gray-50 rounded-lg">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(true)}
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700">Admin</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    checked={!isAdmin}
                    onChange={() => setIsAdmin(false)}
                    disabled={isLoading}
                  />
                  <span className="text-sm text-gray-700">Doctor</span>
                </label>
              </div>

              {error && <div className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</div>}

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowCustom(false)
                    setError('')
                  }}
                  className="flex-1 py-2 px-4 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition font-medium"
                  disabled={isLoading}
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  {isLoading ? 'Logging in...' : 'Log In'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

export default AuthModal
