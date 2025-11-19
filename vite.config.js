import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
  base: "./",
  root: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: {
          charting: ["chart.js"],
          pdf: ["html2canvas", "jspdf"]
        }
      }
    }
  },
  plugins: [legacy()]
});
