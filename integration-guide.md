# 🚀 Cómo Integrar el VoiceWidget en WordPress

Perfecto! Ya tienes todo listo para integrar tu asistente de voz en WordPress.

## ✅ **Tu setup actual está completo:**
- **Dominio**: `https://v0-ulinea-website-build.vercel.app`
- **Widget URL**: `https://v0-ulinea-website-build.vercel.app/voice/embed`

## 📋 **Formas de integrar en WordPress:**

### 🎯 **Opción 1: Widget Flotante (RECOMENDADO)**

Copia y pega este código en tu WordPress (Admin → Apariencia → Personalizar → HTML adicional o en un widget de texto):

```html
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

### 🎯 **Opción 2: Embebido en Página**

Para insertar en una página o entrada específica:

```html
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

### 🎯 **Opción 3: Shortcode (Avanzado)**

Si tienes acceso a `functions.php`:

```php
// Agregar a functions.php
function ulinea_voice_widget_shortcode($atts) {
    $atts = shortcode_atts(array(
        'width' => '100%',
        'height' => '600',
        'position' => 'embed'
    ), $atts);
    
    if ($atts['position'] === 'float') {
        return '
        <div style="position: fixed; bottom: 20px; right: 20px; z-index: 999999;">
            <iframe 
                src="https://v0-ulinea-website-build.vercel.app/voice/embed"
                width="80" height="80" frameborder="0"
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

// Uso:
// [ulinea_voice] - Normal
// [ulinea_voice position="float"] - Flotante
// [ulinea_voice width="400" height="500"] - Personalizado
```

## 🔧 **Variables de Entorno (En Vercel):**

Asegúrate de configurar en tu dashboard de Vercel:

```env
# CRÍTICAS
SUPABASE_URL=tu_supabase_project_url
SUPABASE_ANON_KEY=tu_supabase_anon_key
ELEVENLABS_API_KEY=tu_elevenlabs_api_key

# OPCIONALES
ELEVENLABS_VOICE_ID=tu_voice_id
NEXT_PUBLIC_SITE_URL=https://v0-ulinea-website-build.vercel.app
```

## ✅ **Funcionalidades que tendrás:**

- ✅ **Chat de voz** con ElevenLabs
- ✅ **Chat de texto** como respaldo
- ✅ **Botón WhatsApp** directo
- ✅ **Formulario de contacto** completo
- ✅ **Responsive** automático
- ✅ **Accesible** (WCAG 2.1)

## 🚨 **Si algo no funciona:**

1. **Widget no aparece**: Verifica la URL del iframe
2. **Micrófono no funciona**: Asegúrate de tener HTTPS
3. **Error "Refused to display"**: Ya está solucionado en tu config
4. **Variables de entorno**: Configúralas en Vercel

## 🎉 **¡Ya está listo para usar!**

Elige la **Opción 1** (flotante) para la mejor experiencia de usuario.
