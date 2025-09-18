# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a Familia ParAreMacPobReaBerCas! Esta guía te ayudará a empezar.

## 🚀 Cómo Contribuir

### 1. Fork y Clone
```bash
# Fork el repositorio en GitHub
# Luego clona tu fork
git clone https://github.com/TU_USUARIO/birthday-app.git
cd birthday-app
```

### 2. Configurar Entorno
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev:full
```

### 3. Crear Rama
```bash
# Crear rama para tu feature
git checkout -b feature/mi-nueva-funcionalidad

# O para un bugfix
git checkout -b fix/corregir-error
```

## 📝 Estándares de Código

### Estructura de Commits
```
tipo(alcance): descripción breve

Descripción más detallada si es necesario.

- Cambio específico 1
- Cambio específico 2
```

**Tipos de commit:**
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Documentación
- `style`: Formato, punto y coma, etc
- `refactor`: Refactoring de código
- `test`: Agregar tests
- `chore`: Tareas de mantenimiento

### Ejemplo:
```
feat(dashboard): agregar gráfico de cumpleaños por mes

Implementa un nuevo gráfico circular que muestra la distribución
de cumpleaños por mes del año.

- Agrega componente MonthlyChart
- Integra con Recharts
- Añade animaciones suaves
```

## 🧪 Testing

```bash
# Ejecutar linting
npm run lint

# Compilar para verificar errores
npm run build

# Probar la aplicación
npm run dev:full
```

## 📋 Checklist antes de PR

- [ ] El código sigue los estándares del proyecto
- [ ] Se ejecuta `npm run lint` sin errores
- [ ] Se ejecuta `npm run build` exitosamente
- [ ] La funcionalidad ha sido probada manualmente
- [ ] Se actualizó la documentación si es necesario
- [ ] Los commits siguen el formato establecido

## 🐛 Reportar Bugs

Usa el template de issues de GitHub e incluye:

1. **Descripción del bug**
2. **Pasos para reproducir**
3. **Comportamiento esperado**
4. **Comportamiento actual**
5. **Screenshots** (si aplica)
6. **Entorno** (OS, navegador, versión de Node)

## 💡 Sugerir Funcionalidades

Para nuevas funcionalidades:

1. **Descripción clara** de la funcionalidad
2. **Justificación** - ¿por qué es útil?
3. **Casos de uso** específicos
4. **Mockups o wireframes** (si aplica)

## 🎯 Áreas de Contribución

### Frontend
- Componentes React
- Estilos con Tailwind
- Animaciones con Framer Motion
- PWA features

### Backend
- API endpoints
- Base de datos
- Autenticación
- Cron jobs

### Documentación
- README
- Comentarios en código
- Guías de usuario
- API documentation

### Testing
- Unit tests
- Integration tests
- E2E tests

## 📞 Contacto

¿Tienes preguntas? Abre un issue o contacta:

- GitHub: [@leonnnc](https://github.com/leonnnc)
- Email: [tu-email@ejemplo.com]

## 🙏 Reconocimientos

Todos los contribuidores serán reconocidos en el README principal.

¡Gracias por hacer Familia ParAreMacPobReaBerCas mejor! 🎉