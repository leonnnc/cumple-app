#!/bin/bash
echo "🚀 Instalando App de Cumpleaños en servidor..."

# Instalar dependencias
npm install

# Configurar base de datos
node server/migrate.js

# Instalar PM2 si no está instalado
if ! command -v pm2 &> /dev/null; then
    echo "📦 Instalando PM2..."
    npm install -g pm2
fi

# Iniciar aplicación con PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup

echo "✅ Instalación completada!"
echo "🌐 Frontend: Servir archivos estáticos desde este directorio"
echo "🔧 Backend: Corriendo en puerto 3001 con PM2"
echo "📊 Monitoreo: pm2 monit"
echo "🔄 Reiniciar: pm2 restart cumple-app"
