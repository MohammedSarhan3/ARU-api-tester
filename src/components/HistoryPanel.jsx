import React, { useState } from 'react'
import { FiX, FiCopy, FiTrash2, FiStar } from 'react-icons/fi'
import { getMethodColor } from '../data/endpoints'
import useStore from '../store'

const HistoryPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('history')
  const { requestHistory, favorites, removeFromFavorites, setCurrentMethod, setCurrentUrl, setBody } = useStore()

  const handleLoadRequest = (request) => {
    setCurrentMethod(request.method)
    setCurrentUrl(request.url)
    setBody(request.body || '')
  }

  const handleCopyRequest = (request) => {
    const requestText = `${request.method} ${request.url}\n\nBody:\n${request.body || 'N/A'}`
    navigator.clipboard.writeText(requestText)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">History & Favorites</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <FiX size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-4">
          {['history', 'favorites'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
                activeTab === tab
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab === 'history' ? 'History' : 'Favorites'}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {activeTab === 'history' && (
            <>
              {requestHistory.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No request history yet</p>
              ) : (
                requestHistory.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(request.method)}`}>
                            {request.method}
                          </span>
                          <code className="text-xs text-gray-600 truncate">{request.url}</code>
                        </div>
                        <p className="text-xs text-gray-500">
                          {new Date(request.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadRequest(request)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => handleCopyRequest(request)}
                          className="text-gray-400 hover:text-gray-600 transition"
                          title="Copy request"
                        >
                          <FiCopy size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {activeTab === 'favorites' && (
            <>
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No favorites yet</p>
              ) : (
                favorites.map((request) => (
                  <div
                    key={request.id}
                    className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-yellow-300 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <FiStar className="text-yellow-500" size={14} />
                          <span className={`px-2 py-1 rounded text-xs font-semibold ${getMethodColor(request.method)}`}>
                            {request.method}
                          </span>
                          <code className="text-xs text-gray-600 truncate">{request.url}</code>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleLoadRequest(request)}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => removeFromFavorites(request.id)}
                          className="text-red-400 hover:text-red-600 transition"
                          title="Remove favorite"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default HistoryPanel
