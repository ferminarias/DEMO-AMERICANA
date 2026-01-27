# 🔒 Mejores Prácticas de Seguridad para Embeds

## 1. **API Keys por Dominio (Recomendado)**
```javascript
// En tu API
const ALLOWED_DOMAINS = {
  'miescuela.com': 'key_abc123',
  'otraescuela.com': 'key_def456'
}

// Validación servidor:
const apiKey = request.headers['x-api-key']
const origin = request.headers['origin']
if (ALLOWED_DOMAINS[origin] !== apiKey) {
  return 401
}
```

## 2. **JWT Tokens con Expiración**
```javascript
// Generar token para dominio específico
const token = jwt.sign({ 
  domain: 'miescuela.com',
  exp: Date.now() + 3600000 // 1 hora
}, SECRET_KEY)

// Validar en cada request
jwt.verify(token, SECRET_KEY)
```

## 3. **CORS Estricto + Headers**
```javascript
// next.config.js
headers: [
  {
    source: '/voice/embed',
    headers: [
      { key: 'X-Frame-Options', value: 'DENY' }, // Bloquear iframes
      { 
        key: 'Content-Security-Policy', 
        value: "frame-ancestors 'none'" 
      }
    ]
  }
]

// Solo permitir via API con autenticación
```

## 4. **Rate Limiting por IP/Dominio**
```javascript
import { rateLimit } from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por IP
  message: 'Too many requests from this IP'
})
```

## 5. **Servidor Proxy Interno**
```javascript
// En lugar de iframe directo, crear endpoint proxy:
// /api/widget-proxy?domain=authorized-domain.com
// Que valide y sirva el contenido
```

## 🎯 **Solución Práctica para ULINEA:**

### **Opción A: Simple pero Efectiva**
1. **Environment Variable** con dominios autorizados
2. **Validación en APIs** (no en frontend)
3. **Rate limiting** por IP

### **Opción B: Enterprise**
1. **Dashboard de clientes** para generar API keys
2. **JWT tokens** por sesión
3. **Métricas y analytics** por dominio
4. **Whitelisting** estricto

## ⚡ **Para tu caso específico:**

Dado que es para WordPress, la validación por `document.referrer` es un "speed bump" básico pero NO seguridad real.

**Mejores alternativas inmediatas:**
1. **Rate limiting agresivo** en las APIs
2. **Validación de User-Agent** para filtrar bots
3. **Monitoring** para detectar uso anómalo
4. **CORS estricto** en producción

La seguridad real debe estar en el **servidor**, no en el cliente.
