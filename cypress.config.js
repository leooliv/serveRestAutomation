const { defineConfig } = require('cypress')
const API_URL = 'https://serverest.dev'

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      config.env.API_URL = API_URL
      return config
    },
  },
})
