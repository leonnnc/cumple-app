import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const themes = {
  light: {
    name: 'Claro',
    primary: 'from-purple-500 to-pink-500',
    secondary: 'from-blue-500 to-blue-600',
    background: 'bg-gradient-to-br from-purple-50 to-pink-50',
    card: 'bg-white shadow-lg',
    text: 'text-gray-800',
    textSecondary: 'text-gray-600',
    border: 'border-gray-200',
    hover: 'hover:bg-gray-50'
  },
  dark: {
    name: 'Oscuro',
    primary: 'from-purple-400 to-pink-400',
    secondary: 'from-blue-400 to-blue-500',
    background: 'bg-gradient-to-br from-gray-900 to-gray-800',
    card: 'bg-gray-800 shadow-2xl border border-gray-700',
    text: 'text-white',
    textSecondary: 'text-gray-300',
    border: 'border-gray-600',
    hover: 'hover:bg-gray-700'
  },
  ocean: {
    name: 'Océano',
    primary: 'from-blue-500 to-teal-500',
    secondary: 'from-cyan-500 to-blue-500',
    background: 'bg-gradient-to-br from-blue-50 to-teal-50',
    card: 'bg-white shadow-lg border border-blue-100',
    text: 'text-gray-800',
    textSecondary: 'text-blue-700',
    border: 'border-blue-200',
    hover: 'hover:bg-blue-50'
  },
  sunset: {
    name: 'Atardecer',
    primary: 'from-orange-500 to-red-500',
    secondary: 'from-yellow-500 to-orange-500',
    background: 'bg-gradient-to-br from-orange-50 to-red-50',
    card: 'bg-white shadow-lg border border-orange-100',
    text: 'text-gray-800',
    textSecondary: 'text-orange-700',
    border: 'border-orange-200',
    hover: 'hover:bg-orange-50'
  },
  forest: {
    name: 'Bosque',
    primary: 'from-green-500 to-emerald-500',
    secondary: 'from-teal-500 to-green-500',
    background: 'bg-gradient-to-br from-green-50 to-emerald-50',
    card: 'bg-white shadow-lg border border-green-100',
    text: 'text-gray-800',
    textSecondary: 'text-green-700',
    border: 'border-green-200',
    hover: 'hover:bg-green-50'
  }
}

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('birthday-app-theme')
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme)
    }
  }, [])

  const changeTheme = (themeName) => {
    if (themes[themeName]) {
      setCurrentTheme(themeName)
      localStorage.setItem('birthday-app-theme', themeName)
    }
  }

  const theme = themes[currentTheme]

  return (
    <ThemeContext.Provider value={{
      currentTheme,
      theme,
      themes,
      changeTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}