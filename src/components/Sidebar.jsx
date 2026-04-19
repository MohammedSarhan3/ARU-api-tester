import React, { useState, useMemo } from 'react'
import { FiStar, FiLogOut, FiClock } from 'react-icons/fi'
import { ENDPOINTS, getMethodColor } from '../data/endpoints'
import UserDetailsModal from './UserDetailsModal'
import useStore from '../store'

const Sidebar = ({ onShowHistory }) => {
  const [expandedCategories, setExpandedCategories] = useState(['Admin Auth'])
  const [showEnvironment, setShowEnvironment] = useState(false)
  const [showDocumentation, setShowDocumentation] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingEnv, setEditingEnv] = useState(null)
  const [editUrl, setEditUrl] = useState('')
  const { user, environment, environmentUrls, setEnvironmentUrl, setEnvironment, clearTokens, setSelectedEndpoint, setCurrentMethod, setCurrentUrl, setBody, addToFavorites, removeFromFavorites, favorites, selectedEndpoint } = useStore()

  const filteredEndpoints = useMemo(() => {
    return ENDPOINTS
  }, [])

  const handleSelectEndpoint = (endpoint) => {
    setSelectedEndpoint(endpoint)
    setCurrentMethod(endpoint.method)
    setCurrentUrl(`${environmentUrls[environment]}${endpoint.path}`)
    setBody('') // Clear body when switching endpoints
  }

  const toggleCategory = (category) => {
    setExpandedCategories(prev => 
      prev.includes(category)
        ? prev.filter(cat => cat !== category)
        : [...prev, category]
    )
  }

  const isCategoryExpanded = (category) => {
    return expandedCategories.includes(category)
  }

  const isFavorite = (endpointId) => {
    return favorites.some((fav) => fav.id === endpointId)
  }

  const handleToggleFavorite = (e, endpoint) => {
    e.stopPropagation()
    if (isFavorite(endpoint.id)) {
      removeFromFavorites(endpoint.id)
    } else {
      addToFavorites({
        id: endpoint.id,
        name: endpoint.name,
        method: endpoint.method,
        url: `${environmentUrls[environment]}${endpoint.path}`,
        body: '',
        headers: {},
        params: {},
      })
    }
  }

  const handleLogout = () => {
    clearTokens()
  }

  const handleEdit = (envValue) => {
    setEditingEnv(envValue)
    setEditUrl(environmentUrls[envValue])
  }

  const handleSave = () => {
    if (editUrl.trim()) {
      setEnvironmentUrl(editingEnv, editUrl)
    }
    setEditingEnv(null)
  }

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Endpoints</h2>
          <button
            onClick={onShowHistory}
            className="p-2 hover:bg-gray-100 rounded-lg transition text-gray-600 hover:text-gray-800"
            title="View history"
          >
            <FiClock size={18} />
          </button>
        </div>

        {/* Environment Switcher Toggle */}
        <div className="mb-3">
          <button
            onClick={() => setShowEnvironment(!showEnvironment)}
            className="w-full px-3 py-2 text-left bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-semibold text-gray-700 transition"
          >
            Environment {showEnvironment ? '▼' : '▶'}
          </button>
          
          {showEnvironment && (
            <div className="mt-2 space-y-3 p-2 bg-gray-50 rounded-lg border border-gray-200 max-h-80 overflow-y-auto">
              {/* Development Environment */}
              <div className={`rounded-lg border p-2 ${environment === 'development' ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => setEnvironment('development')}
                  className={`w-full px-2 py-1 rounded text-sm text-left font-semibold transition ${
                    environment === 'development'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Development
                </button>
                <p className="text-xs font-mono mt-1 break-all text-gray-600 px-2">{environmentUrls.development}</p>
                {editingEnv === 'development' ? (
                  <div className="mt-1 space-y-1">
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded font-mono"
                      placeholder="Enter base URL"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="flex-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingEnv(null)}
                        className="flex-1 px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('development')}
                    className="w-full mt-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Edit URL
                  </button>
                )}
              </div>

              {/* Production Environment */}
              <div className={`rounded-lg border p-2 ${environment === 'production' ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}>
                <button
                  onClick={() => setEnvironment('production')}
                  className={`w-full px-2 py-1 rounded text-sm text-left font-semibold transition ${
                    environment === 'production'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Production
                </button>
                <p className="text-xs font-mono mt-1 break-all text-gray-600 px-2">{environmentUrls.production}</p>
                {editingEnv === 'production' ? (
                  <div className="mt-1 space-y-1">
                    <input
                      type="text"
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded font-mono"
                      placeholder="Enter base URL"
                    />
                    <div className="flex gap-1">
                      <button
                        onClick={handleSave}
                        className="flex-1 px-2 py-1 text-xs bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingEnv(null)}
                        className="flex-1 px-2 py-1 text-xs bg-gray-400 text-white rounded hover:bg-gray-500"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEdit('production')}
                    className="w-full mt-1 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                  >
                    Edit URL
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Documentation Section */}
      <div className="px-4 py-3 border-b border-gray-200">
        <button
          onClick={() => setShowDocumentation(!showDocumentation)}
          className="w-full px-3 py-2 text-left bg-purple-100 hover:bg-purple-200 rounded-lg text-sm font-semibold text-purple-700 transition"
        >
          Documentation {showDocumentation ? '▼' : '▶'}
        </button>

        {showDocumentation && (
          <div className="mt-2 space-y-2 p-3 bg-purple-50 rounded-lg border border-purple-200 text-xs text-gray-700 max-h-72 overflow-y-auto">
            <div className="space-y-3">
              {/* Getting Started */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">🚀 Getting Started</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Log in using your admin or doctor credentials</li>
                  <li>• Your session will be saved across refreshes</li>
                  <li>• Click your email to view profile details</li>
                </ul>
              </div>

              {/* Environment Setup */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">⚙️ Environment Setup</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Click "Environment ▼" to view dev/prod settings</li>
                  <li>• Click "Edit URL" to customize API endpoints</li>
                  <li>• URLs update automatically when changed</li>
                </ul>
              </div>

              {/* Using Endpoints */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">📋 Using Endpoints</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Expand categories to see available endpoints</li>
                  <li>• <span className="bg-green-100 text-green-700 px-1 rounded">🔓</span> = Public (no auth)</li>
                  <li>• <span className="bg-red-100 text-red-700 px-1 rounded">🔒</span> = Protected (auth required)</li>
                  <li>• ⭐ = Favorite endpoint (click to toggle)</li>
                </ul>
              </div>

              {/* Making Requests */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">📤 Making Requests</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Click an endpoint to select it</li>
                  <li>• Click "Load Example" to populate data</li>
                  <li>• Edit Body, Headers, or Params tabs</li>
                  <li>• Click "Send" to execute the request</li>
                </ul>
              </div>

              {/* Request Tabs */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">🔧 Request Tabs</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• <strong>Body:</strong> JSON data (POST, PUT)</li>
                  <li>• <strong>Headers:</strong> Custom HTTP headers</li>
                  <li>• <strong>Params:</strong> Query parameters (?key=value)</li>
                </ul>
              </div>

              {/* View Response */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">📊 View Response</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Response shown on the right panel</li>
                  <li>• Status code indicates success/error</li>
                  <li>• Response time and size displayed</li>
                  <li>• View headers and body separately</li>
                </ul>
              </div>

              {/* History */}
              <div>
                <h4 className="font-semibold text-purple-900 mb-1">⏱️ Request History</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Click clock icon to view last 10 requests</li>
                  <li>• Click any request to load it again</li>
                  <li>• Useful for replaying requests</li>
                </ul>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded p-2 mt-2">
                <h4 className="font-semibold text-blue-900 mb-1">💡 Pro Tips</h4>
                <ul className="space-y-1 text-gray-700">
                  <li>• Use ⭐ to quickly find favorite endpoints</li>
                  <li>• All data is saved in localStorage</li>
                  <li>• Change environment URLs without logging out</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
        <p className="text-xs text-gray-600">Logged in as:</p>
        <button
          onClick={() => setShowUserModal(true)}
          className="text-sm font-semibold text-blue-600 hover:text-blue-800 hover:underline transition text-left"
        >
          {user?.email}
        </button>
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center justify-center gap-2 px-3 py-2 text-sm bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
        >
          <FiLogOut size={14} />
          Logout
        </button>
      </div>

      {/* Endpoints List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {Object.entries(filteredEndpoints).length === 0 ? (
          <p className="text-gray-500 text-sm text-center py-8">No endpoints found</p>
        ) : (
          Object.entries(filteredEndpoints).map(([category, endpoints]) => (
            <div key={category}>
              <button
                onClick={() => toggleCategory(category)}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100 transition"
              >
                <span className="font-semibold text-gray-700 text-sm">{category}</span>
                <span className="text-xs text-gray-500">
                  {isCategoryExpanded(category) ? '▼' : '▶'}
                </span>
              </button>

              {isCategoryExpanded(category) && (
                <div className="ml-2 space-y-1 mt-2">
                  {endpoints.map((endpoint) => (
                    <div
                      key={endpoint.id}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition cursor-pointer ${
                        selectedEndpoint?.id === endpoint.id
                          ? 'bg-blue-200 hover:bg-blue-300 shadow-sm'
                          : 'hover:bg-blue-100 bg-gray-50'
                      }`}
                      onClick={() => handleSelectEndpoint(endpoint)}
                    >
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(endpoint.method)}`}>
                        {endpoint.method}
                      </span>
                      <span className={`text-xs flex-1 truncate font-medium ${
                        selectedEndpoint?.id === endpoint.id
                          ? 'text-blue-900'
                          : 'text-gray-700'
                      }`}>
                        {endpoint.name}
                      </span>
                      {/* Access Level Badge */}
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full font-semibold whitespace-nowrap ${
                          endpoint.isProtected
                            ? 'bg-red-100 text-red-700'
                            : 'bg-green-100 text-green-700'
                        }`}
                        title={endpoint.isProtected ? 'Protected - Authentication required' : 'Public - No authentication required'}
                      >
                        {endpoint.isProtected ? '🔒' : '🔓'}
                      </span>
                      <button
                        onClick={(e) => handleToggleFavorite(e, endpoint)}
                        className={`opacity-0 group-hover:opacity-100 transition ${
                          isFavorite(endpoint.id) ? 'text-yellow-500' : 'text-gray-400'
                        }`}
                      >
                        <FiStar size={14} fill={isFavorite(endpoint.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-200 text-xs text-gray-500 text-center">
        <p>ARU API Tester v1.0</p>
      </div>

      {/* User Details Modal */}
      <UserDetailsModal
        user={user}
        isOpen={showUserModal}
        onClose={() => setShowUserModal(false)}
      />
    </div>
  )
}

export default Sidebar
