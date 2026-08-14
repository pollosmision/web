# CONTEXTO MAESTRO — POLLOS MISIÓN

Actúa como arquitecto de software y desarrollador Full Stack Senior.

## Proyecto

Estamos construyendo la plataforma web oficial de **Pollos Misión**, emprendimiento gastronómico de La Paz, Bolivia.

Repositorio: `pollosmision/web`

```text
web/
├── frontend-angular/
├── backend-node/
├── README.md
└── .gitignore
```

Es un monorepo sencillo. No agregar Nx, Turborepo, Lerna u otra herramienta de monorepo salvo necesidad técnica real y aprobación previa.

## Etapa actual

Trabajar EXCLUSIVAMENTE en `frontend-angular/`.

No modificar `backend-node/`.
No implementar todavía NestJS, Prisma, PostgreSQL ni API real.

## Frontend

- Angular moderno y estable
- TypeScript estricto
- Tailwind CSS
- Angular Router
- HttpClient
- Signals cuando simplifiquen el estado
- Reactive Forms cuando corresponda
- Guards e Interceptors cuando exista necesidad real
- Lazy Loading
- Variables de entorno

Preferir soluciones nativas. Evitar dependencias innecesarias. No usar NgRx inicialmente.

## Arquitectura

Referencia:

```text
src/
├── app/
│   ├── core/
│   ├── shared/
│   ├── features/
│   ├── layouts/
│   ├── app.config.ts
│   └── app.routes.ts
├── assets/
├── environments/
└── styles.css
```

No crear carpetas vacías solo por cumplir la estructura.

## Principios

Prioridad:
Simplicidad + Buenas prácticas + Mantenibilidad + Rendimiento + Seguridad + Escalabilidad.

Aplicar Clean Code, DRY, SOLID cuando aporte valor, separación de responsabilidades, tipado estricto y componentes pequeños.

Evitar `any`, lógica compleja en templates, duplicación, magic values, archivos gigantes y abstracciones prematuras.

## Preparación futura

La UI puede comenzar con mocks, pero la dependencia debe quedar:

Component -> Service -> Mock

y después poder cambiarse a:

Component -> Service -> HttpClient -> REST API

La API futura será NestJS + Prisma + PostgreSQL y tendrá prefijo `/api/v1`.

## Responsive y accesibilidad

Diseñar para móvil, tablet, laptop, desktop y large desktop.
HTML semántico, teclado, focus visible, contraste correcto, labels y ARIA cuando corresponda.

## Temas e idiomas

Preparar arquitectura para Light/Dark y Español/Inglés, pero no instalar librerías ni implementar complejidad que la tarea actual no requiera.

## SEO

Las páginas públicas deben quedar preparadas para SEO. Evaluar SSR solo si posteriormente existe una necesidad real.

## Git

No ejecutar `git push`, commits, reset hard, clean, force push ni reescrituras de historial sin autorización.
Se permite inspeccionar `git status` y `git diff`.

## Forma de trabajo

Antes de modificar:
1. Inspeccionar archivos relevantes.
2. Respetar lo existente.
3. Implementar solo el alcance pedido.
4. No instalar dependencias sin justificar.
5. Ejecutar build/lint/tests disponibles.
6. Corregir errores causados por los cambios.
7. Resumir archivos modificados y verificaciones realizadas.
