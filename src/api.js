import axios from 'axios'
import useStore from './store'

const createApiClient = () => {
  const client = axios.create({
    timeout: 10000,
  })

  // Add response interceptor to handle 401 errors
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // If 401 and not already retrying
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
          const refreshResult = await refreshAccessToken()
          if (refreshResult.success) {
            // Retry the original request with new token
            const newToken = useStore.getState().accessToken
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return client(originalRequest)
          }
        } catch (err) {
          console.error('Token refresh failed:', err)
          useStore.getState().clearTokens()
        }
      }

      return Promise.reject(error)
    }
  )

  return client
}

export const makeRequest = async (method, url, data, headers, params) => {
  const client = createApiClient()
  const accessToken = useStore.getState().accessToken

  const config = {
    method,
    url,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
    params,
  }

  if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
    config.data = typeof data === 'string' ? JSON.parse(data) : data
  }

  try {
    const startTime = performance.now()
    const response = await client(config)
    const endTime = performance.now()
    const time = Math.round(endTime - startTime)
    const size = new Blob([JSON.stringify(response.data)]).size

    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers,
      time,
      size,
    }
  } catch (error) {
    if (error.response) {
      const time = Math.round(error.config.timeout)
      const size = error.response.data ? new Blob([JSON.stringify(error.response.data)]).size : 0
      return {
        success: false,
        data: error.response.data,
        status: error.response.status,
        headers: error.response.headers,
        time,
        size,
        message: error.message,
      }
    }
    return {
      success: false,
      message: error.message,
      data: null,
      status: 0,
    }
  }
}

export const login = async (email, password, isAdmin = true) => {
  const endpoint = isAdmin ? '/auth/admins/login' : '/auth/doctors/login'
  const response = await makeRequest(
    'POST',
    `http://localhost:3000/api/v1.0${endpoint}`,
    { email, password },
    { 'Content-Type': 'application/json' }
  )

  console.log('📡 LOGIN API FULL RESPONSE:', JSON.stringify(response, null, 2))

  // Handle different response formats
  let token = null
  let refreshToken = null

  if (response.success && response.data) {
    // Try tokens.access and tokens.refresh (your backend format)
    if (response.data.tokens) {
      token = response.data.tokens.access
      refreshToken = response.data.tokens.refresh
    }
    
    // Try direct accessToken / refreshToken
    if (!token) {
      token = response.data.accessToken
      refreshToken = response.data.refreshToken
    }

    // Try nested in data.data
    if (!token && response.data.data) {
      token = response.data.data.accessToken || response.data.data.tokens?.access
      refreshToken = response.data.data.refreshToken || response.data.data.tokens?.refresh
    }

    // Try under result
    if (!token && response.data.result) {
      token = response.data.result.accessToken || response.data.result.tokens?.access
      refreshToken = response.data.result.refreshToken || response.data.result.tokens?.refresh
    }

    // Try under token field directly
    if (!token && response.data.token) {
      token = response.data.token
    }

    // Try under auth
    if (!token && response.data.auth) {
      token = response.data.auth.accessToken || response.data.auth.token || response.data.auth.tokens?.access
      refreshToken = response.data.auth.refreshToken || response.data.auth.tokens?.refresh
    }
  }

  console.log('🔑 Tokens extracted:', {
    hasToken: !!token,
    tokenLength: token?.length || 0,
    hasRefreshToken: !!refreshToken
  })

  if (token) {
    console.log('✅ Setting tokens in store...')
    
    // Extract user data from response
    let userData = { email, role: isAdmin ? 'admin' : 'doctor' }
    
    // Try to extract more user data from various response formats
    if (response.data?.user) {
      userData = { ...userData, ...response.data.user }
    } else if (response.data?.data?.user) {
      userData = { ...userData, ...response.data.data.user }
    } else if (response.data?.result?.user) {
      userData = { ...userData, ...response.data.result.user }
    } else if (response.data?.admin) {
      userData = { ...userData, ...response.data.admin }
    } else if (response.data?.doctor) {
      userData = { ...userData, ...response.data.doctor }
    } else if (response.data?.data?.admin) {
      userData = { ...userData, ...response.data.data.admin }
    } else if (response.data?.data?.doctor) {
      userData = { ...userData, ...response.data.data.doctor }
    }
    
    console.log('👤 User data extracted:', userData)
    
    useStore.getState().setTokens(token, refreshToken || '')
    useStore.getState().setUser(userData)
    
    // Verify tokens were set
    const storeState = useStore.getState()
    console.log('✅ Store updated:', {
      isLoggedIn: storeState.isLoggedIn,
      hasAccessToken: !!storeState.accessToken,
      user: storeState.user
    })
    
    return { ...response, success: true }
  } else {
    console.error('❌ No token found in response')
    console.error('❌ Response data structure:', response.data)
    return { 
      ...response, 
      success: false, 
      message: 'No authentication token in response'
    }
  }
}

export const refreshAccessToken = async () => {
  const refreshToken = useStore.getState().refreshToken
  if (!refreshToken) return { success: false }

  const client = axios.create({ timeout: 10000 })

  try {
    const response = await client.post(
      'http://localhost:3000/api/v1.0/auth/admins/refresh',
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (response.data.data?.accessToken) {
      useStore.getState().setTokens(
        response.data.data.accessToken,
        response.data.data.refreshToken || refreshToken
      )
      return { success: true, data: response.data.data }
    }
    return { success: false }
  } catch (error) {
    console.error('Refresh token error:', error)
    useStore.getState().clearTokens()
    return { success: false, message: error.message }
  }
}

export const logout = async (refreshToken) => {
  try {
    await makeRequest(
      'POST',
      'http://localhost:3000/api/v1.0/auth/admins/logout',
      { refreshToken },
      { 'Content-Type': 'application/json' }
    )
  } catch (error) {
    console.error('Logout error:', error)
  }
  useStore.getState().clearTokens()
}

