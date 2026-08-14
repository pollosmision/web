# PROMPT 08 — CARRITO CON ANGULAR SIGNALS

Lee primero:
- `codex/context/00-contexto-maestro.md`
- `codex/context/01-identidad-pollos-mision.md`

Implementa carrito frontend con Angular Signals, sin NgRx.

Debe permitir:
- agregar;
- eliminar;
- aumentar/disminuir cantidad;
- total de unidades;
- subtotal;
- persistencia en localStorage;
- restauración segura;
- carrito vacío;
- `/carrito`;
- contador en header;
- drawer solo si realmente mejora UX y no duplica lógica.

El store/servicio debe estar separado de la presentación.

No checkout, pagos ni API todavía.
Verifica build y agrega pruebas útiles para la lógica crítica si la configuración de tests ya está disponible.
