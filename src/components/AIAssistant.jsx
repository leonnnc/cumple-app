import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Bot, Send, Sparkles, MessageCircle, Copy, RefreshCw } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

// Función toast temporal (reemplazar con react-hot-toast después de instalar)
const toast = {
  success: (message) => alert(`✅ ${message}`),
  error: (message) => alert(`❌ ${message}`)
}

const AIAssistant = ({ person, onMessageGenerated }) => {
  const { theme } = useTheme()
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedMessage, setGeneratedMessage] = useState('')
  const [messageType, setMessageType] = useState('birthday')
  const [tone, setTone] = useState('friendly')
  const [customPrompt, setCustomPrompt] = useState('')

  const messageTypes = {
    birthday: 'Mensaje de cumpleaños',
    anniversary: 'Mensaje de aniversario',
    congratulations: 'Felicitaciones',
    thankyou: 'Agradecimiento',
    custom: 'Personalizado'
  }

  const tones = {
    friendly: 'Amigable',
    formal: 'Formal',
    funny: 'Divertido',
    emotional: 'Emotivo',
    professional: 'Profesional'
  }

  // Simulación de IA (en producción usarías OpenAI API)
  const generateMessage = async () => {
    setIsGenerating(true)
    
    try {
      // Simular delay de API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const messages = {
        birthday: {
          friendly: [
            `¡Feliz cumpleaños ${person?.name || '[Nombre]'}! 🎉 Espero que tengas un día increíble lleno de alegría, sorpresas y momentos especiales. ¡Que todos tus deseos se hagan realidad! 🎂✨`,
            `¡Hoy es tu día especial, ${person?.name || '[Nombre]'}! 🎈 Que este nuevo año de vida te traiga mucha felicidad, éxito y aventuras maravillosas. ¡Disfruta cada momento! 🎊`,
            `¡Felicidades en tu cumpleaños ${person?.name || '[Nombre]'}! 🎁 Eres una persona increíble y mereces toda la felicidad del mundo. ¡Que tengas un día fantástico! 🌟`
          ],
          formal: [
            `Estimado/a ${person?.name || '[Nombre]'}, le deseo un muy feliz cumpleaños. Que este nuevo año de vida le traiga prosperidad, salud y muchas bendiciones. Mis mejores deseos en su día especial.`,
            `En este día tan especial, quiero expresarle mis más sinceras felicitaciones por su cumpleaños, ${person?.name || '[Nombre]'}. Que disfrute de un día lleno de alegría junto a sus seres queridos.`
          ],
          funny: [
            `¡Feliz cumpleaños ${person?.name || '[Nombre]'}! 🎂 Otro año más sabio... ¡o al menos eso esperamos! 😄 Que tengas un día lleno de risas, pastel y cero responsabilidades de adulto. ¡A celebrar! 🎉`,
            `¡Hey ${person?.name || '[Nombre]'}! 🎈 Es tu cumpleaños y oficialmente tienes permiso para actuar como si tuvieras 5 años otra vez. ¡Que llueva confeti y pastel! 🍰✨`
          ]
        },
        anniversary: {
          friendly: [
            `¡Feliz aniversario ${person?.name || '[Nombre]'}! 💕 Que sigan escribiendo juntos una historia llena de amor, risas y momentos inolvidables. ¡Celebren este día especial! 🥂`,
            `¡Qué hermoso es celebrar otro año de amor y compañía! Feliz aniversario ${person?.name || '[Nombre]'}. Que su amor siga creciendo cada día más fuerte. 💖`
          ]
        },
        congratulations: {
          friendly: [
            `¡Felicitaciones ${person?.name || '[Nombre]'}! 🎊 Tu esfuerzo y dedicación han dado frutos. Mereces todo el éxito que está llegando a tu vida. ¡Sigue brillando! ⭐`,
            `¡Qué orgullo da verte alcanzar tus metas, ${person?.name || '[Nombre]'}! 🏆 Tus logros son inspiradores. ¡Celebra este momento porque te lo mereces! 🎉`
          ]
        }
      }

      let selectedMessages = messages[messageType]?.[tone] || messages.birthday.friendly
      
      if (messageType === 'custom' && customPrompt) {
        // En producción, aquí harías la llamada a OpenAI
        setGeneratedMessage(`Mensaje personalizado para ${person?.name || '[Nombre]'}: ${customPrompt}`)
      } else {
        const randomMessage = selectedMessages[Math.floor(Math.random() * selectedMessages.length)]
        setGeneratedMessage(randomMessage)
      }
      
      toast.success('¡Mensaje generado con IA!')
    } catch (error) {
      toast.error('Error al generar mensaje')
      console.error('Error generating message:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const copyMessage = () => {
    navigator.clipboard.writeText(generatedMessage)
    toast.success('Mensaje copiado al portapapeles')
  }

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(generatedMessage)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block text-6xl mb-4"
          >
            🤖
          </motion.div>
          <h2 className={`text-3xl font-bold ${theme.text} mb-2`}>
            Asistente IA para Mensajes
          </h2>
          <p className={`${theme.textSecondary} text-lg`}>
            Genera mensajes personalizados con inteligencia artificial
          </p>
        </div>

        <div className={`${theme.card} rounded-xl p-6 shadow-lg ${theme.border} border`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Tipo de Mensaje
              </label>
              <select
                value={messageType}
                onChange={(e) => setMessageType(e.target.value)}
                className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:ring-2 focus:ring-purple-500 ${theme.card} ${theme.text} transition-colors`}
              >
                {Object.entries(messageTypes).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Tono del Mensaje
              </label>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value)}
                className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:ring-2 focus:ring-purple-500 ${theme.card} ${theme.text} transition-colors`}
                disabled={messageType === 'custom'}
              >
                {Object.entries(tones).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>
          </div>

          {messageType === 'custom' && (
            <div className="mb-6">
              <label className={`block text-sm font-medium ${theme.text} mb-2`}>
                Describe el mensaje que quieres generar
              </label>
              <textarea
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="Ej: Un mensaje de felicitación por graduación universitaria, que sea emotivo y mencione el logro académico..."
                className={`w-full px-3 py-2 border ${theme.border} rounded-lg focus:ring-2 focus:ring-purple-500 ${theme.card} ${theme.text} transition-colors`}
                rows="3"
              />
            </div>
          )}

          <button
            onClick={generateMessage}
            disabled={isGenerating || (messageType === 'custom' && !customPrompt.trim())}
            className={`w-full bg-gradient-to-r ${theme.primary} text-white py-3 px-4 rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2`}
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Generando mensaje...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generar Mensaje con IA
              </>
            )}
          </button>
        </div>

        {generatedMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`${theme.card} rounded-xl p-6 ${theme.border} border shadow-lg`}
          >
            <div className="flex items-center gap-2 mb-4">
              <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              <span className={`font-medium text-purple-600 dark:text-purple-400`}>
                Mensaje Generado por IA
              </span>
            </div>
            
            <div className={`${theme.card} rounded-lg p-4 mb-4 ${theme.border} border`}>
              <p className={`${theme.text} leading-relaxed`}>
                {generatedMessage}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button
                onClick={copyMessage}
                className={`flex items-center gap-2 ${theme.card} ${theme.text} px-4 py-2 rounded-lg ${theme.hover} ${theme.border} border transition-colors`}
              >
                <Copy className="w-4 h-4" />
                Copiar
              </button>
              
              <button
                onClick={shareToWhatsApp}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp
              </button>
              
              <button
                onClick={generateMessage}
                className={`flex items-center gap-2 bg-gradient-to-r ${theme.primary} text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all`}
              >
                <RefreshCw className="w-4 h-4" />
                Regenerar
              </button>
            </div>
          </motion.div>
        )}

        <div className={`${theme.card} rounded-xl p-6 ${theme.border} border shadow-lg`}>
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
            <div>
              <h4 className={`font-medium ${theme.text} mb-2`}>
                💡 Consejos para mejores mensajes
              </h4>
              <ul className={`text-sm ${theme.textSecondary} space-y-1`}>
                <li>• Personaliza el mensaje con detalles específicos de la persona</li>
                <li>• Elige el tono apropiado según tu relación con la persona</li>
                <li>• Para mensajes personalizados, sé específico en tu descripción</li>
                <li>• Puedes regenerar el mensaje hasta encontrar el perfecto</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AIAssistant