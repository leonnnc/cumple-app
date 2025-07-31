# 🎉 App de Cumpleaños

Una aplicación moderna y responsive para gestionar cumpleaños con notificaciones automáticas, integración con WhatsApp y efectos visuales espectaculares.

## ✨ Características

- **Dashboard moderno** con cuadros rectangulares informativos
- **Modal elegante** para agregar nuevos cumpleaños
- **Base de datos SQLite** para persistencia de datos
- **Notificaciones automáticas** de cumpleaños del día
- **Integración con WhatsApp** para enviar felicitaciones
- **Efectos visuales** con fuegos artificiales y confetti
- **Diseño responsive** que funciona en todos los dispositivos
- **Animaciones suaves** con Framer Motion

## 🚀 Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### Pasos de instalación

1. **Instalar dependencias del frontend:**
```bash
npm install
```

2. **Instalar dependencias del backend:**
```bash
cd server
npm install
cd ..
```

## 🎯 Uso

### Desarrollo

Para ejecutar la aplicación en modo desarrollo:

```bash
# Opción 1: Ejecutar frontend y backend por separado
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev

# Opción 2: Ejecutar ambos simultáneamente
npm run dev:full
```

La aplicación estará disponible en:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001

### Producción

```bash
# Construir la aplicación
npm run build

# Previsualizar la build
npm run preview
```

## 📱 Funcionalidades

### Dashboard Principal
- **Estadísticas en tiempo real**: Total de cumpleaños, cumpleaños de hoy, del mes y próximos
- **Cuadros rectangulares modernos** con gradientes y iconos
- **Lista de cumpleaños** con información detallada

### Gestión de Cumpleaños
- **Agregar personas** con nombre, email, fecha de nacimiento y teléfono
- **Validación de formularios** en tiempo real
- **Almacenamiento persistente** en base de datos SQLite

### Celebraciones
- **Detección automática** de cumpleaños del día
- **Modal de celebración** con efectos visuales espectaculares
- **Fuegos artificiales animados** y confetti
- **Tarjeta de felicitación descargable**

### Integración Social
- **Compartir en WhatsApp** con mensaje personalizado
- **Botón de compartir nativo** del navegador
- **Descarga de tarjetas** de felicitación personalizadas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework de CSS utilitario
- **Framer Motion** - Animaciones fluidas
- **Lucide React** - Iconos modernos
- **React Confetti** - Efectos de confetti
- **date-fns** - Manipulación de fechas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **SQLite3** - Base de datos ligera
- **node-cron** - Tareas programadas
- **CORS** - Manejo de CORS

## 📁 Estructura del Proyecto

```
birthday-app/
├── src/
│   ├── components/
│   │   ├── Dashboard.jsx          # Dashboard principal
│   │   ├── BirthdayCard.jsx       # Tarjeta de cumpleaños
│   │   ├── BirthdayModal.jsx      # Modal para agregar
│   │   └── CelebrationModal.jsx   # Modal de celebración
│   ├── services/
│   │   └── api.js                 # Servicios de API
│   ├── App.jsx                    # Componente principal
│   ├── main.jsx                   # Punto de entrada
│   └── index.css                  # Estilos globales
├── server/
│   ├── index.js                   # Servidor Express
│   ├── package.json               # Dependencias del servidor
│   └── birthdays.db               # Base de datos (se crea automáticamente)
├── package.json                   # Dependencias del frontend
├── tailwind.config.js             # Configuración de Tailwind
├── vite.config.js                 # Configuración de Vite
└── README.md                      # Este archivo
```

## 🎨 Personalización

### Colores y Temas
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#your-color',
      secondary: '#your-color'
    }
  }
}
```

### Animaciones
Las animaciones personalizadas están en `tailwind.config.js` y se pueden modificar según tus necesidades.

## 📊 API Endpoints

- `GET /api/birthdays` - Obtener todos los cumpleaños
- `POST /api/birthdays` - Agregar nuevo cumpleaños
- `PUT /api/birthdays/:id` - Actualizar cumpleaños
- `DELETE /api/birthdays/:id` - Eliminar cumpleaños
- `GET /api/birthdays/today` - Obtener cumpleaños de hoy
- `GET /api/health` - Estado de la API

## 🔧 Configuración Avanzada

### Notificaciones Automáticas
El servidor incluye un cron job que verifica cumpleaños diariamente a las 9:00 AM. Puedes modificar el horario en `server/index.js`:

```javascript
cron.schedule('0 9 * * *', () => {
  // Tu lógica aquí
})
```

### Base de Datos
La aplicación usa SQLite por defecto. Para cambiar a otra base de datos, modifica la configuración en `server/index.js`.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎉 ¡Disfruta celebrando cumpleaños!

¿Tienes preguntas o sugerencias? ¡No dudes en abrir un issue o contactarnos!