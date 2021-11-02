import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    build: {
      rollupOptions: {
        plugins: [
          mode === "analyze" &&
            visualizer({
              open: true,
              filename: "dist/stats.html",
              gzipSize: true,
              brotliSize: true,
            }),
        ],
      },
    },
    plugins: [
      react(),
      VitePWA({
        includeAssets: [
          "favicon.svg",
          "favicon.ico",
          "robots.txt",
          "apple-touch-icon.png",
        ],
        manifest: {
          name: "Name of your app",
          short_name: "Short name of your app",
          description: "Description of your app",
          theme_color: "#ffffff",
          icons: [
            {
              src: "pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
            },
            {
              src: "pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any maskable",
            },
          ],
        },
      }),
    ],
    // define: {
    //   global: {},
    // },
  };
});
