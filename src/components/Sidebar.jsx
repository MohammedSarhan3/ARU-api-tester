import React, { useState, useMemo } from 'react'
import { FiStar, FiLogOut, FiClock } from 'react-icons/fi'
import { ENDPOINTS, getMethodColor } from '../data/endpoints'
import useStore from '../store'

const Sidebar = ({ onShowHistory }) => {
  const [expandedCategories, setExpandedCategories] = useState(['Admin Auth'])
  const [showEnvironment, setShowEnvironment] = useState(false)
  const { user, environment, environmentUrls, setEnvironment, clearTokens, setSelectedEndpoint, setCurrentMethod, setCurrentUrl, setBody, addToFavorites, removeFromFavorites, favorites, selectedEndpoint } = useStore()

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
        url: `http://localhost:3000/api/v1.0${endpoint.path}`,
        body: '',
        headers: {},
        params: {},
      })
    }
  }

  const handleLogout = () => {
    clearTokens()
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
            <div className="mt-2 space-y-2 p-2 bg-gray-50 rounded-lg border border-gray-200">
              <button
                onClick={() => setEnvironment('development')}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left transition ${
                  environment === 'development'
                    ? 'bg-blue-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Development
              </button>
              <button
                onClick={() => setEnvironment('production')}
                className={`w-full px-3 py-2 rounded-lg text-sm text-left transition ${
                  environment === 'production'
                    ? 'bg-red-500 text-white font-semibold'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Production
              </button>
            </div>
          )}
        </div>
      </div>

      {/* User Info */}
      <div className="px-4 py-3 bg-blue-50 border-b border-gray-200">
        <p className="text-xs text-gray-600">Logged in as:</p>
        <p className="text-sm font-semibold text-gray-800">{user?.email}</p>
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
    </div>
  )
}

export default Sidebar
