# 🔧 Solución Rápida - Error de Build en Vercel

## ❌ Problema
El build falla porque las variables de entorno de Supabase no están configuradas correctamente.

## ✅ Solución

### Variables de Entorno Requeridas en Vercel

Ve a tu proyecto en Vercel → **Settings** → **Environment Variables** y agrega:

#### **Variables PÚBLICAS (marcar para Production, Preview y Development):**

```
NEXT_PUBLIC_SUPABASE_URL
```
Valor: Tu URL de Supabase (ejemplo: `https://xxxxx.supabase.co`)

```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```
Valor: Tu clave anon de Supabase (ejemplo: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

```
NEXT_PUBLIC_SITE_URL
```
Valor: Tu URL de Vercel (ejemplo: `https://tu-proyecto.vercel.app`)

```
NEXT_PUBLIC_SITE_NAME
```
Valor: `Universidad ULINEA`

#### **Variables PRIVADAS (solo Production y Preview):**

```
SUPABASE_SERVICE_ROLE_KEY
```
Valor: Tu service role key de Supabase (empieza con `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

#### **Variables OPCIONALES:**

```
ELEVENLABS_API_KEY
```
Valor: Tu API key de ElevenLabs (si usas el asistente de voz)

```
ELEVENLABS_VOICE_ID
```
Valor: Tu voice ID de ElevenLabs

---

## 📍 Dónde Obtener las Credenciales de Supabase

1. Ve a: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** → **API**
4. Copia:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ NUNCA expongas esta clave)

---

## 🔄 Después de Agregar las Variables

1. **Redeploy** el proyecto:
   - Ve a **Deployments** en Vercel
   - Haz clic en los 3 puntos del último deployment
   - Selecciona **"Redeploy"**

2. **Verifica** que el build sea exitoso

3. **Actualiza Supabase**:
   - Ve a tu proyecto de Supabase
   - **Settings** → **API** → **URL Configuration**
   - Agrega tu dominio de Vercel a las URLs permitidas

---

## ⚠️ IMPORTANTE

- Las variables con prefijo `NEXT_PUBLIC_` son **públicas** (visibles en el navegador)
- Las variables sin prefijo son **privadas** (solo en el servidor)
- **NUNCA** expongas `SUPABASE_SERVICE_ROLE_KEY` en el cliente
- Marca las variables `NEXT_PUBLIC_*` para **todos los entornos** (Production, Preview, Development)

---

## 🎯 Checklist Rápido

- [ ] `NEXT_PUBLIC_SUPABASE_URL` agregada
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` agregada
- [ ] `NEXT_PUBLIC_SITE_URL` agregada
- [ ] `NEXT_PUBLIC_SITE_NAME` agregada
- [ ] `SUPABASE_SERVICE_ROLE_KEY` agregada
- [ ] Variables `NEXT_PUBLIC_*` marcadas para todos los entornos
- [ ] Redeploy ejecutado
- [ ] Build exitoso ✅

---

## 🆘 Si Sigue Fallando

1. Verifica que las credenciales de Supabase sean correctas
2. Asegúrate de que el proyecto de Supabase esté activo
3. Revisa los logs de build en Vercel para errores específicos
4. Limpia el caché de Vercel: **Settings** → **General** → **Clear Cache**
