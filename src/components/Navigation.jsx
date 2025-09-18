import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Home, BarChart3, Calendar, Bot, LogIn } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'
import ThemeSelector from './ThemeSelector'
import UserProfile from './UserProfile'
import MobileNavigation from './MobileNavigation'
import LoginModal from './LoginModal'

const Navigation = ({ currentView, onViewChange }) => {
  const { theme } = useTheme()
  const { isAuthenticated } = useUser()
  const [showLogin, setShowLogin] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'events', label: 'Eventos', icon: Calendar },
    { id: 'ai', label: 'IA Assistant', icon: Bot },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 ${theme.card} border-b border-gray-200 dark:border-gray-700 backdrop-blur-md bg-opacity-90`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="text-2xl"
            >
              🎉
            </motion.div>
            <h1 className={`text-xl font-bold ${theme.text}`}>
              Fam.ParAreMacPobReaBerCas
            </h1>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              
              return (
                <button
                  key={item.id}
                  onClick={() => onViewChange(item.id)}
                  className={`relative px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                      : `${theme.textSecondary} hover:bg-gray-100 dark:hover:bg-gray-700`
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg -z-10"
                      initial={false}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Desktop - Always visible */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeSelector />
              {isAuthenticated ? (
                <UserProfile />
              ) : (
                <button
                  onClick={() => setShowLogin(true)}
                  className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Acceso administrador"
                >
                  <LogIn className="w-4 h-4" />
                </button>
              )}
            </div>
            
            {/* Mobile - Hamburger Menu */}
            <MobileNavigation currentView={currentView} onViewChange={onViewChange} />
          </div>
          
          {/* Login Modal */}
          {showLogin && (
            <LoginModal onClose={() => setShowLogin(false)} />
          )}
        </div>


      </div>
    </nav>
  )
}

export default Navigation