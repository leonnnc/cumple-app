import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Gift, Users, Sparkles } from 'lucide-react'
import BirthdayCard from './BirthdayCard'
import CompactStats from './CompactStats'
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'
import { useTheme } from '../contexts/ThemeContext'

const Dashboard = ({ birthdays, onAddBirthday, onCelebrate, onEditBirthday, onDeleteBirthday }) => {
  const { theme } = useTheme()
  const todaysBirthdays = birthdays.filter(b => isToday(new Date(b.birthDate)))
  const upcomingBirthdays = birthdays.filter(b => {
    const days = differenceInDays(new Date(b.birthDate), new Date())
    return days > 0 && days <= 30
  })

  const stats = [
    {
      title: 'Total Cumpleaños',
      value: birthdays.length,
      icon: Users,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Hoy',
      value: todaysBirthdays.length,
      icon: Gift,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Este Mes',
      value: birthdays.filter(b => {
        const date = new Date(b.birthDate)
        const today = new Date()
        return date.getMonth() === today.getMonth()
      }).length,
      icon: Calendar,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Próximos 30 días',
      value: upcomingBirthdays.length,
      icon: Sparkles,
      color: 'from-pink-500 to-pink-600'
    }
  ]

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="text-center mb-6">
          <p className={`text-sm sm:text-base ${theme.textSecondary} mb-3 px-4`}>
            ¡Bienvenidos al Sistema de Cumpleaños!
          </p>
          <h1 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold ${theme.text} mb-2 px-2 leading-tight`}>
            <span className="block sm:inline">🎉 Familia</span>
            <span className="block sm:inline"> ParAreMacPobReaBerCas</span>
          </h1>
        </div>
        <p className={`${theme.textSecondary}`}>Nunca olvides un cumpleaños importante</p>
      </motion.div>

      {/* Stats Line - Desktop and Mobile */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`${theme.card} rounded-xl p-2 shadow-lg ${theme.border} border max-w-4xl mx-auto`}
        >
          <div className="grid grid-cols-4 gap-1">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gradient-to-r ${stat.color} rounded-lg p-2 text-white shadow-md text-center min-h-[50px] flex items-center justify-center`}
              >
                <div className="flex items-center justify-center gap-1 text-center">
                  <stat.icon className="w-3 h-3 text-white/80 flex-shrink-0" />
                  <span className="text-sm font-bold leading-none">
                    {stat.value}
                  </span>
                  <span className="text-xs font-medium text-white/90 leading-none">
                    {stat.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Línea divisoria */}
          <div className={`border-t ${theme.border} my-1.5 opacity-30`}></div>
          <p className={`text-xs ${theme.textSecondary} text-center opacity-75`}>
            ⚡ Tiempo real
          </p>
        </motion.div>
      </div>





      {/* Add Birthday Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex justify-center mb-8"
      >
        <button
          onClick={onAddBirthday}
          className={`bg-gradient-to-r ${theme.primary} text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2`}
        >
          <Plus className="w-5 h-5" />
          Agregar Cumpleaños
        </button>
      </motion.div>

      {/* Today's Birthdays */}
      {todaysBirthdays.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className={`text-2xl font-bold ${theme.text} mb-4 flex items-center gap-2`}>
            🎂 ¡Cumpleaños de Hoy!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysBirthdays.map((birthday, index) => (
              <BirthdayCard
                key={birthday.id}
                birthday={birthday}
                onCelebrate={onCelebrate}
                onEdit={onEditBirthday}
                onDelete={onDeleteBirthday}
                isToday={true}
                delay={index * 0.1}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* All Birthdays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className={`text-2xl font-bold ${theme.text} mb-4`}>
          Todos los Cumpleaños
        </h2>
        {birthdays.length === 0 ? (
          <div className="text-center py-12">
            <Gift className={`w-16 h-16 ${theme.textSecondary} mx-auto mb-4 opacity-50`} />
            <p className={`${theme.textSecondary} text-lg`}>No hay cumpleaños registrados</p>
            <p className={`${theme.textSecondary} opacity-75`}>¡Agrega el primero!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.map((birthday, index) => (
              <BirthdayCard
                key={birthday.id}
                birthday={birthday}
                onCelebrate={onCelebrate}
                onEdit={onEditBirthday}
                onDelete={onDeleteBirthday}
                delay={index * 0.05}
              />
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard