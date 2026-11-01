import { defineConfig } from 'vitest/config'

export default defineConfig({
  // A foundation's source reaches kit and Press, which ship `.jsx`. Under a monorepo's workspace they
  // are linked from source, which Vite transforms; in CI they come from node_modules, which it hands
  // to Node, and Node can't import `.jsx`. Without this a test passes on a developer's machine and
  // fails in CI, as `tests/citations.test.js` did at 1.1.25.
  esbuild: { jsx: 'automatic' },
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.js'],
    server: { deps: { inline: [/@uniweb\//] } },
  },
})
