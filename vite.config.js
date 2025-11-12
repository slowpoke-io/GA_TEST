// vite.config.ts
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react"; // 若非 React 改掉這行

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ""); // 讓 VITE_* 可被讀到
  return defineConfig({
    plugins: [react()],
    // 若你用「Preview Deployments」（推薦），這裡用 '/' 即可。
    // 如果改用傳統 Project Pages（固定在 /<repo>/），就把 VITE_BASE 設成 '/<repo>/' 並在 workflow 注入。
    base: env.VITE_BASE || "/",

    // 本地開發沒設 VITE_API_BASE 時，/api 走到本機後端；雲端預覽時會直接用 VITE_API_BASE。
    server: {
      proxy: env.VITE_API_BASE
        ? {}
        : {
            "/api": {
              target: "http://localhost:3000", // 你的本機後端
              changeOrigin: true,
            },
          },
    },
    build: { outDir: "dist" },
  });
};
