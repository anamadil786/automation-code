const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'PRF-documentation',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
    
  },
  env: {
    BASE_URL: process.env.BASE_URL,
    username: process.env.username,
    password: process.env.password,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // config.env = {
      //   ...process.env,
      //   ...config.env
      // },
      require('cypress-mochawesome-reporter/plugin')(on);
    //  return config 
    },
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
