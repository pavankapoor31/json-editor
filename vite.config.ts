import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfigExport } from 'vite';
import type { InlineConfig } from 'vitest';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  test: {
    environment: 'jsdom',
    exclude: ['node_modules', 'dist', '.idea', '.git', '.cache', 'e2e/*'],
    setupFiles: './src/setupTests.ts', // Updated path
  },
} as UserConfigExport & { test: InlineConfig });