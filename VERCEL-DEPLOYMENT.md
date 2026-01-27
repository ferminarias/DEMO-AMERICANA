# 🚀 Guía de Despliegue en Vercel

Esta guía te llevará paso a paso para desplegar tu aplicación Next.js en Vercel.

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener:
- ✅ Cuenta de GitHub con el repositorio del proyecto
- ✅ Cuenta de Vercel (gratuita) - [vercel.com](https://vercel.com)
- ✅ Cuenta de Supabase configurada
- ✅ (Opcional) Cuenta de ElevenLabs para el asistente de voz

## 🎯 Método 1: Despliegue desde GitHub (Recomendado)

### Paso 1: Preparar el Repositorio

1. **Asegúrate de que tu código esté en GitHub:**
   ```bash
   git add .
   git commit -m "Preparar para despliegue en Vercel"
   git push origin main
   ```

2. **Verifica que `.gitignore` esté correctamente configurado:**
   - No debe incluir archivos `.env.local` (ya está configurado)
   - Debe ignorar `node_modules/` y `.next/`

### Paso 2: Conectar con Vercel

1. **Accede a Vercel:**
   - Ve a [vercel.com](https://vercel.com)
   - Haz clic en "Sign Up" o "Log In"
   - Conecta con tu cuenta de GitHub

2. **Importar el Proyecto:**
   - Haz clic en "Add New..." → "Project"
   - Selecciona tu repositorio `AGENTE-UNAB-DEMO`
   - Haz clic en "Import"

### Paso 3: Configurar el Proyecto

1. **Configuración del Framework:**
   - Framework Preset: **Next.js** (se detecta automáticamente)
   - Root Directory: `./` (raíz del proyecto)
   - Build Command: `npm run build` o `next build`
   - Output Directory: `.next` (automático)
   - Install Command: `npm install`

2. **No hagas clic en "Deploy" todavía** - primero configura las variables de entorno.

### Paso 4: Configurar Variables de Entorno

En la sección "Environment Variables", agrega las siguientes variables:

#### Variables Obligatorias:

```env
# Site Configuration
NEXT_PUBLIC_SITE_URL=https://tu-proyecto.vercel.app
NEXT_PUBLIC_SITE_NAME=Universidad ULINEA

# Supabase Configuration (PÚBLICAS - marcar para todos los entornos)
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# Supabase Service Role (PRIVADA - solo Production y Preview)
SUPABASE_SERVICE_ROLE_KEY=tu_supabase_service_role_key
```

#### Variables Opcionales:

```env
# ElevenLabs (si usas el asistente de voz)
ELEVENLABS_API_KEY=tu_elevenlabs_api_key
ELEVENLABS_VOICE_ID=tu_voice_id

# Security & Captcha (si lo necesitas)
ENABLE_CAPTCHA=false
RECAPTCHA_SITE_KEY=tu_recaptcha_site_key
RECAPTCHA_SECRET_KEY=tu_recaptcha_secret_key
```

**Importante:** 
- Marca las variables que empiezan con `NEXT_PUBLIC_` para todos los entornos (Production, Preview, Development)
- Las demás variables solo necesitan estar en Production y Preview

### Paso 5: Desplegar

1. Haz clic en **"Deploy"**
2. Espera a que termine el build (2-5 minutos)
3. Una vez completado, verás tu URL de producción

### Paso 6: Actualizar la URL en Supabase

1. Ve a tu proyecto de Supabase
2. Settings → API → URL Configuration
3. Agrega tu dominio de Vercel a las URLs permitidas:
   - `https://tu-proyecto.vercel.app`
   - `https://*.vercel.app` (para preview deployments)

### Paso 7: Verificar el Despliegue

Visita tu URL de Vercel y verifica:
- ✅ La página carga correctamente
- ✅ El formulario de contacto funciona
- ✅ Las imágenes se muestran
- ✅ El asistente de voz funciona (si está configurado)

## 🎯 Método 2: Despliegue con Vercel CLI

### Instalación de Vercel CLI

```bash
npm install -g vercel
```

### Despliegue

1. **Login en Vercel:**
   ```bash
   vercel login
   ```

2. **Desplegar a Preview:**
   ```bash
   vercel
   ```

3. **Desplegar a Production:**
   ```bash
   vercel --prod
   ```

4. **Configurar variables de entorno:**
   ```bash
   vercel env add SUPABASE_URL
   vercel env add SUPABASE_ANON_KEY
   # ... etc
   ```

## 🔄 Despliegues Automáticos

Una vez conectado con GitHub, Vercel desplegará automáticamente:

- **Production:** Cada push a la rama `main` o `master`
- **Preview:** Cada push a otras ramas o Pull Requests

## 🌐 Configurar Dominio Personalizado

### Opción 1: Dominio de Vercel (Gratis)

Tu proyecto tendrá automáticamente un dominio como:
- `tu-proyecto.vercel.app`

### Opción 2: Dominio Personalizado

1. Ve a tu proyecto en Vercel
2. Settings → Domains
3. Agrega tu dominio personalizado (ej: `www.ulinea.edu.mx`)
4. Sigue las instrucciones para configurar los DNS:
   - **Tipo A:** Apunta a la IP de Vercel
   - **Tipo CNAME:** Apunta a `cname.vercel-dns.com`

## 🔧 Configuración Avanzada

### Build Settings

Si necesitas personalizar el build, crea un archivo `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nextjs",
  "regions": ["iad1"],
  "env": {
    "NEXT_PUBLIC_SITE_URL": "https://tu-proyecto.vercel.app"
  }
}
```

### Optimizaciones

El proyecto ya incluye:
- ✅ Next.js Image Optimization
- ✅ Automatic Static Optimization
- ✅ Incremental Static Regeneration (ISR)
- ✅ Edge Functions para APIs

## 📊 Monitoreo y Analytics

### Vercel Analytics (Incluido)

El proyecto ya tiene `@vercel/analytics` instalado. Para activarlo:

1. Ve a tu proyecto en Vercel
2. Analytics → Enable
3. Los datos aparecerán automáticamente

### Logs y Debugging

- **Runtime Logs:** Vercel Dashboard → Deployments → Logs
- **Build Logs:** Vercel Dashboard → Deployments → Build Logs
- **Real-time Logs:** `vercel logs` (CLI)

## 🐛 Solución de Problemas

### Error: "Build Failed"

1. Verifica que todas las dependencias estén en `package.json`
2. Revisa los logs de build en Vercel
3. Prueba el build localmente:
   ```bash
   npm run build
   ```

### Error: "Environment Variables Not Found"

1. Verifica que las variables estén configuradas en Vercel
2. Asegúrate de que las variables `NEXT_PUBLIC_*` estén marcadas para todos los entornos
3. Redespliega el proyecto

### Error: "Supabase Connection Failed"

1. Verifica las credenciales de Supabase
2. Asegúrate de que la URL de Vercel esté en las URLs permitidas de Supabase
3. Revisa que las variables de entorno estén correctas

### Error: "Module Not Found"

1. Verifica que todas las dependencias estén instaladas:
   ```bash
   npm install
   ```
2. Limpia el caché de Vercel:
   - Settings → General → Clear Cache

## 🔒 Seguridad

### Variables de Entorno

- ✅ Nunca commitees archivos `.env.local` a Git
- ✅ Usa variables `NEXT_PUBLIC_*` solo para datos públicos
- ✅ Las API keys sensibles deben estar en variables privadas

### CORS y Dominios

Asegúrate de configurar:
- Supabase: URLs permitidas
- ElevenLabs: Dominios autorizados (si aplica)

## 📈 Mejores Prácticas

1. **Preview Deployments:** Prueba cambios en preview antes de production
2. **Environment Variables:** Usa diferentes valores para preview y production
3. **Monitoring:** Revisa regularmente los logs y analytics
4. **Performance:** Usa Vercel Speed Insights para optimizar
5. **Rollback:** Si algo falla, puedes hacer rollback a un deployment anterior

## 🎉 ¡Listo!

Tu aplicación ahora está desplegada en Vercel. Cada vez que hagas push a GitHub, se desplegará automáticamente.

### URLs Importantes

- **Dashboard de Vercel:** https://vercel.com/dashboard
- **Documentación:** https://vercel.com/docs
- **Soporte:** https://vercel.com/support

---

## 📞 Ayuda Adicional

Si encuentras problemas:
1. Revisa los logs en Vercel Dashboard
2. Consulta la documentación de Next.js y Vercel
3. Verifica que todas las variables de entorno estén configuradas
4. Prueba el build localmente antes de desplegar

**¡Feliz despliegue! 🚀**
