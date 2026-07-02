# Pricing Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar sección Precios con 3 tiers para sitios web + 3 cards "a cotizar" para los demás servicios.

**Architecture:** Datos separados en `src/data/pricing.ts`, componente Astro puro en `src/components/Pricing.astro`, insertado en `src/pages/index.astro` entre `<Process>` y `<About>`. Sin interactividad de cliente, sin JS.

**Tech Stack:** Astro, Tailwind CSS v4, design tokens de `global.css`, `[data-reveal]` animation system, `whatsappLink()` de `src/data/site.ts`.

## Global Constraints

- Package manager: `pnpm` siempre. Nunca `npm`.
- Tailwind v4: clases de tokens usan prefijo `text-accent`, `bg-bg-surface`, etc. (ver `global.css` `@theme inline`)
- Animaciones: `[data-reveal]` + `data-delay` (ms como string). Sistema ya configurado en `BaseLayout.astro`.
- Colores: `--accent: #7C52E8`, `--bg-primary: #080818`, `--bg-secondary: #0e0e24`, `--bg-surface: #13132e`
- Botones existentes: `.btn-primary` (hover lift+glow) y `.btn-sweep` (sweep de izquierda a derecha) en `global.css`
- Links WhatsApp: siempre via `whatsappLink(message)` de `src/data/site.ts`
- Secciones: patrón `scroll-mt-24 py-24 lg:py-32` + `container-site` + `SectionHeading`

---

### Task 1: Datos de precios

**Files:**
- Create: `src/data/pricing.ts`

**Interfaces:**
- Produces: `PricingTier[]` exportado como `pricingTiers`, `QuoteService[]` exportado como `quoteServices`

- [ ] **Step 1: Crear `src/data/pricing.ts`**

```ts
export type PricingTier = {
  name: string;
  subtitle: string;
  price: string;
  priceNote: string;
  featured?: boolean;
  features: string[];
};

export type QuoteService = {
  title: string;
  description: string;
  whatsappMessage: string;
};

export const pricingTiers: PricingTier[] = [
  {
    name: 'Landing page',
    subtitle: 'Presencia digital de entrada.',
    price: 'Desde $320.000',
    priceNote: 'ARS',
    features: [
      'Diseño responsive mobile-first',
      'Hasta 5 secciones personalizadas',
      'Formulario de contacto',
      'SEO básico (meta tags, Open Graph)',
      'Deploy en Vercel con dominio propio',
    ],
  },
  {
    name: 'Sitio con CMS',
    subtitle: 'Tu sitio, editalo vos mismo.',
    price: 'Desde $750.000',
    priceNote: 'ARS',
    featured: true,
    features: [
      'Todo lo del Landing',
      'CMS para editar contenido sin código',
      'Hasta 10 páginas internas',
      'Blog opcional',
      'Analytics integrado',
    ],
  },
  {
    name: 'Ecommerce',
    subtitle: 'Vendé online desde el día uno.',
    price: 'Desde $1.500.000',
    priceNote: 'ARS',
    features: [
      'Todo lo del Sitio con CMS',
      'Catálogo de productos',
      'Carrito y checkout completo',
      'Integración Mercado Pago',
      'Panel de administración',
    ],
  },
];

export const quoteServices: QuoteService[] = [
  {
    title: 'Apps personalizadas',
    description: 'Paneles de gestión, dashboards y sistemas a medida para tu negocio.',
    whatsappMessage: 'Hola, me interesa cotizar una app personalizada.',
  },
  {
    title: 'Chatbots con IA',
    description: 'Automatizá tu atención al cliente con IA integrada a WhatsApp.',
    whatsappMessage: 'Hola, me interesa cotizar un chatbot con IA.',
  },
  {
    title: 'Automatizaciones',
    description: 'Conectá tus herramientas y eliminá el trabajo manual repetitivo.',
    whatsappMessage: 'Hola, me interesa cotizar automatizaciones para mi negocio.',
  },
];
```

- [ ] **Step 2: Verificar TypeScript sin errores**

```bash
pnpm astro check
```
Expected: 0 errores en `src/data/pricing.ts`.

---

### Task 2: Componente Pricing.astro

**Files:**
- Create: `src/components/Pricing.astro`

**Interfaces:**
- Consumes: `pricingTiers` y `quoteServices` de `../data/pricing`, `whatsappLink` de `../data/site`, `SectionHeading` de `./SectionHeading.astro`
- Produces: `<section id="precios">` consumible en `index.astro`

- [ ] **Step 1: Crear `src/components/Pricing.astro`**

