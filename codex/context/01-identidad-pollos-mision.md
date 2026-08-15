# IDENTIDAD VISUAL Y COMERCIAL — POLLOS MISIÓN

## Marca

**Pollos Misión**

Concepto central: pollo frito/comida rápida + misión espacial.

La mascota/logo se basa en un **pollo astronauta**. La comida debe ser protagonista; el espacio es el elemento diferenciador, no una excusa para convertir la interfaz en videojuego o diseño infantil.

## Personalidad

- Moderna
- Enérgica
- Cercana
- Apetitosa
- Divertida sin ser infantil
- Profesional
- Crocante / fast food
- Identidad espacial sutil

## Paleta oficial consolidada

Centralizar siempre estos tokens. No dispersar HEX en componentes.

```css
:root {
  --pm-primary: #990000;
  --pm-red: #cc0000;
  --pm-yellow: #ffcc00;
  --pm-cream: #fff5cc;
  --pm-promo: #ff6600;
  --pm-teal: #006666;
  --pm-dark: #1a1a1a;
  --pm-gray-900: #333333;
  --pm-gray-100: #f0f0f0;
  --pm-white: #ffffff;
  --pm-success: #25d366;
}
```

Uso:

- Rojo principal: marca, rótulos, encabezados importantes y CTA principales.
- Rojo intenso: hover, estados activos y promociones.
- Amarillo: segundo color principal, precios, destacados e iconos.
- Crema: fondos cálidos ocasionales y tarjetas especiales.
- Naranja: promociones y CTA especiales; no debe competir con rojo y amarillo.
- Turquesa: acento espacial limitado y secciones especiales.
- Negro y gris: fondos oscuros, texto base y subtítulos.
- Blanco y gris claro: superficies limpias, fondos y contraste.
- Verde: reservar para WhatsApp/éxito cuando corresponda.

En light mode priorizar blanco, gris claro y crema ocasional. En dark mode usar `#1A1A1A` y
superficies ligeramente más claras. No saturar la web con rojo, amarillo, naranja o elementos
espaciales; la comida continúa siendo protagonista.

### Dirección web híbrida

La interfaz web combina la paleta oficial con una atmósfera gastronómica cálida:

- fondo general marfil muy claro derivado del crema oficial;
- tarjetas y navbar principalmente blancos;
- crema oficial en badges, selecciones y bloques especiales;
- rojo principal en branding y CTA;
- amarillo en detalles, iconos y destacados, evitando texto pequeño sobre fondos claros;
- naranja y turquesa únicamente como apoyo promocional o espacial;
- sombras cálidas y suaves, sin perder limpieza visual.

Esta dirección conserva la identidad oficial sin trasladar literalmente la estética oscura de los
carteles o menús impresos a toda la experiencia web.

## Logo e iconografía

Decisiones visuales consolidadas a partir de las referencias oficiales:

- Pollito amarillo con traje de astronauta.
- Casco blanco con visor azul/turquesa.
- Entorno de luna, cráteres o montañas en negro/gris.
- Combinación dominante rojo, amarillo, negro y blanco.
- Se pueden usar órbitas, estrellas, planetas y líneas espaciales de forma discreta.
- La temática gastronómica principal es pollo broaster/pollo frito, papas fritas y comida rápida.

Preparar assets:

```text
src/assets/brand/logo-pollos-mision.svg
src/assets/brand/logo-pollos-mision-horizontal.svg
src/assets/brand/isotipo-pollos-mision.svg
```

No redibujar, reinterpretar ni generar automáticamente el logo. Las referencias JPG adjuntas no
son un asset limpio de producción. Hasta recibir PNG/SVG transparente oficial, usar placeholders
claramente identificados.

## Tipografía

Preferencia inicial: **Poppins** para títulos/UI. Evitar demasiadas familias tipográficas.

## Negocio

Ciudad: La Paz, Bolivia.

Teléfonos:

- 77632194
- 60514138

Identidad social preferida: `pollosmision` cuando esté disponible.

Centralizar estos datos en una configuración de negocio; no repetirlos en componentes.

## Oferta / categorías

1. Pollo Broaster — pollo + papas + arroz
2. Pollo a la Canasta — pollo crocante + papas
3. Alitas / Fingers — con salsas
4. Salchipapas — salchipapa, salchiarroz, salchipollo
5. Conos de Papas — simple, salchi, pollo
6. Extras — porción de papas, porción de arroz
7. Gaseosas
8. Jugos y Bebidas — incluyendo chicha morada

No inventar precios definitivos.

## Lenguaje de marca sugerido

Usar con moderación:

- “Tu misión es disfrutar”
- “Los favoritos de la misión”
- “Promociones en órbita”
- “Encuentra nuestra base”

No convertir todos los textos en juegos de palabras espaciales.

## Referencia

Inspiración funcional/estructural:
`https://www.polloscopacabana.com/`

Tomar inspiración en navegación, jerarquía comercial, categorías, productos, promociones, ubicación y CTA de pedido.

NO copiar activos, código, fotografías, textos o identidad de Pollos Copacabana.
