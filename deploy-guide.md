# 🚀 Guía de Deploy - Fam. ParAreMacPobReaBerCas

## 📋 **Preparación Completada:**
- ✅ `vercel.json` configurado
- ✅ Scripts de build actualizados
- ✅ Servidor preparado para producción

## 🌐 **Opción 1: Deploy con Vercel (Recomendado)**

### **Paso 1: Crear cuenta en Vercel**
1. Ve a [vercel.com](https://vercel.com)
2. Regístrate con GitHub, GitLab o email

### **Paso 2: Subir código a GitHub**
```bash
# Inicializar git (si no está inicializado)
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "🎉 Fam. ParAreMacPobReaBerCas lista para deploy"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/cumple-app.git
git branch -M main
git push -u origin main
```

### **Paso 3: Deploy en Vercel**
1. En Vercel, clic en "New Project"
2. Importar desde GitHub
3. Seleccionar tu repositorio
4. Configurar:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clic en "Deploy"

### **Variables de Entorno (¡Muy Importante!)**
Para que tu aplicación funcione de forma segura en producción, debes configurar las siguientes variables de entorno en el panel de tu proveedor de hosting (Vercel, Railway, etc.). **Nunca guardes secretos directamente en el código.**

```sh
NODE_ENV=production
ADMIN_USER=Leonnnc
ADMIN_PASSWORD=tu_contraseña_segura_aqui
# Agrega aquí otras claves si las usas (ej. para OpenAI, Nodemailer, etc.)
# API_KEY_OPENAI=...
```

---

## 🌐 **Opción 2: Deploy con Railway**

### **Paso 1: Crear cuenta**
1. Ve a [railway.app](https://railway.app)
2. Regístrate con GitHub

### **Paso 2: Deploy**
1. Clic en "New Project"
2. "Deploy from GitHub repo"
3. Seleccionar repositorio
4. Railway detectará automáticamente Node.js

---

## 🌐 **Opción 3: Deploy con Render**

### **Paso 1: Crear cuenta**
1. Ve a [render.com](https://render.com)
2. Regístrate con GitHub

### **Paso 2: Crear Web Service**
1. "New" → "Web Service"
2. Conectar repositorio
3. Configurar:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run server`

---

## 📁 **Estructura para Deploy:**
```
cumple-app/
├── dist/              # Build del frontend (generado)
├── server/            # Backend Node.js
│   ├── index.js
│   ├── package.json
│   └── birthdays.db
├── src/               # Código fuente React
├── vercel.json        # Configuración Vercel
├── package.json       # Dependencias principales
└── vite.config.js     # Configuración Vite
```

## 🔧 **Comandos Importantes:**
```bash
# Build para producción
npm run build

# Iniciar servidor local
npm run server

# Desarrollo completo
npm run dev:full
```

## 🎯 **Después del Deploy:**
1. ✅ Tu app estará disponible en una URL como: `https://tu-app.vercel.app`
2. ✅ El backend funcionará en la misma URL: `https://tu-app.vercel.app/api`
3. ✅ La base de datos SQLite funcionará (para proyectos pequeños)

## ⚠️ **Notas Importantes:**
- La base de datos SQLite es temporal en algunos hostings
- Para producción real, considera PostgreSQL o MongoDB
- Las imágenes se almacenan en memoria (considera Cloudinary para producción)

## 🆘 **Si hay problemas:**
1. Revisa los logs en el dashboard del hosting
2. Verifica que todas las dependencias estén en `package.json`
3. Asegúrate de que las rutas de API sean correctas