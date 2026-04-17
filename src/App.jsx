import React, { useState } from 'react'
import Sidebar from './components/Sidebar'
import RequestPanel from './components/RequestPanel'
import ResponsePanel from './components/ResponsePanel'
import HistoryPanel from './components/HistoryPanel'
import AuthModal from './components/AuthModal'
import useStore from './store'

function App() {
  const { isLoggedIn, user } = useStore()
  const [showHistoryPanel, setShowHistoryPanel] = useState(false)

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Show auth modal if not logged in */}
      {!isLoggedIn && (
        <AuthModal onClose={() => {}} />
      )}

      {/* History Panel */}
      <HistoryPanel isOpen={showHistoryPanel} onClose={() => setShowHistoryPanel(false)} />

      {isLoggedIn ? (
        <>
          {/* Left Sidebar */}
          <Sidebar onShowHistory={() => setShowHistoryPanel(true)} />

          {/* Main Content Area */}
          <div className="flex-1 flex gap-4 p-4 overflow-hidden">
            {/* Request Panel */}
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
              <RequestPanel />
            </div>

            {/* Response Panel */}
            <div className="flex-1 flex flex-col bg-white rounded-lg shadow-sm overflow-hidden">
              <ResponsePanel />
            </div>
          </div>
        </>
      ) : (
        <div className="w-full flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">ARU API Tester</h1>
            <p className="text-gray-600 mb-8">Please log in to continue</p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Open Login
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
