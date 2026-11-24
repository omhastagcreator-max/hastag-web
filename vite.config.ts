import { defineConfig, loadEnv } from "vite";
import cmsHandler from "./backend/cms.js";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    fs: { deny: [".env", ".env.*", "**/*.{crt,pem}", "**/.git/**", "**/.cms-data/**", "**/backend/**"] },
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), {
    name: "password-editor-api",
    configureServer(server) {
      // Server-only values are deliberately never passed through Vite's define/envPrefix.
      Object.assign(process.env, loadEnv(mode, process.cwd(), ""));
      server.middlewares.use("/api/cms", (req, res) => { void cmsHandler(req, res); });
    },
  }],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
