// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 30000,
  retries: 1,
  reporter: [["list"]],
  workers: 3,
  use: {
    trace: 'retain-on-failure',
    channel: 'msedge',
    // screenshot: "only-on-failure",
    video: "retain-on-failure",
    storageState: 'auth.json',
    launchOptions: {
      headless: true,
      slowMo: 50,
      devtools: false,
    },
    viewport: {
      width: 1280, height: 800
    },
  },
};
export default config;