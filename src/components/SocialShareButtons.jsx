import React from 'react'
import { motion } from 'framer-motion'
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  MessageSquare, 
  Send, 
  Video,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
  Share2
} from 'lucide-react'
// Función toast temporal (reemplazar con react-hot-toast después de instalar)
const toast = {
  success: (message) => alert(`✅ ${message}`),
  error: (message) => alert(`❌ ${message}`)
}

const SocialShareButtons = ({ person, message, compact = false }) => {
  const defaultMessage = message || `🎉 ¡Feliz cumpleaños ${person.name}! 🎂 Que tengas un día maravilloso lleno de alegría y sorpresas. ¡Muchas felicidades! 🎈✨`

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      textColor: 'text-green-700',
      bgColor: 'bg-green-100',
      action: () => {
        const phoneNumber = person.phone ? person.phone.replace(/[\s\-\(\)]/g, '') : ''
        const whatsappUrl = phoneNumber 
          ? `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`
          : `https://wa.me/?text=${encodeURIComponent(defaultMessage)}`
        window.open(whatsappUrl, '_blank')
        toast.success('Abriendo WhatsApp...')
      },
      available: true
    },
    {
      name: 'SMS',
      icon: MessageSquare,
      color: 'bg-blue-500 hover:bg-blue-600',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-100',
      action: () => {
        const smsUrl = `sms:${person.phone}?body=${encodeURIComponent(defaultMessage)}`
        window.open(smsUrl, '_self')
        toast.success('Abriendo SMS...')
      },
      available: !!person.phone
    },
    {
      name: 'Llamar',
      icon: Phone,
      color: 'bg-purple-500 hover:bg-purple-600',
      textColor: 'text-purple-700',
      bgColor: 'bg-purple-100',
      action: () => {
        window.open(`tel:${person.phone}`, '_self')
        toast.success('Iniciando llamada...')
      },
      available: !!person.phone
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-red-500 hover:bg-red-600',
      textColor: 'text-red-700',
      bgColor: 'bg-red-100',
      action: () => {
        const subject = `🎉 ¡Feliz cumpleaños ${person.name}!`
        const emailUrl = `mailto:${person.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(defaultMessage)}`
        window.open(emailUrl, '_self')
        toast.success('Abriendo email...')
      },
      available: !!person.email
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-sky-500 hover:bg-sky-600',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-100',
      action: () => {
        const telegramUrl = `https://t.me/share/url?text=${encodeURIComponent(defaultMessage)}`
        window.open(telegramUrl, '_blank')
        toast.success('Abriendo Telegram...')
      },
      available: true
    },
    {
      name: 'Video Call',
      icon: Video,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      textColor: 'text-indigo-700',
      bgColor: 'bg-indigo-100',
      action: () => {
        // Intenta diferentes opciones de video llamada
        if (person.phone) {
          window.open(`facetime:${person.phone}`, '_self')
        } else {
          window.open('https://meet.google.com/new', '_blank')
        }
        toast.success('Iniciando video llamada...')
      },
      available: !!person.phone
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-100',
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(defaultMessage)}`
        window.open(facebookUrl, '_blank')
        toast.success('Compartiendo en Facebook...')
      },
      available: true
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-400 hover:bg-sky-500',
      textColor: 'text-sky-700',
      bgColor: 'bg-sky-100',
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(defaultMessage)}&url=${encodeURIComponent(window.location.href)}`
        window.open(twitterUrl, '_blank')
        toast.success('Compartiendo en Twitter...')
      },
      available: true
    },
    {
      name: 'Instagram',
      icon: Instagram,
      color: 'bg-pink-500 hover:bg-pink-600',
      textColor: 'text-pink-700',
      bgColor: 'bg-pink-100',
      action: () => {
        // Instagram no permite compartir directamente via URL, pero podemos copiar el mensaje
        navigator.clipboard.writeText(defaultMessage)
        toast.success('Mensaje copiado. Pégalo en Instagram Stories!')
      },
      available: true
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      textColor: 'text-blue-700',
      bgColor: 'bg-blue-100',
      action: () => {
        const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
        window.open(linkedinUrl, '_blank')
        toast.success('Compartiendo en LinkedIn...')
      },
      available: true
    }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(defaultMessage)
    toast.success('Mensaje copiado al portapapeles')
  }

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `¡Feliz cumpleaños ${person.name}!`,
          text: defaultMessage,
          url: window.location.href
        })
        toast.success('Compartido exitosamente')
      } catch (error) {
        if (error.name !== 'AbortError') {
          copyToClipboard()
        }
      }
    } else {
      copyToClipboard()
    }
  }

  const availableOptions = shareOptions.filter(option => option.available)

  if (compact) {
    return (
      <div className="flex flex-wrap gap-2">
        {availableOptions.slice(0, 4).map((option, index) => {
          const Icon = option.icon
          return (
            <motion.button
              key={option.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={option.action}
              className={`p-2 rounded-lg ${option.bgColor} ${option.textColor} hover:scale-110 transition-all duration-200`}
              title={option.name}
            >
              <Icon className="w-4 h-4" />
            </motion.button>
          )
        })}
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          onClick={nativeShare}
          className="p-2 rounded-lg bg-gray-100 text-gray-700 hover:scale-110 transition-all duration-200"
          title="Más opciones"
        >
          <Share2 className="w-4 h-4" />
        </motion.button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
        Compartir Felicitación
      </h3>
      
      {/* Primary Communication */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          Comunicación Directa
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableOptions.slice(0, 6).map((option, index) => {
            const Icon = option.icon
            return (
              <motion.button
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={option.action}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg text-white transition-all transform hover:scale-105 ${option.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{option.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Social Media */}
      <div>
        <h4 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
          Redes Sociales
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {availableOptions.slice(6).map((option, index) => {
            const Icon = option.icon
            return (
              <motion.button
                key={option.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 6) * 0.1 }}
                onClick={option.action}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg text-white transition-all transform hover:scale-105 ${option.color}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{option.name}</span>
              </motion.button>
            )
          })}
        </div>
      </div>

      {/* Additional Actions */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copiar Mensaje
        </button>
        
        <button
          onClick={nativeShare}
          className="flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors"
        >
          <Share2 className="w-4 h-4" />
          Compartir Nativo
        </button>
      </div>
    </div>
  )
}

export default SocialShareButtons