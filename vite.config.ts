import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // <-- ADICIONE ISSO
import path from "path";

export default defineConfig({
  base: "/",
  plugins: [
    react(),
    tailwindcss(), // <-- ADICIONE ISSO AQUI
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
});