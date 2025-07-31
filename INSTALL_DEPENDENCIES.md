# 📦 Instalar Dependencias Faltantes

## 🚨 Errores Actuales:
```
Failed to resolve import "react-hot-toast"
Failed to resolve import "recharts"
```

## ✅ Solución:

### 1. Instalar dependencias del frontend:
```bash
npm install
```

### 2. Si el error persiste, instalar manualmente:
```bash
npm install react-hot-toast@^2.4.1
npm install recharts@^2.8.0
npm install react-router-dom@^6.8.0
npm install workbox-window@^7.0.0
```

### 3. Instalar dependencias del servidor:
```bash
cd server
npm install
cd ..
```

### 4. Ejecutar la aplicación:
```bash
npm run dev:full
```

## 🔧 Dependencias Requeridas:

### Frontend:
- ✅ react@^18.2.0
- ✅ react-dom@^18.2.0
- ✅ framer-motion@^10.16.4
- ✅ lucide-react@^0.294.0
- ✅ date-fns@^2.30.0
- ✅ react-confetti@^6.1.0
- ❌ **react-hot-toast@^2.4.1** (FALTANTE)
- ❌ **recharts@^2.8.0** (FALTANTE)
- ❌ **react-router-dom@^6.8.0** (FALTANTE)
- ❌ **workbox-window@^7.0.0** (FALTANTE)

### Backend:
- ✅ express@^4.18.2
- ✅ cors@^2.8.5
- ✅ sqlite3@^5.1.6
- ✅ node-cron@^3.0.3
- ❌ **nodemailer@^6.9.7** (FALTANTE)
- ❌ **bcryptjs@^2.4.3** (FALTANTE)
- ❌ **jsonwebtoken@^9.0.2** (FALTANTE)
- ❌ **web-push@^3.6.6** (FALTANTE)
- ❌ **openai@^4.20.1** (FALTANTE)

## 🎯 Estado Actual:

### ✅ Funciona sin react-hot-toast:
- He creado una función toast temporal que usa `alert()`
- La app funcionará, pero con alertas básicas en lugar de toasts elegantes

### ✅ Funciona sin recharts:
- He creado gráficos temporales con CSS y divs
- Los analytics funcionarán, pero con gráficos básicos en lugar de charts avanzados

### 🔄 Para restaurar funcionalidades completas:

#### 1. Toasts elegantes:
```bash
npm install react-hot-toast
```
Luego descomenta las líneas en:
- `src/App.jsx` (línea del Toaster)
- `src/components/AIAssistant.jsx`
- `src/components/SocialShareButtons.jsx`
- `src/components/CommunicationHub.jsx`

#### 2. Gráficos avanzados:
```bash
npm install recharts
```
Luego descomenta las líneas en:
- `src/components/Analytics.jsx` (imports de recharts)

## 🚀 Comando Rápido:
```bash
# Instalar todo de una vez
npm install && cd server && npm install && cd .. && npm run dev:full
```