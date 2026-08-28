import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 프로젝트 페이지: https://doyoungkim-code.github.io/Portfolio
export default defineConfig({
  base: '/Portfolio/',
  plugins: [react()],
})
