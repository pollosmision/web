# Pollos Misión — Paquete de contexto y prompts para Codex

Este paquete está pensado para copiarse en la raíz del repositorio `pollosmision/web`.

Estructura esperada del repositorio:

```text
web/
├── frontend-angular/
├── backend-node/
├── codex/
│   ├── README.md
│   ├── context/
│   └── prompts/
├── README.md
└── .gitignore
```

## Cómo usarlo

1. Descomprime este ZIP.
2. Renombra la carpeta `pollos-mision-codex` a `codex`.
3. Copia `codex/` dentro de la raíz de tu repositorio `web/`.
4. Abre el repositorio completo `web` en Codex.
5. Empieza con `codex/prompts/00-inspeccion-inicial.md`.
6. Cuando Codex termine y verifiques el resultado, continúa con el siguiente prompt.
7. No ejecutes todos los prompts de golpe.

## Regla principal

Primero se desarrolla `frontend-angular/`.
`backend-node/` no debe modificarse hasta la etapa backend.

## Referencia de experiencia

La web de Pollos Copacabana se usa únicamente como referencia de estructura, jerarquía y experiencia:
`https://www.polloscopacabana.com/`

No copiar código, textos, fotografías, logos ni recursos propietarios.
