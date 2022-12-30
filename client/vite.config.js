import { defineConfig, loadEnv } from 'vite';
import react from "@vitejs/plugin-react";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [react()],

    server: {

      proxy: {

        '/api/v1': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },

      },

    },

  });
}
