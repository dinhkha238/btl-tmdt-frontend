import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      // this alias is used to fix antd less "import issue"
      { find: /^~/, replacement: "" },
      { find: "@", replacement: "/src" },
    ],
  },
  plugins: [react()],
  build: {
    outDir: 'dist', // Đây là đường dẫn đến thư mục build
  },
})
