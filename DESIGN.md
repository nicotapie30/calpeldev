---
name: CalPel.dev
description: Landing de desarrollador freelance — desarrollo web a medida en Argentina y LATAM.
colors:
  bg-primary: "#080818"
  bg-secondary: "#0e0e24"
  bg-surface: "#13132e"
  border-hairline: "#ffffff12"
  border-accent: "#7c52e859"
  accent: "#7C52E8"
  accent-light: "#9D7FF5"
  accent-hover: "#6B42D8"
  text-primary: "#F0F0FF"
  text-secondary: "#7A7A9A"
  text-faint: "#3A3A5C"
  success: "#10b981"
typography:
  display:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.4rem, 5vw, 4rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  body:
    fontFamily: "Geist Variable, system-ui, -apple-system, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, Cascadia Code, monospace"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.15em"
rounded:
  btn: "8px"
  card: "12px"
  pill: "9999px"
spacing:
  section-y: "96px"
  section-y-lg: "128px"
  card-p: "24px"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
  button-sweep:
    backgroundColor: "transparent"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.btn}"
    padding: "12px 20px"
  card:
    backgroundColor: "{colors.bg-secondary}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-p}"
---

# Design System: CalPel.dev

## 1. Overview

**Creative North Star: "The Cut Diamond"**

El logo es literalmente un diamante violeta — y ese corte geométrico se repite en todo el sitio: paneles diagonales que entran desde el borde, slash lines finas atravesando secciones, nada apoyado en el centro por default. Es un sistema oscuro, denso en negro-índigo (`#080818`), con un único acento violeta eléctrico que aparece con moderación y siempre con propósito: CTAs, badges, glow de hover. No es un dashboard SaaS ni una agencia corporativa — es la vidriera técnica de un desarrollador que compite mostrando, no diciendo.

El sistema rechaza explícitamente las plantillas de freelancer genéricas (WordPress/Wix con testimonios de stock), el cliché SaaS de gradiente-violeta-sobre-blanco, y las grillas de cards idénticas sin jerarquía. Cada sección tiene su propia composición asimétrica (paneles diagonales que alternan de lado, slashes que cambian de ángulo) en vez de repetir el mismo layout.

**Key Characteristics:**
- Fondo near-black tintado a índigo, nunca `#000` puro.
- Un solo acento violeta (`#7C52E8`), usado con moderación deliberada.
- Cortes diagonales y slash-lines como firma visual recurrente, no decoración aislada.
- Motion generoso pero funcional: reveal-on-scroll direccional, parallax horizontal en portfolio, nunca gratuito.
- Mono (JetBrains Mono) reservado para labels/eyebrows/metadata — nunca para texto de lectura.

## 2. Colors

Paleta restringida: neutros tintados a índigo + un único acento violeta que carga la identidad de marca.

### Primary
- **Electric Violet** (`#7C52E8`): el acento único del sistema — CTAs primarios, badges ("Más popular", "Destacado"), bordes activos, glow de hover. Es el color del diamante del logo.
- **Violet Light** (`#9D7FF5`): variante clara del acento para texto sobre fondo oscuro que necesita destacar sin ser un botón (links, highlights en copy).

### Neutral
- **Void Indigo** (`#080818`): fondo primario de toda la página — el "negro" del sistema, tintado a índigo, nunca `#000` puro.
- **Deep Surface** (`#0e0e24`): fondo secundario — franjas de sección alternadas (`bg-secondary/30`), diferenciación sutil de ritmo vertical.
- **Card Surface** (`#13132e`): fondo de cards y paneles elevados sobre el fondo primario.
- **Hairline Border** (`rgba(255,255,255,0.07)`): bordes por defecto — casi invisibles, solo definen el borde de la forma.
- **Ghost Text** (`#F0F0FF`): texto primario — blanco tintado, nunca `#fff` puro.
- **Muted Text** (`#7A7A9A`): texto secundario, descripciones, subtítulos.
- **Faint Text** (`#3A3A5C`): texto terciario — placeholders, números de fondo decorativos, metadata de menor jerarquía.

### Named Rules
**The Single Accent Rule.** El violeta (`#7C52E8`) es el único color con carga emocional en todo el sistema. Aparece en botones primarios, badges, bordes activos y glows — nunca como color de fondo masivo. Si una sección necesita más de un acento, el sistema está roto.

## 3. Typography

**Display Font:** Geist Variable (con `system-ui, -apple-system, sans-serif`)
**Body Font:** Geist Variable (misma familia, pesos más bajos)
**Label/Mono Font:** JetBrains Mono (con `ui-monospace, Cascadia Code, monospace`)

**Character:** Una sola familia sans para todo el contenido de lectura (sin mezclar display/body fonts), con el mono reservado exclusivamente para metadata técnica (eyebrows, tags de stack, contadores) — el contraste de personalidad viene del peso y el mono, no de mezclar tipografías.

### Hierarchy
- **Display** (700, `clamp(2.4rem, 5vw, 4rem)`, line-height 1.05, tracking -0.03em): headline del Hero y títulos de sección grandes.
- **Headline** (600, `clamp(2rem, 4vw, 3rem)`, line-height 1.1): títulos de sección (`SectionHeading`).
- **Title** (600-700, 18-24px): nombres de card (proyecto, tier de precio, paso del proceso).
- **Body** (400, 15-17px, line-height 1.6, max 65-75ch): párrafos de descripción, copy de About.
- **Label** (600, 11px, tracking 0.15em, uppercase, mono): eyebrows ("TRABAJOS", "QUÉ INCLUYE"), tags de stack tecnológico, contadores de paso.

