import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, BarChart3, Calendar, Bot, LogIn } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'
import ThemeSelector from './ThemeSelector'
import UserProfile from './UserProfile'
import LoginModal from './LoginModal'

const MobileNavigation = ({ currentView, onViewChange }) => {
  const { theme } = useTheme()
  const { isAuthenticated } = useUser()
  const [isOpen, setIsOpen] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, emoji: '🏠' },
    { id: 'analytics', label: 'Analytics', icon: BarChart3, emoji: '📊' },
    { id: 'events', label: 'Eventos', icon: Calendar, emoji: '📅' },
    { id: 'ai', label: 'IA Assistant', icon: Bot, emoji: '🤖' },
  ]

  const handleNavClick = (viewId) => {
    onViewChange(viewId)
    setIsOpen(false)
  }

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`md:hidden p-2 rounded-lg ${theme.hover} transition-colors relative z-50`}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <X className={`w-5 h-5 ${theme.text}`} />
          ) : (
            <Menu className={`w-5 h-5 ${theme.text}`} />
          )}
        </motion.div>
      </button>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-800 shadow-2xl z-50 md:hidden border-l border-gray-200 dark:border-gray-700`}
            >
              {/* Header */}
              <div className={`bg-gradient-to-r ${theme.primary} p-4`}>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      className="text-xl"
                    >
                      🎉
                    </motion.div>
                    <h2 className="font-bold">Menú</h2>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Items */}
              <div className="p-4 bg-white dark:bg-gray-800 min-h-full">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon
                    const isActive = currentView === item.id
                    
                    return (
                      <motion.button
                        key={item.id}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? `bg-gradient-to-r ${theme.primary} text-white shadow-lg`
                            : `text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600`
                        }`}
                      >
                        <div className="text-2xl">{item.emoji}</div>
                        <div className="flex-1 text-left">
                          <div className="font-medium">{item.label}</div>
                          <div className={`text-xs opacity-75 ${isActive ? 'text-white/80' : theme.textSecondary}`}>
                            {item.id === 'dashboard' && 'Vista principal'}
                            {item.id === 'analytics' && 'Estadísticas'}
                            {item.id === 'events' && 'Gestionar eventos'}
                            {item.id === 'ai' && 'Asistente inteligente'}
                          </div>
                        </div>
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-3 h-3 bg-white rounded-full"
                          />
                        )}
                      </motion.button>
                    )
                  })}
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 dark:border-gray-600 my-6"></div>

                {/* Settings Section */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Configuración
                  </h3>
                  
                  {/* Theme Selector */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className={`flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-xl">🎨</div>
                      <div>
                        <div className="font-medium text-gray-800 dark:text-white">Tema</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Personalizar colores</div>
                      </div>
                    </div>
                    <ThemeSelector />
                  </motion.div>

                  {/* User Profile or Login */}
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors`}
                  >
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center gap-3">
                          <div className="text-xl">👤</div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800 dark:text-white">Perfil</div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Configurar cuenta</div>
                          </div>
                        </div>
                        <div className="mt-2">
                          <UserProfile />
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => {
                          setShowLogin(true)
                          setIsOpen(false)
                        }}
                        className="w-full flex items-center gap-3"
                      >
                        <div className="text-xl">🔐</div>
                        <div className="flex-1 text-left">
                          <div className="font-medium text-gray-800 dark:text-white">Admin</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Acceso restringido</div>
                        </div>
                        <LogIn className="w-4 h-4 text-gray-400" />
                      </button>
                    )}
                  </motion.div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700 -mx-4 px-4 pb-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    🎉 Fam.ParAreMacPobReaBerCas v1.1
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      {/* Login Modal */}
      {showLogin && (
        <LoginModal onClose={() => setShowLogin(false)} />
      )}
    </>
  )
}

export default MobileNavigation