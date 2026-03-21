// @ts-check
import { defineConfig, fontProviders } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'
import react from '@astrojs/react'
import netlify from '@astrojs/netlify'
import db from '@astrojs/db'

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: 'https://www.thebeerproject.netlify.app',
  integrations: [react(), db()],
  adapter: netlify(),
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Fredoka',
      cssVariable: '--font-fredoka',
      weights: ['300', '400', '500', '600', '700'],
      styles: ['normal'],
    },
  ],
})
