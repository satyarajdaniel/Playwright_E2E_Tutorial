// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout : 100*1000,
  retries : 1,
  expect:{
    timeout : 40*1000,
  },
  reporter:'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  /*use: {
    browserName: 'chromium',
    headless: false,
    // Maximum time each action (click, fill, hover) can take
    actionTimeout: 10 * 1000, // 10 seconds
    // Maximum time for page loading operations (goto, reload, waitForURL)
    navigationTimeout: 15 * 1000, // 15 seconds
    screenshot:'on',
  }*/

  /* Configure projects for major browsers */
  projects: [
  {
    name: 'safari execution',
    use: {
      browserName: 'webkit',
      headless: false,
      screenshot: 'off',
      trace: 'on', 
      ...devices['iPhone 8']
    },
  },
  {
    name: 'chrome',
    use: {
      browserName: 'chromium',
      headless: false,
      screenshot: 'on', // capture screenshots for debugging
      trace: 'on', // keep trace for failed tests
      viewport: { width: 1280, height: 720 }, // optional
      ignoreHTTPSErrors: true, // useful for local testing
    },
  }
]

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  // ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

module.exports = config

