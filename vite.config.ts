import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

const src = (path: string) => fileURLToPath(new URL(`./src/${path}`, import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // Mantener sincronizado con "paths" en tsconfig.app.json
    alias: {
      "@modules": src("modules"),
      "@containers": src("containers"),
      "@providers": src("providers"),
      "@layouts": src("layouts"),
      "@assets": src("assets"),
    },
  },
  server: { port: 5173, strictPort: true }
});
