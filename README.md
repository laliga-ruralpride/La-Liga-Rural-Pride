# La Liga Rural Pride · Web oficial

Web oficial de **La Liga Rural Pride**, banda de punk rock de la tierra de Pinares (Segovia).

🌐 **https://laliga-ruralpride.github.io**

Hay biografía, discografía con el primer EP y el videoclip del single, conciertos, merch, galería, formulario de contrataciones y contacto.

Redes: [Instagram](https://www.instagram.com/laliga.ruralpride/) · [YouTube](https://www.youtube.com/@laliga.ruralpride) · [Spotify](https://open.spotify.com/intl-es/artist/2mX5a8HKZsJHyIxJmYs7Nq)

---

## Cambiar contenido (sin tocar código)

Casi todo el texto de la web sale de tres ficheros JSON en `frontend/src/data/`:

| Fichero | Qué contiene |
|---|---|
| `bandInfo.json` | Nombre, biografía, correo, teléfono, número de WhatsApp para pedidos (`whatsappPedidos`) y redes sociales |
| `bandData.json` | Integrantes, single destacado, singles, **merch y packs** (nombre, precio, foto) y **conciertos** |
| `ep.json` | Datos del EP: título, portada, canciones y créditos |

Las imágenes van en `frontend/public/images/`. Mejor en formato `.webp`, que pesan poco.

**Añadir un concierto:** en `bandData.json`, dentro de `"gigs"`, añade una entrada como esta:

```json
{ "date": "2026-12-20", "venue": "Sala X", "city": "Segovia", "status": "confirmed" }
```

`status` puede ser `"confirmed"` o `"sold_out"`. Las fechas que ya han pasado se ocultan solas.

## Cómo funcionan los pedidos y las contrataciones

- **Merch (camisetas, CD, packs):** cada producto tiene un botón *Reservar por WhatsApp*. Abre un chat con el número de `whatsappPedidos` y un mensaje ya escrito con el producto y su precio.
- **Contrataciones:** el formulario se envía con [Formspree](https://formspree.io) y llega al correo oficial. También se puede escribir directamente al correo de `bandInfo.json`.

## Trabajar en local

Hace falta [Node.js](https://nodejs.org) y [Yarn](https://yarnpkg.com).

```bash
cd frontend
yarn install     # solo la primera vez
yarn start       # abre la web en http://localhost:3000 y se recarga al guardar
yarn build       # compila la web en frontend/build/
yarn preview     # sirve esa compilación en http://localhost:4173 para revisarla tal cual se publicará
```

## Publicar cambios

```bash
cd frontend
yarn deploy
```

Este comando compila la web y la sube a la rama `gh-pages`, que es la que publica GitHub Pages. Los cambios tardan uno o dos minutos en verse (si no aparecen, recarga a fondo).

Recuerda también guardar el código en `main` con `git commit` y `git push`. `yarn deploy` solo publica la web, no guarda el código.

## Detalles técnicos

- **React** con **[Vite](https://vite.dev)** y **Tailwind CSS**. Casi toda la web está en `frontend/src/App.jsx`. La configuración está en `frontend/vite.config.mjs`.
- **Imágenes y PDF** van en `frontend/public/`. En el código se enlazan con `asset("/images/...")`.
- **Texto para buscadores:** al compilar, `frontend/scripts/static-content.js` mete en el HTML una versión en texto de la web, hecha con los mismos JSON. Así Google, ChatGPT y otros rastreadores que no ejecutan JavaScript también pueden leerla.
- **SEO:** en `frontend/index.html` están los datos estructurados `MusicGroup`, para que Google sepa que es una banda y no la liga de fútbol, y las etiquetas para compartir en redes. `sitemap.xml` y `robots.txt` están en `frontend/public/`.
- **Seguridad (CSP):** `frontend/index.html` tiene una política de seguridad que solo permite el script en línea cuyo hash aparece en ella. **Si cambias ese `<script>`, actualiza el hash**, porque si no el navegador lo bloquea. Si añades un servicio externo nuevo (otro reproductor, otra API), también hay que añadirlo a la CSP. Con `yarn start` la CSP se quita a propósito, porque Vite necesita sus propios scripts para recargar al guardar. Para comprobar la CSP de verdad, usa `yarn build && yarn preview`.
- `fotos-originales/` guarda las fotos a tamaño completo y no se sube al repo (está en `.gitignore`).
