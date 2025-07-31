import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, ChevronLeft, BarChart3, X, Minimize2 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const FloatingStats = ({ stats, isVisible = true }) => {
  const { theme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)

  if (!isVisible) return null

  return (
    <div className="fixed top-24 right-4 z-30 hidden lg:block">
      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ opacity: 0, x: 100, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className={`${theme.card} rounded-2xl shadow-2xl ${theme.border} border backdrop-blur-md bg-opacity-95 overflow-hidden`}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r ${theme.primary} p-2`}>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-1">
                  <BarChart3 className="w-3 h-3" />
                  <h3 className="text-xs font-semibold">Stats</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title={isExpanded ? "Contraer" : "Expandir"}
                  >
                    {isExpanded ? (
                      <ChevronRight className="w-3 h-3" />
                    ) : (
                      <ChevronLeft className="w-3 h-3" />
                    )}
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-1 hover:bg-white/20 rounded transition-colors"
                    title="Minimizar"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-3">
                    <div className="grid grid-cols-1 gap-2">
                      {stats.map((stat, index) => (
                        <motion.div
                          key={stat.title}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`bg-gradient-to-r ${stat.color} rounded-md p-2 text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-102 cursor-pointer`}
                          whileHover={{ y: -1 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-center justify-center gap-1 text-center">
                            <stat.icon className="w-3 h-3 text-white/80 flex-shrink-0" />
                            <span className="text-xs font-medium text-white/90 truncate">
                              {stat.title}:
                            </span>
                            <span className="text-sm font-bold flex-shrink-0">
                              {stat.value}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Línea divisoria */}
                    <div className={`border-t ${theme.border} my-2 opacity-30`}></div>
                    
                    {/* Footer */}
                    <div className="text-center">
                      <p className={`text-xs ${theme.textSecondary} opacity-75`}>
                        ⚡ En tiempo real
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimized Button */}
      <AnimatePresence>
        {isMinimized && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsMinimized(false)}
            className={`bg-gradient-to-r ${theme.primary} text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110`}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
          >
            <BarChart3 className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FloatingStats