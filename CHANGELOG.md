# 📋 Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/),
y este proyecto adhiere a [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.3] - 2025-09-18

### ✅ Agregado
- Configuración de servidor para servir archivos estáticos
- Documentación completa para GitHub
- Archivo de licencia MIT
- Guía de contribución
- Changelog detallado
- Configuración optimizada de .gitignore

### 🔧 Corregido
- Sistema de notificaciones con react-hot-toast
- Eliminados todos los alert() por toast notifications
- Corregido error de import duplicado en SocialShareButtons
- Arreglado Service Worker (clients no definido)
- Configuración de ESLint para ES modules
- Build process funcionando correctamente

### 🧹 Limpiado
- Eliminados archivos innecesarios (production-build, .zip)
- Comentados console.log innecesarios
- Removidos archivos .DS_Store
- Limpieza de estructura de proyecto
- Optimización de imports

### 🔄 Cambiado
- Puerto del servidor cambiado a 3002
- Versión unificada en todo el proyecto
- Configuración mejorada de linting

## [1.2.0] - 2025-09-18

### ✅ Agregado
- Sistema de actualizaciones automáticas
- Backup automático antes de actualizaciones
- Rollback automático en caso de error
- Verificación de integridad de datos
- Unificación de versiones en todo el proyecto

### 🔧 Corregido
- Inconsistencias de versión entre package.json y componentes
- Sincronización de versiones en frontend y backend

### 🔄 Cambiado
- Versión del UpdateManager: 2.0.0 → 1.2.0
- Versión del servidor: 2.0.0 → 1.2.0
- Próxima versión disponible: 2.1.0 → 1.3.0

## [1.1.0] - 2025-07-25

### ✅ Agregado
- CRUD completo de cumpleaños
- Dashboard con estadísticas
- Sistema de celebraciones con efectos visuales
- Integración con WhatsApp, SMS, Email
- Asistente IA para generar mensajes
- Analytics y gráficos interactivos
- PWA con Service Worker
- Tema claro/oscuro
- Animaciones con Framer Motion
- Sistema de autenticación
- Gestión de eventos personalizados

### 🎨 Interfaz
- Diseño responsive
- Componentes modulares
- Navegación móvil optimizada
- Efectos visuales (confetti, fuegos artificiales)
- Iconos con Lucide React

### 🔧 Backend
- API REST con Express.js
- Base de datos SQLite
- Autenticación de administrador
- Cron jobs para notificaciones
- Endpoints para todas las funcionalidades

### 📱 PWA Features
- Instalación offline
- Service Worker
- Manifest.json
- Notificaciones push

## [1.0.0] - 2025-07-01

### ✅ Agregado
- Versión inicial del proyecto
- Funcionalidades básicas de gestión de cumpleaños
- Interfaz básica con React
- Servidor básico con Node.js

---

## Tipos de Cambios

- **✅ Agregado** para nuevas funcionalidades
- **🔄 Cambiado** para cambios en funcionalidades existentes
- **❌ Deprecado** para funcionalidades que serán removidas
- **🗑️ Removido** para funcionalidades removidas
- **🔧 Corregido** para corrección de bugs
- **🔒 Seguridad** para vulnerabilidades

## Enlaces

- [1.2.3]: https://github.com/leonnnc/birthday-app/compare/v1.2.0...v1.2.3
- [1.2.0]: https://github.com/leonnnc/birthday-app/compare/v1.1.0...v1.2.0
- [1.1.0]: https://github.com/leonnnc/birthday-app/compare/v1.0.0...v1.1.0
- [1.0.0]: https://github.com/leonnnc/birthday-app/releases/tag/v1.0.0