import { create } from 'zustand'

const useStore = create((set) => ({
  // Auth state
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isLoggedIn: !!localStorage.getItem('accessToken'),

  // Request/Response state
  currentMethod: 'GET',
  currentUrl: (() => {
    const urls = JSON.parse(localStorage.getItem('environmentUrls') || JSON.stringify({
      development: 'http://localhost:3000/api/v1.0',
      production: 'https://api.example.com/api/v1.0'
    }))
    return urls.development
  })(),
  headers: {},
  body: '',
  params: {},
  
  // Response state
  response: null,
  responseStatus: null,
  responseHeaders: {},
  responseTime: 0,
  responseSize: 0,
  isLoading: false,

  // UI state
  activeTab: 'body',
  selectedEndpoint: null,
  environment: 'development',
  environmentUrls: JSON.parse(localStorage.getItem('environmentUrls') || JSON.stringify({
    development: 'http://localhost:3000/api/v1.0',
    production: 'https://api.example.com/api/v1.0'
  })),

  // History & Favorites
  requestHistory: JSON.parse(localStorage.getItem('requestHistory') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  // Actions
  setUser: (user) => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    }
    set({ user })
  },
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({ accessToken, refreshToken, isLoggedIn: true })
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('user')
    set({ accessToken: null, refreshToken: null, isLoggedIn: false, user: null })
  },
  
  setCurrentMethod: (method) => set({ currentMethod: method }),
  setCurrentUrl: (url) => set({ currentUrl: url }),
  setHeaders: (headers) => set({ headers }),
  setBody: (body) => set({ body }),
  setParams: (params) => set({ params }),
  
  setResponse: (response, status, headers, time, size) => 
    set({ response, responseStatus: status, responseHeaders: headers, responseTime: time, responseSize: size }),
  setIsLoading: (isLoading) => set({ isLoading }),
  
  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedEndpoint: (endpoint) => set({ selectedEndpoint: endpoint }),
  setEnvironment: (env) => {
    set((state) => {
      const newCurrentUrl = state.selectedEndpoint 
        ? `${state.environmentUrls[env]}${state.selectedEndpoint.path}`
        : state.environmentUrls[env]
      return { environment: env, currentUrl: newCurrentUrl }
    })
  },
  setEnvironmentUrl: (env, url) => {
    set((state) => {
      const newUrls = { ...state.environmentUrls, [env]: url }
      localStorage.setItem('environmentUrls', JSON.stringify(newUrls))
      // If we just changed the URL for the active environment, update currentUrl
      const newCurrentUrl = state.environment === env 
        ? (state.selectedEndpoint 
          ? `${url}${state.selectedEndpoint.path}`
          : url)
        : state.currentUrl
      return { environmentUrls: newUrls, currentUrl: newCurrentUrl }
    })
  },
  
  addToHistory: (request) => {
    set((state) => {
      const newHistory = [request, ...state.requestHistory].slice(0, 10)
      localStorage.setItem('requestHistory', JSON.stringify(newHistory))
      return { requestHistory: newHistory }
    })
  },

  addToFavorites: (request) => {
    set((state) => {
      const newFavorites = [...state.favorites, request]
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },

  removeFromFavorites: (id) => {
    set((state) => {
      const newFavorites = state.favorites.filter((fav) => fav.id !== id)
      localStorage.setItem('favorites', JSON.stringify(newFavorites))
      return { favorites: newFavorites }
    })
  },
}))

export default useStore
