# 🏷️ CRUD de Registros de Marca - Frontend SignaIP

**Desarrollador**: Alexis Antonio Portillo Ortega  
**Fecha**: 24 agosto 2025  
**Empresa**: [www.signaip.com](https://www.signaip.com)

---

## 🌐 Acceso Público
**🔗 URL de la aplicación**: [https://frontend-react-two-hazel.vercel.app](https://frontend-react-two-hazel.vercel.app)

## 📋 Descripción del Proyecto

Interfaz web moderna y responsiva para la gestión completa de Registros de Marca, desarrollada como parte de la prueba técnica para el rol de **Desarrollador FullStack** en SignaIP. 

Esta aplicación frontend proporciona una experiencia de usuario intuitiva y profesional para interactuar con la API REST desarrollada en FastAPI, permitiendo gestionar todo el ciclo de vida de los registros de marca de manera eficiente.

### ✨ Funcionalidades Implementadas

- ✅ **Vista de Dashboard**: Listado completo de registros con tabla interactiva y responsiva
- ✅ **Crear Registros**: Formulario validado con campos obligatorios y opcionales
- ✅ **Editar Registros**: Modificación de registros existentes con pre-carga de datos
- ✅ **Eliminar Registros**: Eliminación segura con confirmación de usuario
- ✅ **Sistema de Estados**: Visualización con colores diferenciados para cada estado del registro
- ✅ **Gestión de Fechas**: Formateo automático de fechas de solicitud y aprobación
- ✅ **Validación de Formularios**: Validación client-side con mensajes de error claros
- ✅ **Estados de Carga**: Indicadores visuales durante las operaciones CRUD
- ✅ **Manejo de Errores**: Sistema robusto de manejo y visualización de errores
- ✅ **Diseño Responsivo**: Compatible con dispositivos móviles, tablets y desktop
- ✅ **Experiencia de Usuario**: Animaciones suaves y microinteracciones con Framer Motion
- ✅ **Footer Profesional**: Información de contacto y créditos

## 🛠️ Stack Tecnológico

### Frontend Core
- **Framework**: Next.js 15.5.0 (App Router)
- **Lenguaje**: TypeScript 5.x
- **React**: 19.1.0 con React DOM 19.1.0
- **Estilos**: Tailwind CSS 4.x con CSS custom properties

### Librerías y Utilidades
- **HTTP Client**: Axios 1.11.0 para comunicación con API REST
- **Iconos**: Lucide React 0.541.0 - conjunto moderno de iconos SVG
- **Fechas**: date-fns 4.1.0 para manipulación y formateo de fechas
- **Animaciones**: Framer Motion 12.23.12 para transiciones fluidas
- **Linting**: ESLint 9.x con configuración específica para Next.js

### Herramientas de Desarrollo
- **Type Checking**: TypeScript con tipos estrictos
- **Linting**: ESLint con reglas de Next.js y React
- **Build**: Next.js con optimización automática
- **Deploy**: Vercel con CI/CD automático

## 🏗️ Arquitectura del Proyecto

```
frontend-react/
├── app/                          # App Router (Next.js 13+)
│   ├── globals.css              # Estilos globales y variables CSS
│   ├── layout.tsx               # Layout principal de la aplicación
│   └── page.tsx                 # Página principal del dashboard
├── components/                   # Componentes reutilizables
│   ├── Loading.tsx              # Componente de estado de carga
│   ├── RegistroForm.tsx         # Formulario para crear/editar registros
│   ├── RegistrosList.tsx        # Tabla principal de registros
│   └── Footer.tsx               # Footer profesional
├── hooks/                        # Custom React Hooks
│   └── useRegistros.ts          # Hook para manejo de estado de registros
├── services/                     # Servicios de API
│   └── api.ts                   # Cliente HTTP para comunicación con FastAPI
├── types/                        # Definiciones de tipos TypeScript
│   └── index.ts                 # Interfaces y enums del dominio
├── public/                       # Recursos estáticos
├── .env.local                   # Variables de entorno (development)
├── next.config.js               # Configuración de Next.js
├── tailwind.config.ts           # Configuración de Tailwind CSS
├── tsconfig.json               # Configuración de TypeScript
└── package.json                # Dependencias y scripts
```

## 🚀 Instalación y Configuración Local

### Prerrequisitos
- **Node.js**: versión 18.0.0 o superior
- **npm**: versión 8.0.0 o superior (o yarn 3.0+)
- **Git**: para clonación del repositorio

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/alexisportillodev/frontend-react.git
cd frontend-react
```

2. **Instalar dependencias**
```bash
npm install
# o alternativamente
yarn install
```

3. **Configurar variables de entorno**
```bash
# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=https://registro-marca-api.onrender.com" > .env.local
```

4. **Ejecutar en modo desarrollo**
```bash
npm run dev
# o alternativamente  
yarn dev
```

5. **Acceder a la aplicación**
```
🌐 http://localhost:3000
```

### Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Genera build de producción
npm run start    # Inicia servidor de producción
npm run lint     # Ejecuta ESLint para verificar código
```

## 🔧 Configuración de Producción

### Variables de Entorno Requeridas
```bash
NEXT_PUBLIC_API_URL=https://registro-marca-api.onrender.com
```

### Build y Deploy
```bash
# Generar build optimizado
npm run build

# Iniciar en modo producción (local)
npm run start
```

## 🌐 Deploy en Vercel

### Configuración Automática
1. Conectar repositorio de GitHub con Vercel
2. Configurar variable de entorno `NEXT_PUBLIC_API_URL`
3. Deploy automático en cada push a branch `main`

### URLs del Proyecto
- **Producción**: [https://frontend-react-two-hazel.vercel.app](https://frontend-react-two-hazel.vercel.app)
- **API Backend**: [https://registro-marca-api.onrender.com](https://registro-marca-api.onrender.com)
- **Documentación API**: [https://registro-marca-api.onrender.com/docs](https://registro-marca-api.onrender.com/docs)

## 🎨 Diseño y UX

### Sistema de Design
- **Paleta de Colores**: Esquema profesional con soporte para modo claro
- **Tipografía**: Inter (principal) y Courier New (monoespaciado)
- **Spacing**: Sistema consistente basado en Tailwind CSS
- **Componentes**: Reutilizables y modulares con props tipadas

### Estados de Registro con Colores
- 🟡 **Pendiente**: Amarillo (`bg-yellow-100 text-yellow-800`)
- 🔵 **En Revisión**: Azul (`bg-blue-100 text-blue-800`)
- 🟢 **Aprobado**: Verde (`bg-green-100 text-green-800`)
- 🔴 **Rechazado**: Rojo (`bg-red-100 text-red-800`)
- 💚 **Vigente**: Verde esmeralda (`bg-emerald-100 text-emerald-800`)
- ⚫ **Vencido**: Gris (`bg-gray-100 text-gray-800`)

### Responsive Design
- **Mobile First**: Optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Scroll Horizontal**: Tabla responsiva en pantallas pequeñas

## 🧪 Testing y Calidad

### Verificación de Funcionalidades
- [ ] Carga inicial de registros desde API
- [ ] Creación de nuevos registros con validación
- [ ] Edición de registros existentes
- [ ] Eliminación con confirmación de usuario
- [ ] Manejo de errores de conexión
- [ ] Estados de carga durante operaciones
- [ ] Responsividad en diferentes dispositivos

### Comandos de Verificación
```bash
# Verificar build sin errores
npm run build

# Verificar linting
npm run lint

# Test de producción local
npm run build && npm run start
```

## 🔗 Integración con Backend

### Endpoints Consumidos
- `GET /registros/` - Listar todos los registros
- `GET /registros/{id}` - Obtener registro específico
- `POST /registros/` - Crear nuevo registro
- `PUT /registros/{id}` - Actualizar registro existente
- `DELETE /registros/{id}` - Eliminar registro

### Modelo de Datos
```typescript
interface RegistroMarca {
  id?: number;
  nombre_marca: string;
  descripcion?: string;
  categoria: string;
  clase_niza?: string;
  solicitante: string;
  email_solicitante: string;
  estado: EstadoRegistro;
  numero_solicitud?: string;
  fecha_solicitud?: string;
  fecha_aprobacion?: string;
  created_at?: string;
  updated_at?: string;
}
```

## 🚀 Características Técnicas Destacadas

### Performance
- **Server-Side Rendering**: Next.js App Router para mejor SEO
- **Optimización de Imágenes**: Next.js Image component
- **Bundle Optimization**: Tree-shaking y code splitting automático
- **Caching**: Estrategias de cache para mejor rendimiento

### Accesibilidad
- **Semantic HTML**: Estructura semánticamente correcta
- **ARIA Labels**: Etiquetas para lectores de pantalla
- **Keyboard Navigation**: Navegación completa por teclado
- **Color Contrast**: Cumple estándares WCAG 2.1

### Seguridad
- **Input Validation**: Validación exhaustiva en frontend
- **XSS Protection**: Sanitización de datos de usuario
- **HTTPS Only**: Comunicación segura con API
- **Environment Variables**: Configuración segura de variables

## 🤝 Contribución y Desarrollo

### Convenciones de Código
- **ESLint**: Configuración estricta con reglas de Next.js
- **TypeScript**: Tipado estricto sin `any`
- **Naming**: camelCase para variables, PascalCase para componentes
- **File Structure**: Organización por funcionalidad

### Git Workflow
```bash
# Feature branch
git checkout -b feature/nueva-funcionalidad

# Commits descriptivos
git commit -m "feat: agregar validación de email en formulario"

# Push y Pull Request
git push origin feature/nueva-funcionalidad
```

## 📞 Información de Contacto

**Desarrollador**: Alexis Antonio Portillo Ortega  
**Email**: [alexisportillo95@outlook.com]  
**LinkedIn**: [[tu-perfil-linkedin](https://www.linkedin.com/in/alexis-antonio-portillo-ortega/)]  

---

## 📄 Licencia

Este proyecto fue desarrollado como parte de una prueba técnica para SignaIP. Todos los derechos reservados.

---

**Desarrollado con ❤️ para SignaIP** | **Agosto 2025**

> 💡 **Nota**: Esta aplicación demuestra competencias en desarrollo frontend moderno, integración de APIs REST, UX/UI design, y deployment en producción. Representa un ejemplo completo de arquitectura frontend escalable y mantenible.
