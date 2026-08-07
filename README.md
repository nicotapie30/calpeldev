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
`netlify.toml`. El sitio sale estático al CDN; la única función es
`/api/contact`, que tiene `prerender = false` y solo llama a Resend por HTTPS.
Como no hay base de datos, la región donde corra esa función no afecta la
navegación.

### Las variables van cargadas ANTES del primer build

En el panel de Netlify hay que cargar las dos de `.env.example`
(`RESEND_API_KEY` y `CONTACT_EMAIL`).

No es un detalle de orden: Vite reemplaza `import.meta.env.RESEND_API_KEY` por
su valor **durante el build**, no lo lee en runtime. Un build sin la variable
compila, deploya en verde, y el formulario recién devuelve 500 en producción —
sin ningún error en el log del deploy que lo anticipe. Por lo mismo, **rotar la
key exige redeployar**: cambiarla en el panel no alcanza.

### Después de deployar, mirar tres cosas

- **El formulario de contacto** — mandar una consulta de prueba y confirmar que
  el mail llega. Es lo único que depende de una función y de una variable de
  entorno; todo lo demás es HTML estático.
- **`/sitemap-index.xml`** — lo emite `@astrojs/sitemap` en el hook
  `astro:build:done`. Si ese hook falla, el resto del sitio se ve perfecto y el
  sitemap simplemente no existe.
- **Las rutas internas** — el adapter emite `dist/_redirects`, también en ese
  mismo hook.

### Volver a Vercel

`.vercel/` sigue en el repo (ignorado por git) y el proyecto sigue existiendo en
Vercel: el rollback es mover el DNS de `calpel.dev` de vuelta y revertir el
commit de migración. Lo que se saca al volver es `@astrojs/vercel` +
`@vercel/analytics`, que se fueron con esta migración — el sitio ya no reporta
Web Analytics de Vercel, y Netlify Analytics es pago.

### `pnpm build` falla en Windows y no es un problema del proyecto

En local el build muere al final con:

    EPERM: operation not permitted, symlink ... -> .netlify/v1/functions/ssr/node_modules/...

`@astrojs/netlify` reconstruye las dependencias de la función respetando los
symlinks de `node_modules`, y pnpm arma todo con symlinks. Crear symlinks en
Windows pide un privilegio que los usuarios no-admin no tienen por defecto.
Netlify buildea en Linux, donde no hace falta, así que el deploy no se ve
afectado.

Para buildear local: activar **Modo de desarrollador** (Configuración → Sistema
→ Para desarrolladores), o correr el build desde una terminal como
Administrador. Ojo con el `dist/` que deja un build fallido: tiene el
`index.html` y los assets, así que parece completo, pero le faltan `_redirects`
y el sitemap.

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
