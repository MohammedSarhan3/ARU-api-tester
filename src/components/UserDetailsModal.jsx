import React, { useState, useEffect } from 'react'
import { FiX, FiCopy, FiLoader } from 'react-icons/fi'
import useStore from '../store'

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  const [userDetails, setUserDetails] = useState(user)
  const [isLoading, setIsLoading] = useState(false)
  const { accessToken, environmentUrls, environment } = useStore()

  useEffect(() => {
    if (isOpen && user && accessToken) {
      // Try to fetch full user details from backend
      fetchUserDetails()
    }
  }, [isOpen, user, accessToken])

  const fetchUserDetails = async () => {
    setIsLoading(true)
    try {
      const baseUrl = environmentUrls[environment]
      
      // Try common user profile endpoints
      const endpoints = [
        `${baseUrl}/admin/profile`,
        `${baseUrl}/doctor/profile`,
        `${baseUrl}/user/profile`,
        `${baseUrl}/profile`,
      ]

      for (const endpoint of endpoints) {
        try {
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            // Handle different response formats
            const userData = data.data || data.user || data
            setUserDetails({ ...user, ...userData })
            setIsLoading(false)
            return
          }
        } catch (err) {
          // Continue to next endpoint
          continue
        }
      }
      
      // If no endpoint worked, just use the basic user data
      setUserDetails(user)
    } catch (err) {
      console.error('Error fetching user details:', err)
      setUserDetails(user)
    }
    setIsLoading(false)
  }

  if (!isOpen || !userDetails) return null

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
  }

  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    if (typeof value === 'string' && value.includes('T') && value.includes('Z')) {
      return new Date(value).toLocaleString()
    }
    return String(value)
  }

  const fieldCount = Object.entries(userDetails).length

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-lg font-bold text-gray-800">User Details</h2>
            <p className="text-xs text-gray-500 mt-1">{fieldCount} field{fieldCount !== 1 ? 's' : ''} available</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          {isLoading ? (
            <div className="flex items-center justify-center py-8 gap-2 text-gray-500">
              <FiLoader size={20} className="animate-spin" />
              <span>Loading user details...</span>
            </div>
          ) : fieldCount === 0 ? (
            <p className="text-gray-500 text-center py-8">No user data available</p>
          ) : (
            Object.entries(userDetails).map(([key, value]) => (
              <div
                key={key}
                className="space-y-1 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition"
              >
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-gray-500 uppercase">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  {value && typeof value === 'string' && value.length > 0 && (
                    <button
                      onClick={() => copyToClipboard(String(value), key)}
                      className="p-1 hover:bg-gray-200 rounded transition text-gray-400 hover:text-gray-600"
                      title="Copy to clipboard"
                    >
                      <FiCopy size={14} />
                    </button>
                  )}
                </div>
                <p
                  className={`text-sm break-all font-mono ${
                    value === null || value === undefined ? 'text-gray-400' : 'text-gray-700'
                  }`}
                >
                  {formatValue(value)}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 rounded-b-lg border-t border-gray-200 sticky bottom-0">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserDetailsModal
