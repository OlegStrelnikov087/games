import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      '@tic-tac-toe': path.resolve(__dirname, './src/applications/tic-tac-toe/'),
      '@assets': path.resolve(__dirname, "./src/assets"),
    },
  },
});