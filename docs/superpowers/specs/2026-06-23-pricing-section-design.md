# Sección Precios — Design Spec

**Fecha:** 2026-06-23  
**Proyecto:** calpel-dev (CalPel.dev)

---

## Objetivo

Agregar una sección de precios que reduzca la fricción de conversión mostrando precios de referencia para sitios web y dejando los servicios más complejos como "a cotizar".

---

## Placement

Entre `<Process>` y `<FAQ>` en `src/pages/index.astro`.

---

## Estructura de la sección

### 1. Heading
- Título: "Precios"
- Subtítulo: "Invertí en tu presencia digital. Precios de referencia — proyectos a medida se cotizan sin cargo."

### 2. Bloque principal — Sitios web (3 tiers con precio fijo)

| Tier | Nombre | Precio | Badge |
|------|--------|--------|-------|
| Starter | Landing page | Desde $320.000 | — |
| Pro | Sitio con CMS | Desde $750.000 | "Más popular" |
| Ecommerce | Tienda online | Desde $1.500.000 | — |

**Features por tier:**

**Starter — Landing page**
- Diseño responsive mobile-first
- Hasta 5 secciones personalizadas
- Formulario de contacto
- SEO básico (meta tags, Open Graph)
- Deploy en Vercel con dominio propio

**Pro — Sitio con CMS**
- Todo lo del Starter
- CMS para editar contenido sin código
- Hasta 10 páginas internas
- Blog opcional
- Analytics integrado

**Ecommerce — Tienda online**
- Todo lo del Pro
- Catálogo de productos
- Carrito y checkout
- Integración Mercado Pago
- Panel de administración

### 3. Bloque secundario — Otros servicios (a cotizar)

3 cards más pequeñas para: Apps personalizadas, Chatbots con IA, Automatizaciones.  
Cada una muestra: nombre del servicio, 1 línea descriptiva, botón "Cotizar por WhatsApp".

### 4. Nota al pie

> "Todos los proyectos incluyen 30 días de soporte post-lanzamiento. Precios en ARS — consultá equivalente en USD."

---

## Datos

Nuevo archivo: `src/data/pricing.ts`

```ts
export type PricingTier = {
  name: string;
  subtitle: string;
  price: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

export type QuoteService = {
  title: string;
  description: string;
};
```

---

## Componente

`src/components/Pricing.astro` — componente Astro puro (sin interactividad, no necesita `client:`).

Animación: `[data-reveal]` consistente con el resto del sitio.

---

## Visual

- Fondo: `bg-[#0f0f0f]` consistente con otras secciones
- Cards: `bg-[#1a1a1a] border border-white/8`
- Tier Pro (featured): borde accent `border-[#8B8FBF]` + glow sutil
- Precios: tipografía display bold, prominente
- Cards de cotización: tamaño menor, sin precio, con CTA WhatsApp

---

## No incluido (fuera de scope)

- Comparativa interactiva o toggle mensual/anual
- Precios en USD con conversión dinámica
- Formulario de cotización inline (usar WhatsApp existente)
