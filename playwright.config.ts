// playwright.config.ts
import { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  reporter: [["dot"]],
  workers: 3,
  use: {
    channel: 'msedge',
    screenshot: "only-on-failure",
    // video: "retain-on-failure",
    storageState: 'auth.json',
    launchOptions: {
      headless: true,
      slowMo: 50,
      devtools: false,
    },
    viewport: {
      width: 1920, height: 1200
    },
  },
};
export default config;