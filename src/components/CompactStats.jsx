import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart3, X, Minimize2 } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const CompactStats = ({ stats, isVisible = true }) => {
  const { theme } = useTheme()
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
            {/* Stats en una línea horizontal - Sin header */}
            <div className="p-2 relative">
              {/* Botón minimizar flotante */}
              <button
                onClick={() => setIsMinimized(true)}
                className="absolute -top-1 -right-1 p-1 bg-gray-500 hover:bg-gray-600 text-white rounded-full transition-colors z-10"
                title="Minimizar"
              >
                <X className="w-3 h-3" />
              </button>
              
              <div className="grid grid-cols-4 gap-1">
                {stats.map((stat, index) => (
                  <motion.div
                    key={stat.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`bg-gradient-to-r ${stat.color} rounded-md p-2 text-white shadow-sm hover:shadow-md transition-all duration-200 hover:scale-105 cursor-pointer min-h-[40px] flex items-center justify-center`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-center gap-1 text-center">
                      <stat.icon className="w-3 h-3 text-white/80 flex-shrink-0" />
                      <span className="text-sm font-bold leading-none">
                        {stat.value}
                      </span>
                      <span className="text-xs font-medium text-white/90 leading-none">
                        {stat.title}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>


            </div>
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

export default CompactStats