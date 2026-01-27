# 🔄 Migración de Base de Datos - Estado "Cita con Asesor"

## 📋 Qué hace esta migración

Agrega el nuevo estado `scheduled_meeting` (Cita con Asesor) a la tabla `leads` para soportar la funcionalidad automática de detección de reuniones programadas.

## 🚀 Cómo ejecutar la migración

### Opción 1: En Supabase Dashboard (Recomendado)

1. Ve a tu proyecto en [Supabase Dashboard](https://supabase.com/dashboard)
2. Navega a **SQL Editor** 
3. Copia y pega el contenido de `scripts/002_add_scheduled_meeting_status.sql`
4. Ejecuta el script
5. ✅ ¡Listo!

### Opción 2: Usando CLI de Supabase

```bash
supabase db reset --db-url="your-database-url"
# O ejecutar el script específico
psql "your-database-url" < scripts/002_add_scheduled_meeting_status.sql
```

## 🔍 Qué cambia

### Antes:
```sql
status TEXT CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'lost'))
```

### Después:
```sql
status TEXT CHECK (status IN ('new', 'contacted', 'qualified', 'enrolled', 'lost', 'scheduled_meeting'))
```

## 🎯 Funcionalidades nuevas

1. **Estado automático**: Cuando un lead tiene `meeting_link` y `meeting_datetime`, se muestra automáticamente como "Cita con Asesor"
2. **Badge naranja**: Visual distintivo para reuniones programadas
3. **No editable**: El estado automático no se puede cambiar manualmente (lógica del frontend)
4. **Indicador visual**: 🤖 muestra que es un estado automático

## ⚠️ Notas importantes

- **No afecta datos existentes**: Los leads actuales mantienen su estado
- **Retrocompatibilidad**: El sistema funciona con y sin la migración
- **Opcional**: Puedes descomentar la línea de UPDATE en el script para actualizar leads existentes que ya tienen reuniones programadas

## 🧪 Verificar que funciona

Después de ejecutar la migración:

1. Ve al admin panel: `/admin`
2. Navega a la pestaña "Leads"
3. Busca leads que tengan reuniones programadas
4. Deberían mostrar "Cita con Asesor 🤖" automáticamente
