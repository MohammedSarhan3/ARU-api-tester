import { create } from 'zustand'

const useStore = create((set) => ({
  // Auth state
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isLoggedIn: !!localStorage.getItem('accessToken'),

  // Request/Response state
  currentMethod: 'GET',
  currentUrl: 'http://localhost:3000/api/v1.0',
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

  // History & Favorites
  requestHistory: JSON.parse(localStorage.getItem('requestHistory') || '[]'),
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),

  // Actions
  setUser: (user) => set({ user }),
  setTokens: (accessToken, refreshToken) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    set({ accessToken, refreshToken, isLoggedIn: true })
  },
  clearTokens: () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
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
  setEnvironment: (env) => set({ environment: env }),
  
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
