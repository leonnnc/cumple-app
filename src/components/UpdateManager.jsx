import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Download, Shield, AlertTriangle, CheckCircle, RefreshCw, Database, GitBranch } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const UpdateManager = ({ onClose }) => {
  const { theme } = useTheme()
  const [updateStatus, setUpdateStatus] = useState('checking') // checking, available, updating, success, error
  const [currentVersion, setCurrentVersion] = useState('2.0.0')
  const [availableVersion, setAvailableVersion] = useState(null)
  const [changelog, setChangelog] = useState([])
  const [backupStatus, setBackupStatus] = useState(null)
  const [updateProgress, setUpdateProgress] = useState(0)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    checkForUpdates()
  }, [])

  const addLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { timestamp, message, type }])
  }

  const checkForUpdates = async () => {
    addLog('Verificando actualizaciones disponibles...', 'info')
    
    try {
      // Simular verificación de GitHub releases
      const response = await fetch('/api/updates/check')
      
      if (response.ok) {
        const data = await response.json()
        if (data.hasUpdate) {
          setAvailableVersion(data.version)
          setChangelog(data.changelog)
          setUpdateStatus('available')
          addLog(`Nueva versión ${data.version} disponible`, 'success')
        } else {
          setUpdateStatus('uptodate')
          addLog('La aplicación está actualizada', 'success')
        }
      } else {
        throw new Error('Error al verificar actualizaciones')
      }
    } catch (error) {
      setUpdateStatus('error')
      addLog('Error al verificar actualizaciones: ' + error.message, 'error')
    }
  }

  const createBackup = async () => {
    addLog('Creando backup de seguridad...', 'info')
    setBackupStatus('creating')
    
    try {
      const response = await fetch('/api/updates/backup', {
        method: 'POST'
      })
      
      if (response.ok) {
        const data = await response.json()
        setBackupStatus('success')
        addLog(`Backup creado: ${data.recordsBackedUp} cumpleaños guardados`, 'success')
        return true
      } else {
        throw new Error('Error al crear backup')
      }
    } catch (error) {
      setBackupStatus('error')
      addLog('Error al crear backup: ' + error.message, 'error')
      return false
    }
  }

  const applyUpdate = async () => {
    setUpdateStatus('updating')
    setUpdateProgress(0)
    addLog('Iniciando proceso de actualización...', 'info')

    try {
      // Paso 1: Crear backup
      setUpdateProgress(20)
      const backupSuccess = await createBackup()
      if (!backupSuccess) {
        throw new Error('Falló la creación del backup')
      }

      // Paso 2: Descargar actualización
      setUpdateProgress(40)
      addLog('Descargando nueva versión...', 'info')
      const downloadResponse = await fetch('/api/updates/download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ version: availableVersion })
      })

      if (!downloadResponse.ok) {
        throw new Error('Error al descargar actualización')
      }

      // Paso 3: Aplicar cambios
      setUpdateProgress(60)
      addLog('Aplicando cambios...', 'info')
      const applyResponse = await fetch('/api/updates/apply', {
        method: 'POST'
      })

      if (!applyResponse.ok) {
        throw new Error('Error al aplicar actualización')
      }

      // Paso 4: Migrar base de datos
      setUpdateProgress(80)
      addLog('Migrando base de datos...', 'info')
      const migrateResponse = await fetch('/api/updates/migrate', {
        method: 'POST'
      })

      if (!migrateResponse.ok) {
        throw new Error('Error en migración de base de datos')
      }

      const migrateData = await migrateResponse.json()
      addLog(`Migración exitosa: ${migrateData.recordsMigrated} registros preservados`, 'success')

      // Paso 5: Verificar integridad
      setUpdateProgress(100)
      addLog('Verificando integridad de datos...', 'info')
      const verifyResponse = await fetch('/api/updates/verify')
      
      if (verifyResponse.ok) {
        const verifyData = await verifyResponse.json()
        addLog(`Verificación exitosa: ${verifyData.totalRecords} cumpleaños confirmados`, 'success')
        
        setUpdateStatus('success')
        setCurrentVersion(availableVersion)
        addLog('¡Actualización completada exitosamente!', 'success')
      } else {
        throw new Error('Falló la verificación de integridad')
      }

    } catch (error) {
      setUpdateStatus('error')
      addLog('Error durante la actualización: ' + error.message, 'error')
      addLog('Iniciando rollback automático...', 'info')
      
      // Intentar rollback automático
      try {
        await fetch('/api/updates/rollback', { method: 'POST' })
        addLog('Rollback completado. Datos restaurados.', 'success')
      } catch (rollbackError) {
        addLog('Error en rollback: ' + rollbackError.message, 'error')
      }
    }
  }

  const getStatusIcon = () => {
    switch (updateStatus) {
      case 'checking': return <RefreshCw className="w-5 h-5 animate-spin" />
      case 'available': return <Download className="w-5 h-5 text-blue-500" />
      case 'updating': return <RefreshCw className="w-5 h-5 animate-spin text-yellow-500" />
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />
      case 'error': return <AlertTriangle className="w-5 h-5 text-red-500" />
      case 'uptodate': return <CheckCircle className="w-5 h-5 text-green-500" />
      default: return <RefreshCw className="w-5 h-5" />
    }
  }

  const getStatusMessage = () => {
    switch (updateStatus) {
      case 'checking': return 'Verificando actualizaciones...'
      case 'available': return `Nueva versión ${availableVersion} disponible`
      case 'updating': return 'Actualizando aplicación...'
      case 'success': return '¡Actualización completada!'
      case 'error': return 'Error en la actualización'
      case 'uptodate': return 'Aplicación actualizada'
      default: return 'Estado desconocido'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-end pt-20 pr-4 z-[60]"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, x: 50 }}
        animate={{ scale: 1, opacity: 1, x: 0 }}
        exit={{ scale: 0.8, opacity: 0, x: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`${theme.card} rounded-lg shadow-xl w-[500px] max-w-[90vw] max-h-[80vh] overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <GitBranch className="w-5 h-5 text-blue-500" />
            <h2 className={`text-lg font-semibold ${theme.text}`}>Actualizaciones</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Status */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            {getStatusIcon()}
            <div className="flex-1">
              <p className={`font-medium ${theme.text}`}>{getStatusMessage()}</p>
              <p className={`text-sm ${theme.textSecondary}`}>
                Versión actual: v{currentVersion}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          {updateStatus === 'updating' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso</span>
                <span>{updateProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${updateProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Changelog */}
          {updateStatus === 'available' && changelog.length > 0 && (
            <div className="space-y-2">
              <h3 className={`font-medium ${theme.text} flex items-center gap-2`}>
                <Database className="w-4 h-4" />
                Cambios en v{availableVersion}
              </h3>
              <ul className="space-y-1 text-sm">
                {changelog.map((change, index) => (
                  <li key={index} className={`${theme.textSecondary} flex items-start gap-2`}>
                    <span className="text-green-500 mt-1">•</span>
                    {change}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Backup Status */}
          {backupStatus && (
            <div className={`p-3 rounded-lg flex items-center gap-2 ${
              backupStatus === 'success' ? 'bg-green-50 text-green-700' :
              backupStatus === 'creating' ? 'bg-yellow-50 text-yellow-700' :
              'bg-red-50 text-red-700'
            }`}>
              <Shield className="w-4 h-4" />
              <span className="text-sm">
                {backupStatus === 'success' && 'Backup creado exitosamente'}
                {backupStatus === 'creating' && 'Creando backup...'}
                {backupStatus === 'error' && 'Error al crear backup'}
              </span>
            </div>
          )}

          {/* Logs */}
          {logs.length > 0 && (
            <div className="space-y-2">
              <h3 className={`font-medium ${theme.text}`}>Registro de Actividad</h3>
              <div className="bg-gray-900 text-green-400 p-3 rounded-lg text-xs font-mono max-h-40 overflow-y-auto">
                {logs.map((log, index) => (
                  <div key={index} className="flex gap-2">
                    <span className="text-gray-500">[{log.timestamp}]</span>
                    <span className={
                      log.type === 'error' ? 'text-red-400' :
                      log.type === 'success' ? 'text-green-400' :
                      'text-blue-400'
                    }>
                      {log.message}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cerrar
          </button>
          
          {updateStatus === 'available' && (
            <button
              onClick={applyUpdate}
              className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Actualizar
            </button>
          )}
          
          {updateStatus === 'uptodate' && (
            <button
              onClick={checkForUpdates}
              className="flex-1 py-2 px-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Verificar
            </button>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default UpdateManager