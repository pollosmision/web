# PROMPT 02 — ARQUITECTURA BASE Y DESIGN TOKENS

Lee primero:
- `codex/context/00-contexto-maestro.md`
- `codex/context/01-identidad-pollos-mision.md`

Objetivo: organizar el frontend sin sobreingeniería y crear la base visual de Pollos Misión.

1. Revisa la estructura generada.
2. Crea únicamente carpetas/archivos que ya tengan uso inmediato.
3. Establece `core`, `shared`, `features` y `layouts` de forma coherente con Angular actual.
4. Implementa tokens centralizados de marca usando los colores definidos en `01-identidad-pollos-mision.md`.
5. Integra esos tokens con Tailwind de la forma recomendada para la versión instalada.
6. Define container, tipografía, focus, superficies, radios, sombras y transiciones base.
7. Prepara Light/Dark sin duplicar componentes, pero no gastes tiempo en una UI completa de selector de tema todavía.
8. Crea `business.config.ts` con nombre, ciudad, país, teléfonos y placeholders de redes.
9. No inventes precios ni dirección exacta.
10. No crear auth/admin/backend.

Ejecuta build y corrige errores.
