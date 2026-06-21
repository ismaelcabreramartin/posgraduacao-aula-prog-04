// @ts-check
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './test',
  fullyParallel: true,
  reporter: [
    ['list'],
    ['html'],
    ['playwright-ctrf-json-reporter', {}]
  ],
});