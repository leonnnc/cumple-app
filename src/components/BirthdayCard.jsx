import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Gift, MessageCircle, Sparkles, Phone, MessageSquare, Send, Mail, MoreHorizontal, Edit, Trash2 } from 'lucide-react'
import { format, differenceInDays, isToday, isTomorrow } from 'date-fns'
import { es } from 'date-fns/locale'
import { useUser } from '../contexts/UserContext'
import CommunicationHub from './CommunicationHub'

// Función para parsear fechas correctamente evitando problemas de zona horaria
const parseLocalDate = (dateString) => {
  const [year, month, day] = dateString.split('-').map(Number)
  return new Date(year, month - 1, day) // month - 1 porque los meses en JS van de 0-11
}

const BirthdayCard = ({ birthday, onCelebrate, onEdit, onDelete, isToday = false, delay = 0 }) => {
  const { user } = useUser()
  const [showMoreActions, setShowMoreActions] = useState(false)
  const [showCommunicationHub, setShowCommunicationHub] = useState(false)
  const birthDate = parseLocalDate(birthday.birthDate)
  const today = new Date()
  const daysUntil = differenceInDays(birthDate, today)
  
  const getTimeUntilText = () => {
    if (isToday) return '¡Hoy es su cumpleaños!'
    if (isTomorrow(birthDate)) return 'Mañana'
    if (daysUntil > 0) return `En ${daysUntil} días`
    if (daysUntil < 0) return `Hace ${Math.abs(daysUntil)} días`
    return 'Hoy'
  }

  const getAge = () => {
    const age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1
    }
    return age
  }

  const handleWhatsAppShare = () => {
    const message = `🎉 ¡Feliz cumpleaños ${birthday.name}! 🎂 Que tengas un día maravilloso lleno de alegría y sorpresas. ¡Muchas felicidades! 🎈✨`
    const phoneNumber = birthday.phone ? birthday.phone.replace(/[\s\-\(\)]/g, '') : ''
    const whatsappUrl = phoneNumber 
      ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handlePhoneCall = () => {
    if (birthday.phone) {
      window.open(`tel:${birthday.phone}`, '_self')
    }
  }

  const handleSendSMS = () => {
    if (birthday.phone) {
      const message = `🎉 ¡Feliz cumpleaños ${birthday.name}! Que tengas un día maravilloso. 🎂✨`
      const smsUrl = `sms:${birthday.phone}?body=${encodeURIComponent(message)}`
      window.open(smsUrl, '_self')
    }
  }

  const handleTelegramShare = () => {
    const message = `🎉 ¡Feliz cumpleaños ${birthday.name}! 🎂 Que tengas un día increíble lleno de alegría y sorpresas. ¡Muchas felicidades! 🎈✨`
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(message)}`
    window.open(telegramUrl, '_blank')
  }

  const handleEmailShare = () => {
    const subject = `🎉 ¡Feliz cumpleaños ${birthday.name}!`
    const body = `Hola,\n\n🎂 Hoy es el cumpleaños de ${birthday.name} y quería recordártelo.\n\n¡Que tengan un día maravilloso lleno de alegría y celebración!\n\n🎈 Saludos cordiales`
    const emailUrl = `mailto:${birthday.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    window.open(emailUrl, '_self')
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`birthday-card p-6 ${isToday ? 'ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-orange-50' : ''}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl overflow-hidden ${
            isToday ? 'bg-yellow-100' : 'bg-purple-100'
          }`}>
            {birthday.photo ? (
              <img 
                src={birthday.photo} 
                alt={birthday.name} 
                className="w-full h-full object-cover"
              />
            ) : (
              birthday.name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{birthday.name}</h3>
            <p className="text-sm text-gray-600">{birthday.email}</p>
            {birthday.phone && (
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {birthday.phone}
              </p>
            )}
          </div>
        </div>
        {isToday && (
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🎉
          </motion.div>
        )}
      </div>

      {/* Birthday Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">
            {format(birthDate, 'dd MMMM yyyy', { locale: es })}
          </span>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Gift className="w-4 h-4" />
          <span className="text-sm">
            {getAge()} años {isToday ? '¡hoy!' : ''}
          </span>
        </div>
        <div className={`flex items-center gap-2 ${isToday ? 'text-orange-600 font-semibold' : 'text-gray-600'}`}>
          <Sparkles className="w-4 h-4" />
          <span className="text-sm">{getTimeUntilText()}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        {/* Primary Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => onCelebrate(birthday)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
              isToday 
                ? 'bg-gradient-to-r from-yellow-400 to-orange-400 text-white hover:from-yellow-500 hover:to-orange-500' 
                : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
            }`}
          >
            🎂 Celebrar
          </button>
          
          <button
            onClick={() => setShowMoreActions(!showMoreActions)}
            className="py-2 px-4 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300"
            title="Más opciones"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>

        {/* Expanded Actions */}
        {showMoreActions && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-2 gap-2"
          >
            {/* WhatsApp */}
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 py-2 px-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-300 text-sm"
              title={birthday.phone ? `WhatsApp a ${birthday.phone}` : "Compartir en WhatsApp"}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>

            {/* SMS */}
            {birthday.phone && (
              <button
                onClick={handleSendSMS}
                className="flex items-center gap-2 py-2 px-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors duration-300 text-sm"
                title={`Enviar SMS a ${birthday.phone}`}
              >
                <MessageSquare className="w-4 h-4" />
                SMS
              </button>
            )}

            {/* Phone Call */}
            {birthday.phone && (
              <button
                onClick={handlePhoneCall}
                className="flex items-center gap-2 py-2 px-3 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors duration-300 text-sm"
                title={`Llamar a ${birthday.phone}`}
              >
                <Phone className="w-4 h-4" />
                Llamar
              </button>
            )}

            {/* Email */}
            <button
              onClick={handleEmailShare}
              className="flex items-center gap-2 py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-300 text-sm"
              title={`Enviar email a ${birthday.email}`}
            >
              <Mail className="w-4 h-4" />
              Email
            </button>

            {/* Telegram */}
            <button
              onClick={handleTelegramShare}
              className="flex items-center gap-2 py-2 px-3 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 transition-colors duration-300 text-sm"
              title="Compartir en Telegram"
            >
              <Send className="w-4 h-4" />
              Telegram
            </button>

            {/* Admin Actions */}
            {user?.isAdmin && (
              <>
                <button
                  onClick={() => onEdit && onEdit(birthday)}
                  className="flex items-center gap-2 py-2 px-3 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors duration-300 text-sm"
                  title="Editar cumpleaños"
                >
                  <Edit className="w-4 h-4" />
                  Editar
                </button>
                
                <button
                  onClick={() => onDelete && onDelete(birthday.id)}
                  className="flex items-center gap-2 py-2 px-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors duration-300 text-sm"
                  title="Eliminar cumpleaños"
                >
                  <Trash2 className="w-4 h-4" />
                  Eliminar
                </button>
              </>
            )}

            {/* Communication Hub */}
            <button
              onClick={() => setShowCommunicationHub(true)}
              className="flex items-center gap-2 py-2 px-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors duration-300 text-sm col-span-2"
              title="Centro de comunicación avanzado"
            >
              <MessageCircle className="w-4 h-4" />
              Centro de Comunicación
            </button>
          </motion.div>
        )}
      </div>

      {/* Communication Hub Modal */}
      {showCommunicationHub && (
        <CommunicationHub
          person={birthday}
          onClose={() => setShowCommunicationHub(false)}
        />
      )}
    </motion.div>
  )
}

export default BirthdayCard