### Named Rules
**The Mono-For-Metadata Rule.** JetBrains Mono nunca aparece en texto de lectura — solo en eyebrows, tags, y números/contadores. Es la señal visual de "esto es metadata técnica", no prosa.

## 4. Elevation

Sistema mayormente flat con profundidad tonal (surface > secondary > primary) en vez de sombras duras. El único elemento de "elevación" real es el **glow** — un `box-shadow` difuso del color de acento, usado como respuesta a estado (hover, featured) en vez de como jerarquía estática constante.

### Shadow Vocabulary
- **Accent Glow — Card** (`box-shadow: 0 0 48px var(--accent-glow)`): halo permanente en el card "featured" de precios, para distinguirlo sin depender de tamaño.
- **Accent Glow — Hover** (`box-shadow: 0 8px 24px rgba(124,82,232,0.30)`): respuesta de hover en botones primarios y cards, combinada con `translateY(-2px)`.
- **Focus Ring** (`box-shadow: 0 0 0 2px var(--bg-primary), 0 0 0 4px var(--accent)`): foco de teclado accesible, doble anillo (offset + acento).

### Named Rules
**The Glow-Not-Shadow Rule.** La profundidad no viene de sombras negras tradicionales — viene de glow violeta difuso. Un `box-shadow` gris/negro genérico en este sistema es un error, no una opción neutra.

## 5. Components

### Buttons
- **Shape:** pill (`rounded-full`) para CTAs primarios, `8px` (`rounded-lg`) para acciones secundarias.
- **Primary (`.btn-primary`):** fondo `--accent`, texto blanco. Hover: `translateY(-2px)` + glow violeta. Active: `scale(0.97)`, sin sombra.
- **Sweep (`.btn-sweep`):** borde hairline, fondo transparente con un `linear-gradient` de 0% a 100% de ancho que "barre" de izquierda a derecha al hover (nunca `background-color` directo — el barrido es la firma del secundario).
- **Ghost/CTA link:** solo texto + ícono flecha, usado para links terciarios (WhatsApp, "Ver sitio").

### Cards / Containers
- **Corner Style:** `12px` (`rounded-xl`) consistente en toda la superficie de cards.
- **Background:** `bg-secondary` sobre fondo primario, o `bg-surface` cuando necesita destacar más (card featured).
- **Shadow Strategy:** flat en reposo; glow de acento solo en estado featured o hover (ver Elevation).
- **Border:** hairline por defecto (`rgba(255,255,255,0.07)`), sube a `border-accent` en hover o estado activo/featured.
- **Internal Padding:** `24-32px` (`p-6`/`p-8`), la card featured de precios usa `py-14` para respirar más — aun así, el tamaño "más grande" del featured se garantiza con un `scale(1.05)` fijo, no dependiendo del padding/contenido.

### Badges / Pills
- **Style:** fondo `accent/10-15%`, texto `accent` o blanco, borde `accent/20-40%`, `rounded-full`, uppercase + tracking amplio cuando llevan texto corto ("Destacado", "Más popular").

### Navigation
- Navbar flotante con fondo semitransparente (`--navbar-bg: rgba(8,8,24,0.85)`) + blur, dropdown para agrupar links secundarios, active-state con dot animado bajo el link activo. En mobile colapsa a menú hamburguesa.

### Diagonal Panel (signature component)
Patrón recurrente en Hero, Portfolio y Pricing: un `<div>` absoluto con `clip-path: polygon(...)` formando un panel en gradiente índigo-a-transparente, acompañado de 1-2 `<line>` SVG finas ("slash lines") con gradiente violeta que atraviesan la sección en el mismo ángulo. El ángulo y el lado (izquierda/derecha) alternan sección a sección para dar ritmo sin repetir la misma composición.

## 6. Do's and Don'ts

### Do:
- **Do** tintar todo neutro hacia índigo (`chroma` bajo pero > 0) — nunca `#000`/`#fff` puros.
- **Do** usar el violeta (`#7C52E8`) como único acento con carga emocional — CTAs, badges, glow.
- **Do** resolver "esto es más importante" con `scale`/glow/borde-acento, no con tamaño dependiente del largo del contenido.
- **Do** mantener los cortes diagonales y slash-lines como firma — variar ángulo/lado por sección, no repetir la misma composición.
- **Do** reservar JetBrains Mono para metadata (eyebrows, tags, contadores) — nunca para prosa.
- **Do** respetar `prefers-reduced-motion` en todo motion scroll-driven (parallax, reveals).

### Don't:
- **Don't** usar plantillas de agencia genérica con "nuestro equipo" ficticio o fotos de stock de oficina — anti-referencia explícita del proyecto.
- **Don't** usar el cliché SaaS de gradiente-violeta-sobre-blanco o el "hero-metric template" (número grande + label chico + stats de soporte).
- **Don't** repetir grillas de cards idénticas sin jerarquía — cada grid de 3 necesita asimetría o un elemento que rompa el patrón (como el featured de precios).
- **Don't** usar `border-left`/`border-right` como acento de color en cards o list items — el sistema usa bordes completos, backgrounds tintados o glow, nunca side-stripes.
- **Don't** usar `gradient text` (`background-clip: text`) para énfasis — el énfasis es por peso/tamaño, color sólido siempre.
- **Don't** usar sombras negras/grises genéricas — la profundidad de este sistema es glow violeta, no `box-shadow` neutro.
