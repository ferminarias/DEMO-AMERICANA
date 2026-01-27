# ✅ Checklist de Despliegue a Vercel

Usa esta lista para asegurarte de que todo está listo antes de desplegar.

## 📋 Antes de Desplegar

### 1. Repositorio Git
- [ ] El código está commiteado y pusheado a GitHub
- [ ] La rama principal es `main` o `master`
- [ ] El archivo `.gitignore` está configurado correctamente
- [ ] No hay archivos `.env.local` en el repositorio

### 2. Configuración de Supabase
- [ ] Proyecto de Supabase creado
- [ ] Base de datos configurada con el schema (`supabase.sql`)
- [ ] Tabla `contact_submissions` creada
- [ ] API Keys copiadas (URL, Anon Key, Service Role Key)
- [ ] RLS (Row Level Security) configurado si es necesario

### 3. Variables de Entorno
- [ ] Archivo `.env.example` revisado
- [ ] `SUPABASE_URL` obtenida
- [ ] `SUPABASE_ANON_KEY` obtenida
- [ ] `SUPABASE_SERVICE_ROLE_KEY` obtenida
- [ ] (Opcional) `ELEVENLABS_API_KEY` obtenida
- [ ] (Opcional) `ELEVENLABS_VOICE_ID` obtenida

### 4. Pruebas Locales
- [ ] `npm install` ejecutado sin errores
- [ ] `npm run build` ejecutado exitosamente
- [ ] `npm run dev` funciona correctamente
- [ ] Formulario de contacto probado
- [ ] Todas las páginas cargan sin errores
- [ ] No hay errores en la consola del navegador

## 🚀 Durante el Despliegue

### 5. Configuración en Vercel
- [ ] Cuenta de Vercel creada
- [ ] Repositorio importado en Vercel
- [ ] Framework detectado como Next.js
- [ ] Variables de entorno agregadas en Vercel:
  - [ ] `NEXT_PUBLIC_SITE_URL` (con tu dominio de Vercel)
  - [ ] `NEXT_PUBLIC_SITE_NAME`
  - [ ] `SUPABASE_URL`
  - [ ] `SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
  - [ ] (Opcional) `ELEVENLABS_API_KEY`
  - [ ] (Opcional) `ELEVENLABS_VOICE_ID`
- [ ] Variables `NEXT_PUBLIC_*` marcadas para todos los entornos
- [ ] Build iniciado

### 6. Primer Despliegue
- [ ] Build completado sin errores
- [ ] URL de producción generada
- [ ] Sitio accesible desde la URL

## ✅ Después del Despliegue

### 7. Configuración Post-Despliegue
- [ ] URL de Vercel agregada a Supabase (Settings → API → URL Configuration)
- [ ] Dominio `*.vercel.app` agregado a URLs permitidas en Supabase
- [ ] (Si aplica) Dominio agregado a ElevenLabs

### 8. Verificación Funcional
- [ ] Página principal carga correctamente
- [ ] Todas las secciones son visibles
- [ ] Imágenes se cargan correctamente
- [ ] Formulario de contacto funciona
- [ ] Datos se guardan en Supabase
- [ ] (Si aplica) Asistente de voz funciona
- [ ] Responsive design funciona en móvil
- [ ] No hay errores en la consola

### 9. SEO y Performance
- [ ] Meta tags visibles en el código fuente
- [ ] Sitemap accesible en `/sitemap.xml`
- [ ] Robots.txt accesible en `/robots.txt`
- [ ] Open Graph tags configurados
- [ ] Favicon visible

### 10. Monitoreo
- [ ] Vercel Analytics habilitado (opcional)
- [ ] Logs de Vercel revisados
- [ ] Errores de runtime verificados

## 🔄 Despliegues Futuros

### 11. Flujo de Trabajo
- [ ] Despliegues automáticos configurados
- [ ] Preview deployments funcionando en PRs
- [ ] Notificaciones de despliegue configuradas (opcional)

## 🐛 Si Algo Sale Mal

### Troubleshooting Rápido
1. **Build falla:**
   - Revisa los logs de build en Vercel
   - Ejecuta `npm run build` localmente
   - Verifica que todas las dependencias estén en `package.json`

2. **Variables de entorno no funcionan:**
   - Verifica que estén configuradas en Vercel
   - Redespliega el proyecto
   - Asegúrate de que las variables `NEXT_PUBLIC_*` estén marcadas correctamente

3. **Supabase no conecta:**
   - Verifica las credenciales
   - Agrega la URL de Vercel a las URLs permitidas en Supabase
   - Revisa los logs de runtime en Vercel

4. **Errores 404:**
   - Verifica que el routing de Next.js esté correcto
   - Revisa el archivo `next.config.mjs`
   - Limpia el caché de Vercel

## 📞 Recursos de Ayuda

- **Guía Completa:** Ver `VERCEL-DEPLOYMENT.md`
- **Documentación Vercel:** https://vercel.com/docs
- **Documentación Next.js:** https://nextjs.org/docs
- **Documentación Supabase:** https://supabase.com/docs

---

**¡Felicidades! 🎉** Si completaste todos los checks, tu aplicación está lista para producción.
