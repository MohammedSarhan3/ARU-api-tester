import React, { useState, useEffect } from 'react'
import { FiSend, FiCopy, FiX, FiDownload } from 'react-icons/fi'
import { makeRequest } from '../api'
import useStore from '../store'
import { ENDPOINTS } from '../data/endpoints'

const METHODS = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH']

const RequestPanel = () => {
  const [activeTab, setActiveTab] = useState('body')
  const [headerInput, setHeaderInput] = useState('')
  const [paramInput, setParamInput] = useState('')
  const [headers, setHeaders] = useState({})
  const [params, setParams] = useState({})
  const [pathParams, setPathParams] = useState({})
  const [loadFeedback, setLoadFeedback] = useState('')

  const {
    currentMethod,
    currentUrl,
    body,
    isLoading,
    selectedEndpoint,
    environment,
    environmentUrls,
    refreshToken,
    accessToken,
    setCurrentMethod,
    setCurrentUrl,
    setBody,
    setResponse,
    setIsLoading,
    addToHistory,
  } = useStore()

  // Clear path parameters when endpoint selection changes
  useEffect(() => {
    setPathParams({})
    setLoadFeedback('')
  }, [selectedEndpoint])

  // Update URL when environment changes
  useEffect(() => {
    if (selectedEndpoint) {
      setCurrentUrl(`${environmentUrls[environment]}${selectedEndpoint.path}`)
    }
  }, [environment, environmentUrls, selectedEndpoint, setCurrentUrl])

  const handleAddHeader = () => {
    if (headerInput.trim()) {
      const [key, value] = headerInput.split(':').map((s) => s.trim())
      if (key && value) {
        setHeaders({ ...headers, [key]: value })
        setHeaderInput('')
      }
    }
  }

  const handleRemoveHeader = (key) => {
    const newHeaders = { ...headers }
    delete newHeaders[key]
    setHeaders(newHeaders)
  }

  const handleAddParam = () => {
    if (paramInput.trim()) {
      const [key, value] = paramInput.split('=').map((s) => s.trim())
      if (key) {
        setParams({ ...params, [key]: value || '' })
        setParamInput('')
      }
    }
  }

  const handleRemoveParam = (key) => {
    const newParams = { ...params }
    delete newParams[key]
    setParams(newParams)
  }

  const handleLoadExample = () => {
    if (selectedEndpoint?.example) {
      // Handle path parameters (like :adminId)
      if (selectedEndpoint.example.pathParams) {
        setPathParams({ ...selectedEndpoint.example.pathParams })
        
        let url = currentUrl
        Object.entries(selectedEndpoint.example.pathParams).forEach(([key, value]) => {
          url = url.replace(`:${key}`, value)
        })
        setCurrentUrl(url)
      }
      
      // Load query parameters if they exist in the example
      if (selectedEndpoint.example.params) {
        setParams({ ...selectedEndpoint.example.params })
      }
      
      // Clear previous headers if loading a new example with body
      if (selectedEndpoint.example.body) {
        setHeaders({})
      }
      
      // Load headers if they exist in the example
      if (selectedEndpoint.example.headers) {
        let exampleHeaders = { ...selectedEndpoint.example.headers }
        
        // Replace placeholder access token with actual token if available
        if (accessToken && exampleHeaders.Authorization) {
          exampleHeaders.Authorization = `Bearer ${accessToken}`
        }
        
        setHeaders(exampleHeaders)
      }
      
      // Load body if it exists in the example
      if (selectedEndpoint.example.body) {
        let exampleBody = selectedEndpoint.example.body
        
        // Replace placeholder tokens with actual tokens if available
        if (refreshToken && exampleBody.includes('refreshToken')) {
          exampleBody = exampleBody.replace(
            /"refreshToken":\s*"[^"]*"/,
            `"refreshToken": "${refreshToken}"`
          )
        }
        
        setBody(exampleBody)
        setActiveTab('body')
      } else if (selectedEndpoint.example.headers) {
        // If only headers exist, switch to headers tab
        setActiveTab('headers')
      }
      
      // Show feedback
      setLoadFeedback('✓ Example loaded!')
      setTimeout(() => setLoadFeedback(''), 2000)
    }
  }

  const handleSendRequest = async () => {
    setIsLoading(true)
    try {
      const response = await makeRequest(
        currentMethod,
        currentUrl,
        body,
        headers,
        params
      )

      if (response.success) {
        setResponse(response.data, response.status, response.headers, response.time, response.size)
      } else {
        setResponse(response.data || null, response.status, response.headers || {}, response.time || 0, response.size || 0)
      }

      // Add to history
      addToHistory({
        id: Date.now(),
        method: currentMethod,
        url: currentUrl,
        body,
        headers,
        params,
        timestamp: new Date().toISOString(),
      })
    } catch (err) {
      console.error('Request error:', err)
      setResponse({ error: err.message }, 0, {}, 0, 0)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 space-y-3">
        {/* Method and URL */}
        <div className="flex gap-2">
          <select
            value={currentMethod}
            onChange={(e) => setCurrentMethod(e.target.value)}
            className="px-3 py-2 bg-blue-100 text-blue-800 font-semibold rounded-lg border border-blue-300 outline-none"
          >
            {METHODS.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          <input
            type="text"
            value={currentUrl}
            onChange={(e) => setCurrentUrl(e.target.value)}
            placeholder="Enter URL"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
          />
          <button
            onClick={handleSendRequest}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold flex items-center gap-2 whitespace-nowrap"
          >
            <FiSend size={16} />
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </div>

        {/* Endpoint info and Load Example button */}
        {selectedEndpoint && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div>
                <p className="text-xs text-gray-600">Selected endpoint:</p>
                <p className="text-sm font-semibold text-gray-800">{selectedEndpoint.name}</p>
              </div>
              <div className="flex items-center gap-2">
                {loadFeedback && (
                  <span className="text-sm text-green-600 font-medium">{loadFeedback}</span>
                )}
                {selectedEndpoint.example && (
                  <button
                    onClick={handleLoadExample}
                    className="flex items-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition text-sm font-medium"
                  >
                    <FiDownload size={14} />
                    Load Example
                  </button>
                )}
              </div>
            </div>

            {/* Path Parameters Section */}
            {Object.keys(pathParams).length > 0 && selectedEndpoint?.example?.pathParams && (
              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                <p className="text-xs font-semibold text-amber-900 mb-2">📍 Path Parameters</p>
                <div className="space-y-2">
                  {Object.entries(pathParams).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <label className="text-sm font-mono font-semibold text-amber-800 min-w-24">:{key}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => {
                          const newPathParams = { ...pathParams, [key]: e.target.value }
                          setPathParams(newPathParams)
                          
                          // Update URL with new path parameter value
                          let url = selectedEndpoint.path
                          Object.entries(newPathParams).forEach(([k, v]) => {
                            url = url.replace(`:${k}`, v)
                          })
                          setCurrentUrl(`http://localhost:3000/api/v1.0${url}`)
                        }}
                        className="flex-1 px-2 py-1 border border-amber-300 rounded text-sm font-mono bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {['body', 'headers', 'params'].map((tab) => (
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
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">Request Body (JSON)</label>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder='{\n  "key": "value"\n}'
              className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm resize-none"
            />
            
            {/* Body Explanation */}
            {selectedEndpoint?.example?.bodyExplain && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs font-semibold text-blue-900 mb-2">📋 Body Fields Reference:</p>
                <div className="space-y-1 text-xs">
                  {Object.entries(selectedEndpoint.example.bodyExplain).map(([field, explanation]) => (
                    <div key={field} className="flex gap-2">
                      <span className="font-mono font-semibold text-blue-700 min-w-24">{field}:</span>
                      <span className="text-blue-800 flex-1">{explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Headers Tab */}
        {activeTab === 'headers' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={headerInput}
                onChange={(e) => setHeaderInput(e.target.value)}
                placeholder="Key: Value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddHeader()}
              />
              <button
                onClick={handleAddHeader}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {Object.entries(headers).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm">
                    <span className="font-mono font-semibold text-gray-800">{key}:</span>
                    <span className="font-mono text-gray-600 ml-2">{value}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveHeader(key)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Params Tab */}
        {activeTab === 'params' && (
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={paramInput}
                onChange={(e) => setParamInput(e.target.value)}
                placeholder="key=value"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                onKeyPress={(e) => e.key === 'Enter' && handleAddParam()}
              />
              <button
                onClick={handleAddParam}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition text-sm font-medium"
              >
                Add
              </button>
            </div>

            <div className="space-y-2">
              {Object.entries(params).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between p-3 bg-gray-100 rounded-lg">
                  <div className="text-sm">
                    <span className="font-mono font-semibold text-gray-800">{key}=</span>
                    <span className="font-mono text-gray-600">{value}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveParam(key)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <FiX size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Query Parameters Explanation */}
            {selectedEndpoint?.example?.bodyExplain && (
              <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-xs font-semibold text-purple-900 mb-2">📋 Query Parameters Reference:</p>
                <div className="space-y-1 text-xs">
                  {Object.entries(selectedEndpoint.example.bodyExplain).map(([field, explanation]) => (
                    <div key={field} className="flex gap-2">
                      <span className="font-mono font-semibold text-purple-700 min-w-24">{field}:</span>
                      <span className="text-purple-800 flex-1">{explanation}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default RequestPanel
