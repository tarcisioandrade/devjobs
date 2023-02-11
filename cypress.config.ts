import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    video: false,
    baseUrl: "http://localhost:3000",
    screenshotOnRunFailure: false,
    defaultCommandTimeout: 10000,
  },
});
