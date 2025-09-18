import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'
import { UserProvider } from './contexts/UserContext'
import Dashboard from './components/Dashboard'
import BirthdayModal from './components/BirthdayModal'
import CelebrationModal from './components/CelebrationModal'
import Analytics from './components/Analytics'
import EventsManager from './components/EventsManager'
import AIAssistant from './components/AIAssistant'
import PWAInstaller from './components/PWAInstaller'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import { getBirthdays, addBirthday } from './services/api'
import toast from 'react-hot-toast'

// Componente de carga
const LoadingScreen = () => {
    const { theme } = useTheme()
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${theme.background} transition-all duration-500`}>
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full mb-4"
            />
            <div className="text-center mb-4">
              <p className={`text-sm ${theme.textSecondary} mb-2`}>
                ¡Bienvenidos al Sistema de Cumpleaños!
              </p>
              <h2 className={`text-lg sm:text-xl font-semibold ${theme.text} px-4 leading-tight`}>
                <span className="block sm:inline">🎉 Familia</span>
                <span className="block sm:inline"> ParAreMacPobReaBerCas</span>
              </h2>
            </div>
            <p className={`${theme.textSecondary}`}>Cargando...</p>
        </div>
    )
}

// Componente principal de contenido
const AppContent = ({
    currentView,
    setCurrentView,
    renderCurrentView,
    showModal,
    setShowModal,
    handleAddBirthday,
    showCelebration,
    celebratingPerson,
    setShowCelebration,
    editingBirthday,
    setEditingBirthday,
    birthdays
}) => {
    const { theme } = useTheme()

    return (
        <div className={`min-h-screen ${theme.background} transition-all duration-500 flex flex-col`}>
            <Navigation currentView={currentView} onViewChange={setCurrentView} />

            <main className="pt-20 flex-1">
                {renderCurrentView()}
            </main>

            <Footer />

            {showModal && (
                <BirthdayModal
                    onClose={() => {
                        setShowModal(false)
                        setEditingBirthday(null)
                    }}
                    onSubmit={handleAddBirthday}
                    editingBirthday={editingBirthday}
                    birthdays={birthdays}
                />
            )}

            {showCelebration && celebratingPerson && (
                <CelebrationModal
                    person={celebratingPerson}
                    onClose={() => setShowCelebration(false)}
                />
            )}

            <PWAInstaller />
            <Toaster position="top-right" />
        </div>
    )
}

function App() {
    const [birthdays, setBirthdays] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [showCelebration, setShowCelebration] = useState(false)
    const [celebratingPerson, setCelebratingPerson] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentView, setCurrentView] = useState('dashboard')
    const [editingBirthday, setEditingBirthday] = useState(null)

    useEffect(() => {
        loadBirthdays()
        checkTodaysBirthdays()
        registerServiceWorker()
    }, [])

    const registerServiceWorker = async () => {
        if ('serviceWorker' in navigator) {
            try {
                await navigator.serviceWorker.register('/sw.js')
                // Service Worker registered successfully
            } catch (error) {
                // Service Worker registration failed
            }
        }
    }

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
                const [year, month, day] = birthday.birthDate.split('-').map(Number)
                const birthDate = new Date(year, month - 1, day)
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
            if (editingBirthday) {
                // Update existing birthday
                const response = await fetch(`/api/birthdays/${editingBirthday.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(birthdayData)
                })
                
                if (!response.ok) {
                    const error = await response.json()
                    throw new Error(error.error)
                }
            } else {
                // Add new birthday
                await addBirthday(birthdayData)
            }
            
            await loadBirthdays()
            setShowModal(false)
            setEditingBirthday(null)
        } catch (error) {
            console.error('Error saving birthday:', error)
            toast.error(`Error: ${error.message}`)
        }
    }

    const handleCelebrate = (person) => {
        setCelebratingPerson(person)
        setShowCelebration(true)
    }

    const handleEditBirthday = (birthday) => {
        setEditingBirthday(birthday)
        setShowModal(true)
    }

    const handleDeleteBirthday = async (birthdayId) => {
        if (!window.confirm('¿Estás seguro de que quieres eliminar este cumpleaños?')) {
            return
        }

        try {
            const response = await fetch(`/api/birthdays/${birthdayId}`, {
                method: 'DELETE'
            })

            if (response.ok) {
                // Refresh the birthdays list
                const updatedBirthdays = birthdays.filter(b => b.id !== birthdayId)
                setBirthdays(updatedBirthdays)
                toast.success('Cumpleaños eliminado exitosamente')
            } else {
                const error = await response.json()
                toast.error(`Error: ${error.error}`)
            }
        } catch (error) {
            console.error('Error deleting birthday:', error)
            toast.error('Error de conexión al eliminar')
        }
    }

    const renderCurrentView = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <Dashboard
                        birthdays={birthdays}
                        onAddBirthday={() => {
                            setEditingBirthday(null)
                            setShowModal(true)
                        }}
                        onCelebrate={handleCelebrate}
                        onEditBirthday={handleEditBirthday}
                        onDeleteBirthday={handleDeleteBirthday}
                    />
                )
            case 'analytics':
                return <Analytics birthdays={birthdays} />
            case 'events':
                return <EventsManager />
            case 'ai':
                return <AIAssistant person={celebratingPerson} />
            default:
                return (
                    <Dashboard
                        birthdays={birthdays}
                        onAddBirthday={() => {
                            setEditingBirthday(null)
                            setShowModal(true)
                        }}
                        onCelebrate={handleCelebrate}
                        onEditBirthday={handleEditBirthday}
                        onDeleteBirthday={handleDeleteBirthday}
                    />
                )
        }
    }

    if (loading) {
        return (
            <ThemeProvider>
                <LoadingScreen />
            </ThemeProvider>
        )
    }

    return (
        <ThemeProvider>
            <UserProvider>
                <AppContent
                    currentView={currentView}
                    setCurrentView={setCurrentView}
                    renderCurrentView={renderCurrentView}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    handleAddBirthday={handleAddBirthday}
                    showCelebration={showCelebration}
                    celebratingPerson={celebratingPerson}
                    setShowCelebration={setShowCelebration}
                    editingBirthday={editingBirthday}
                    setEditingBirthday={setEditingBirthday}
                    birthdays={birthdays}
                />
            </UserProvider>
        </ThemeProvider>
    )
}

export default App