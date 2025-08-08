// Configuración del sistema de actualizaciones
export const UPDATE_CONFIG = {
  // Información de la versión actual
  CURRENT_VERSION: '2.0.0',
  
  // Configuración de GitHub (para verificar releases)
  GITHUB_REPO: 'leonnnc/cumple-app',
  GITHUB_API: 'https://api.github.com/repos/leonnnc/cumple-app/releases/latest',
  
  // Configuración de backup
  BACKUP_RETENTION_DAYS: 30,
  AUTO_BACKUP_BEFORE_UPDATE: true,
  
  // Configuración de verificación automática
  AUTO_CHECK_ENABLED: true,
  CHECK_INTERVAL_HOURS: 24,
  
  // Configuración de seguridad
  REQUIRE_ADMIN_CONFIRMATION: true,
  VERIFY_DATA_INTEGRITY: true,
  AUTO_ROLLBACK_ON_ERROR: true,
  
  // Rutas de la API
  API_ENDPOINTS: {
    CHECK: '/api/updates/check',
    BACKUP: '/api/updates/backup',
    DOWNLOAD: '/api/updates/download',
    APPLY: '/api/updates/apply',
    MIGRATE: '/api/updates/migrate',
    VERIFY: '/api/updates/verify',
    ROLLBACK: '/api/updates/rollback'
  },
  
  // Mensajes del sistema
  MESSAGES: {
    CHECKING: 'Verificando actualizaciones disponibles...',
    UPDATE_AVAILABLE: 'Nueva versión disponible',
    UP_TO_DATE: 'La aplicación está actualizada',
    BACKUP_CREATING: 'Creando backup de seguridad...',
    BACKUP_SUCCESS: 'Backup creado exitosamente',
    UPDATING: 'Aplicando actualización...',
    UPDATE_SUCCESS: '¡Actualización completada exitosamente!',
    UPDATE_ERROR: 'Error durante la actualización',
    ROLLBACK_SUCCESS: 'Rollback completado. Datos restaurados.',
    DATA_PRESERVED: 'Todos los cumpleaños han sido preservados'
  }
}

// Función para obtener información de la versión
export const getVersionInfo = () => {
  return {
    current: UPDATE_CONFIG.CURRENT_VERSION,
    buildDate: new Date().toISOString(),
    features: [
      'Sistema de fotos',
      'Permisos de edición',
      'Administrador único',
      'Login discreto',
      'Temas personalizables',
      'PWA completa',
      'Sistema de actualizaciones'
    ]
  }
}

// Función para validar si una actualización es segura
export const validateUpdate = (fromVersion, toVersion) => {
  // Lógica para determinar si la actualización es segura
  const fromParts = fromVersion.split('.').map(Number)
  const toParts = toVersion.split('.').map(Number)
  
  // No permitir downgrades
  if (toParts[0] < fromParts[0] || 
      (toParts[0] === fromParts[0] && toParts[1] < fromParts[1]) ||
      (toParts[0] === fromParts[0] && toParts[1] === fromParts[1] && toParts[2] < fromParts[2])) {
    return {
      safe: false,
      reason: 'No se permiten downgrades de versión'
    }
  }
  
  // Verificar saltos de versión mayor
  if (toParts[0] > fromParts[0] + 1) {
    return {
      safe: false,
      reason: 'Salto de versión mayor requiere migración manual'
    }
  }
  
  return {
    safe: true,
    requiresBackup: true,
    requiresMigration: toParts[1] > fromParts[1] // Minor version change
  }
}