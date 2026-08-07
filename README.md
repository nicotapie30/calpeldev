# Astro Starter Kit: Minimal

```sh
pnpm create astro@latest -- --template minimal
```

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
├── src/
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `pnpm install`             | Installs dependencies                            |
| `pnpm dev`             | Starts local dev server at `localhost:4321`      |
| `pnpm build`           | Build your production site to `./dist/`          |
| `pnpm preview`         | Preview your build locally, before deploying     |
| `pnpm astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `pnpm astro -- --help` | Get help using the Astro CLI                     |

## Deploy

Netlify, conectado al repo: push a `main` deploya. La config vive en
`netlify.toml`.

El sitio es **100% estático**: `astro build` prerenderiza todo a `dist` y
Netlify sirve archivos. No hay adapter, no hay serverless functions y no hay
variables de entorno que cargar en el panel. Deployar es copiar una carpeta.

### El formulario no manda mails

El form de contacto arma un link de `wa.me` en el browser y abre WhatsApp
(`src/components/Contact.astro`). No hay backend, no hay endpoint, no se envía
nada a ningún servidor. La validación con Zod corre del lado del cliente, antes
de armar el mensaje.

Hubo un `src/pages/api/contact.ts` que mandaba el formulario por Resend. Quedó
sin uso cuando el form pasó a WhatsApp y se borró en la migración a Netlify,
junto con la dependencia `resend` y el `.env.example`. Está en la historia de
git si alguna vez se quiere retomar el envío por mail — pero volver a agregar
una ruta con `prerender = false` obliga a poner un adapter de nuevo, con todo
lo que eso arrastra (ver más abajo).

### Después de deployar, mirar dos cosas

- **`/sitemap-index.xml`** — lo emite `@astrojs/sitemap` en el hook
  `astro:build:done`. Si ese hook falla, el resto del sitio se ve perfecto y el
  sitemap simplemente no existe, sin ningún error visible.
- **El botón del formulario** — que abra WhatsApp con el mensaje prellenado.

### Volver a Vercel

`.vercel/` sigue en el disco (ignorado por git) y el proyecto sigue existiendo
en Vercel: el rollback es mover el DNS de `calpel.dev` de vuelta y revertir los
commits de migración. Lo que se pierde al haber migrado es Vercel Web Analytics
—venía del adapter, no de ningún import— y Netlify Analytics es pago.

### Si algún día vuelve a hacer falta un adapter

Sumar cualquier ruta con `prerender = false` obliga a un adapter, y ahí reaparece
un problema que en Windows no es obvio: `pnpm build` muere al final con

    EPERM: operation not permitted, symlink ...

El adapter reconstruye las dependencias de la function respetando los symlinks
de `node_modules`, y pnpm arma todo con symlinks. Crearlos en Windows pide un
privilegio que los usuarios no-admin no tienen por defecto. Pasa con cualquier
adapter de Astro, no es de Netlify: `@astrojs/vercel` y `@astrojs/netlify` usan
los dos el mismo `copyFilesToFolder` de `@astrojs/internal-helpers`.

La salida es activar **Modo de desarrollador** (Configuración → Sistema → Para
desarrolladores) o buildear desde una terminal como Administrador. En Linux —o
sea en el build de Netlify— no aplica.

Ojo con el `dist/` que deja un build fallido así: tiene el `index.html` y los
assets, así que parece completo, pero le faltan el sitemap y los `_redirects`,
que se emiten en el mismo hook que aborta.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
