import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';

export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  base: '/', // Установите базовый путь как корень
  build: {
    outDir: '../backend/public', // Сохраняем билд в папку public бэкенда
    emptyOutDir: true,
    assetsDir: 'assets', // Папка для статики внутри public
    manifest: true, // Генерирует manifest.json для бэкенда
  },
});