# Reevaluación del repositorio: denuncias-laborales

## Impresión general

El proyecto está **bien encaminado como MVP frontend**: tiene una propuesta clara (denuncias laborales anónimas + ranking comunitario), una interfaz moderna y una experiencia de usuario comprensible sin curva de aprendizaje.

También transmite bien su misión social en el copy y en el flujo principal.

## Fortalezas

1. **UX clara y directa**
   - La navegación por secciones (`Inicio`, `Hacer Denuncia`, `Ranking`) facilita el recorrido.
   - El sistema de modales para proponer/votar mantiene el contexto y reduce fricción.

2. **Diseño visual coherente**
   - Paleta, tipografía y componentes consistentes.
   - Uso correcto de variables CSS para mantener escalabilidad visual.

3. **Código simple de entender**
   - `main.js` está organizado por bloques funcionales (navegación, tabs, modales, acciones).
   - El estado local (`store`) hace rápido el prototipado.

4. **Alineación con la narrativa del producto**
   - La promesa de anonimato y enfoque comunitario está reflejada en los textos principales.

## Hallazgos clave (brechas)

1. **Desfase entre README y estado real del código**
   - README sugiere capacidades de Firebase/tiempo real/moderación, pero el frontend opera mayormente en memoria local para denuncias y ranking.
   - Esta diferencia puede generar expectativas incorrectas para colaboradores.

2. **Persistencia y trazabilidad aún limitadas**
   - Las denuncias y votos viven en memoria del navegador durante la sesión.
   - No hay flujo consolidado de almacenamiento, moderación ni auditoría.

3. **Aspectos de seguridad y abuso pendientes (esperable en MVP)**
   - No se observan controles de spam/rate limiting/captcha.
   - No se evidencia sanitización explícita en renderizado dinámico de contenido de usuarios.

4. **Cobertura de calidad**
   - No hay suite de pruebas automatizadas ni validación de linters.
   - Sin CI, es fácil introducir regresiones al evolucionar el proyecto.

## Recomendaciones priorizadas

### Prioridad alta (siguiente iteración)

1. **Alinear documentación con implementación actual**
   - Explicar claramente qué funciona localmente hoy y qué requiere Firebase/configuración adicional.

2. **Definir arquitectura de datos mínima**
   - Modelo para denuncias, empresas, votos y comentarios.
   - Estrategia de IDs, timestamps y reglas de validación.

3. **Agregar salvaguardas básicas de integridad**
   - Validación fuerte de inputs y sanitización de texto antes de pintar en DOM.
   - Mecanismos anti-abuso básicos (captcha, límites por IP/token si hay backend).

### Prioridad media

4. **Separar responsabilidades del JS**
   - Dividir `main.js` por módulos: estado, render, eventos, servicios.

5. **Añadir tests mínimos**
   - Unit tests para utilidades (promedios, filtros, ordenamiento).
   - Smoke tests del flujo principal con Playwright.

6. **Preparar pipeline de CI**
   - Lint + tests en cada PR.

### Prioridad baja

7. **Accesibilidad y observabilidad**
   - Mejorar foco/teclado/roles ARIA en modales.
   - Instrumentar eventos para entender uso real (siempre respetando anonimato).

## Veredicto

Como **demo funcional y base de producto**, el repositorio está sólido y comunica bien su propósito.

Para pasar a una fase más robusta, lo más importante es cerrar tres frentes:

1. **consistencia entre documentación y comportamiento real**,
2. **persistencia/moderación de datos**,
3. **controles de seguridad + calidad automatizada**.

Con esos ajustes, el proyecto puede evolucionar rápidamente de MVP visual a plataforma confiable.
