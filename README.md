# Asistente Virtual UNAB

Widget de asistente de voz inteligente para la Universidad Autónoma de Bucaramanga (UNAB), construido con Next.js 14, TypeScript y Tailwind CSS.

## 🚀 Características

### ✨ Funcionalidades Principales
- **Widget de Voz Flotante**: Botón naranja flotante con asistente de voz IA
- **Integración ElevenLabs**: Conversación por voz en tiempo real
- **Chat de Texto**: Opción de chat por texto durante la conversaciónf
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **Colores Personalizados**: Esquema de colores naranja (marca UNAB)
- **Modo Embed**: Puede integrarse en iframes para WordPress u otros sitios

### 🛠 Stack Tecnológico
- **Framework**: Next.js 14 (App Router)
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS v4
- **Componentes**: shadcn/ui
- **IA de Voz**: ElevenLabs Conversational AI
- **WebRTC**: Para comunicación en tiempo real
- **Analytics**: Vercel Analytics

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm, yarn o pnpm
- Cuenta de ElevenLabs con API Key (requerido para el asistente de voz)

### 1. Clonar el repositorio
\`\`\`bash
git clone <repository-url>
cd ulinea-university
\`\`\`

### 2. Instalar dependencias
\`\`\`bash
npm install
# o
yarn install
\`\`\`

### 3. Configurar variables de entorno
Copia `.env.example` a `.env.local` y configura las variables:

\`\`\`env
# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Universidad ULINEA"

# ElevenLabs Configuration (opcional - solo para asistente de voz)
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_VOICE_ID=your_voice_id

# Security & Captcha (opcional)
ENABLE_CAPTCHA=false
RECAPTCHA_SITE_KEY=your_recaptcha_site_key
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key
\`\`\`

### 4. Ejecutar en desarrollo
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

Visita `http://localhost:3000` para ver la aplicación.

## 📁 Estructura del Proyecto

\`\`\`
├── app/                    # App Router de Next.js
│   ├── api/               # API Routes
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── sections/          # Secciones de la página
│   ├── ui/               # Componentes de UI (shadcn)
│   └── voice-assistant/   # Widget de asistente de voz
├── lib/                   # Utilidades y configuración
│   ├── constants.ts       # Datos estáticos
│   ├── supabase.ts       # Cliente de Supabase
│   ├── validators.ts      # Esquemas de validación
│   └── seo.ts            # Configuración SEO
├── public/               # Archivos estáticos
└── supabase.sql          # Schema de base de datos
\`\`\`

## 🎯 Funcionalidades Detalladas

### Formulario de Contacto
- Validación en tiempo real con Zod
- Rate limiting para prevenir spam
- Captura de datos UTM para tracking
- Almacenamiento seguro en Supabase
- Notificaciones con toasts

### Asistente de Voz
- Integración con ElevenLabs Realtime API
- Reconocimiento de voz (Web Speech API como fallback)
- Síntesis de voz natural
- Interfaz conversacional intuitiva
- Manejo de errores y reconexión automática

### SEO y Performance
- Meta tags optimizados
- JSON-LD para datos estructurados
- Sitemap automático
- Imágenes optimizadas con next/image
- Lazy loading de componentes pesados
- Core Web Vitals optimizados

## 🚀 Despliegue

### Vercel (Recomendado)

**📖 [Ver Guía Completa de Despliegue en Vercel](./VERCEL-DEPLOYMENT.md)**

Pasos rápidos:
1. Conecta tu repositorio de GitHub a Vercel
2. Configura las variables de entorno (ver `.env.example`)
3. Despliega automáticamente

### Otros Proveedores
El proyecto es compatible con cualquier proveedor que soporte Next.js:
- Netlify
- Railway
- DigitalOcean App Platform

## 🔧 Personalización

### Colores de Marca
Los colores se definen en `app/globals.css`:
\`\`\`css
:root {
  --ulinea-blue: #1e40af;
  --ulinea-orange: #ff6b35;
  /* ... */
}
\`\`\`

### Contenido
Los datos se centralizan en `lib/constants.ts`:
- Programas académicos
- Testimonios
- Beneficios
- FAQ

### Componentes
Todos los componentes usan shadcn/ui y son completamente personalizables.

## 📊 Analytics y Monitoreo

- **Vercel Analytics**: Métricas de performance y uso
- **Supabase**: Logs de formularios de contacto
- **Rate Limiting**: Protección contra spam y abuso

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@ulinea.edu.mx
- Teléfono: +52 55 1234 5678

---

Desarrollado con ❤️ para Universidad ULINEA
