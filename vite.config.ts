/* import react from '@vitejs/plugin-react' 
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
}) */
 // TO DO : je remplace le contenu ci-dessus par celui ci-dessous afin de pouvoir importer le tailwindcss

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})