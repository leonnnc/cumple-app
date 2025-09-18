import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { X, MessageCircle, Share2, Download } from 'lucide-react'
import toast from 'react-hot-toast'
import Confetti from 'react-confetti'

const CelebrationModal = ({ person, onClose }) => {
  const [showConfetti, setShowConfetti] = useState(true)
  const [fireworks, setFireworks] = useState([])

  useEffect(() => {
    // Stop confetti after 5 seconds
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    
    // Create fireworks effect
    const createFirework = () => {
      const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd']
      const newFireworks = []
      
      for (let i = 0; i < 20; i++) {
        newFireworks.push({
          id: Math.random(),
          x: Math.random() * 100,
          y: Math.random() * 100,
          color: colors[Math.floor(Math.random() * colors.length)],
          delay: Math.random() * 2
        })
      }
      
      setFireworks(newFireworks)
      
      // Clear fireworks after animation
      setTimeout(() => setFireworks([]), 3000)
    }
    
    createFirework()
    const fireworkInterval = setInterval(createFirework, 3000)
    
    return () => {
      clearTimeout(timer)
      clearInterval(fireworkInterval)
    }
  }, [])

  const handleWhatsAppShare = () => {
    const message = `🎉 ¡Feliz cumpleaños ${person.name}! 🎂\n\n¡Que tengas un día maravilloso lleno de alegría, sorpresas y momentos especiales! 🎈✨\n\n¡Muchas felicidades en tu día especial! 🎊🎁`
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `¡Feliz cumpleaños ${person.name}!`,
          text: `🎉 Hoy es el cumpleaños de ${person.name}! 🎂`,
          url: window.location.href
        })
      } catch (error) {
        // Error sharing
      }
    } else {
      // Fallback: copy to clipboard
      const text = `🎉 ¡Feliz cumpleaños ${person.name}! 🎂 ¡Que tengas un día maravilloso!`
      navigator.clipboard.writeText(text)
      toast.success('¡Mensaje copiado al portapapeles!')
    }
  }

  const downloadCelebrationCard = () => {
    // Create a simple celebration card as data URL
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 800
    canvas.height = 600
    
    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 800, 600)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 800, 600)
    
    // Text
    ctx.fillStyle = 'white'
    ctx.font = 'bold 48px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('🎉 ¡Feliz Cumpleaños! 🎉', 400, 200)
    
    ctx.font = 'bold 36px Arial'
    ctx.fillText(person.name, 400, 300)
    
    ctx.font = '24px Arial'
    ctx.fillText('¡Que tengas un día maravilloso!', 400, 400)
    ctx.fillText('🎂🎈🎊🎁✨', 400, 450)
    
    // Download
    const link = document.createElement('a')
    link.download = `cumpleanos-${person.name}.png`
    link.href = canvas.toDataURL()
    link.click()
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      
      {/* Fireworks */}
      {fireworks.map((firework) => (
        <motion.div
          key={firework.id}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 1, delay: firework.delay }}
          className="fixed w-2 h-2 rounded-full pointer-events-none"
          style={{
            left: `${firework.x}%`,
            top: `${firework.y}%`,
            backgroundColor: firework.color
          }}
        />
      ))}

      <motion.div
        initial={{ scale: 0.5, opacity: 0, rotateY: 180 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.5, opacity: 0, rotateY: -180 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 rounded-3xl shadow-2xl max-w-lg w-full mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Content */}
        <div className="p-8 text-center text-white">
          {/* Animated Birthday Icon */}
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
            className="text-8xl mb-4"
          >
            🎂
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-2"
          >
            ¡Feliz Cumpleaños!
          </motion.h1>

          {/* Name */}
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-semibold mb-4"
          >
            {person.name}
          </motion.h2>

          {/* Message */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg mb-6 text-white/90"
          >
            ¡Que tengas un día maravilloso lleno de alegría, sorpresas y momentos especiales! 
          </motion.p>

          {/* Animated Emojis */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.8, type: "spring" }}
            className="text-4xl mb-8 space-x-2"
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            >
              🎉
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            >
              🎈
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            >
              🎊
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.6 }}
            >
              🎁
            </motion.span>
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.8 }}
            >
              ✨
            </motion.span>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex gap-3 justify-center"
          >
            <button
              onClick={handleWhatsAppShare}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-full transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Compartir
            </button>
            <button
              onClick={downloadCelebrationCard}
              className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-full transition-colors"
            >
              <Download className="w-4 h-4" />
              Descargar
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CelebrationModal