import React, { createContext, useContext, useState, useEffect } from 'react'

const UserContext = createContext()

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [points, setPoints] = useState(0)
  const [badges, setBadges] = useState([])
  const [streak, setStreak] = useState(0)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check for saved user data
    const savedUser = localStorage.getItem('birthday-app-user')
    const savedPoints = localStorage.getItem('birthday-app-points')
    const savedBadges = localStorage.getItem('birthday-app-badges')
    const savedStreak = localStorage.getItem('birthday-app-streak')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
    if (savedPoints) setPoints(parseInt(savedPoints))
    if (savedBadges) setBadges(JSON.parse(savedBadges))
    if (savedStreak) setStreak(parseInt(savedStreak))
  }, [])

  const login = (userData) => {
    const userWithAdmin = {
      ...userData,
      isAdmin: Boolean(userData.isAdmin)
    }
    setUser(userWithAdmin)
    setIsAuthenticated(true)
    localStorage.setItem('birthday-app-user', JSON.stringify(userWithAdmin))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('birthday-app-user')
  }

  const addPoints = (amount) => {
    const newPoints = points + amount
    setPoints(newPoints)
    localStorage.setItem('birthday-app-points', newPoints.toString())
    
    // Check for new badges
    checkForNewBadges(newPoints)
  }

  const addBadge = (badge) => {
    const newBadges = [...badges, { ...badge, earnedAt: new Date().toISOString() }]
    setBadges(newBadges)
    localStorage.setItem('birthday-app-badges', JSON.stringify(newBadges))
  }

  const updateStreak = (newStreak) => {
    setStreak(newStreak)
    localStorage.setItem('birthday-app-streak', newStreak.toString())
  }

  const checkForNewBadges = (currentPoints) => {
    const availableBadges = [
      { id: 'first_birthday', name: 'Primer Cumpleaños', description: 'Agregaste tu primer cumpleaños', icon: '🎂', requirement: 'first_add' },
      { id: 'point_collector', name: 'Coleccionista', description: 'Obtuviste 100 puntos', icon: '⭐', requirement: 100 },
      { id: 'social_butterfly', name: 'Mariposa Social', description: 'Compartiste 10 cumpleaños', icon: '🦋', requirement: 'share_10' },
      { id: 'streak_master', name: 'Maestro de Rachas', description: 'Mantuviste una racha de 7 días', icon: '🔥', requirement: 'streak_7' },
      { id: 'celebration_king', name: 'Rey de Celebraciones', description: 'Celebraste 25 cumpleaños', icon: '👑', requirement: 'celebrate_25' }
    ]

    availableBadges.forEach(badge => {
      const alreadyHas = badges.some(b => b.id === badge.id)
      if (!alreadyHas) {
        if (badge.requirement === currentPoints || 
            (typeof badge.requirement === 'number' && currentPoints >= badge.requirement)) {
          addBadge(badge)
        }
      }
    })
  }

  return (
    <UserContext.Provider value={{
      user,
      points,
      badges,
      streak,
      isAuthenticated,
      login,
      logout,
      addPoints,
      addBadge,
      updateStreak
    }}>
      {children}
    </UserContext.Provider>
  )
}