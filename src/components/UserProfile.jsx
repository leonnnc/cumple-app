import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Trophy, Star, Flame, Settings, LogOut, Key, Crown } from 'lucide-react'
import { useUser } from '../contexts/UserContext'
import ChangePasswordModal from './ChangePasswordModal'

const UserProfile = () => {
  const { user, points, badges, streak, logout } = useUser()
  const [showProfile, setShowProfile] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold relative">
          {user.photo ? (
            <img src={user.photo} alt={user.name} className="w-full h-full object-cover rounded-full" />
          ) : (
            user.name?.charAt(0).toUpperCase() || 'U'
          )}
          {user.isAdmin && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center">
              <Crown className="w-2 h-2 text-white" />
            </div>
          )}
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
          {user.name}
          {user.isAdmin && <Star className="w-3 h-3 text-yellow-500" />}
        </span>
      </button>

      {showProfile && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 min-w-80 z-50"
        >
          {/* User Info */}
          <div className="text-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-2 relative overflow-hidden">
              {user.photo ? (
                <img src={user.photo} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user.name?.charAt(0).toUpperCase() || 'U'
              )}
              {user.isAdmin && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
                  <Crown className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <h3 className="font-semibold text-gray-800 dark:text-white">{user.name}</h3>
              {user.isAdmin && (
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                  <Star className="w-3 h-3" />
                  <span>Admin</span>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-yellow-500 mb-1">
                <Star className="w-4 h-4" />
                <span className="font-bold">{points}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Puntos</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-orange-500 mb-1">
                <Flame className="w-4 h-4" />
                <span className="font-bold">{streak}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Racha</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                <Trophy className="w-4 h-4" />
                <span className="font-bold">{badges.length}</span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400">Badges</p>
            </div>
          </div>

          {/* Recent Badges */}
          {badges.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Badges Recientes</h4>
              <div className="flex gap-2 flex-wrap">
                {badges.slice(-3).map((badge, index) => (
                  <div
                    key={badge.id}
                    className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1"
                    title={badge.description}
                  >
                    <span className="text-sm">{badge.icon}</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-2">
            {user.isAdmin && (
              <button 
                onClick={() => {
                  setShowChangePassword(true)
                  setShowProfile(false)
                }}
                className="w-full flex items-center gap-2 p-2 text-left hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg transition-colors"
              >
                <Key className="w-4 h-4" />
                <span className="text-sm">Cambiar Contraseña</span>
              </button>
            )}
            <button className="w-full flex items-center gap-2 p-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-sm">Configuración</span>
            </button>
            <button
              onClick={logout}
              className="w-full flex items-center gap-2 p-2 text-left hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm">Cerrar Sesión</span>
            </button>
          </div>
          
          {/* Change Password Modal */}
          {showChangePassword && (
            <ChangePasswordModal onClose={() => setShowChangePassword(false)} />
          )}
        </motion.div>
      )}
    </div>
  )
}

export default UserProfile