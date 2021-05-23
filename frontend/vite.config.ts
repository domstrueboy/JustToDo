import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Just TODO',
        short_name: 'TODO',
        start_url: 'https://domstrueboy.github.io/JustToDO/',
        display: 'standalone',
        theme_color: '#ffffff',
        background_color:'#ffffff',
        icons: [
          {
            src: '/JustToDo/simple-to-do-logo-512.png',
            sizes: '512x512',
            type: 'image/png',
          }
        ],
      },
    }),
  ],
});
