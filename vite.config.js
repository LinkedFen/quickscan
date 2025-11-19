import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  plugins: [legacy()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          charting: ["chart.js"],
          pdf: ["html2canvas", "jspdf"]
        }
      }
    }
  }
});
