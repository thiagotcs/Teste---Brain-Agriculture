import react from '@vitejs/plugin-react'
import { UserConfig } from 'vite'

// https://vitejs.dev/config/
const config: UserConfig = {
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['@testing-library/jest-dom'],
  },
}

export default config
