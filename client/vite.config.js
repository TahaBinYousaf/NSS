import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Allow all hosts (e.g., *.ngrok-free.app)
export default defineConfig({
  server: {
    host: true,
    strictPort: true,
    port: 5173,
    hmr: {
      clientPort: 443, // for ngrok HTTPS
    },
    origin: process.env.FRONTEND_URL, // make sure this is set in .env
    cors: true,
    allowedHosts: [/\.ngrok-free\.app$/], // 👈 REGEX for dynamic ngrok URLs
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  plugins: [react(), tailwindcss()],
});
