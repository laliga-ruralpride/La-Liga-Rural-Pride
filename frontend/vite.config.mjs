import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = path.dirname(fileURLToPath(import.meta.url));

// La CSP de index.html bloquea los scripts en línea que no estén en su lista.
// En desarrollo (`yarn start`), Vite y React inyectan uno propio para la recarga
// en caliente, así que quitamos la CSP solo ahí. La web publicada la mantiene.
const cspSoloEnProduccion = {
  name: "csp-solo-en-produccion",
  apply: "serve",
  transformIndexHtml: (html) =>
    html.replace(/\s*<meta http-equiv="Content-Security-Policy"[^>]*>/, "")
};

export default defineConfig({
  base: "/",
  plugins: [react(), cspSoloEnProduccion],
  resolve: {
    alias: { "@": path.resolve(root, "src") }
  },
  server: { port: 3000, open: true },
  preview: { port: 4173 },
  build: {
    // Misma carpeta que antes: la usan scripts/static-content.js y `yarn deploy`.
    outDir: "build",
    sourcemap: false
  }
});
