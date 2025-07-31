import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Calendar, Heart, GraduationCap, Star, Gift, Trash2, Edit } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const eventTypes = {
  birthday: { name: 'Cumpleaños', icon: '🎂', color: 'from-purple-500 to-pink-500' },
  anniversary: { name: 'Aniversario', icon: '💕', color: 'from-red-500 to-pink-500' },
  graduation: { name: 'Graduación', icon: '🎓', color: 'from-blue-500 to-indigo-500' },
  wedding: { name: 'Boda', icon: '💒', color: 'from-pink-500 to-rose-500' },
  work: { name: 'Trabajo', icon: '💼', color: 'from-green-500 to-emerald-500' },
  custom: { name: 'Personalizado', icon: '⭐', color: 'from-yellow-500 to-orange-500' }
}

const EventsManager = () => {
  const [events, setEvents] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editingEvent, setEditingEvent] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: 'birthday',
    recurring: true,
    reminderDays: 7,
    personName: '',
    personEmail: ''
  })

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = () => {
    const savedEvents = localStorage.getItem('birthday-app-events')
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents))
    }
  }

  const saveEvents = (newEvents) => {
    localStorage.setItem('birthday-app-events', JSON.stringify(newEvents))
    setEvents(newEvents)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const newEvent = {
      id: editingEvent ? editingEvent.id : Date.now(),
      ...formData,
      createdAt: editingEvent ? editingEvent.createdAt : new Date().toISOString()
    }

    let updatedEvents
    if (editingEvent) {
      updatedEvents = events.map(event => 
        event.id === editingEvent.id ? newEvent : event
      )
    } else {
      updatedEvents = [...events, newEvent]
    }

    saveEvents(updatedEvents)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      date: '',
      type: 'birthday',
      recurring: true,
      reminderDays: 7,
      personName: '',
      personEmail: ''
    })
    setEditingEvent(null)
    setShowModal(false)
  }

  const handleEdit = (event) => {
    setFormData(event)
    setEditingEvent(event)
    setShowModal(true)
  }

  const handleDelete = (eventId) => {
    if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
      const updatedEvents = events.filter(event => event.id !== eventId)
      saveEvents(updatedEvents)
    }
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    return events
      .map(event => {
        const eventDate = new Date(event.date)
        const thisYear = new Date(today.getFullYear(), eventDate.getMonth(), eventDate.getDate())
        const nextYear = new Date(today.getFullYear() + 1, eventDate.getMonth(), eventDate.getDate())
        
        const daysUntil = thisYear >= today 
          ? Math.ceil((thisYear - today) / (1000 * 60 * 60 * 24))
          : Math.ceil((nextYear - today) / (1000 * 60 * 60 * 24))
        
        return { ...event, daysUntil, nextDate: thisYear >= today ? thisYear : nextYear }
      })
      .sort((a, b) => a.daysUntil - b.daysUntil)
  }

  const upcomingEvents = getUpcomingEvents()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">🎉 Eventos y Celebraciones</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Agregar Evento
        </button>
      </div>

      {/* Event Types Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {Object.entries(eventTypes).map(([key, type]) => {
          const count = events.filter(event => event.type === key).length
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`bg-gradient-to-r ${type.color} rounded-lg p-4 text-white text-center`}
            >
              <div className="text-2xl mb-1">{type.icon}</div>
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-xs opacity-90">{type.name}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Upcoming Events */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
          Próximos Eventos
        </h3>
        {upcomingEvents.length === 0 ? (
          <div className="text-center py-8">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No hay eventos programados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingEvents.slice(0, 10).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${eventTypes[event.type].color} rounded-full flex items-center justify-center text-white text-xl`}>
                    {eventTypes[event.type].icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      {event.title}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {event.personName && `${event.personName} • `}
                      {format(event.nextDate, 'dd MMMM yyyy', { locale: es })}
                    </p>
                    {event.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                        {event.description}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-right mr-4">
                    <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                      {event.daysUntil === 0 ? '¡Hoy!' : 
                       event.daysUntil === 1 ? 'Mañana' : 
                       `${event.daysUntil} días`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {eventTypes[event.type].name}
                    </p>
                  </div>
                  <button
                    onClick={() => handleEdit(event)}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={resetForm}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                {editingEvent ? 'Editar Evento' : 'Agregar Nuevo Evento'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Título del Evento
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Tipo de Evento
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({...formData, type: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  >
                    {Object.entries(eventTypes).map(([key, type]) => (
                      <option key={key} value={key}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Fecha
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Nombre de la Persona (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.personName}
                    onChange={(e) => setFormData({...formData, personName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Descripción (opcional)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                    rows="3"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="recurring"
                    checked={formData.recurring}
                    onChange={(e) => setFormData({...formData, recurring: e.target.checked})}
                    className="rounded"
                  />
                  <label htmlFor="recurring" className="text-sm text-gray-700 dark:text-gray-300">
                    Evento recurrente (cada año)
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    {editingEvent ? 'Actualizar' : 'Agregar'}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}

export default EventsManager