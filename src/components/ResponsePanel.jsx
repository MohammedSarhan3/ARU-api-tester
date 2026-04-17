import React, { useState } from 'react'
import { FiCopy, FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { getStatusColor, getStatusBgColor, formatJSON, highlightJSON } from '../utils'
import useStore from '../store'

const ResponsePanel = () => {
  const [activeTab, setActiveTab] = useState('body')
  const [expandedHeaders, setExpandedHeaders] = useState({})
  const [copied, setCopied] = useState(false)
  const { response, responseStatus, responseHeaders, responseTime, responseSize, isLoading } = useStore()

  const handleCopyResponse = () => {
    if (response) {
      const text = typeof response === 'string' ? response : JSON.stringify(response, null, 2)
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const toggleHeaderExpand = (headerKey) => {
    setExpandedHeaders((prev) => ({
      ...prev,
      [headerKey]: !prev[headerKey],
    }))
  }

  if (!response && !responseStatus) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Response</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-500 text-base">No response yet</p>
            <p className="text-gray-400 text-sm mt-2">Send a request to see the response</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {/* Status and Meta Info */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`px-4 py-2 rounded-lg font-bold ${getStatusBgColor(responseStatus)} ${getStatusColor(responseStatus)}`}>
              {responseStatus || 'N/A'}
            </div>
            <div className="text-sm text-gray-600">
              <span className="font-semibold">{responseTime}ms</span>
              <span className="mx-2">•</span>
              <span>{responseSize} B</span>
            </div>
          </div>
          <button
            onClick={handleCopyResponse}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition ${
              copied
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <FiCopy size={14} />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>

        {isLoading && (
          <div className="w-full bg-blue-100 text-blue-800 px-3 py-2 rounded-lg text-sm">
            Loading response...
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {['body', 'headers'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium transition border-b-2 ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Body Tab */}
        {activeTab === 'body' && (
          <div>
            {response ? (
              <pre
                className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto whitespace-pre-wrap break-words"
                dangerouslySetInnerHTML={{
                  __html: highlightJSON(response),
                }}
              />
            ) : (
              <p className="text-gray-500">No response body</p>
            )}
          </div>
        )}

        {/* Headers Tab */}
        {activeTab === 'headers' && (
          <div className="space-y-2">
            {Object.entries(responseHeaders).length === 0 ? (
              <p className="text-gray-500">No headers</p>
            ) : (
              Object.entries(responseHeaders).map(([headerKey, headerValue]) => (
                <div
                  key={headerKey}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => toggleHeaderExpand(headerKey)}
                    className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <span className="font-mono font-semibold text-gray-800 text-sm">
                      {headerKey}
                    </span>
                    {expandedHeaders[headerKey] ? (
                      <FiChevronDown size={16} />
                    ) : (
                      <FiChevronRight size={16} />
                    )}
                  </button>
                  {expandedHeaders[headerKey] && (
                    <div className="px-4 py-3 bg-white border-t border-gray-200">
                      <p className="font-mono text-sm text-gray-600 break-all">
                        {Array.isArray(headerValue) ? headerValue.join(', ') : String(headerValue)}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ResponsePanel
