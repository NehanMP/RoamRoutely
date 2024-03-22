import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
 
  server: {
    // add a proxy so that each time /API is visited instead  of localhost 5000, localhost 3000 is visited
    proxy: {
      "/API": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
