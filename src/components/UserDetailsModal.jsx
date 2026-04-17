import React from 'react'
import { FiX, FiCopy } from 'react-icons/fi'

const UserDetailsModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null

  const copyToClipboard = (text, label) => {
    navigator.clipboard.writeText(text)
    // Could add a toast notification here
  }

  // Format value for display
  const formatValue = (value) => {
    if (value === null || value === undefined) return 'N/A'
    if (typeof value === 'boolean') return value ? 'Yes' : 'No'
    if (typeof value === 'object') return JSON.stringify(value, null, 2)
    if (typeof value === 'string' && value.includes('T') && value.includes('Z')) {
      return new Date(value).toLocaleString()
    }
    return String(value)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <h2 className="text-lg font-bold text-gray-800">User Details</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg transition text-gray-600"
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-3">
          {Object.entries(user).length === 0 ? (
            <p className="text-gray-500 text-center py-8">No user data available</p>
          ) : (
            Object.entries(user).map(([key, value]) => (
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
