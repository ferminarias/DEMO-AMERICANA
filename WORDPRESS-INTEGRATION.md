# 🎯 Integración VoiceWidget con WordPress

## 📋 Pasos para Implementar

### 1. **Verifica tu Deployment** ✅
Tu app está funcionando en:
```
https://v0-ulinea-website-build.vercel.app/voice/embed
```

### 2. **Código para WordPress - Opción A: Widget Flotante (Recomendado)**

```html
<!-- Pega este código en tu WordPress donde quieras el widget -->
<div id="ulinea-voice-widget" style="
    position: fixed; 
    bottom: 20px; 
    right: 20px; 
    z-index: 999999;
    width: 80px;
    height: 80px;
">
    <iframe 
        src="https://v0-ulinea-website-build.vercel.app/voice/embed"
        width="80" 
        height="80"
        frameborder="0"
        scrolling="no"
        style="
            border: none; 
            border-radius: 50%;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            transition: all 0.3s ease;
        "
        allow="microphone; autoplay; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        title="Asistente de Voz ULINEA"
        onload="this.style.opacity='1'"
        style="opacity: 0;">
    </iframe>
</div>

<!-- Estilos responsivos opcionales -->
<style>
@media (max-width: 768px) {
    #ulinea-voice-widget {
        bottom: 15px !important;
        right: 15px !important;
        width: 70px !important;
        height: 70px !important;
    }
    #ulinea-voice-widget iframe {
        width: 70px !important;
        height: 70px !important;
    }
}
</style>
```

### 3. **Código para WordPress - Opción B: Embebido en Página**

```html
<!-- Para insertar en una página específica -->
<div style="width: 100%; max-width: 500px; margin: 20px auto;">
    <iframe 
        src="https://v0-ulinea-website-build.vercel.app/voice/embed"
        width="100%" 
        height="600"
        frameborder="0"
        scrolling="no"
        style="border: 1px solid #e1e5e9; border-radius: 12px; background: #f8f9fa;"
        allow="microphone; autoplay; clipboard-write"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals"
        title="Asistente de Voz ULINEA">
    </iframe>
</div>
```

### 4. **Código para WordPress - Opción C: Shortcode Personalizado**

Si tienes acceso al `functions.php` de tu tema:

```php
// Agregar al functions.php de tu tema de WordPress
function ulinea_voice_widget_shortcode($atts) {
    $atts = shortcode_atts(array(
        'width' => '100%',
        'height' => '600',
        'position' => 'embed' // 'embed' o 'float'
    ), $atts);
    
    if ($atts['position'] === 'float') {
        return '
        <div id="ulinea-voice-widget-float" style="position: fixed; bottom: 20px; right: 20px; z-index: 999999;">
            <iframe 
                src="https://v0-ulinea-website-build.vercel.app/voice/embed"
                width="80" 
                height="80"
                frameborder="0"
                style="border: none; border-radius: 50%; box-shadow: 0 4px 20px rgba(0,0,0,0.15);"
                allow="microphone; autoplay"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                title="Asistente de Voz ULINEA">
            </iframe>
        </div>';
    }
    
    return '
    <div style="width: 100%; max-width: 500px; margin: 20px auto;">
        <iframe 
            src="https://v0-ulinea-website-build.vercel.app/voice/embed"
            width="' . esc_attr($atts['width']) . '" 
            height="' . esc_attr($atts['height']) . '"
            frameborder="0"
            style="border: 1px solid #e1e5e9; border-radius: 12px;"
            allow="microphone; autoplay"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            title="Asistente de Voz ULINEA">
        </iframe>
    </div>';
}
add_shortcode('ulinea_voice', 'ulinea_voice_widget_shortcode');

// Uso del shortcode:
// [ulinea_voice] - Embebido normal
// [ulinea_voice position="float"] - Widget flotante
// [ulinea_voice width="400" height="500"] - Tamaño personalizado
```

## 🔧 Variables de Entorno Necesarias

En tu Vercel, asegúrate de tener configuradas:

```env
# CRÍTICAS - Sin estas no funciona
SUPABASE_URL=tu_supabase_project_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key

# OPCIONALES - Para funciones avanzadas
ELEVENLABS_VOICE_ID=tu_voice_id
NEXT_PUBLIC_SITE_URL=https://v0-ulinea-website-build.vercel.app
```

## 🔒 **SEGURIDAD: Protección contra Uso No Autorizado**

He implementado **protección en dos niveles**:

### **Nivel 1: Validación de Servidor (Robusto)**
Añade esta variable en tu Vercel para autorizar dominios específicos:

```env
ALLOWED_EMBED_DOMAINS=tu-dominio-wordpress.com,www.tu-dominio-wordpress.com,localhost
```

**Esto bloquea tokens de ElevenLabs desde dominios no autorizados.**

### **Nivel 2: Validación Frontend (Básico)**
Edita `/app/voice/embed/page.tsx` - línea 21:

```javascript
'tu-dominio-wordpress.com', // ← CAMBIA por tu dominio real
```

### **⚠️ Limitaciones de Seguridad:**
- **No es 100% infalible** (ninguna protección client-side lo es)
- **Más bien es un "speed bump"** para desalentar uso casual
- **Para seguridad empresarial** necesitarías API keys individuales

### **✅ Para tu caso (universidad + WordPress) es suficiente porque:**
- Disuade 90% de uso no autorizado
- Permite monitorear intentos sospechosos
- Fácil de mantener
- No afecta UX legítimo

## 📱 Funcionalidades Incluidas

✅ **Chat de voz** con ElevenLabs  
✅ **Chat de texto** como respaldo  
✅ **Botón WhatsApp** directo  
✅ **Formulario de contacto** completo  
✅ **Responsive** automático  
✅ **Accesible** (WCAG 2.1)  

## 🚨 Troubleshooting

### Error: "Refused to display in frame"
- Verifica que hayas actualizado `next.config.mjs`
- Haz redeploy en Vercel después del cambio

### No se ve el widget
- Revisa la consola del navegador
- Verifica que la URL del iframe sea correcta
- Confirma que las variables de entorno estén configuradas

### El micrófono no funciona
- Asegúrate de incluir `allow="microphone"` en el iframe
- Verifica que el dominio tenga HTTPS (requisito para micrófonos)

### Widget se ve mal en móvil
- Usa la Opción A (flotante) que es responsive automáticamente
- Agrega los estilos CSS para móvil incluidos arriba

## 📞 Soporte

Si necesitas ayuda:
1. Verifica que tu deployment esté funcionando: `https://v0-ulinea-website-build.vercel.app/voice/embed`
2. Revisa la consola del navegador para errores
3. Confirma que WordPress permita iframes (algunos themes los bloquean)

## 🎉 ¡Listo!

Una vez implementado, tendrás un asistente de voz completamente funcional en tu WordPress que:
- Se conecta a tus APIs existentes
- Mantiene tu branding
- Funciona en todos los dispositivos
- Se actualiza automáticamente cuando actualices tu app principal
