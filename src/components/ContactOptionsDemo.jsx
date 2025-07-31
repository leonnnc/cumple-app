import React, { useState } from 'react'
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
  Share2,
  Smartphone,
  Globe,
  Heart,
  Star
} from 'lucide-react'

const ContactOptionsDemo = () => {
  const [selectedPerson] = useState({
    name: 'María García',
    email: 'maria@ejemplo.com',
    phone: '+1 234 567 8900'
  })

  const communicationOptions = [
    {
      category: '📱 Comunicación Directa',
      options: [
        {
          name: 'WhatsApp',
          icon: MessageCircle,
          description: 'Envía mensaje directo al WhatsApp de la persona',
          color: 'bg-green-500',
          features: ['Mensaje personalizado', 'Envío directo al número', 'Emojis y formato']
        },
        {
          name: 'SMS',
          icon: MessageSquare,
          description: 'Envía mensaje de texto tradicional',
          color: 'bg-blue-500',
          features: ['Funciona sin internet', 'Llega a cualquier teléfono', 'Mensaje corto']
        },
        {
          name: 'Llamada',
          icon: Phone,
          description: 'Llama directamente al teléfono',
          color: 'bg-purple-500',
          features: ['Contacto inmediato', 'Conversación personal', 'Felicitación en vivo']
        },
        {
          name: 'Email',
          icon: Mail,
          description: 'Envía correo electrónico formal',
          color: 'bg-red-500',
          features: ['Mensaje largo', 'Adjuntar archivos', 'Formato profesional']
        },
        {
          name: 'Video Llamada',
          icon: Video,
          description: 'Inicia video llamada (FaceTime, Meet, Zoom)',
          color: 'bg-indigo-500',
          features: ['Cara a cara', 'Celebración visual', 'Grabación posible']
        }
      ]
    },
    {
      category: '🌐 Redes Sociales',
      options: [
        {
          name: 'Facebook',
          icon: Facebook,
          description: 'Comparte en Facebook para que otros vean',
          color: 'bg-blue-600',
          features: ['Alcance público', 'Comentarios de amigos', 'Fotos y videos']
        },
        {
          name: 'Instagram',
          icon: Instagram,
          description: 'Copia mensaje para Instagram Stories',
          color: 'bg-pink-500',
          features: ['Stories temporales', 'Stickers de cumpleaños', 'Visual atractivo']
        },
        {
          name: 'Twitter',
          icon: Twitter,
          description: 'Tweet público de felicitación',
          color: 'bg-sky-400',
          features: ['Mensaje público', 'Hashtags', 'Retweets']
        },
        {
          name: 'LinkedIn',
          icon: Linkedin,
          description: 'Felicitación profesional en LinkedIn',
          color: 'bg-blue-700',
          features: ['Red profesional', 'Contactos de trabajo', 'Imagen profesional']
        },
        {
          name: 'Telegram',
          icon: Send,
          description: 'Comparte en Telegram',
          color: 'bg-sky-500',
          features: ['Grupos grandes', 'Bots interactivos', 'Archivos grandes']
        }
      ]
    },
    {
      category: '🔧 Herramientas Adicionales',
      options: [
        {
          name: 'Copiar Mensaje',
          icon: Copy,
          description: 'Copia el mensaje al portapapeles',
          color: 'bg-gray-500',
          features: ['Usar en cualquier app', 'Personalizar después', 'Múltiples usos']
        },
        {
          name: 'Compartir Nativo',
          icon: Share2,
          description: 'Usa el menú de compartir del dispositivo',
          color: 'bg-orange-500',
          features: ['Todas las apps instaladas', 'Interfaz nativa', 'Más opciones']
        },
        {
          name: 'Centro de Comunicación',
          icon: Smartphone,
          description: 'Hub completo con todas las opciones',
          color: 'bg-purple-600',
          features: ['Todas las opciones', 'Mensajes personalizados', 'Interfaz unificada']
        }
      ]
    }
  ]

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl mb-4"
        >
          📱💬🎉
        </motion.div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
          Opciones de Comunicación Completas
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Tu app de cumpleaños ahora incluye múltiples formas de contactar y felicitar a las personas. 
          Desde WhatsApp hasta redes sociales, tienes todas las opciones cubiertas.
        </p>
      </div>

      {/* Demo Person */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white text-center"
      >
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-4">
          {selectedPerson.name.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold mb-2">{selectedPerson.name}</h2>
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            {selectedPerson.email}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            {selectedPerson.phone}
          </div>
        </div>
      </motion.div>

      {/* Communication Options */}
      {communicationOptions.map((category, categoryIndex) => (
        <motion.div
          key={category.category}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: categoryIndex * 0.2 }}
          className="space-y-4"
        >
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            {category.category}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.options.map((option, optionIndex) => {
              const Icon = option.icon
              return (
                <motion.div
                  key={option.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (categoryIndex * 0.2) + (optionIndex * 0.1) }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 ${option.color} rounded-lg flex items-center justify-center text-white`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 dark:text-white">
                        {option.name}
                      </h3>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {option.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Características:
                    </h4>
                    <ul className="space-y-1">
                      {option.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                          <Star className="w-3 h-3 text-yellow-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      ))}

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center border border-green-200 dark:border-green-800"
      >
        <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
          ¡Nunca más olvides felicitar a alguien!
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
          Con todas estas opciones de comunicación integradas, tu app de cumpleaños se convierte en 
          el centro de comunicación perfecto para mantener contacto con tus seres queridos en sus días especiales.
        </p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">10+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Plataformas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">5</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Métodos Directos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Redes Sociales</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">100%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Personalizable</div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ContactOptionsDemo