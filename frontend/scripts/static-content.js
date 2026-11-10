#!/usr/bin/env node
/*
 * Se ejecuta después de `build` (script "postbuild").
 *
 * La web se pinta con JavaScript, y muchos rastreadores (ChatGPT, Perplexity y
 * otros asistentes) no lo ejecutan: solo verían un <div id="root"> vacío.
 * Este script mete dentro de ese div una versión en texto de la web, generada
 * con los mismos datos que usa React, así que no hay que mantenerla aparte.
 *
 * Con JavaScript activo, React sustituye ese contenido al arrancar, y una
 * clase en <html> lo oculta mientras carga para que no se vea un parpadeo.
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, "src/data", file), "utf8"));

const info = read("bandInfo.json");
const band = read("bandData.json");
const ep = read("ep.json");
const homepage = require(path.join(root, "package.json")).homepage.replace(/\/$/, "");

const esc = (text) =>
  String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const link = (href, text) => `<a href="${esc(href)}">${esc(text)}</a>`;
const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;

const upcomingGigs = (band.gigs || []).filter((gig) => new Date(gig.date) >= new Date());
const gigDate = (iso) =>
  new Date(iso).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Madrid"
  });

const sections = [
  `<h1>${esc(info.name)}</h1>`,
  `<p>${esc(info.subtitle)} · ${esc(info.location)} · desde ${esc(info.year)}</p>`,

  `<h2>Biografía</h2>`,
  `<p>${esc(info.bio)}</p>`,
  `<p>${esc(info.bioExtended)}</p>`,
  `<h3>Integrantes</h3>`,
  list((band.members || []).map((m) => `${esc(m.name)}: ${esc(m.role)}`)),

  `<h2>Discografía</h2>`,
  `<h3>${esc(ep.title)} (${esc(ep.label)})</h3>`,
  `<p>Lanzamiento: ${esc(ep.release)}. Disponible en Spotify y en todas las plataformas.</p>`,
  `<ol>${ep.tracks.map((t) => `<li>${esc(t.title)}${t.note ? ` (${esc(t.note)})` : ""}</li>`).join("")}</ol>`,
  `<p>${esc(ep.credits)}</p>`,
  band.featuredSingle
    ? `<p>${band.featuredSingle.label ? `${esc(band.featuredSingle.label)}: ` : ""}${link(
        `https://www.youtube.com/watch?v=${band.featuredSingle.youtubeId}`,
        `videoclip de «${band.featuredSingle.title}» en YouTube`
      )}</p>`
    : "",
  (band.discography || []).length
    ? `<h3>Singles</h3>` +
      list(band.discography.map((s) => `${esc(s.title)} (${esc(s.year)})`))
    : "",

  `<h2>Próximos conciertos</h2>`,
  upcomingGigs.length
    ? list(upcomingGigs.map((g) => `${gigDate(g.date)}: ${esc(g.venue)}, ${esc(g.city)}`))
    : `<p>Próximas fechas muy pronto.</p>`,

  `<h2>Merchandising</h2>`,
  list(
    [...(band.merch || []), ...(band.packs || [])].map(
      (item) => `${esc(item.name)}${item.price ? `: ${esc(item.price)}` : ""}`
    )
  ),
  `<p>Pedidos: ${link(`mailto:${info.contact.email}`, info.contact.email)}</p>`,

  `<h2>Contrataciones</h2>`,
  `<p>Para fiestas, salas y festivales de toda España. ${link(
    `${homepage}/dossier-la-liga-rural-pride-2026.pdf`,
    "Descargar dossier"
  )}.</p>`,

  `<h2>Contacto</h2>`,
  list([
    `Email: ${link(`mailto:${info.contact.email}`, info.contact.email)}`,
    `Teléfono: ${link(`tel:${info.contact.phone.replace(/\s/g, "")}`, info.contact.phone)}`,
    `Instagram: ${link(info.social.instagram, "@laliga.ruralpride")}`,
    `YouTube: ${link(info.social.youtube, "@laliga.ruralpride")}`,
    `Spotify: ${link(info.social.spotify, info.name)}`
  ])
];

const fallback = `<div id="static-content">${sections.join("")}</div>`;

const indexPath = path.join(root, "build/index.html");
const html = fs.readFileSync(indexPath, "utf8");
const marker = '<div id="root"></div>';

if (!html.includes(marker)) {
  console.error(`static-content: no encuentro ${marker} en build/index.html`);
  process.exit(1);
}

fs.writeFileSync(indexPath, html.replace(marker, `<div id="root">${fallback}</div>`));
console.log(`static-content: añadido texto para buscadores (${fallback.length} caracteres)`);
