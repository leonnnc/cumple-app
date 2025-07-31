#!/bin/bash

echo "🚀 Preparando App de Cumpleaños para Deploy..."

# Limpiar builds anteriores
echo "🧹 Limpiando builds anteriores..."
rm -rf dist
rm -rf node_modules/.vite

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

# Build para producción
echo "🔨 Construyendo para producción..."
npm run build

# Verificar que el build fue exitoso
if [ -d "dist" ]; then
    echo "✅ Build completado exitosamente!"
    echo "📁 Archivos generados en /dist"
    ls -la dist/
else
    echo "❌ Error en el build"
    exit 1
fi

echo ""
echo "🎉 ¡Listo para deploy!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Subir código a GitHub:"
echo "   git add ."
echo "   git commit -m '🚀 Ready for deploy'"
echo "   git push"
echo ""
echo "2. Ir a vercel.com y hacer deploy desde GitHub"
echo ""
echo "🔗 URLs importantes:"
echo "   - Vercel: https://vercel.com"
echo "   - Railway: https://railway.app"
echo "   - Render: https://render.com"