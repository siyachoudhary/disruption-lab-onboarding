import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // For the GitHub Pages project site the app is served from a sub-path
  // (https://<user>.github.io/<repo>/). DEPLOY_BASE sets that at build time;
  // local dev and other hosts default to "/".
  base: process.env.DEPLOY_BASE || "/",
  server: {
    port: 5173,
    proxy: {
      // Forward API calls to the Express server in development.
      "/api": "http://localhost:4000",
    },
  },
});
