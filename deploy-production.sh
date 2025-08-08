#!/bin/bash

echo "🚀 Preparando App de Cumpleaños para Hosting Propio..."

# Crear directorio de producción
echo "📁 Creando directorio de producción..."
rm -rf production-build
mkdir -p production-build

# Build del frontend
echo "🔨 Construyendo frontend..."
npm run build

# Copiar archivos necesarios para producción
echo "📦 Copiando archivos..."

# Copiar build del frontend
cp -r dist/* production-build/

# Copiar servidor
cp -r server production-build/
cp package.json production-build/
cp README.md production-build/

# Crear package.json para producción
cat > production-build/package.json << 'EOF'
{
  "name": "cumple-app-production",
  "version": "1.0.0",
  "type": "module",
  "main": "server/index.js",
  "scripts": {
    "start": "node server/index.js",
    "migrate": "node server/migrate.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "sqlite3": "^5.1.6",
    "node-cron": "^3.0.3"
  }
}
EOF

# Crear archivo de configuración para servidor web
cat > production-build/.htaccess << 'EOF'
# Configuración para Apache
RewriteEngine On

# Redirigir API calls al servidor Node.js
RewriteRule ^api/(.*)$ http://localhost:3001/api/$1 [P,L]

# Servir archivos estáticos
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Headers de seguridad
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"

# Compresión
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache para archivos estáticos
<IfModule mod_expires.c>
    ExpiresActive on
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
EOF

# Crear configuración para Nginx
cat > production-build/nginx.conf << 'EOF'
# Configuración para Nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /path/to/production-build;
    index index.html;

    # Servir archivos estáticos
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Proxy para API
    location /api/ {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Headers de seguridad
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Compresión
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;

    # Cache para archivos estáticos
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# Crear script de inicio para PM2
cat > production-build/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [{
    name: 'cumple-app',
    script: 'server/index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3001
    }
  }]
}
EOF

# Crear script de instalación
cat > production-build/install.sh << 'EOF'
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
EOF

chmod +x production-build/install.sh

# Crear archivo ZIP para subir
echo "📦 Creando archivo ZIP..."
cd production-build
zip -r ../cumple-app-production.zip . -x "*.DS_Store"
cd ..

echo ""
echo "✅ ¡Preparación completada!"
echo ""
echo "📁 Archivos generados:"
echo "   - production-build/ (directorio completo)"
echo "   - cumple-app-production.zip (archivo para subir)"
echo ""
echo "🚀 Próximos pasos:"
echo "1. Subir cumple-app-production.zip a tu servidor"
echo "2. Extraer: unzip cumple-app-production.zip"
echo "3. Ejecutar: chmod +x install.sh && ./install.sh"
echo "4. Configurar servidor web (Apache/Nginx)"
echo ""
echo "🔧 Requisitos del servidor:"
echo "   - Node.js 16+ instalado"
echo "   - npm instalado"
echo "   - PM2 (se instala automáticamente)"
echo "   - Apache o Nginx configurado"