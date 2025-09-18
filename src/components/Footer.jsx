import React from 'react'
import { useTheme } from '../contexts/ThemeContext'
import { Heart, Calendar, Code } from 'lucide-react'

const Footer = () => {
  const { theme } = useTheme()
  const currentYear = new Date().getFullYear()
  const version = '1.2.4'
  const creationYear = '2025'

  return (
    <footer className={`${theme.background} border-t ${theme.border} mt-auto`}>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Left Side - Creation Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span className={`text-sm ${theme.textSecondary}`}>
                Creado en {creationYear}
              </span>
            </div>
            <span className={`hidden sm:inline text-sm ${theme.textSecondary}`}>•</span>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              <span className={`text-sm ${theme.textSecondary}`}>
                Hecho con amor para la familia
              </span>
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="text-center">
            <p className={`text-sm ${theme.textSecondary}`}>
              © {currentYear} Familia ParAreMacPobReaBerCas
            </p>
            <p className={`text-xs ${theme.textSecondary} opacity-75`}>
              Todos los derechos reservados
            </p>
          </div>

          {/* Right Side - Version Info */}
          <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-right">
            <div className="flex items-center gap-2">
              <Code className="w-4 h-4 text-blue-500" />
              <span className={`text-sm ${theme.textSecondary}`}>
                Versión {version}
              </span>
            </div>
            <span className={`hidden sm:inline text-sm ${theme.textSecondary}`}>•</span>
            <span className={`text-xs ${theme.textSecondary} opacity-75`}>
              Sistema de Cumpleaños
            </span>
          </div>
        </div>

        {/* Bottom Line - Additional Info */}
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-center">
            <span className={`text-xs ${theme.textSecondary} opacity-75`}>
              🎂 Nunca olvides un cumpleaños importante
            </span>
            <span className={`hidden sm:inline text-xs ${theme.textSecondary} opacity-50`}>|</span>
            <span className={`text-xs ${theme.textSecondary} opacity-75`}>
              ✨ Celebra cada momento especial
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer