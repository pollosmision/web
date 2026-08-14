# PROMPT 01 — INICIALIZAR ANGULAR + TAILWIND

Lee primero:
- `codex/context/00-contexto-maestro.md`
- `codex/context/01-identidad-pollos-mision.md`

Usa el resultado de la inspección previa.

Objetivo: dejar `frontend-angular/` como proyecto Angular moderno, standalone, estricto y con Tailwind CSS correctamente configurado.

Reglas:
- Si Angular ya existe, NO reinicialices el proyecto.
- Si está vacío, inicializa Angular dentro de `frontend-angular/`, sin crear una carpeta anidada adicional.
- Routing habilitado.
- TypeScript strict.
- Styles globales compatibles con Tailwind.
- Instala/configura Tailwind siguiendo la integración recomendada para la versión concreta de Angular detectada.
- No agregues librerías UI.
- No implementes todavía la Home comercial.
- No tocar `backend-node/`.

Configura una pantalla mínima que confirme que el proyecto arranca, usando la identidad Pollos Misión de manera sencilla.

Ejecuta build al final. Si hay lint disponible, ejecútalo.

Entrega un resumen de:
- comandos ejecutados;
- versiones;
- archivos creados/modificados;
- resultado del build;
- cualquier decisión técnica relevante.

No hagas commit ni push.
