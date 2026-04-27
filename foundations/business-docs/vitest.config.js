import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['tests/**/*.test.{js,jsx}'],
    environment: 'jsdom',
  },
  // Foundation source uses JSX; vitest needs the React transform.
  esbuild: { jsx: 'automatic' },
})