```astro
---
import SectionHeading from './SectionHeading.astro';
import { pricingTiers, quoteServices } from '../data/pricing';
import { whatsappLink } from '../data/site';
---

<section id="precios" class="scroll-mt-24 py-24 lg:py-32">
  <div class="container-site">

    <SectionHeading
      eyebrow="Precios"
      title="Invertí en tu presencia digital."
      subtitle="Precios de referencia para sitios web. Proyectos a medida se cotizan sin cargo."
      align="center"
    />

    <!-- 3 tiers de sitios web -->
    <div class="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
      {pricingTiers.map((tier, i) => (
        <div
          data-reveal="up"
          data-delay={String(i * 100)}
          class={`relative flex flex-col rounded-xl border p-8 ${
            tier.featured
              ? 'border-accent bg-bg-surface shadow-[0_0_40px_var(--accent-glow)]'
              : 'border-[var(--border)] bg-bg-secondary'
          }`}
        >
          {tier.featured && (
            <span class="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-accent px-4 py-1 text-xs font-semibold text-white">
              Más popular
            </span>
          )}

          <div>
            <p class="text-sm font-semibold text-accent">{tier.name}</p>
            <p class="mt-1 text-sm text-text-secondary">{tier.subtitle}</p>
          </div>

          <div class="mt-6 border-t border-[var(--border)] pt-6">
            <p class="text-[2rem] font-bold leading-none tracking-tight text-text-primary">
              {tier.price}
            </p>
            <p class="mt-1 text-xs text-text-faint">{tier.priceNote}</p>
          </div>

          <ul class="mt-8 flex flex-1 flex-col gap-3">
            {tier.features.map(feat => (
              <li class="flex items-start gap-2.5 text-sm text-text-secondary">
                <svg
                  class="mt-0.5 h-4 w-4 shrink-0 text-accent"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 8l3.5 3.5L13 4.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                {feat}
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(`Hola, me interesa cotizar: ${tier.name}.`)}
            target="_blank"
            rel="noopener noreferrer"
            class={`mt-8 block rounded-lg px-5 py-3 text-center text-sm font-semibold ${
              tier.featured
                ? 'bg-accent text-white btn-primary'
                : 'border border-[var(--border)] text-text-primary btn-sweep'
            }`}
          >
            Empezar proyecto
          </a>
        </div>
      ))}
    </div>

    <!-- Proyectos a medida -->
    <div class="mt-20">
      <p
        data-reveal="up"
        class="text-center text-xs font-semibold uppercase tracking-[0.12em] text-text-secondary"
      >
        Proyectos a medida — se cotizan sin cargo
      </p>

      <div class="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {quoteServices.map((svc, i) => (
          <div
            data-reveal="up"
            data-delay={String(i * 80)}
            class="flex flex-col gap-4 rounded-xl border border-[var(--border)] bg-bg-secondary p-6"
          >
            <div class="flex-1">
              <p class="font-semibold text-text-primary">{svc.title}</p>
              <p class="mt-1.5 text-sm leading-relaxed text-text-secondary">
                {svc.description}
              </p>
            </div>
            <a
              href={whatsappLink(svc.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-sm font-medium text-accent transition-colors hover:text-accent-light"
            >
              Cotizar por WhatsApp
              <svg class="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </div>

    <!-- Nota al pie -->
    <p
      data-reveal="fade"
      data-delay="200"
      class="mt-12 text-center text-xs text-text-faint"
    >
      Todos los proyectos incluyen 30 días de soporte post-lanzamiento.
      Precios en ARS — consultá equivalente en USD.
    </p>

  </div>
</section>
```

- [ ] **Step 2: Verificar TypeScript**

```bash
pnpm astro check
```
Expected: 0 errores nuevos.

---

### Task 3: Insertar en index.astro

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `Pricing` de `../components/Pricing.astro`

- [ ] **Step 1: Agregar import en `src/pages/index.astro`**

En el bloque frontmatter, después de `import Process from '../components/Process.astro';`:

```astro
import Pricing from '../components/Pricing.astro';
```

- [ ] **Step 2: Insertar `<Pricing />` entre `<Process />` y `<About />`**

El bloque `<main>` queda así:

```astro
<main id="main">
  <Hero />
  <Services />
  <TechMarquee />
  <Portfolio />
  <Testimonials />
  <Process />
  <Pricing />
  <About />
  <FAQ />
  <Contact />
</main>
```

- [ ] **Step 3: Verificar en browser**

Abrir `http://localhost:4321/#precios` y confirmar:
- 3 cards de tiers visibles (Landing / Sitio con CMS / Ecommerce)
- Card "Sitio con CMS" con badge "Más popular" y borde violeta
- 3 cards inferiores de cotización
- Animaciones `[data-reveal]` funcionan al scroll
- Links de WhatsApp abren con mensaje prellenado correcto
- Responsive: mobile stack 1 columna, desktop 3 columnas

- [ ] **Step 4: Verificar TypeScript final**

```bash
pnpm astro check
```
Expected: 0 errores.
