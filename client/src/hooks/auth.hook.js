import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)
  const [role, setRole] = useState(null)
  const [email, setEmail] = useState(null)

  const login = useCallback((jwtToken, id, userEmail, userRole) => {
    setToken(jwtToken)
    setUserId(id)
    setEmail(userEmail)
    setRole(userRole)

    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, email: userEmail, role: userRole
    }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setEmail(null)
    setRole(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      login(data.token, data.userId, data.email, data.role)
    }
    setReady(true)
  }, [login])

  return { login, logout, token, userId, ready, role, email }
}
