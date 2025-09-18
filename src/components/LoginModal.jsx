import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X, Mail, Lock, Eye, EyeOff, Star } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'
import { useUser } from '../contexts/UserContext'

const LoginModal = ({ onClose }) => {
  const { theme } = useTheme()
  const { login } = useUser()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.email.trim()) {
      newErrors.email = 'El usuario es requerido'
    }

    if (!formData.password.trim()) {
      newErrors.password = 'La contraseña es requerida'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        login(data.user)
        onClose()
      } else {
        setErrors({ general: data.error || 'Error al iniciar sesión' })
      }
    } catch (error) {
      setErrors({ general: 'Error de conexión' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end pt-20 pr-4 z-[60]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, x: 50 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.8, opacity: 0, x: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`${theme.card} rounded-lg shadow-xl w-80 max-w-[90vw] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className={`text-lg font-semibold ${theme.text}`}>Acceso</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {errors.general && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Email Field */}
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>
              Usuario
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.email ? 'border-red-500' : `border-gray-300 ${theme.card} ${theme.text}`
                }`}
              placeholder="Usuario o email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className={`block text-sm font-medium ${theme.text} mb-2`}>
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-3 py-2 pr-10 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${errors.password ? 'border-red-500' : `border-gray-300 ${theme.card} ${theme.text}`
                  }`}
                placeholder="Contraseña"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verificando...
                </div>
              ) : (
                'Ingresar'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default LoginModal