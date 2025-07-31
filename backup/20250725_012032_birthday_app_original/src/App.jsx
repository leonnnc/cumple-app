import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Dashboard from './components/Dashboard'
import BirthdayModal from './components/BirthdayModal'
import CelebrationModal from './components/CelebrationModal'
import { getBirthdays, addBirthday } from './services/api'

function App() {
  const [birthdays, setBirthdays] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebratingPerson, setCelebratingPerson] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadBirthdays()
    checkTodaysBirthdays()
  }, [])

  const loadBirthdays = async () => {
    try {
      const data = await getBirthdays()
      setBirthdays(data)
    } catch (error) {
      console.error('Error loading birthdays:', error)
    } finally {
      setLoading(false)
    }
  }

  const checkTodaysBirthdays = async () => {
    const today = new Date()
    const todayString = `${today.getMonth() + 1}-${today.getDate()}`
    
    try {
      const data = await getBirthdays()
      const todaysBirthdays = data.filter(birthday => {
        const birthDate = new Date(birthday.birthDate)
        const birthString = `${birthDate.getMonth() + 1}-${birthDate.getDate()}`
        return birthString === todayString
      })

      if (todaysBirthdays.length > 0) {
        setTimeout(() => {
          setCelebratingPerson(todaysBirthdays[0])
          setShowCelebration(true)
        }, 2000)
      }
    } catch (error) {
      console.error('Error checking today\'s birthdays:', error)
    }
  }

  const handleAddBirthday = async (birthdayData) => {
    try {
      await addBirthday(birthdayData)
      await loadBirthdays()
      setShowModal(false)
    } catch (error) {
      console.error('Error adding birthday:', error)
    }
  }

  const handleCelebrate = (person) => {
    setCelebratingPerson(person)
    setShowCelebration(true)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Dashboard 
        birthdays={birthdays}
        onAddBirthday={() => setShowModal(true)}
        onCelebrate={handleCelebrate}
      />
      
      {showModal && (
        <BirthdayModal
          onClose={() => setShowModal(false)}
          onSubmit={handleAddBirthday}
        />
      )}
      
      {showCelebration && celebratingPerson && (
        <CelebrationModal
          person={celebratingPerson}
          onClose={() => setShowCelebration(false)}
        />
      )}
    </div>
  )
}

export default App