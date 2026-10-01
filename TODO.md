# Tareas pendientes — Web La Liga Rural Pride

## Por hacer

- [ ] **Reproductor de Spotify en cada álbum**
  El reproductor ya está programado en la sección de Discografía; solo falta rellenar
  el campo `spotifyEmbed` de cada álbum en `frontend/src/data/bandData.json`.
  Formato: `https://open.spotify.com/embed/track/<ID-de-la-canción>`
  (el ID sale del enlace de compartir de Spotify: `open.spotify.com/track/<ID>?si=...`).

- [ ] **Vídeo en directo**
  Cuando esté grabado, subirlo a YouTube e incrustarlo en la web
  (en Biografía o en Contrataciones).

- [x] **Dossier de prensa descargable**
  Botón "Descargar dossier" en Contrataciones → `frontend/public/dossier-la-liga-rural-pride-2026.pdf`.
  Para actualizarlo, sustituir ese archivo manteniendo el mismo nombre.

## Comprobaciones

- [x] **Envío real del formulario de contrataciones**
  Validaciones OK (campos obligatorios y email). Envío de prueba hecho el 2026-10-01
  ("PRUEBA WEB (Claude)"): el correo de Formspree llega correctamente.

- [x] **Carpeta `fotos-originales/`** (ya está en `.gitignore`)
  Contiene las fotos sin reducir (~50 MB). No incluirla en los commits
  (o añadirla al `.gitignore`).
