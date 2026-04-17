import React, { useState } from 'react'
import { FiGlobe } from 'react-icons/fi'
import useStore from '../store'

const EnvironmentSwitcher = () => {
  const { environment, setEnvironment, environmentUrls, setEnvironmentUrl } = useStore()
  const [editingEnv, setEditingEnv] = useState(null)
  const [editUrl, setEditUrl] = useState('')

  const environments = [
    {
      name: 'Development',
      value: 'development',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Production',
      value: 'production',
      color: 'bg-red-100 text-red-700'
    }
  ]

  const currentEnv = environments.find(env => env.value === environment)
  const currentUrl = environmentUrls[environment]

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
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <FiGlobe size={20} className="text-gray-600" />
        <h3 className="font-semibold text-gray-800">Environment</h3>
      </div>
      
      <div className="space-y-2">
        {environments.map((env) => (
          <div
            key={env.value}
            className={`p-3 rounded-lg border-2 transition ${
              environment === env.value
                ? `${env.color} border-current`
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <button
              onClick={() => setEnvironment(env.value)}
              className="w-full text-left"
            >
              <p className="font-semibold text-sm">{env.name}</p>
              <p className="text-xs opacity-75 font-mono mt-1 break-all">{environmentUrls[env.value]}</p>
            </button>
            
            {editingEnv === env.value ? (
              <div className="mt-2 space-y-2">
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
                onClick={() => handleEdit(env.value)}
                className="w-full mt-2 px-2 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Edit URL
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 font-semibold mb-1">Current Base URL:</p>
        <p className="text-xs font-mono text-gray-700 break-all">{currentUrl}</p>
      </div>
    </div>
  )
}

export default EnvironmentSwitcher
