import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: './tests', // Configure based on your folder structure
  use: {
    baseURL: 'http://localhost:8080',
  },
});
