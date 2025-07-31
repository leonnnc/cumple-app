import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Palette, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeSelector = () => {
  const { currentTheme, themes, changeTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const handleThemeChange = (themeKey) => {
    changeTheme(themeKey)
    setIsOpen(false) // Cerrar el modal después de seleccionar
  }

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <Palette className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-4 min-w-52 z-50"
            >
              <h3 className="font-semibold text-gray-800 dark:text-white mb-3">
                🎨 Seleccionar Tema
              </h3>
              <div className="space-y-2">
                {Object.entries(themes).map(([key, theme]) => (
                  <button
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200 ${
                      currentTheme === key 
                        ? 'bg-purple-100 dark:bg-purple-900 border border-purple-300 dark:border-purple-700' 
                        : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${theme.primary} shadow-sm`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex-1 text-left">
                      {theme.name}
                    </span>
                    {currentTheme === key && (
                      <Check className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ThemeSelector