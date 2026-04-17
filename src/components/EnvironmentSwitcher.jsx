import React from 'react'
import { FiGlobe } from 'react-icons/fi'
import useStore from '../store'

const EnvironmentSwitcher = () => {
  const { environment, setEnvironment } = useStore()

  const environments = [
    {
      name: 'Development',
      value: 'development',
      url: 'http://localhost:3000/api/v1.0',
      color: 'bg-blue-100 text-blue-700'
    },
    {
      name: 'Production',
      value: 'production',
      url: 'https://api.example.com/api/v1.0',
      color: 'bg-red-100 text-red-700'
    }
  ]

  const currentEnv = environments.find(env => env.value === environment)

  return (
    <div className="fixed bottom-6 right-6 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center gap-3 mb-4">
        <FiGlobe size={20} className="text-gray-600" />
        <h3 className="font-semibold text-gray-800">Environment</h3>
      </div>
      
      <div className="space-y-2">
        {environments.map((env) => (
          <button
            key={env.value}
            onClick={() => setEnvironment(env.value)}
            className={`w-full text-left p-3 rounded-lg border-2 transition ${
              environment === env.value
                ? `${env.color} border-current`
                : 'border-gray-200 hover:border-gray-300 text-gray-700'
            }`}
          >
            <p className="font-semibold text-sm">{env.name}</p>
            <p className="text-xs opacity-75 font-mono mt-1">{env.url}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-xs text-gray-600 font-semibold mb-1">Current Base URL:</p>
        <p className="text-xs font-mono text-gray-700 break-all">{currentEnv?.url}</p>
      </div>
    </div>
  )
}

export default EnvironmentSwitcher
