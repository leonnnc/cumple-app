# 🎉 Birthday App - Aplicación de Gestión de Cumpleaños

[![Version](https://img.shields.io/badge/version-1.2.3-blue.svg)](https://github.com/leonnnc/birthday-app)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/node.js-18%2B-brightgreen.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-18.2.0-blue.svg)](https://reactjs.org/)

Una aplicación web moderna y elegante para gestionar cumpleaños con notificaciones, efectos visuales y funcionalidades avanzadas.

## ✨ Características Principales

### 🎂 **Gestión de Cumpleaños**
- ✅ CRUD completo de cumpleaños
- ✅ Notificaciones automáticas
- ✅ Celebraciones con efectos visuales
- ✅ Recordatorios personalizados

### 🎨 **Interfaz Moderna**
- ✅ Diseño responsive y elegante
- ✅ Tema claro/oscuro
- ✅ Animaciones suaves con Framer Motion
- ✅ PWA (Progressive Web App)

### 📊 **Analytics y Estadísticas**
- ✅ Dashboard con métricas
- ✅ Gráficos interactivos
- ✅ Análisis de cumpleaños por mes
- ✅ Estadísticas detalladas

### 🤖 **Asistente IA**
- ✅ Generación de mensajes personalizados
- ✅ Sugerencias de felicitaciones
- ✅ Múltiples estilos de mensaje

### 🔄 **Sistema de Actualizaciones**
- ✅ Actualizaciones automáticas
- ✅ Backup de seguridad
- ✅ Rollback automático
- ✅ Verificación de integridad

### 📱 **Comunicación Integrada**
- ✅ WhatsApp, SMS, Email
- ✅ Redes sociales
- ✅ Compartir nativo
- ✅ Video llamadas

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn
- Git

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/leonnnc/birthday-app.git
cd birthday-app

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev:full
```

### Configuración Manual

```bash
# 1. Instalar dependencias del frontend
npm install

# 2. Instalar dependencias del servidor
cd server
npm install
cd ..

# 3. Ejecutar servidor backend
npm run server

# 4. En otra terminal, ejecutar frontend
npm run dev
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Solo frontend (puerto 5173)
npm run server       # Solo backend (puerto 3002)
npm run dev:full     # Frontend + Backend

# Producción
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción

# Calidad de código
npm run lint         # Verificar código con ESLint
```

## 🌐 URLs de Acceso

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3002
- **Aplicación completa:** http://localhost:3002 (después del build)

## 🔐 Credenciales de Administrador

**Usuario:** `Leonnnc`  
**Contraseña:** `appcumple25`

## 📁 Estructura del Proyecto

```
birthday-app/
├── 📁 src/                    # Código fuente React
│   ├── 📁 components/         # Componentes React
│   ├── 📁 contexts/          # Context API
│   ├── 📁 services/          # Servicios API
│   └── 📁 config/            # Configuraciones
├── 📁 server/                # Servidor Node.js/Express
│   ├── index.js              # Servidor principal
│   ├── birthdays.db          # Base de datos SQLite
│   └── package.json          # Dependencias del servidor
├── 📁 public/                # Archivos públicos
│   ├── sw.js                 # Service Worker
│   └── manifest.json         # PWA Manifest
├── 📁 dist/                  # Build de producción
└── 📁 backups/               # Backups automáticos
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0** - Framework principal
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Estilos y diseño
- **Framer Motion** - Animaciones
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos
- **Recharts** - Gráficos

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **SQLite3** - Base de datos
- **CORS** - Cross-origin requests
- **Node-cron** - Tareas programadas

### Herramientas
- **ESLint** - Linting
- **PostCSS** - Procesamiento CSS
- **Workbox** - Service Worker

## 📊 API Endpoints

### Cumpleaños
```
GET    /api/birthdays          # Obtener todos
POST   /api/birthdays          # Crear nuevo
PUT    /api/birthdays/:id      # Actualizar
DELETE /api/birthdays/:id      # Eliminar
GET    /api/birthdays/today    # Cumpleaños de hoy
```

### Autenticación
```
POST   /api/auth/login         # Iniciar sesión
POST   /api/auth/change-password # Cambiar contraseña
```

### Actualizaciones
```
GET    /api/updates/check      # Verificar actualizaciones
POST   /api/updates/backup     # Crear backup
POST   /api/updates/apply      # Aplicar actualización
```

### Sistema
```
GET    /api/health             # Estado del servidor
```

## 🔄 Changelog

### v1.2.3 (Actual)
- ✅ Sistema de notificaciones mejorado
- ✅ Configuración de servidor para archivos estáticos
- ✅ Limpieza completa del código
- ✅ Corrección de errores críticos
- ✅ Documentación actualizada

### v1.2.0
- ✅ Unificación de versiones
- ✅ Sistema de actualizaciones
- ✅ Backup automático

### v1.1.0
- ✅ Funcionalidades básicas
- ✅ CRUD de cumpleaños
- ✅ Interfaz inicial

## 🚀 Despliegue

### Producción Local
```bash
# 1. Compilar aplicación
npm run build

# 2. Ejecutar servidor (sirve frontend + API)
npm run server
```

### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel --prod
```

### Docker
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3002
CMD ["npm", "run", "server"]
```

## 🔧 Configuración Avanzada

### Variables de Entorno
```bash
PORT=3002                    # Puerto del servidor
NODE_ENV=production         # Entorno
DB_PATH=./birthdays.db      # Ruta de la base de datos
```

### PWA
La aplicación es una PWA completa con:
- ✅ Service Worker
- ✅ Manifest.json
- ✅ Instalación offline
- ✅ Notificaciones push

## 🐛 Solución de Problemas

### Puerto en uso
```bash
# Encontrar proceso usando el puerto
lsof -ti:3002

# Terminar proceso
kill -9 <PID>
```

### Base de datos corrupta
```bash
# Restaurar desde backup
cp backups/latest-backup.db server/birthdays.db
```

### Dependencias
```bash
# Limpiar e instalar
rm -rf node_modules package-lock.json
npm install
```

## 🤝 Contribuir

1. Fork el proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 👨‍💻 Autor

**Leonardo** - [@leonnnc](https://github.com/leonnnc)

## 🙏 Agradecimientos

- React Team por el excelente framework
- Tailwind CSS por el sistema de diseño
- Framer Motion por las animaciones
- Todos los contribuidores de las librerías utilizadas

---

⭐ **¡Dale una estrella si te gusta el proyecto!** ⭐