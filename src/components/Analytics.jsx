import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts'
// Componentes temporales hasta instalar recharts
import { Calendar, TrendingUp, Users, Gift, Download } from 'lucide-react'
import { format, getMonth, getYear, differenceInYears } from 'date-fns'
import { es } from 'date-fns/locale'

const Analytics = ({ birthdays }) => {
  const [analyticsData, setAnalyticsData] = useState({
    monthlyData: [],
    ageGroups: [],
    upcomingBirthdays: [],
    stats: {}
  })

  useEffect(() => {
    if (birthdays.length > 0) {
      generateAnalytics()
    }
  }, [birthdays])

  const generateAnalytics = () => {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
      'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ]

    // Monthly distribution
    const monthlyCount = new Array(12).fill(0)
    const ageGroups = { '0-20': 0, '21-40': 0, '41-60': 0, '60+': 0 }
    const today = new Date()

    birthdays.forEach(birthday => {
      const [year, month, day] = birthday.birthDate.split('-').map(Number)
      const birthDate = new Date(year, month - 1, day)
      const monthIndex = getMonth(birthDate)
      monthlyCount[monthIndex]++

      // Age groups
      const age = differenceInYears(today, birthDate)
      if (age <= 20) ageGroups['0-20']++
      else if (age <= 40) ageGroups['21-40']++
      else if (age <= 60) ageGroups['41-60']++
      else ageGroups['60+']++
    })

    const monthlyData = monthlyCount.map((count, index) => ({
      month: monthNames[index],
      cumpleanos: count
    }))

    const ageGroupsData = Object.entries(ageGroups).map(([range, count]) => ({
      name: range,
      value: count,
      color: range === '0-20' ? '#8884d8' : range === '21-40' ? '#82ca9d' : range === '41-60' ? '#ffc658' : '#ff7c7c'
    }))

    // Upcoming birthdays (next 30 days)
    const upcomingBirthdays = birthdays
      .map(birthday => {
        const [year, month, day] = birthday.birthDate.split('-').map(Number)
        const birthDate = new Date(year, month - 1, day)
        const thisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate())
        const nextYear = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate())
        
        const daysUntil = thisYear >= today 
          ? Math.ceil((thisYear - today) / (1000 * 60 * 60 * 24))
          : Math.ceil((nextYear - today) / (1000 * 60 * 60 * 24))
        
        return { ...birthday, daysUntil }
      })
      .filter(birthday => birthday.daysUntil <= 30)
      .sort((a, b) => a.daysUntil - b.daysUntil)

    // Stats
    const averageAge = birthdays.reduce((sum, birthday) => {
      const [year, month, day] = birthday.birthDate.split('-').map(Number)
      const birthDate = new Date(year, month - 1, day)
      const age = differenceInYears(today, birthDate)
      return sum + age
    }, 0) / birthdays.length

    const stats = {
      total: birthdays.length,
      averageAge: Math.round(averageAge),
      thisMonth: monthlyCount[today.getMonth()],
      upcoming: upcomingBirthdays.length
    }

    setAnalyticsData({
      monthlyData,
      ageGroups: ageGroupsData,
      upcomingBirthdays,
      stats
    })
  }

  const exportData = () => {
    const dataToExport = {
      resumen: analyticsData.stats,
      cumpleanosPorMes: analyticsData.monthlyData,
      gruposDeEdad: analyticsData.ageGroups,
      proximosCumpleanos: analyticsData.upcomingBirthdays,
      fechaExportacion: new Date().toISOString()
    }

    const dataStr = JSON.stringify(dataToExport, null, 2)
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr)
    
    const exportFileDefaultName = `analytics-cumpleanos-${format(new Date(), 'yyyy-MM-dd')}.json`
    
    const linkElement = document.createElement('a')
    linkElement.setAttribute('href', dataUri)
    linkElement.setAttribute('download', exportFileDefaultName)
    linkElement.click()
  }

  if (birthdays.length === 0) {
    return (
      <div className="text-center py-12">
        <TrendingUp className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">No hay datos suficientes para mostrar analytics</p>
        <p className="text-gray-400">Agrega algunos cumpleaños para ver estadísticas</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">📊 Analytics</h2>
        <button
          onClick={exportData}
          className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          <Download className="w-4 h-4" />
          Exportar Datos
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total</p>
              <p className="text-3xl font-bold">{analyticsData.stats.total}</p>
            </div>
            <Users className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Edad Promedio</p>
              <p className="text-3xl font-bold">{analyticsData.stats.averageAge}</p>
            </div>
            <Calendar className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Este Mes</p>
              <p className="text-3xl font-bold">{analyticsData.stats.thisMonth}</p>
            </div>
            <Gift className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Próximos 30 días</p>
              <p className="text-3xl font-bold">{analyticsData.stats.upcoming}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Distribution */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Cumpleaños por Mes
          </h3>
          <div className="h-64 flex items-end justify-between gap-2 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {analyticsData.monthlyData.map((data, index) => (
              <div key={data.month} className="flex flex-col items-center gap-2">
                <div 
                  className="bg-purple-500 rounded-t-md min-w-[20px] transition-all duration-300 hover:bg-purple-600"
                  style={{ height: `${Math.max(data.cumpleanos * 40, 10)}px` }}
                  title={`${data.month}: ${data.cumpleanos} cumpleaños`}
                />
                <span className="text-xs text-gray-600 dark:text-gray-400 transform -rotate-45 origin-center">
                  {data.month.slice(0, 3)}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            📊 Gráfico temporal - Instala 'recharts' para gráficos avanzados
          </p>
        </motion.div>

        {/* Age Groups */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Grupos de Edad
          </h3>
          <div className="h-64 flex flex-col justify-center gap-4">
            {analyticsData.ageGroups.map((group, index) => {
              const total = analyticsData.ageGroups.reduce((sum, g) => sum + g.value, 0)
              const percentage = total > 0 ? (group.value / total * 100) : 0
              return (
                <div key={group.name} className="flex items-center gap-4">
                  <div className="w-16 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {group.name}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-6 relative overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500 flex items-center justify-center text-white text-xs font-medium"
                      style={{ 
                        width: `${percentage}%`, 
                        backgroundColor: group.color,
                        minWidth: percentage > 0 ? '30px' : '0px'
                      }}
                    >
                      {percentage > 10 && `${percentage.toFixed(0)}%`}
                    </div>
                  </div>
                  <div className="w-12 text-sm text-gray-600 dark:text-gray-400">
                    {group.value}
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
            📊 Gráfico temporal - Instala 'recharts' para gráficos circulares
          </p>
        </motion.div>
      </div>

      {/* Upcoming Birthdays */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
      >
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Próximos Cumpleaños (30 días)
        </h3>
        {analyticsData.upcomingBirthdays.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No hay cumpleaños próximos</p>
        ) : (
          <div className="space-y-3">
            {analyticsData.upcomingBirthdays.map((birthday, index) => (
              <div
                key={birthday.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {birthday.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{birthday.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(() => {
                        const [year, month, day] = birthday.birthDate.split('-').map(Number)
                        const birthDate = new Date(year, month - 1, day)
                        return format(birthDate, 'dd MMMM', { locale: es })
                      })()}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                    {birthday.daysUntil === 0 ? '¡Hoy!' : `${birthday.daysUntil} días`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  )
}

export default Analytics