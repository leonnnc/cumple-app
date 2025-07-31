import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Gift, Users, Sparkles } from 'lucide-react'
import BirthdayCard from './BirthdayCard'
import { format, isToday, isTomorrow, differenceInDays } from 'date-fns'
import { es } from 'date-fns/locale'

const Dashboard = ({ birthdays, onAddBirthday, onCelebrate }) => {
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
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          🎉 App de Cumpleaños
        </h1>
        <p className="text-gray-600">Nunca olvides un cumpleaños importante</p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <stat.icon className="w-8 h-8 text-white/80" />
            </div>
          </motion.div>
        ))}
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
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
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
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            🎂 ¡Cumpleaños de Hoy!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysBirthdays.map((birthday, index) => (
              <BirthdayCard
                key={birthday.id}
                birthday={birthday}
                onCelebrate={onCelebrate}
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
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Todos los Cumpleaños
        </h2>
        {birthdays.length === 0 ? (
          <div className="text-center py-12">
            <Gift className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No hay cumpleaños registrados</p>
            <p className="text-gray-400">¡Agrega el primero!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdays.map((birthday, index) => (
              <BirthdayCard
                key={birthday.id}
                birthday={birthday}
                onCelebrate={onCelebrate}
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