import React from 'react'
import { useTheme } from '../contexts/ThemeContext'

const VersionBadge = () => {
  const { theme } = useTheme()
  const version = '1.2.4' // Versión actual del proyecto

  return (
    <div 
      className={`
        px-2 py-1 rounded-full text-xs font-mono
        ${theme.background === 'bg-white' 
          ? 'bg-gray-50 text-gray-400 border border-gray-100' 
          : 'bg-gray-900 text-gray-500 border border-gray-800'
        }
        transition-all duration-300 hover:scale-105 cursor-default
        select-none opacity-50 hover:opacity-80
        backdrop-blur-sm
      `}
      title={`Familia ParAreMacPobReaBerCas v${version} - Click para más info`}
      onClick={() => {
        console.log(`🎉 Familia ParAreMacPobReaBerCas v${version}`)
        console.log('📅 Release Date: 18/09/2025')
        console.log('🚀 GitHub: https://github.com/leonnnc/cumple-app')
      }}
    >
      v{version}
    </div>
  )
}

export default VersionBadge