import { defineConfig } from "vite";
import legacy from "@vitejs/plugin-legacy";

export default defineConfig({
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
