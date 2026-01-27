#!/bin/bash

# Script de verificación pre-despliegue
# Ejecuta este script antes de desplegar a Vercel para verificar que todo está listo

echo "🔍 Verificando configuración para despliegue a Vercel..."
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Contadores
ERRORS=0
WARNINGS=0
SUCCESS=0

# Función para verificar
check() {
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓${NC} $1"
        ((SUCCESS++))
    else
        echo -e "${RED}✗${NC} $1"
        ((ERRORS++))
    fi
}

warn() {
    echo -e "${YELLOW}⚠${NC} $1"
    ((WARNINGS++))
}

# 1. Verificar Node.js
echo "📦 Verificando dependencias..."
node --version > /dev/null 2>&1
check "Node.js instalado"

npm --version > /dev/null 2>&1
check "npm instalado"

# 2. Verificar package.json
if [ -f "package.json" ]; then
    check "package.json existe"
else
    echo -e "${RED}✗${NC} package.json no encontrado"
    ((ERRORS++))
fi

# 3. Verificar node_modules
if [ -d "node_modules" ]; then
    check "node_modules existe"
else
    warn "node_modules no existe - ejecuta 'npm install'"
fi

# 4. Verificar archivos de configuración
echo ""
echo "⚙️ Verificando archivos de configuración..."

[ -f "next.config.mjs" ] && check "next.config.mjs existe" || warn "next.config.mjs no encontrado"
[ -f "tsconfig.json" ] && check "tsconfig.json existe" || warn "tsconfig.json no encontrado"
[ -f ".gitignore" ] && check ".gitignore existe" || warn ".gitignore no encontrado"
[ -f ".env.example" ] && check ".env.example existe" || warn ".env.example no encontrado"

# 5. Verificar que .env.local no esté en git
echo ""
echo "🔒 Verificando seguridad..."

if git ls-files --error-unmatch .env.local > /dev/null 2>&1; then
    echo -e "${RED}✗${NC} .env.local está en Git - ¡ELIMÍNALO!"
    ((ERRORS++))
else
    check ".env.local no está en Git"
fi

# 6. Verificar estructura de directorios
echo ""
echo "📁 Verificando estructura del proyecto..."

[ -d "app" ] && check "Directorio app/ existe" || echo -e "${RED}✗${NC} Directorio app/ no encontrado" && ((ERRORS++))
[ -d "components" ] && check "Directorio components/ existe" || warn "Directorio components/ no encontrado"
[ -d "lib" ] && check "Directorio lib/ existe" || warn "Directorio lib/ no encontrado"
[ -d "public" ] && check "Directorio public/ existe" || warn "Directorio public/ no encontrado"

# 7. Intentar build
echo ""
echo "🔨 Intentando build del proyecto..."
echo "   (Esto puede tomar unos minutos...)"

if npm run build > /dev/null 2>&1; then
    check "Build exitoso"
else
    echo -e "${RED}✗${NC} Build falló - revisa los errores con 'npm run build'"
    ((ERRORS++))
fi

# 8. Verificar TypeScript
echo ""
echo "📝 Verificando TypeScript..."

if npm run typecheck > /dev/null 2>&1; then
    check "TypeScript sin errores"
else
    warn "TypeScript tiene errores - revisa con 'npm run typecheck'"
fi

# 9. Verificar Git
echo ""
echo "🌿 Verificando Git..."

if git rev-parse --git-dir > /dev/null 2>&1; then
    check "Repositorio Git inicializado"
    
    # Verificar si hay cambios sin commitear
    if git diff-index --quiet HEAD --; then
        check "No hay cambios sin commitear"
    else
        warn "Hay cambios sin commitear"
    fi
    
    # Verificar rama actual
    BRANCH=$(git rev-parse --abbrev-ref HEAD)
    echo -e "   Rama actual: ${YELLOW}$BRANCH${NC}"
else
    echo -e "${RED}✗${NC} No es un repositorio Git"
    ((ERRORS++))
fi

# 10. Verificar archivos críticos
echo ""
echo "📄 Verificando archivos críticos..."

[ -f "app/layout.tsx" ] && check "app/layout.tsx existe" || echo -e "${RED}✗${NC} app/layout.tsx no encontrado" && ((ERRORS++))
[ -f "app/page.tsx" ] && check "app/page.tsx existe" || echo -e "${RED}✗${NC} app/page.tsx no encontrado" && ((ERRORS++))

# Resumen
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 RESUMEN DE VERIFICACIÓN"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${GREEN}✓ Exitosos:${NC} $SUCCESS"
echo -e "${YELLOW}⚠ Advertencias:${NC} $WARNINGS"
echo -e "${RED}✗ Errores:${NC} $ERRORS"
echo ""

if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}🎉 ¡Todo listo para desplegar a Vercel!${NC}"
    echo ""
    echo "Próximos pasos:"
    echo "1. Asegúrate de que tu código esté en GitHub"
    echo "2. Ve a https://vercel.com y conecta tu repositorio"
    echo "3. Configura las variables de entorno (ver .env.example)"
    echo "4. ¡Despliega!"
    echo ""
    echo "📖 Ver guía completa: VERCEL-DEPLOYMENT.md"
    exit 0
else
    echo -e "${RED}❌ Hay errores que debes corregir antes de desplegar${NC}"
    echo ""
    echo "Revisa los errores marcados arriba y corrígelos."
    exit 1
fi
