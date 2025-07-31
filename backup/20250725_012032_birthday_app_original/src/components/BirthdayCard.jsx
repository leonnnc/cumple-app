import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Gift, MessageCircle, Sparkles } from 'lucide-react'
import { format, differenceInDays, isToday, isTomorrow } from 'date-fns'
import { es } from 'date-fns/locale'

const BirthdayCard = ({ birthday, onCelebrate, isToday = false, delay = 0 }) => {
  const birthDate = new Date(birthday.birthDate)
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
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
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
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
            isToday ? 'bg-yellow-100' : 'bg-purple-100'
          }`}>
            {birthday.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{birthday.name}</h3>
            <p className="text-sm text-gray-600">{birthday.email}</p>
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
          onClick={handleWhatsAppShare}
          className="py-2 px-4 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors duration-300"
          title="Compartir en WhatsApp"
        >
          <MessageCircle className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  )
}

export default BirthdayCard