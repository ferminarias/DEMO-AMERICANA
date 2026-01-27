# Integración con Retell AI

Este proyecto utiliza **Retell AI** para proporcionar un asistente de voz conversacional en tiempo real.

## 🚀 Configuración

### 1. Crear una cuenta en Retell AI

1. Visita [https://dashboard.retellai.com/](https://dashboard.retellai.com/)
2. Crea una cuenta nueva o inicia sesión
3. Obtén tu API Key desde el dashboard

### 2. Crear un Agente de Voz

1. En el dashboard de Retell, ve a la sección de **Agents**
2. Crea un nuevo agente con las siguientes configuraciones:
   - **Nombre**: Asistente Universidad
   - **Idioma**: Español (es-ES)
   - **Voz**: Selecciona una voz en español que te guste
   - **Prompt del sistema**: Personaliza el comportamiento del agente

Ejemplo de prompt:
```
Eres un asistente virtual amigable de la Universidad Americana de Paraguay.
Tu función es ayudar a los estudiantes potenciales con información sobre:
- Programas académicos disponibles
- Proceso de admisión
- Costos y becas
- Campus y facilidades

Sé amable, profesional y conciso en tus respuestas.
```

3. Guarda el agente y copia el **Agent ID**

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz del proyecto con:

```env
# Retell AI Configuration
RETELL_API_KEY=key_xxxxxxxxxxxxxxxxxxxxx
RETELL_AGENT_ID=agent_xxxxxxxxxxxxxxxxxxx

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Universidad Americana"
```

### 4. Verificar la Instalación

1. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre [http://localhost:3000](http://localhost:3000)

3. Haz clic en el widget flotante (botón circular en la esquina inferior derecha)

4. Haz clic en "Iniciar llamada" y permite el acceso al micrófono

5. ¡Habla con tu asistente!

## 🔧 Arquitectura

### Componentes Principales

```
├── lib/services/retell.ts         # Servicio de integración con Retell SDK
├── app/api/retell/
│   ├── create-web-call/route.ts  # Endpoint para crear llamadas web
│   └── check-config/route.ts      # Endpoint para verificar configuración
├── features/voice/
│   └── internal/voice-widget.tsx  # Widget principal de voz
└── components/
    └── client-voice-widget.tsx    # Wrapper del widget (sin SSR)
```

### Flujo de Conexión

1. **Usuario hace clic en "Iniciar llamada"**
   - El widget solicita acceso al micrófono
   - Muestra estado: "Solicitando permisos..."

2. **Frontend llama al backend**
   - `POST /api/retell/create-web-call`
   - Backend llama a la API de Retell para crear una web call
   - Retorna un `access_token` temporal (válido por 30 segundos)

3. **Frontend inicia la sesión**
   - Usa el SDK de Retell (`retell-client-js-sdk`)
   - Establece conexión WebRTC con el agente
   - Estado cambia a "Conversación activa"

4. **Durante la conversación**
   - El audio se transmite en tiempo real vía WebRTC
   - Las transcripciones aparecen en el chat
   - Se pueden enviar mensajes de texto (usando backend fallback)

5. **Finalizar llamada**
   - Usuario hace clic en "Terminar"
   - Se cierra la conexión WebRTC
   - Se limpian los recursos (micrófono, etc.)

## 📊 Eventos del SDK

El widget maneja los siguientes eventos de Retell:

- `call_started`: Llamada iniciada exitosamente
- `call_ended`: Llamada finalizada
- `agent_start_talking`: El agente comenzó a hablar
- `agent_stop_talking`: El agente dejó de hablar
- `update`: Actualización con transcripciones en tiempo real
- `error`: Error durante la llamada
- `metadata`: Metadata adicional del sistema

## 🔒 Seguridad

### Validación de Dominios

El endpoint `/api/retell/create-web-call` valida el origen de las peticiones:

```typescript
const allowedDomains = [
  "localhost",
  "127.0.0.1",
  "demo-americana.vercel.app",
  "americana.edu.py",
  "www.americana.edu.py",
]
```

Actualiza esta lista con tus dominios en producción.

### API Key

- La API Key de Retell **NUNCA** se expone al frontend
- Solo se usa en el servidor (API Routes)
- El frontend solo recibe un `access_token` temporal

## 🎨 Personalización

### Modificar el Prompt del Agente

1. Ve al dashboard de Retell
2. Edita tu agente
3. Actualiza el **System Prompt**
4. Los cambios se aplican inmediatamente (no necesitas redeploy)

### Cambiar la Voz

1. En el dashboard, selecciona tu agente
2. Ve a la sección de **Voice**
3. Prueba diferentes voces
4. Guarda los cambios

### Ajustar el Widget

El widget se encuentra en `features/voice/internal/voice-widget.tsx`. Puedes personalizar:

- Colores y estilos (CSS en línea y Tailwind)
- Mensajes de estado
- Comportamiento de errores
- Mensajes de simulación (modo demo)

## 🐛 Troubleshooting

### Error: "Retell AI no está configurado"

- Verifica que `RETELL_API_KEY` y `RETELL_AGENT_ID` estén configurados en `.env.local`
- Reinicia el servidor de desarrollo después de cambiar las variables

### Error: "Failed to create web call"

- Verifica que tu API Key sea válida
- Verifica que el Agent ID corresponda a un agente existente
- Revisa los logs del servidor (`console.log` en terminal)

### Error: "Microphone access denied"

- El usuario debe permitir el acceso al micrófono
- En desarrollo local, usa `http://localhost` (no una IP)
- En producción, requiere HTTPS

### La voz no se escucha

- Verifica el volumen del sistema
- Verifica que los altavoces/auriculares estén conectados
- Revisa la consola del navegador para errores de WebRTC

### Las transcripciones no aparecen

- Verifica que el evento `update` esté siendo manejado correctamente
- Revisa la consola: `[Retell] Update received: ...`
- Asegúrate de que `sessionActiveRef.current === true`

## 📚 Recursos Adicionales

- [Documentación oficial de Retell AI](https://docs.retellai.com/)
- [SDK de Retell para Web](https://docs.retellai.com/sdk-reference/web-sdk)
- [API Reference](https://docs.retellai.com/api-reference)
- [Dashboard de Retell](https://dashboard.retellai.com/)

## 🔄 Migración desde ElevenLabs

Si estás migrando desde ElevenLabs:

1. ✅ Se mantiene la misma UI del widget
2. ✅ Se mantiene la misma experiencia de usuario
3. ✅ Mejor manejo de transcripciones en tiempo real
4. ✅ Más estable para llamadas largas
5. ⚠️ No se soporta envío de mensajes de texto durante llamadas (se usa backend fallback)

## 💡 Mejoras Futuras

- [ ] Agregar análisis de sentimiento en tiempo real
- [ ] Integrar con un CRM para guardar conversaciones
- [ ] Agregar soporte para múltiples idiomas
- [ ] Implementar agentes especializados por programa académico
- [ ] Agregar métricas de uso del asistente

---

¿Necesitas ayuda? Contacta al equipo de desarrollo.
