import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MessageSquare,
  Send,
  Video,
  Copy,
  Share2
} from 'lucide-react'
// Función toast temporal (reemplazar con react-hot-toast después de instalar)
const toast = {
  success: (message) => alert(`✅ ${message}`),
  error: (message) => alert(`❌ ${message}`)
}
import SocialShareButtons from './SocialShareButtons'

const CommunicationHub = ({ person, message, onClose }) => {
  const [customMessage, setCustomMessage] = useState(message || '')
  // Mensaje por defecto si no se proporciona uno
  const defaultMessage = customMessage || `🎉 ¡Feliz cumpleaños ${person.name}! 🎂 Que tengas un día maravilloso lleno de alegría y sorpresas. ¡Muchas felicidades! 🎈✨`

  const copyMessage = () => {
    const messageToUse = customMessage || defaultMessage
    navigator.clipboard.writeText(messageToUse)
    toast.success('Mensaje copiado al portapapeles')
  }

  const shareNative = async () => {
    const messageToUse = customMessage || defaultMessage
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Mensaje para ${person.name}`,
          text: messageToUse,
          url: window.location.href
        })
        toast.success('Compartido exitosamente')
      } catch (error) {
        if (error.name !== 'AbortError') {
          toast.error('Error al compartir')
        }
      }
    } else {
      copyMessage()
    }
  }

  const quickMessages = [
    `🎉 ¡Feliz cumpleaños ${person.name}! Que tengas un día maravilloso 🎂`,
    `🎈 ¡Muchas felicidades en tu día especial! Que todos tus deseos se cumplan ✨`,
    `🎊 ¡Feliz cumpleaños! Espero que disfrutes mucho tu celebración 🎁`,
    `🎂 ¡Que tengas un cumpleaños increíble lleno de alegría y sorpresas! 🌟`
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Hub de Comunicación</h2>
              <p className="text-purple-100">Contactar a {person.name}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Person Info */}
          <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {person.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">{person.name}</h3>
              <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                {person.email && (
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    {person.email}
                  </div>
                )}
                {person.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3" />
                    {person.phone}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Message Editor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Personalizar Mensaje
            </label>
            <textarea
              value={customMessage || defaultMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white resize-none"
              rows="4"
              placeholder="Escribe tu mensaje personalizado..."
            />
            
            {/* Quick Messages */}
            <div className="mt-3">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Mensajes rápidos:</p>
              <div className="flex flex-wrap gap-2">
                {quickMessages.map((msg, index) => (
                  <button
                    key={index}
                    onClick={() => setCustomMessage(msg)}
                    className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                  >
                    Mensaje {index + 1}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Social Share Integration */}
          <SocialShareButtons 
            person={person} 
            message={customMessage || defaultMessage}
          />

          {/* Additional Actions */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={copyMessage}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <Copy className="w-4 h-4" />
              Copiar
            </button>
            
            <button
              onClick={shareNative}
              className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CommunicationHub